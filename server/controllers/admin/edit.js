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

      console.log(req.body);
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

      // 등록된 뮤지컬이 없을 경우 종료
      if (!existingMusical[0]) {
        connection.release();
        res.status(404).send({ message: 'musical not found' });
        return;
      }

      const musical_id = existingMusical.id;
      // 뮤지컬 정보 수정
      let [updated] = await connection.execute(`
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
      console.log("edited :", editedMusical[0]);

      // numbers 가 있을 경우 number 의 id 로 기존 number 를 수정
      const allNumbers = [];
      if (numbers) {
        for (let number of numbers) {
          const {id, title, videoId} = number;
          let [edited] = await connection.execute(
            `UPDATE numbers SET title = ?, url = ? WHERE id = ?`,
            [title, videoId, id]
          );
          const [editedNumber] = await connection.execute(
            `SELECT * FROM numbers WHERE id = ?`,
            [edited.insertId]
          )
          console.log('Edited number: ', editedNumber[0]);
          allNumbers.push(editedNumber[0]);
        }
      }

      // hashtag 가 있을 경우 hashtag 수정
      // ...

      connection.commit();
      connection.release();

      const data = {...editedMusical, numbers: allNumbers, }
      console.log(data);

      res.status(200).json({data: data, message: "ok"});
    } catch (err) {
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
