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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(422).send({ message: 'input empty' });
    }

    try {
      console.log(req.body);
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

      if (userData[0]) {
        res.status(409).send({ message: 'email conflict' });
      } else {
        const [create] = await connection2.query(
          `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
          [email, password, username]
        );
        connection2.commit();
        connection2.release();

        const [newUserData] = await connection2.query(
          `SELECT * FROM users WHERE email = "${email}"`
        );
        connection2.commit();
        connection2.destroy();

        const { id, profile, resign, admin } = newUserData[0];

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

        res
          .status(201)
          .json({ data: newUserData[0], message: 'signup success' });
      }
    } catch (err) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
