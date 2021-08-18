const db = require('../../db');
const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    const { id } = accessTokenData;
    const { title } = req.body;

    try {
      if (!accessTokenData) {
        res.status(401).send({ message: 'invalid access token' });
      }
      const connection = await db.getConnection(async (conn) => conn);
      connection.beginTransaction();

      const [musicalData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );
      const musicalId = musicalData[0].id;
      if (title) {
        const input = await connection.execute(
          `INSERT IGNORE INTO user_musical (user_id, musical_id) VALUES (?, ?)`,
          [id, musicalId]
        );
        connection.commit();
        connection.release();

        res.status(200).json({ message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
  delete: async (req, res) => {
    // const accessTokenData = checkAccessToken(req);
    // const { id } = accessTokenData;
    const { title } = req.params;
    console.log(title);
  },
};
