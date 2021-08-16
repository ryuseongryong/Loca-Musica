const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = checkAccessToken(req);

    // access Token을 검증해서 없거나 만료되었으면 클라에서 auth로 req를 보냄
    try {
      if (!accessTokenData) {
        res.status(401).send({ message: 'invalid access token' });
      } else {
        res.cookie('accessToken', 'accessToken', {
          httpOnly: true,
          maxAge: 1000,
          secure: false,
          sameSite: 'None',
        });
        res.cookie('refreshToken', 'refreshToken', {
          httpOnly: true,
          maxAge: 1000,
          secure: false,
          sameSite: 'None',
        });

        res.status(200).json({ data: accessTokenData[0], message: 'ok' });
      }
    } catch (err) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
