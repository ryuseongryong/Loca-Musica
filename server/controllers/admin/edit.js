const db = require('../../db');

module.exports = {
  put: async (req, res) => {
    //const accessTokenData = checkAccessToken(req);

    // Access token 이 없거나 유효하지 않은 경우 종료
    // if (!accessTokenData)
    //   return res.status(401).send({ message: 'invalid access token' });

    try {
      // const {admin} = accessTokenData;

      // Admin 이 아닌 경우 종료
      // if (!admin){
      //   return res.status(403).send({message: "not admin"})
      //}

      const connection = await db.getConnection(async (conn) => conn);
      await connection.beginTransaction();

      console.log('body:, ', req.body);

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

      // musical 검색 (code 는 수정사항이 아니므로 code 로 검색)
      const [existingMusical] = await connection.execute(
        `SELECT * FROM musicals WHERE code = ?`,
        [code]
      );
      console.log('existing musical: ', existingMusical[0]);

      // 수정하고자 하는 뮤지컬이 없을 경우 종료
      if (!existingMusical[0]) {
        connection.release();
        return res.status(404).send({ message: 'musical not found' });
      }

      const musical_id = existingMusical[0].id;

      // 뮤지컬 정보 수정
      await connection.execute(
        `
        UPDATE musicals 
        SET 
          title = ?,
          thumbnail = ?,
          contents = ?,
          state = ?,
          actors = ?
        WHERE id = ?`,
        [title, thumbnail, contents, state, actors, musical_id]
      );
      const [editedMusical] = await connection.execute(
        `SELECT * FROM musicals WHERE id = ?`,
        [musical_id]
      );
      console.log('Edited musical:', editedMusical[0]);

      // number 수정
      if (numbers) {
        for (let number of numbers) {
          const { id, title, videoId } = number;
          await connection.execute(
            `UPDATE numbers SET title = ?, videoId = ? WHERE id = ?`,
            [title, videoId, id]
          );
          let [updated] = await connection.execute(
            `SELECT * FROM numbers WHERE id = ?`,
            [id]
          );
          console.log('Edited number: ', updated[0]);
        }
      }

      // hashtag 수정
      if (hashtags) {
        // 기존의 musical_hashtag 검색
        const [oldHashtags] = await connection.execute(
          `
          SELECT 
            musical_hashtag.id AS muscial_hashtag_id,
            musical_hashtag.hashtag_id,
            musical_hashtag.musical_id, 
            musical_hashtag.likeCount,
            hashtags.name,
            hashtags.totalLikeCount,
            hashtags.musicalCount
          FROM musical_hashtag
          JOIN hashtags
          ON musical_hashtag.hashtag_id = hashtags.id
          WHERE musical_hashtag.musical_id = ?`,
          [musical_id]
        );

        console.log('oldHashtags: ', oldHashtags);

        // 삭제할 hashtag 추출
        const arrHashtagToDelete = oldHashtags.filter((oldHashtag) => {
          for (let i = 0; i < hashtags.length; i++) {
            if (oldHashtag.name === hashtags[i]) return false;
          }
          return true;
        });
        console.log('arrHashtagToDelete: ', arrHashtagToDelete);

        // 추가할 hashtag 추출
        const arrHashtagToAdd = hashtags.filter((hashtag) => {
          for (let i = 0; i < oldHashtags.length; i++) {
            if (hashtag === oldHashtags[i].name) return false;
          }
          return true;
        });
        console.log('arrHashtagToAdd :', arrHashtagToAdd);

        // hashtag 삭제
        for (let delHashtag of arrHashtagToDelete) {
          const { muscial_hashtag_id, musical_id, hashtag_id, likeCount } =
            delHashtag;

          //user_hashtag 삭제
          const [userHashtagDeleted] = await connection.execute(
            `DELETE FROM user_hashtag WHERE musical_hashtag_id = ?`,
            [muscial_hashtag_id]
          );
          console.log('userMusicalDeleted: ', userHashtagDeleted);

          // musical_hashtag 에서 삭제
          await connection.execute(
            `DELETE FROM musical_hashtag WHERE musical_id = ? AND hashtag_id = ?`,
            [musical_id, hashtag_id]
          );

          // hashtag update
          await connection.execute(
            `
            UPDATE hashtags
            SET totalLikeCount = totalLikeCount - ?, musicalCount = musicalCount - 1
            WHERE hashtags.id = ?`,
            [likeCount, hashtag_id]
          );

          let [updated] = await connection.execute(
            `SELECT * FROM hashtags WHERE hashtags.id = ?`,
            [hashtag_id]
          );
          console.log('updated: ', updated[0]);
        }

        // musicalCount 가 0 이면 삭제
        let [deleted] = await connection.query(
          `DELETE FROM hashtags WHERE musicalCount < 1`
        );
        console.log('Deleted hashtags: ', deleted);

        // hashtag 추가
        for (let i = 0; i < arrHashtagToAdd.length; i++) {
          let hashtag, hashtag_id;

          // 이미 등록된 hashtag 인지 검색
          [hashtag] = await connection.execute(
            `SELECT * from hashtags WHERE name = ?`,
            [arrHashtagToAdd[i]]
          );
          console.log('existing hashtag: ', hashtag[0]);

          // 이미 등록된 hashtag 라면 id 를 가져오고, musicalCount + 1, totalLikeCount + 1
          if (hashtag[0]) {
            console.log('existing hashtag: ', hashtag[0]);
            hashtag_id = hashtag[0].id;
            await connection.execute(
              `
              UPDATE hashtags 
              SET musicalCount = musicalCount + 1, totalLikeCount = totalLikeCount + 1
              WHERE id = ?`,
              [hashtag_id]
            );

            // Update 된 hashtag 로 갱신
            [hashtag] = await connection.execute(
              `SELECT * from hashtags WHERE name = ?`,
              [arrHashtagToAdd[i]]
            );
          }
          // 해당 hashtag 가 등록되지 않았다면 등록하고 id 가져옴.
          else {
            let [created] = await connection.execute(
              `INSERT INTO hashtags (name) VALUES (?)`,
              [arrHashtagToAdd[i]]
            );
            hashtag_id = created.insertId;

            [hashtag] = await connection.execute(
              `SELECT * FROM hashtags WHERE id = ?`,
              [hashtag_id]
            );
            console.log('created hashtag: ', hashtag[0]);
          }

          // musical_hashtag 등록(musical 에 hashtag 부여)
          let [musical_hashtag] = await connection.execute(
            `INSERT INTO musical_hashtag (hashtag_id, musical_id) VALUES (?, ?)`,
            [hashtag_id, musical_id]
          );
          const [created_musical_hashtag] = await connection.execute(
            `SELECT * FROM musical_hashtag WHERE id = ?`,
            [musical_hashtag.insertId]
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
      connection.release();

      const data = {
        ...editedMusical[0],
        numbers: arrNumberData,
        hashtags: arrHashtagData,
      };
      console.log(data);

      res.status(200).json({ data: data, message: 'ok' });
    } catch (err) {
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
