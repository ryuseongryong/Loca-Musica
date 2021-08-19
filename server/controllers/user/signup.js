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
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!username || !email || !hashedPassword) {
      return res.status(422).send({ message: 'input empty' });
    }
    const connection1 = await db.getConnection(async (conn) => conn);
    await connection1.beginTransaction();

    try {
      // 이메일과 비밀번호를
      let [userData] = await connection1.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );  
      await connection1.commit();
      if (userData[0]) {
        connection1.release();
        return res.status(409).send({ message: 'email conflict' });
      } else {
        const [create] = await connection1.execute(
          `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
          [email, hashedPassword, username]
        );
        await connection1.commit();

        const [newUserData] = await connection1.execute(
          `SELECT * FROM users WHERE email = ?`,
          [email]
        );
        await connection1.commit();
        connection1.release();

        const { id, profile, resign, admin, kakao } = newUserData[0];

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

        const data = { id, email, username, profile, resign, admin, kakao };

        res.status(201).json({ data: data, message: 'signup success' });
      }
    } catch (err) {
      connection1.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
