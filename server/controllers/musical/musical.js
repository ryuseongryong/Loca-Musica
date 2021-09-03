// main 응답을 같이 줄 수 있으면 여기다가 만들고 API 수정하면 됨
// musical OR musical/main
const { getPool } = require('../../db');

module.exports = {
  // musical/:title
  clickMusical: async (req, res) => {
    const { title } = req.params;

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    if (!title) {
      return res.status(404).send({ message: 'musical not found' });
    }

    try {
      const [musicalData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );

      if (Object.keys(req.params).length === 0 || musicalData.length === 0) {
        return res.status(404).send({ message: 'musical not found' });
      }
      const musicalId = musicalData[0].id;

      const [hashtagsData] = await connection.execute(
        `SELECT DISTINCT musical_hashtag.id, hashtags.name, musical_hashtag.likeCount, hashtags.totalLikeCount, hashtags.musicalCount FROM ((hashtags INNER JOIN musical_hashtag ON hashtags.id = musical_hashtag.hashtag_id) INNER JOIN musicals ON musical_hashtag.musical_id = ?)`,
        [musicalId]
      );

      const [numbersData] = await connection.execute(
        `SELECT DISTINCT numbers.id, numbers.title, numbers.videoId FROM (numbers INNER JOIN musicals ON numbers.musical_id = ?)`,
        [musicalId]
      );

      // musicalId를 바탕으로 해당 뮤지컬의 해시태그에 등록한 유저를 찾아내야함
      const [musicalHashtagData] = await connection.execute(
        `SELECT musical_hashtag.id, musicals.title FROM musical_hashtag INNER JOIN musicals ON musicals.id = ?`,
        [musicalId]
      );

      for (let i = 0; i < hashtagsData.length; i++) {
        hashtagsData[i].userInfo = [];
      }

      const userHashtags = [];
      for (let i = 0; i < musicalHashtagData.length; i++) {
        const [userHashtagData] = await connection.execute(
          `SELECT musical_hashtag.id, hashtags.name, users.email, users.username, users.profile FROM ((users INNER JOIN user_hashtag ON users.id = user_hashtag.user_id) INNER JOIN musical_hashtag ON musical_hashtag.id = user_hashtag.musical_hashtag_id) INNER JOIN hashtags ON musical_hashtag.hashtag_id = hashtags.id WHERE musical_hashtag.id = ?`,
          [musicalHashtagData[i].id]
        );
        if (userHashtagData.length !== 0) {
          for (let j = 0; j < hashtagsData.length; j++) {
            for (let k = 0; k < userHashtagData.length; k++) {
              if (hashtagsData[j].id === userHashtagData[k].id) {
                userHashtags.push({
                  email: userHashtagData[k].email,
                  username: userHashtagData[k].username,
                  profile: userHashtagData[k].profile,
                });
                hashtagsData[j].userInfo.push({
                  email: userHashtagData[k].email,
                  username: userHashtagData[k].username,
                  profile: userHashtagData[k].profile,
                });
              }
            }
          }
        }
      }
      const userHashtag = [];
      userHashtags.reduce(function (acc, cur) {
        if (acc.findIndex(({ email }) => email === cur.email) === -1) {
          acc.push(cur);
          userHashtag.push(cur);
        }
        return acc;
      }, []);

      const data = {
        ...musicalData[0],
        numbersData,
        hashtagsData,
        userHashtag,
      };

      if (Object.keys(data).length !== 0) {
        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
  // musical?title="wikid"
  searchByTitle: async (req, res) => {
    const { title } = req.query;

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);

    try {
      const [musicalData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );
      if (Object.keys(req.query).length === 0 || musicalData.length === 0) {
        return res.status(404).send({ message: 'not found' });
      }

      const data = { ...musicalData[0] };

      if (Object.keys(data).length !== 0) {
        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
};
