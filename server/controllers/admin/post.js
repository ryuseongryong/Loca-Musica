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
      const arrNumbersData = [];
      if (numbers) {
        for (let number of numbers) {
          const {title, videoId} = number;
          let [created] = await connection.execute(
            `INSERT INTO numbers (musical_id, title, videoId) VALUES (?, ?, ?)`,
            [musical_id, title, videoId]
          );
          const [editedNumber] = await connection.execute(
            `SELECT * FROM numbers WHERE id = ?`,
            [created.insertId]
          )
          console.log('Created number: ', editedNumber[0]);
          arrNumbersData.push(editedNumber[0]);
        }
      }

      // hashtag 등록
      const arrHashtagsData = [];

      if (hashtags) {
        for (let i = 0; i < hashtags.length; i++) {
          let hashtag, hashtag_id, name, likeCount, totalLikeCount, musicalCount;

          // 이미 등록된 hashtag 인지 검색
          [hashtag] = await connection.execute(
            `SELECT * from hashtags WHERE name = ?`,
            [hashtags[i]]
          );

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

          // 클라이언트에 보낼 hashtag data 정리
          name = hashtag[0].name
          likeCount = created_musical_hashtag[0].likeCount;
          totalLikeCount = hashtag[0].totalLikeCount
          musicalCount = hashtag[0].musicalCount

          const hashtagData = {name, likeCount, totalLikeCount, musicalCount};
          arrHashtagsData.push(hashtagData);
        }
      }

      connection.commit();
      connection.release();
      
      const data = {...postedMusical[0], numbers: arrNumbersData, hashtags: arrHashtagsData}
      console.log(data);

      res.status(201).json({ data: data, message: 'created' });
    } catch (err) {
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
