const { getPool } = require('../../db');
// search?hashtag1=abc&hashtag2=def&hashtag3=ghi

module.exports = {
  get: async (req, res) => {
    const db = await getPool();
    console.log('hashtag.js pool: ', db);
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
    await connection.commit();
    connection.release();

    if (category1Data.length === 0 || category2Data.length === 0) {
      return res.status(404).send({ message: 'no match' });
    }

    // console.log('req.query: ', req.query);
    // return res.send('end');
    try {
      if (Object.keys(req.query).length === 0) {
        res
          .status(200)
          .json({ data: { category1Data, category2Data, hashtagsData } });
      } else res.status(404).send({ message: 'no match somethings wrong!' });
    } catch (err) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
