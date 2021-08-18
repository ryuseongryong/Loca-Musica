const axios = require('axios');
const db = require('../../db');
require('dotenv').config();
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const authorizationCode = req.body.code;
    // console.log('authorizationCode :', authorizationCode);

    // Kakao authorization code 가 없을 경우
    if (!authorizationCode) {
      res.status(401).send({ message: 'no authorization code' });
      return;
    }

    try {
      // Bring access token for kakao
      const kakaoToken = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code: authorizationCode,
        },
      });
      // console.log('kakaoToken: ', kakaoToken);

      // Bring kakao user info
      const kakaoUser = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: 'Bearer ' + kakaoToken.data.access_token,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      // console.log('kakaoUser: ', kakaoUser);

      // Extract user information
      const email = kakaoUser.data.kakao_account.email;
      const username = kakaoUser.data.kakao_account.profile.nickname;
      // console.log('profile: ', kakaoUser.data.kakao_account.profile);

      const { profile_image_url, thumbnail_image_url } =
        kakaoUser.data.kakao_account.profile;

      // DB connection open
      const connection = await db.getConnection(async (conn) => conn);
      await connection.beginTransaction();

      // Check email
      const [_userData] = await connection.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );
      let userData = _userData[0];
      // console.log('existing user data: ', userData);

      // Email 이 이미 존재할 경우: login 진행
      if (userData) {
        connection.release();

        const { id, username, email, profile, resign, admin } = userData;

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

        // console.log('a', accessToken, 'r', refreshToken);

        // send Token
        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);

        res.status(200).json({ data: userData, message: 'ok' });
        return;
      }

      // Email 이 존재하지 않았을 경우: 회원가입 진행
      // Kakao profile image 가 제공될 경우
      if (profile_image_url) {
        const [created] = await connection.execute(
          `INSERT INTO users (email, username, profile, kakao) VALUES (?, ?, ?, 1)`,
          [email, username, profile_image_url]
        );
        // console.log('created: ', created);
      }
      // 제공되지 않을 경우
      else {
        const [created] = await connection.execute(
          `INSERT INTO users (email, username, kakao) VALUES (?, ?, 1)`,
          [email, username]
        );
        // console.log('created: ', created);
      }

      const [_newUserData] = await connection.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );
      const newUserData = _newUserData[0];
      // console.log(newUserData);
      await connection.commit();
      connection.release();

      // Token 생성
      {
        const { id, username, email, profile, resign, admin, kakao } =
          newUserData;

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
        // Send token
        sendAccessToken(res, accessToken);
        sendRefreshToken(res, refreshToken);
        const data = { id, username, email, profile, resign, admin, kakao };
        // console.log(data);
        res.status(201).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      // console.log('Error!');
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
