const { checkAccessToken } = require('../tokenFunctions');
const { getPool } = require('../../db');

module.exports = {
  delete: async (req, res) => {
    const accessTokenData = checkAccessToken(req);

    // Access token 이 없거나 유효하지 않은 경우 종료
    if (!accessTokenData) {
      return res.status(401).send({ message: 'invalid access token' });
    }

    const { admin } = accessTokenData;

    // Admin 이 아닌 경우 종료
    if (!admin) {
      return res.status(403).send({ message: 'not admin' });
    }

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);

    try {
      await connection.beginTransaction();

      const title = req.params.title;
      console.log('title: ', title);

      const [existingMusical] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );
      console.log('existingMusical: ', existingMusical);

      if (!existingMusical[0]) {
        return res.status(404).send({ message: 'musical not found' });
      }

      // 삭제 순서: (user_number) -> numbers -> user_hashtag -> musical_hashtag -> hashtags(musicalCount가 0 이면) -> user_musical -> musical
      const musical_id = existingMusical[0].id;

      // numbers 삭제
      const [numbersDeleted] = await connection.execute(
        `DELETE FROM numbers WHERE musical_id = ?`,
        [musical_id]
      );
      console.log('Numbers deleted: ', numbersDeleted);

      // user_hashtag 삭제
      const [userHashtagDeleted] = await connection.execute(
        `
        DELETE FROM user_hashtag 
        WHERE musical_hashtag_id IN
          ( SELECT id FROM musical_hashtag WHERE musical_id = ? )`,
        [musical_id]
      );
      console.log('userMusicalDeleted: ', userHashtagDeleted);

      // musical_hashtag
      // 기존의 musical_hashtag 검색
      const [musical_hashtags_toDelete] = await connection.execute(
        `
        SELECT musical_hashtag.*, hashtags.*
        FROM musical_hashtag
        JOIN hashtags
        ON musical_hashtag.hashtag_id = hashtags.id
        WHERE musical_hashtag.musical_id = ?`,
        [musical_id]
      );
      console.log('musical_hashtag: ', musical_hashtags_toDelete);

      for (let musical_hashtag of musical_hashtags_toDelete) {
        // musical_hashtag 에서 삭제
        const { musical_id, hashtag_id, likeCount } = musical_hashtag;
        const [deletedMusicalHashtag] = await connection.execute(
          `DELETE FROM musical_hashtag WHERE musical_id = ? AND hashtag_id = ?`,
          [musical_id, hashtag_id]
        );
        console.log('deletedMusicalHashtag: ', deletedMusicalHashtag);

        // hashtag update
        await connection.execute(
          `
          UPDATE hashtags
          SET totalLikeCount = totalLikeCount - ?, musicalCount = musicalCount - 1
          WHERE hashtags.id = ?`,
          [likeCount, hashtag_id]
        );
        const [updated] = await connection.execute(
          `SELECT * FROM hashtags WHERE hashtags.id = ?`,
          [hashtag_id]
        );
        console.log('updated: ', updated[0]);
      }

      // hashtags 삭제(musicalCount가 0 이면)
      const [hashtagsDeleted] = await connection.query(
        `DELETE FROM hashtags WHERE musicalCount < 1`
      );
      console.log('hashtagsDeleted: ', hashtagsDeleted);

      // user_musical 삭제
      const [userMusicalDeleted] = await connection.execute(
        `DELETE FROM user_musical WHERE musical_id = ?`,
        [musical_id]
      );
      console.log('userMusicalDeleted: ', userMusicalDeleted);

      // musical 삭제
      const [musicalDeleted] = await connection.execute(
        `DELETE FROM musicals WHERE id = ?`,
        [musical_id]
      );
      console.log('Musical deleted: ', musicalDeleted);

      await connection.commit();

      res.status(200).send({ message: 'ok' });
    } catch (err) {
      console.log(err);
      await connection.rollback();
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
};
