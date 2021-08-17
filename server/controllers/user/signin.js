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
      const connection1 = await db.getConnection(async (conn) => conn);

      connection1.beginTransaction();

      // 이메일과 비밀번호를
      let [userData] = await connection1.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );
      connection1.commit();
      connection1.release();
      const match = await bcrypt.compare(password, userData[0].password);

      if (userData.length === 0) {
        res.status(404).send({ message: 'invalid email' });
      } else if (!match) {
        res.status(404).send({ message: 'invalid password' });
      } else if (userData[0].resign === 1) {
        res.status(404).send({ message: 'resigned user!' });
      } else {
        // Access Token 발급
        const { id, email, username, profile, resign, admin } = userData[0];

        const accessToken = generateAccessToken({
          id,
          username,
          email,
          profile,
          resign,
          admin,
        });

        const refreshToken = generateRefreshToken({
          id,
          username,
          email,
          profile,
          resign,
          admin,
        });

        // send Token
        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);

        const data = { id, email, username, profile, resign, admin };
        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
