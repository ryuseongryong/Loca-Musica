const { getPool } = require('../../db');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  checkAccessToken,
} = require('../tokenFunctions');
const bcrypt = require('bcrypt');

module.exports = {
  patch: async (req, res) => {
    // cookie에 담겨있는 access token을 확인하고
    // access token이 유효하지 않으면 refresh token으로 보낸다.
    const accessTokenData = checkAccessToken(req);
    // access Token을 검증해서 없거나 만료되었으면 클라에서 auth로 req를 보냄
    // 새로운 access Token 발급
    // ! Refresh Token을 DB에 저장하고, 대조하는 작업 필요한 듯
    // ! Token을 클라이언트에서 검증하는 방법도 토큰의 만료 시간을 정보로 보내주고 이용하는 방법도 있는듯 : accessTokenData.exp
    const db = await getPool();
    const connection = await db.getConnection(async (conn) => conn);

    try {
      await connection.beginTransaction();
      if (!accessTokenData) {
        return res.status(401).send({ message: 'invalid access token' });
      }
      const { id, email, username, profile, resign, admin, kakao } =
        accessTokenData;
      const { password, newPassword } = req.body;

      const [userData] = await connection.execute(
        `SELECT * from users WHERE id = ?`,
        [id]
      );

      if (userData.length === 0) {
        return res.status(404).send({ message: 'user not found' });
      }
      if (!password || !newPassword) {
        return res
          .status(422)
          .send({ message: 'insufficient data information!' });
      }
      const match = await bcrypt.compare(password, userData[0].password);

      if (userData[0].kakao === 1) {
        return res.status(404).send({ message: 'user not found' });
      } else if (!match) {
        return res.status(403).send({ message: 'invalid password' });
      }
      // 유저 정보가 있는 경우 새로운 비밀번호 적용
      // newPassword의 기준이 충족되지 않는 경우는 클라에서 막음
      // 비밀번호를 수정하는 경우
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      await connection.execute(
        `UPDATE users SET password = ? WHERE users.id = ?`,
        [hashedNewPassword, id]
      );

      // Access Token 발급

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

      // 비밀번호 수정 완료
      await connection.commit();
      res.status(200).json({ data: data, message: 'ok' });
    } catch (err) {
      console.log(err);
      await connection.rollback();
      res.status(500).send({ message: 'internal server error' });
    } finally {
      connection.release();
    }
  },
};
