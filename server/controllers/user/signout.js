const { checkAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const accessTokenData = checkAccessToken(req);
    if (!accessTokenData) {
      return res.status(401).send({ message: 'invalid access token' });
    }

    // access Token을 검증해서 없거나 만료되었으면 클라에서 auth로 req를 보냄
    try {
      res.cookie('accessToken', null, {
        httpOnly: true,
        maxAge: 1000,
        secure: true,
        sameSite: 'None',
      });
      res.cookie('refreshToken', null, {
        httpOnly: true,
        maxAge: 1000,
        secure: true,
        sameSite: 'None',
      });

      res.status(200).json({ message: 'ok' });
    } catch (err) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
