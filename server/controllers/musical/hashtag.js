// 뮤지컬 상세페이지에서 해시태그 등록하기
const { getPool } = require('../../db');
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
    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    await connection.beginTransaction();
    try {
      const [musicalData] = await connection.execute(
        `SELECT id FROM musicals WHERE title = ?`,
        [title]
      );
      await connection.commit();
      connection.release();
      const userId = accessTokenData.id;
      const musicalId = musicalData[0].id;

      //! hashtag 등록
      // 동일한 사용자의 동일한 해시태그 중복등록은 클라이언트에서 막아줌
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

        // user_hashtag에 등록
        const [musicalHashtagIdData] = await connection.execute(
          `SELECT id FROM musical_hashtag WHERE hashtag_id = ? AND musical_id = ?`,
          [hashtagId, musicalId]
        );
        await connection.commit();
        connection.release();

        const musicalHashtagId = musicalHashtagIdData[0].id;

        await connection.execute(
          `INSERT IGNORE INTO user_hashtag (user_id, musical_hashtag_id) VALUES (?, ?)`,
          [userId, musicalHashtagId]
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

        // user_hashtag에 등록
        const [musicalHashtagIdData] = await connection.execute(
          `SELECT id FROM musical_hashtag WHERE hashtag_id = ? AND musical_id = ?`,
          [hashtagId, musicalId]
        );
        await connection.commit();
        connection.release();

        const musicalHashtagId = musicalHashtagIdData[0].id;

        await connection.execute(
          `INSERT IGNORE INTO user_hashtag (user_id, musical_hashtag_id) VALUES (?, ?)`,
          [userId, musicalHashtagId]
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

      const [hashtagsData] = await connection.execute(
        `SELECT DISTINCT musical_hashtag.id, hashtags.name, musical_hashtag.likeCount, hashtags.totalLikeCount, hashtags.musicalCount FROM ((hashtags INNER JOIN musical_hashtag ON hashtags.id = musical_hashtag.hashtag_id) INNER JOIN musicals ON musical_hashtag.musical_id = ?)`,
        [musicalId]
      );
      await connection.commit();
      connection.release();

      const [userHashtagUpdatedData] = await connection.execute(
        `SELECT users.username, users.profile, users.email, musicals.title, hashtags.name FROM ( ( ( users INNER JOIN user_hashtag ON users.id = user_hashtag.user_id ) INNER JOIN musical_hashtag ON user_hashtag.musical_hashtag_id = musical_hashtag.id) INNER JOIN hashtags ON hashtag_id = hashtags.id) INNER JOIN musicals ON musical_hashtag.musical_id = musicals.id WHERE user_hashtag.user_id = ? AND musicals.id = ?`,
        [userId, musicalId]
      );

      const [musicalHashtagData] = await connection.execute(
        `SELECT musical_hashtag.id, musicals.title FROM musical_hashtag INNER JOIN musicals ON musicals.id = ?`,
        [musicalId]
      );

      for (let i = 0; i < hashtagsData.length; i++) {
        hashtagsData[i].userInfo = [];
      }

      const userHashtag = [];
      for (let i = 0; i < musicalHashtagData.length; i++) {
        const [userHashtagData] = await connection.execute(
          `SELECT musical_hashtag.id, hashtags.name, users.username, users.profile FROM ((users INNER JOIN user_hashtag ON users.id = user_hashtag.user_id) INNER JOIN musical_hashtag ON musical_hashtag.id = user_hashtag.musical_hashtag_id) INNER JOIN hashtags ON musical_hashtag.hashtag_id = hashtags.id WHERE musical_hashtag.id = ?`,
          [musicalHashtagData[i].id]
        );
        if (userHashtagData.length !== 0) {
          userHashtag.push(userHashtagData);
          for (let j = 0; j < hashtagsData.length; j++) {
            for (let k = 0; k < userHashtagData.length; k++) {
              if (hashtagsData[j].id === userHashtagData[k].id) {
                hashtagsData[j].userInfo.push({
                  username: userHashtagData[k].username,
                  profile: userHashtagData[k].profile,
                });
              }
            }
          }
        }
      }

      res.status(201).json({
        data: {
          updatedHashtagData,
          userHashtagUpdatedData,
          hashtagsData,
          userHashtag,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
  delete: async (req, res) => {
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
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
