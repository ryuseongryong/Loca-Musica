const db = require('../../db');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  checkAccessToken,
} = require('../tokenFunctions');

const multer = require('multer');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

module.exports = {
  patch: async (req, res) => {
    // cookie에 담겨있는 access token을 확인하고
    // access token이 유효하지 않으면 refresh token으로 보낸다.
    const accessTokenData = checkAccessToken(req);
    // access Token을 검증해서 없거나 만료되었으면 클라에서 auth로 req를 보냄
    // 새로운 access Token 발급
    // ! Refresh Token을 DB에 저장하고, 대조하는 작업 필요한 듯
    // ! Token을 클라이언트에서 검증하는 방법도 토큰의 만료 시간을 정보로 보내주고 이용하는 방법도 있는듯 : accessTokenData.exp
    const connection1 = await db.getConnection(async (conn) => conn);
    connection1.beginTransaction();

    try {
      if (!accessTokenData) {
        res.status(401).send({ message: 'invalid access token' });
      }

      const { id, email, username, resign, admin, kakao } = accessTokenData;
      const { url, file } = req.body;

      const [userData] = await connection1.execute(
        `SELECT * from users WHERE id = ?`,
        [id]
      );
      connection1.commit();
      // DB에 저장된 비밀번호와 입력한 기존 비밀번호가 일치하는지 검토

      if (userData.length === 0) {
        connection1.release();
        res.status(404).send({ message: 'user not found' });
      } else {
        // 유저 정보가 있는 경우 새로운 profile url 적용
        //! url의 기준(??)이 충족되지 않는 경우는 클라에서 막음

        //! uploads to s3
        if (file) {
          const fileStream = fs.createReadStream(file.path);

          const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename,
          };

          const uploadFile = s3.upload(uploadParams).promise();
          console.log(uploadFile);
          return;
        }
        //! downloads from s3
        if (fileKey) {
          const downloadParams = {
            Key: fileKey,
            Bucket: bucketName,
          };
          const downldadFile = s3.getObject(downloadParams).createReadStream();

          redaStream;
        }

        await connection1.execute(
          `UPDATE users SET profile = ? WHERE users.id = ?`,
          [url, id]
        );
        const [newProfileUserData] = await connection1.execute(
          `SELECT * from users WHERE id = ?`,
          [id]
        );
        connection1.commit();
        connection1.release();

        const { profile } = newProfileUserData[0];

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

        res.status(200).json({ data: data, message: 'ok' });
      }
    } catch (err) {
      console.log(err);
      connection.release();
      res.status(500).send({ message: 'internal server error' });
    }
  },
};
