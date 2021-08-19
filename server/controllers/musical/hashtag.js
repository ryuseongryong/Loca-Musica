// 뮤지컬 상세페이지에서 해시태그 등록하기
const db = require('../../db');
const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    const { title, hashtag } = req.body;

    if (!accessTokenData) {
      return res.status(401).send({ message: 'invalid access token' });
    }
    if (!title || !hashtag) {
      return res
        .status(422)
        .send({ message: 'insufficient data information!' });
    }

    const connection = await db.getConnection(async (conn) => conn);
    await connection.beginTransaction();
    try {
      const [musicalData] = await connection.execute(
        `SELECT id FROM musicals WHERE title = ?`,
        [title]
      );
      await connection.commit();
      connection.release();
      const musicalId = musicalData[0].id;

      //! hashtag 등록
      // 이미 등록된 hashtag 인지 검색
      const [existedHashtagData] = await connection.execute(
        `SELECT * from hashtags WHERE name = ?`,
        [hashtag]
      );
      await connection.commit();
      connection.release();
      // 이미 등록된 hashtag 라면 musicalCount + 1, totalLikeCount + 1
      if (existedHashtagData.length !== 0) {
        const hashtagId = existedHashtagData[0].id;
        await connection.execute(
          `
              UPDATE hashtags 
              SET musicalCount = musicalCount + 1, totalLikeCount = totalLikeCount + 1
              WHERE name = ?`,
          [hashtag]
        );
        await connection.commit();
        connection.release();
        // 해당 musical의 hashtag likeCount를 1 증가
        await connection.execute(
          `UPDATE musical_hashtag SET likeCount = likeCount + 1 WHERE hashtag_id = ? AND musical_id = ?`,
          [hashtagId, musicalId]
        );
        await connection.commit();
        connection.release();
      }
      // 해당 hashtag 가 등록되지 않았다면 등록
      else if (existedHashtagData.length === 0) {
        const [insertNew] = await connection.execute(
          `INSERT INTO hashtags (name) VALUES (?)`,
          [hashtag]
        );
        await connection.commit();
        connection.release();
        const hashtagId = insertNew.insertId;
        // musical_hashtag 등록(musical 에 hashtag 부여)
        await connection.execute(
          `INSERT INTO musical_hashtag (hashtag_id, musical_id) VALUES (?, ?)`,
          [hashtagId, musicalId]
        );
        await connection.commit();
        connection.release();
      }
      const [updatedHashtagData] = await connection.execute(
        `SELECT * FROM hashtags WHERE name = ?`,
        [hashtag]
      );
      await connection.commit();
      connection.release();

      const [HashtagsData] = await connection.execute(
        `
              SELECT hashtags.name, musical_hashtag.likeCount, hashtags.totalLikeCount, hashtags.musicalCount
              FROM hashtags
              JOIN musical_hashtag
              ON musical_hashtag.hashtag_id = hashtags.id
              WHERE musical_hashtag.musical_id = ?`,
        [musicalId]
      );
      await connection.commit();
      connection.release();

      res.status(201).json({
        data: {
          updatedHashtagData,
          HashtagsData,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
