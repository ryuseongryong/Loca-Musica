const db = require('../../db');
const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
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

      const { id } = accessTokenData;

      const connection1 = await db.getConnection(async (conn) => conn);
      const connection2 = await db.getConnection(async (conn) => conn);
      const connection3 = await db.getConnection(async (conn) => conn);

      connection1.beginTransaction();
      connection2.beginTransaction();
      connection3.beginTransaction();

      const [userData] = connection1.query(
        `SELECT * from users WHERE id = "${id}" AND password = "${password}"`
      );
      connection1.commit();

      if (userData.length === 0) {
        res.status(404).send({ message: 'user not found' });
      } else {
        // 유저 정보가 있는 경우
        const { newPassword, newProfile } = req.body;
        if (newPassword) {
          // 비밀번호를 수정하는 경우
          connection1.query(
            `UPDATE users SET password = "${newPassword}" WHERE users.id = "${id}"`
          );
          connection1.commit();
        }
        if (newProfile) {
          // 프로필 이미지를 수정하는 경우
          connection1.query(
            `UPDATE users SET profile = "${newProfile}" WHERE users.id = "${id}"`
          );
          connection1.commit();
        }
        // 유저 뮤지컬 북마크 정보
        connection2.query(``);
        // 유저가 등록한 해시태그 정보

        // 유저 정보가 잘 수정되었을 경우
        res.status(200).json({ message: 'ok' });
      }
    } catch (err) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
