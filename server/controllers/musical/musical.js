// main 응답을 같이 줄 수 있으면 여기다가 만들고 API 수정하면 됨
// musical OR musical/main
const db = require('../../db');

module.exports = {
  // musical/:title
  clickMusical: async (req, res) => {
    const { title } = req.params;

    try {
      const connection = await db.getConnection(async (conn) => conn);
      connection.beginTransaction();

      const [musicalData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );
      if (Object.keys(req.params).length === 0 || musicalData.length === 0) {
        return res.status(404).send({ message: 'musical not found' });
      }
      const musicalId = musicalData[0].id;

      const [hashtagsData] = await connection.execute(
        `SELECT hashtags.name, musical_hashtag.likeCount, hashtags.totalLikeCount, hashtags.musicalCount FROM ((hashtags INNER JOIN musical_hashtag ON hashtags.id = musical_hashtag.hashtag_id) INNER JOIN musicals ON musicals.id = ?)`,
        [musicalId]
      );

      const [numbersData] = await connection.execute(
        `select numbers.id, numbers.title, numbers.videoId from (numbers inner join musicals on musicals.id = ?)`,
        [musicalId]
      );
      connection.commit();
      connection.release();

      const data = { ...musicalData[0], numbersData, hashtagsData };
      // console.log(data);
      if (Object.keys(data).length !== 0) {
        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
  // musical?title="wikid"
  searchByTitle: async (req, res) => {
    const { title } = req.query;
    try {
      console.log(Object.keys(req.query).length);

      const connection = await db.getConnection(async (conn) => conn);
      connection.beginTransaction();

      const [musicalData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );
      if (Object.keys(req.query).length === 0 || musicalData.length === 0) {
        return res.status(404).send({ message: 'not found' });
      }

      const musicalId = musicalData[0].id;
      console.log(musicalData, musicalId);

      connection.commit();
      connection.release();

      const data = { ...musicalData[0] };
      // console.log(data);

      if (Object.keys(data).length !== 0) {
        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
