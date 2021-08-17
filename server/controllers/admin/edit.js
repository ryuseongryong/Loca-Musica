const db = require('../../db');

module.exports = {
  put: async (req, res) => {
    //const accessTokenData = checkAccessToken(req);

    // Access token 이 없거나 유효하지 않은 경우 종료
    // if (!accessTokenData)
    //   return res.status(401).send({ message: 'invalid access token' });

    const connection = await db.getConnection(async (conn) => conn);
    connection.beginTransaction();

    try {
      // const email = accessTokenData.email;
      // const [userData] = await connection.query(
      //   `SELECT * FROM users WHERE email = "${email}"`
      // );

      // Admin 이 아닌 경우 종료
      // if (!userData[0].admin){
      //   connection.release();
      //   return res.status(403).send({message: "not admin"})
      //}

      console.log("body:, ", req.body, "params :", req.params);
      const musical_id = req.params.id;
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
        `SELECT * FROM musicals WHERE id = ?`,
        [musical_id]
      );
      console.log('existing musical: ', existingMusical[0]);

      // 등록된 뮤지컬이 없을 경우 종료
      if (!existingMusical[0]) {
        connection.release();
        res.status(404).send({ message: 'musical not found' });
        return;
      }

      // 뮤지컬 정보 수정
      await connection.execute(`
        UPDATE musicals 
        SET 
          code = ?,
          title = ?,
          thumbnail = ?,
          contents = ?,
          state = ?,
          actors = ?
        WHERE id = ?`,
        [code, title, thumbnail, contents, state, actors, musical_id]
      );
      const [editedMusical] = await connection.execute(
        `SELECT * FROM musicals WHERE id = ?`,
        [musical_id]
      );
      console.log('Edited musical:', editedMusical[0]);

      // number 수정
      const arrNumbersData = [];
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
          arrNumbersData.push(updated[0]);
        }
      }

      // hashtag 수정
      const arrHashtagsData = [];

      if (hashtags) {
        const [oldHashtags] = await connection.execute(
          `SELECT * FROM musical_hashtag WHERE musical_id = ?`,
          [musical_id]
        )

        console.log("oldHashtags: ", oldHashtags);

        // const arrHashtagToDelete = oldHashtags.filter(oldhashtag => {
        //   return oldhashtag.hashtag_id !== hashtags.
        // })
        const arrHashtagToAdd = [];

        for (let i = 0; i < hashtags.length; i++) {
          let hashtag, hashtag_id, name, likeCount, totalLikeCount, musicalCount;

          // 새로운 hashtag 를 뮤지컬에 부여할 경우

          // 이미 등록된 hashtag 인지 검색
          [hashtag] = await connection.execute(
            `SELECT * from hashtags WHERE name = ?`,
            [hashtags[i]]
          );
          console.log('existing hashtag: ', hashtag[0]);

          // 이미 등록된 hashtag 라면 id 를 가져오고, musicalCount + 1, totalLikeCount + 1
          if (hashtag[0]) {
            console.log('existing hashtag: ', hashtag[0]);
            hashtag_id = hashtag[0].id;
            await connection.execute(`
              UPDATE hashtags 
              SET musicalCount = musicalCount + 1, totalLikeCount = totalLikeCount + 1
              WHERE id = ?`,
              [hashtag_id]  
            );
            
            // Update 된 hashtag 로 갱신
            [hashtag] = await connection.execute(
              `SELECT * from hashtags WHERE name = ?`,
              [hashtags[i]]
            );
          }
          // 해당 hashtag 가 등록되지 않았다면 등록하고 id 가져옴.
          else {
            let [created] = await connection.execute(
              `INSERT INTO hashtags (name) VALUES (?)`,
              [hashtags[i]]
              );
            hashtag_id = created.insertId;

            [hashtag] = await connection.execute(
              `SELECT * FROM hashtags WHERE id = ?`,
              [hashtag_id]
            )
            console.log("created hashtag: ", hashtag[0])
          }

          // musical_hashtag 등록(musical 에 hashtag 부여)
          let [musical_hashtag] = await connection.execute(
            `INSERT INTO musical_hashtag (hashtag_id, musical_id) VALUES (?, ?)`,
            [hashtag_id, musical_id]
          );
          const [created_musical_hashtag] = await connection.execute(
            `SELECT * FROM musical_hashtag WHERE id = ?`,
            [musical_hashtag.insertId]
          )
          console.log('created_musical_hashtag: ', created_musical_hashtag[0]);
        }
      }

      connection.commit();
      connection.release();

      const data = { ...editedMusical[0], numbers: arrNumbersData, hashtags: arrHashtagsData };
      console.log(data);

      res.status(200).json({ data: data, message: 'ok' });
    } catch (err) {
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
