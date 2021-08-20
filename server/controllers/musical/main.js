const { getPool } = require('../../db');
// musical/main
module.exports = {
  get: async (req, res) => {
    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    await connection.beginTransaction();

    try {
      const [allMusicalsData] = await connection.execute(
        `SELECT * FROM musicals`
      );
      const [allHashtagsData] = await connection.execute(
        `SELECT * FROM hashtags`
      );
      res
        .status(200)
        .json({ data: allMusicalsData, allHashtagsData, message: 'ok' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
