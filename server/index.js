const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = require('./router');
require('dotenv').config();

const app = express();
const port = 80;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // 실제 배포시에는 localhost 삭제
    origin: ['https://loca-musica.com', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);

// 각종 라우팅 설정하기

app.get('/', (req, res) => {
  res.send('hello! This is loca-musica');
});

app.use('/', router);

// app.post('/signup', signup);
// app.post('/signin', signin.post);
// app.get('/signin', signin.get);
// app.get('/signout', signout);
// app.get('/auth', auth);
// app.post('/mypage', mypage);
// app.post('/oauth', oauth.post);
// app.post('/post', post);
// app.get('/explore', explore.get);
// app.post('/postlist', postlist);

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
