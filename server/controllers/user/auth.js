const db = require('../../db');
const {
  checkAccessToken,
  generateAccessToken,
  resendAccessToken,
  checkRefreshToken,
} = require('../tokenFunctions');

module.exports = {
  // 클라이언트에서 보낸 access token이 만료된 경우
  get: (req, res) => {
    const refreshTokenData = checkRefreshToken(req);
    const { id, username, email, profile, resign, admin, kakao } =
      refreshTokenData;

    console.log('rt: ', refreshTokenData);

    // refreshToken이 없거나 인증이 만료된 경우, 클라이언트에서 재로그인을 유저에게 안내해야 함
    if (!refreshTokenData) {
      res.status(401).send({ message: 'invalid refresh token' });
    } else {
      const accessTokenData = generateAccessToken({
        id,
        username,
        email,
        profile,
        resign,
        admin,
        kakao,
      });

      resendAccessToken(res, accessTokenData);
      res.status(200).json({ message: 'ok' });
    }
    // access

    // access Token이 만료된 유저에 대해서 refresh Token을 바탕으로 새로운 access Token을 발급해주고, 정상적인 사이트 운영이 가능하게 만들어주는 함수가 필요함.
  },
};
