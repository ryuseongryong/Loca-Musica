const { checkAccessToken } = require('../tokenFunctions');
const { getPool } = require('../../db');

module.exports = {
  post: async (req, res) => {
    //const accessTokenData = checkAccessToken(req);

    // Access token 이 없거나 유효하지 않은 경우 종료
    // if (!accessTokenData){
    //   return res.status(401).send({ message: 'invalid access token' });
    // }

    try {
      // const {admin} = accessTokenData;

      // Admin 이 아닌 경우 종료
      // if (!admin){
      //   return res.status(403).send({message: "not admin"})
      //}

      const db = await getPool();
      const connection = await db.getConnection(async (conn) => conn);
      await connection.beginTransaction();

      console.log('request body: ', req.body);
      const {
        code,
        title,
        thumbnail,
        contents,
        state,
        actors,
        hashtags,
        numbers,
      } = req.body;

      // musical 검색
      const [existingMusical] = await connection.execute(
        `SELECT * FROM musicals WHERE code = ?`,
        [code]
      );
      console.log('existing musical: ', existingMusical[0]);

      // 이미 등록된 뮤지컬일 경우 종료
      if (existingMusical[0]) {
        return res.status(409).send({ message: 'duplicate musical' });
      }

      // musical 등록
      let [created] = await connection.execute(
        `INSERT INTO musicals (code, title, thumbnail, contents, state, actors) VALUES (?, ?, ?, ?, ?, ?)`,
        [code, title, thumbnail, contents, state, actors]
      );
      const musical_id = created.insertId;
      const [postedMusical] = await connection.execute(
        `SELECT * from musicals WHERE id = ?`,
        [musical_id]
      );
      console.log('created musical: ', postedMusical[0]);
      delete postedMusical[0].id;

      // numbers 등록
      if (numbers) {
        for (let number of numbers) {
          const { title, videoId } = number;
          let [created] = await connection.execute(
            `INSERT INTO numbers (musical_id, title, videoId) VALUES (?, ?, ?)`,
            [musical_id, title, videoId]
          );
          const [editedNumber] = await connection.execute(
            `SELECT * FROM numbers WHERE id = ?`,
            [created.insertId]
          );
          console.log('Created number: ', editedNumber[0]);
        }
      }

      // hashtag 등록
      if (hashtags) {
        for (let i = 0; i < hashtags.length; i++) {
          let hashtag, hashtag_id;

          // 이미 등록된 hashtag 인지 검색
          [hashtag] = await connection.execute(
            `SELECT * from hashtags WHERE name = ?`,
            [hashtags[i]]
          );

          // 이미 등록된 hashtag 라면 musicalCount + 1, totalLikeCount + 1
          if (hashtag[0]) {
            console.log('existing hashtag: ', hashtag[0]);

            await connection.execute(`
              UPDATE hashtags 
              SET musicalCount = musicalCount + 1, totalLikeCount = totalLikeCount + 1
              WHERE name = ?`,
              [hashtags[i]]
            );

            // hashtag 변수를 Update 된 hashtag 로 갱신
            [hashtag] = await connection.execute(
              `SELECT * from hashtags WHERE name = ?`,
              [hashtags[i]]
            );
          }
          // 해당 hashtag 가 등록되지 않았다면 등록
          else {
            await connection.execute(`INSERT INTO hashtags (name) VALUES (?)`, [
              hashtags[i],
            ]);

            [hashtag] = await connection.execute(
              `SELECT * FROM hashtags WHERE name = ?`,
              [hashtags[i]]
            );
            console.log('created hashtag: ', hashtag[0]);
          }

          hashtag_id = hashtag[0].id;

          // musical_hashtag 등록(musical 에 hashtag 부여)
          await connection.execute(
            `INSERT INTO musical_hashtag (hashtag_id, musical_id) VALUES (?, ?)`,
            [hashtag_id, musical_id]
          );
          const [created_musical_hashtag] = await connection.execute(
            `SELECT * FROM musical_hashtag WHERE hashtag_id = ? AND musical_id = ? `,
            [hashtag_id, musical_id]
          );
          console.log('created_musical_hashtag: ', created_musical_hashtag[0]);
        }
      }

      const [arrNumberData] = await connection.execute(
        `SELECT * FROM numbers WHERE musical_id = ?`,
        [musical_id]
      );

      const [arrHashtagData] = await connection.execute(
        `
        SELECT hashtags.name, musical_hashtag.likeCount, hashtags.totalLikeCount, hashtags.musicalCount
        FROM hashtags
        JOIN musical_hashtag
        ON musical_hashtag.hashtag_id = hashtags.id
        WHERE musical_hashtag.musical_id = ?`,
        [musical_id]
      );

      await connection.commit();

      const data = {
        ...postedMusical[0],
        numbers: arrNumberData,
        hashtags: arrHashtagData,
      };
      console.log(data);

      res.status(201).json({ data: data, message: 'created' });
    } catch (err) {
      console.log(err);
      await connection.rollback();
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
};
