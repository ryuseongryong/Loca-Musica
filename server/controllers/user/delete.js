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
      const { id, email, username, profile, admin } = accessTokenData;
      const { password } = req.body;

      const connection1 = await db.getConnection(async (conn) => conn);

      connection1.beginTransaction();

      const [userData] = await connection1.execute(
        `SELECT * from users WHERE id = ?`,
        [id]
      );
      connection1.commit();
      // DB에 저장된 비밀번호와 입력한 기존 비밀번호가 일치하는지 검토

      if (userData.length === 0) {
        connection1.release();
        res.status(404).send({ message: 'user not found' });
      } else if (userData[0].password !== password) {
        connection1.release();
        res.status(401).send({ message: 'invalid password' });
      } else {
        // 탈퇴 시 resign의 값을 true로 변경
        await connection1.execute(
          `UPDATE users SET resign = ? WHERE users.id = ?`,
          [1, id]
        );
        const [resignedUserData] = await connection1.execute(
          `SELECT * from users WHERE id = ?`,
          [id]
        );
        connection1.commit();
        connection1.release();

        // //! 30일이 지난 계정은 삭제 위치를 어디할지 고민
        // await connection1.execute(
        //   `DELETE FROM users WHERE updated_at < NOW() - INTERVAL 30 DAY AND resign = 1;`
        // );
        // connection1.commit();
        // connection1.release();

        // Token 수정 = 바로 로그아웃 처리
        res.cookie('accessToken', 'please come back', {
          httpOnly: true,
          maxAge: 1000,
          secure: true,
          sameSite: 'None',
        });
        res.cookie('refreshToken', 'completed, bye!', {
          httpOnly: true,
          maxAge: 1000,
          secure: true,
          sameSite: 'None',
        });
        const { resign } = resignedUserData[0];
        const data = { id, email, username, profile, resign, admin };

        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
