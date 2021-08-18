const db = require('../../db');

module.exports = {
  delete: async (req, res) => {
     //const accessTokenData = checkAccessToken(req);

    // Access token 이 없거나 유효하지 않은 경우 종료
    // if (!accessTokenData){
    //   res.status(401).send({ message: 'invalid access token' });
    //   return;
    // }
    
    const connection = await db.getConnection(async (conn) => conn);
    connection.beginTransaction();
    
    try {
      // const {admin} = accessTokenData;

      // Admin 이 아닌 경우 종료
      // if (!admin){
      //   connection.release();
      //   res.status(403).send({message: "not admin"})
      //   return;
      //}

      const musical_id = req.params.id;
      console.log("musical_id: ", musical_id)

      const [existingMusical] = await connection.execute(
        `SELECT * FROM musicals WHERE id = ?`,
        [musical_id]
      )
      console.log("existingMusical: ", existingMusical)

      if (!existingMusical[0]){
        res.status(404).send({message: "musical not found"})
        return;
      }

      // 삭제 순서: (user_number) -> numbers -> user_hashtag -> musical_hashtag -> hashtags(musicalCount가 0 이면) -> user_musical -> musical

      // numbers 삭제
      const [numbersDeleted] = await connection.execute(
        `DELETE FROM numbers WHERE musical_id = ?`,
        [musical_id]
      )
      console.log("Numbers deleted: ", numbersDeleted)

      // user_hashtag 삭제
      // const [userHashtagDeleted] = await connection.execute(
      //   `DELETE FROM user_hashtag WHERE musical_hashtag_id = ?`,
      //   [musical_id]
      // )
      // console.log("userMusicalDeleted: ", userHashtagDeleted);

      // musical_hashtag
      // 기존의 musical_hashtag 검색
      const [musical_hashtags_toDelete] = await connection.execute(`
        SELECT musical_hashtag.*, hashtags.*
        FROM musical_hashtag
        JOIN hashtags
        ON musical_hashtag.hashtag_id = hashtags.id
        WHERE musical_hashtag.musical_id = ?`,
        [musical_id]
      )
      console.log("musical_hashtag: ", musical_hashtags_toDelete);

      for (let musical_hashtag of musical_hashtags_toDelete) {
        // musical_hashtag 에서 삭제
        const {musical_id, hashtag_id, likeCount} = musical_hashtag;
        const [deletedMusicalHashtag] = await connection.execute(
          `DELETE FROM musical_hashtag WHERE musical_id = ? AND hashtag_id = ?`,
          [musical_id, hashtag_id]
        )
        console.log("deletedMusicalHashtag: ", deletedMusicalHashtag)

        // hashtag update
        await connection.execute(`
          UPDATE hashtags
          SET totalLikeCount = totalLikeCount - ?, musicalCount = musicalCount - 1
          WHERE hashtags.id = ?`,
          [likeCount, hashtag_id]
        )
        const [updated] = await connection.execute(
          `SELECT * FROM hashtags WHERE hashtags.id = ?`,
          [hashtag_id]
        )
        console.log("updated: ", updated[0])
      }

      // hashtags 삭제(musicalCount가 0 이면)
      const [hashtagsDeleted] = await connection.query(
        `DELETE FROM hashtags WHERE musicalCount < 1`
      )
      console.log("hashtagsDeleted: ", hashtagsDeleted)

      // user_musical 삭제
      const [userMusicalDeleted] = await connection.execute(
        `DELETE FROM user_musical WHERE musical_id = ?`,
        [musical_id]
      )
      console.log("userMusicalDeleted: ", userMusicalDeleted)

      // musical 삭제
      const [musicalDeleted] = await connection.execute(
        `DELETE FROM musicals WHERE id = ?`,
        [musical_id]
      )
      console.log("Musical deleted: ", musicalDeleted)
      
      connection.commit();
      connection.release();

      res.status(200).send({message: "ok"})
    } catch (err) {
      connection.release();
      res.status(500).send({message: "internal server error"})
    }
  }
};
