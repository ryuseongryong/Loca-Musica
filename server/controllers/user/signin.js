const db = require('../../db');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  checkAccessToken,
} = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;

    const connection1 = await db.getConnection(async (conn) => conn);
    const connection2 = await db.getConnection(async (conn) => conn);
    const connection3 = await db.getConnection(async (conn) => conn);

    connection1.beginTransaction();
    connection2.beginTransaction();
    connection3.beginTransaction();

    // 이메일과 비밀번호를
    let [userData] = await connection1.query(
      `SELECT * FROM users WHERE email = "${email}"`
    );
    connection1.commit();
    connection1.destroy();

    if (userData.length === 0) {
      res.status(404).send({ message: 'invalid email' });
    } else if (userData[0].password !== password) {
      res.status(404).send({ message: 'invalid password' });
    } else if (userData.length !== 0 && userData[0].password === password) {
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

      res.status(200).json({ data: userData[0], message: 'ok' });
    } else {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
