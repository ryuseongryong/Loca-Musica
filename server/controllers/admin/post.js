const { checkAccessToken } = require('../tokenFunctions');
const db = require('../../db');

module.exports = {
  post: async (req, res) => {
    //const accessTokenData = checkAccessToken(req);

    // Access token 이 없거나 유효하지 않은 경우 종료
    // if (!accessTokenData){
    //   res.status(401).send({ message: 'invalid access token' });
    //   return;
    // }
    //   

    const connection = await db.getConnection(async (conn) => conn);
    connection.beginTransaction();

    try {
      // const {email} = accessTokenData;
      // console.log(req.body);
      // const email = req.body.email;

      // const [userData] = await connection.query(
      //   `SELECT * FROM users WHERE email = "${email}"`
      // );

      // Admin 이 아닌 경우 종료
      // if (!userData[0].admin){
      //   connection.release();
      //   res.status(403).send({message: "not admin"})
      //   return;
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

      // 이미 등록된 뮤지컬일 경우 종료
      if (existingMusical[0]) {
        connection.release();
        res.status(409).send({ message: 'duplicate musical' });
        return;
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
      console.log('created musical: ', postedMusical[0])

      // numbers 등록
      const postedNumbers = [];
      if (numbers) {
        for (let number of numbers) {
          const {title, videoId} = number;
          let [created] = await connection.execute(
            `INSERT INTO numbers (musical_id, title, url) VALUES (?, ?, ?)`,
            [musical_id, title, videoId]
          );
          const [postedNumber] = await connection.execute(
            `SELECT * FROM numbers WHERE id = ?`,
            [created.insertId]
          )
          console.log('Created number: ', postedNumber[0]);
          postedNumbers.push(postedNumber[0]);
        }
      }

      // hashtag 등록
      // if (hashtags) {
      //   for (let hashtag of hashtags) {
      //     const [existingHashtag] = await connection.query(
      //       `SELECT * from hashtags WHERE name = "${hashtag}"`
      //     );
      //     console.log('existing hashtag: ', existingHashtag[0]);

      //     // 해당 hashtag 가 등록되지 않았다면 등록
      //     let hashtag_id;
      //     if (existingHashtag[0]) {
      //       hashtag_id = existingHashtag[0].id;
      //     } else {
      //       const [createdHashtag] = await connection.query(
      //         `INSERT INTO hashtags (name, tagcount) VALUES (?, ?)`,
      //         [hashtag, 1]
      //       );
      //       hashtag_id = createdHashtag.insertId;
      //       console.log('Created hashtag id: ', hashtag_id);
      //     }

      //     // musical_hashtag 등록(musical 에 hashtag 부여)
      //     const [musical_hashtag] = await connection.query(
      //       `INSERT INTO musical_hashtag (hashtag_id, musical_id) VALUES (?, ?)`,
      //       [hashtag_id, musical_id]
      //     );
      //     console.log('musical_hashtag_id', musical_hashtag.insertId);
      //   }
      // }

      

      connection.commit();
      connection.release();
      
      const data = {...postedMusical, numbers: postedNumbers, }
      console.log(data);

      res.status(201).json({ data: data, message: 'created' });
    } catch (err) {
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
