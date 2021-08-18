const db = require('../../db');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  checkAccessToken,
} = require('../tokenFunctions');
const bcrypt = require('bcrypt');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;

    try {
      const connection = await db.getConnection(async (conn) => conn);

      await connection.beginTransaction();

      // 이메일과 비밀번호를
      const [userData] = await connection.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );
      const { id } = userData[0];

      const [bookmarksData] = await connection.execute(
        `SELECT user_musical.id, musicals.title, musicals.thumbnail FROM (musicals INNER JOIN user_musical ON musicals.id = user_musical.musical_id) WHERE user_musical.user_id = ?`,
        [id]
      );
      await connection.commit();
      connection.release();

      const match = await bcrypt.compare(password, userData[0].password);

      if (userData.length === 0) {
        res.status(404).send({ message: 'invalid email' });
      } else if (!match) {
        res.status(404).send({ message: 'invalid password' });
      } else if (userData[0].resign === 1) {
        res.status(404).send({ message: 'resigned user!' });
      } else {
        // Access Token 발급
        const { email, username, profile, resign, admin, kakao } = userData[0];

        const accessToken = generateAccessToken({
          id,
          username,
          email,
          profile,
          resign,
          admin,
          kakao,
        });

        const refreshToken = generateRefreshToken({
          id,
          username,
          email,
          profile,
          resign,
          admin,
          kakao,
        });

        // send Token
        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);

        const data = {
          id,
          email,
          username,
          profile,
          resign,
          admin,
          kakao,
          bookmarksData,
        };
        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
