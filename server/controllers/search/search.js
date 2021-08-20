const { getPool } = require('../../db');
// search?hashtag1=abc&hashtag2=def&hashtag3=ghi

module.exports = {
  get: async (req, res) => {
    const { hashtag1, hashtag2, hashtag3 } = req.query;

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    await connection.beginTransaction();

    const selectedQuery = [hashtag1, hashtag2, hashtag3];

    const [selectedData] = await connection.query(
      `SELECT * FROM hashtags WHERE name IN (?)`,
      [selectedQuery]
    );
    await connection.commit();
    connection.release();

    const hashtagsId = selectedData.map((el) => el.id);

    // console.log('req.query: ', req.query);
    // return res.send('end');
    try {
      if (hashtag1 || hashtag2 || hashtag3) {
        const [musicalsData] = await connection.query(
          `SELECT DISTINCT musicals.id, musicals.title, musicals.thumbnail FROM (musicals INNER JOIN musical_hashtag ON musicals.id = musical_hashtag.musical_id) WHERE musical_hashtag.hashtag_id IN (?)`,
          [hashtagsId]
        );
        await connection.commit();
        connection.release();
        res.status(200).json({ data: musicalsData, message: 'ok' });
      } else res.status(404).send({ message: 'no match somethings wrong!' });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
