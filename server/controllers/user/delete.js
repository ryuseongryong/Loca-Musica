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
        res.status(401).send({ message: 'invalid access token' });
      }
      const { id, email, username, profile, admin, kakao } = accessTokenData;
      const { password } = req.body;

      const [userData] = await connection.execute(
        `SELECT * from users WHERE id = ?`,
        [id]
      );
      if (userData.length === 0) {
        return res.status(404).send({ message: 'user not found' });
      }

      if (userData[0].kakao === 1) {
        console.log(userData[0].kakao);
        await connection.execute(
          `UPDATE users SET resign = ? WHERE users.id = ?`,
          [1, id]
        );
        const [resignedUserData] = await connection.execute(
          `SELECT * from users WHERE id = ?`,
          [id]
        );
        if (resignedUserData.length === 0) {
          return res.status(404).send({ message: 'user not found' });
        }
        const { resign } = resignedUserData[0];

        // //! 30일이 지난 계정은 삭제 위치를 어디할지 고민
        // await connection.execute(
        //   `DELETE FROM users WHERE updated_at < NOW() - INTERVAL 30 DAY AND resign = 1;`
        // );
        // connection.commit();
        // connection.release();

        // Token 수정 = 바로 로그아웃 처리
        res.cookie('accessToken', 'please come back', {
          httpOnly: true,
          maxAge: 1000,
          secure: false,
          sameSite: 'None',
        });
        res.cookie('refreshToken', 'completed, bye!', {
          httpOnly: true,
          maxAge: 1000,
          secure: false,
          sameSite: 'None',
        });
        const data = { id, email, username, profile, resign, admin, kakao };

        await connection.commit();
        return res.status(200).json({ data: data, message: 'ok' });
      }

      const match = await bcrypt.compare(password, userData[0].password);
      // DB에 저장된 비밀번호와 입력한 기존 비밀번호가 일치하는지 검토
      if (!match) {
        res.status(401).send({ message: 'invalid password' });
      }
      // 탈퇴 시 resign의 값을 true로 변경
      await connection.execute(
        `UPDATE users SET resign = ? WHERE users.id = ?`,
        [1, id]
      );
      const [resignedUserData] = await connection.execute(
        `SELECT * from users WHERE id = ?`,
        [id]
      );

      if (resignedUserData.length === 0) {
        return res.status(404).send({ message: 'user not found' });
      }
      const { resign } = resignedUserData[0];
      // //! 30일이 지난 계정은 삭제 위치를 어디할지 고민
      // await connection.execute(
      //   `DELETE FROM users WHERE updated_at < NOW() - INTERVAL 30 DAY AND resign = 1;`
      // );
      // connection.commit();
      // connection.release();

      // Token 수정 = 바로 로그아웃 처리
      res.cookie('accessToken', 'please come back', {
        httpOnly: true,
        maxAge: 1000,
        secure: false,
        sameSite: 'None',
      });
      res.cookie('refreshToken', 'completed, bye!', {
        httpOnly: true,
        maxAge: 1000,
        secure: false,
        sameSite: 'None',
      });
      const data = { id, email, username, profile, resign, admin, kakao };

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
