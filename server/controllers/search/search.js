const db = require('../../db');
// search?hashtag1=abc&hashtag2=def&hashtag3=ghi

module.exports = {
  get: async (req, res) => {
    const { hashtag1, hashtag2, hashtag3 } = req.query;

    const connection = await db.getConnection(async (conn) => conn);
    await connection.beginTransaction();

    const category1Query = [
      '드라마',
      '로맨스',
      '판타지',
      '코미디',
      '역사',
      '스릴러',
      '가족',
    ];
    const category2Query = [
      '혼자',
      '연인과함께',
      '가족과함께',
      '친구와함께',
      '아이와함께',
      '동료와함께',
    ];

    const selectedQuery = [hashtag1, hashtag2, hashtag3];
    const [category1Data] = await connection.query(
      `SELECT * FROM hashtags WHERE name IN (?)`,
      [category1Query]
    );
    const [category2Data] = await connection.query(
      `SELECT * FROM hashtags WHERE name IN (?)`,
      [category2Query]
    );

    const [hashtagsData] = await connection.execute(
      `SELECT * FROM hashtags WHERE name LIKE '#%'`
    );

    const [selectedData] = await connection.query(
      `SELECT * FROM hashtags WHERE name IN (?)`,
      [selectedQuery]
    );
    if (category1Data.length === 0 || category2Data.length === 0) {
      connection.release();
      return res.status(404).send({ message: 'no match' });
    }
    await connection.commit();
    connection.release();

    const hashtagsId = selectedData.map((el) => el.id);

    console.log('req.query: ', req.query);
    // return res.send('end');
    try {
      if (Object.keys(req.query).length === 0) {
        await connection.commit();
        connection.release();
        res
          .status(200)
          .json({ data: { category1Data, category2Data, hashtagsData } });
      } else if (hashtag1 || hashtag2 || hashtag3) {
        const [musicalsData] = await connection.query(
          `SELECT DISTINCT musicals.id, musicals.title, musicals.thumbnail FROM (musicals INNER JOIN musical_hashtag ON musicals.id = musical_hashtag.musical_id) WHERE musical_hashtag.hashtag_id IN (?)`,
          [hashtagsId]
        );
        await connection.commit();
        connection.release();
        res.status(200).json({ data: musicalsData });
      } else res.status(404).send({ message: 'no match somethings wrong!' });
    } catch (err) {
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
