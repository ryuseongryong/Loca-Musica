require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = require('./router');
const fs = require("fs");
const https = require("https");

const app = express();
const port = 80;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // 실제 배포시에는 localhost 삭제
    origin: ['https://loca-musica.com', 'http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);

// 각종 라우팅 설정하기

app.get('/', (req, res) => {
  res.send('hello! This is loca-musica');
});

app.use('/', router);

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다. 
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.
let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(port, () => console.log("server runnning"));

} else {
  server = app.listen(port, () => {
    console.log(`서버가 ${port}번에서 작동중입니다.`);
  });
}
module.exports = server;
