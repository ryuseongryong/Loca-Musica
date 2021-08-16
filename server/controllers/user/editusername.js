const db = require('../../db');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  checkAccessToken,
} = require('../tokenFunctions');

module.exports = {
  patch: async (req, res) => {
    // cookie에 담겨있는 access token을 확인하고
    // access token이 유효하지 않으면 refresh token으로 보낸다.
    const accessTokenData = checkAccessToken(req);
    // access Token을 검증해서 없거나 만료되었으면 클라에서 auth로 req를 보냄
    // 새로운 access Token 발급
    // ! Refresh Token을 DB에 저장하고, 대조하는 작업 필요한 듯
    // ! Token을 클라이언트에서 검증하는 방법도 토큰의 만료 시간을 정보로 보내주고 이용하는 방법도 있는듯 : accessTokenData.exp
    try {
      if (!accessTokenData) {
        res.status(401).send({ message: 'invalid access token' });
      }
      //! 사용자 이름은 중복 가능하게 만든다??
      const { id, email, profile, resign, admin } = accessTokenData;
      const { newUsername } = req.body;

      const connection1 = await db.getConnection(async (conn) => conn);
      const connection2 = await db.getConnection(async (conn) => conn);
      const connection3 = await db.getConnection(async (conn) => conn);

      connection1.beginTransaction();
      connection2.beginTransaction();
      connection3.beginTransaction();

      const [userData] = await connection1.execute(
        `SELECT * from users WHERE id = ?`,
        [id]
      );
      connection1.commit();

      const [conflictCheck] = await connection2.execute(
        `SELECT username from users`
      );
      connection2.commit();

      console.log('conflictCheck is ', conflictCheck);

      if (userData.length === 0) {
        connection1.release();
        res.status(404).send({ message: 'user not found' });
      }
      //! username 중복 방지
      else if (conflictCheck.some((user) => user.username === newUsername)) {
        // username이 이미 있는 경우 새로운 비밀번호 적용
        connection1.release();
        res.status(409).send({ message: 'username conflict' });
      } else {
        // username을 수정
        await connection1.execute(
          `UPDATE users SET username = ? WHERE users.id = ?`,
          [newUsername, id]
        );
        const [newUsernameUserData] = await connection1.execute(
          `SELECT * from users WHERE id = ?`,
          [id]
        );
        connection1.commit();
        connection1.release();

        const { username } = newUsernameUserData[0];

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

        // username 수정 완료
        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
