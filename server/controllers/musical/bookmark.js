const { getPool } = require('../../db');
const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    console.log('accessTokenData: ', accessTokenData);

    const { title } = req.body;
    if (!accessTokenData) {
      return res.status(401).send({ message: 'invalid access token' });
    }
    const { id } = accessTokenData;

    if (!title) {
      return res
        .status(422)
        .send({ message: 'insufficient data information!' });
    }

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);

    try {
      await connection.beginTransaction();
      const [musicalsData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );

      if (musicalsData.length === 0) {
        return res.status(404).send({ message: 'data not found' });
      }
      const musicalId = musicalsData[0].id;

      const input = await connection.execute(
        `INSERT IGNORE INTO user_musical (user_id, musical_id) VALUES (?, ?)`,
        [id, musicalId]
      );

      const [bookmarksData] = await connection.execute(
        `SELECT user_musical.id, musicals.title, musicals.thumbnail FROM (musicals INNER JOIN user_musical ON musicals.id = user_musical.musical_id) WHERE user_musical.user_id = ?`,
        [id]
      );

      const [updatedBookmarkData] = await connection.execute(
        `SELECT user_musical.id, musicals.title, musicals.thumbnail FROM (musicals INNER JOIN user_musical ON musicals.id = user_musical.musical_id) WHERE user_musical.user_id = ? AND user_musical.musical_id = ?`,
        [id, musicalId]
      );

      await connection.commit();
      res
        .status(200)
        .json({ data: { bookmarksData, updatedBookmarkData }, message: 'ok' });
    } catch (err) {
      console.log(err);
      await connection.rollback();
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
  delete: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    const { title } = req.params;
    console.log('accessTokenData: ', accessTokenData);

    if (!accessTokenData) {
      return res.status(401).send({ message: 'invalid access token' });
    }
    const { id } = accessTokenData;

    if (!title) {
      return res
        .status(422)
        .send({ message: 'insufficient data information!' });
    }

    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);
    try {
      await connection.beginTransaction();

      const [musicalsData] = await connection.execute(
        `SELECT * FROM musicals WHERE title = ?`,
        [title]
      );

      if (musicalsData.length === 0) {
        return res.status(404).send({ message: 'data not found' });
      }
      const musicalId = musicalsData[0].id;

      const [updatedBookmarkData] = await connection.execute(
        `SELECT user_musical.id, musicals.title, musicals.thumbnail FROM (musicals INNER JOIN user_musical ON musicals.id = user_musical.musical_id) WHERE user_musical.user_id = ? AND user_musical.musical_id = ?`,
        [id, musicalId]
      );

      const deleteBookmark = await connection.execute(
        `DELETE FROM user_musical WHERE user_id = ? AND musical_id = ?`,
        [id, musicalId]
      );

      const [bookmarksData] = await connection.execute(
        `SELECT user_musical.id, musicals.title, musicals.thumbnail FROM (musicals INNER JOIN user_musical ON musicals.id = user_musical.musical_id) WHERE user_musical.user_id = ?`,
        [id]
      );

      await connection.commit();
      res
        .status(200)
        .json({ data: { bookmarksData, updatedBookmarkData }, message: 'ok' });
    } catch (err) {
      console.log(err);
      await connection.rollback();
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
};
