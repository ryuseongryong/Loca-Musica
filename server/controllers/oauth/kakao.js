const axios = require('axios')
require('dotenv').config();

module.exports = {
  post: (req, res) => {
    const authorizationCode = req.body.code;
    console.log('authorizationCode :', authorizationCode)
    if (!authorizationCode) {
      res.status(401).send({ message: 'no authorization code' });
    }
    //try {
      //res.send({message:"ok"})
      console.log(
        'client_id:', process.env.KAKAO_CLIENT_ID,
        'redirect_uri:', process.env.KAKAO_REDIRECT_URI,
      )
      axios({
        method:'post',
        url:'https://kauth.kakao.com/oauth/token',
        headers:{
          "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
        },
        params: {
          grant_type: 'authorization_code',
          client_id: '4ac93d8079f2bf758e69a637619310d1',
          redirect_uri: 'http://localhost:3000/user/signin',
          code: authorizationCode,
        }
      })
      .then(res1 => {
        console.log('kakaouser: ', res1);
        res.send({message:"ok"})
      })
      .catch(err => {
        console.log("error!!!!!!")
        throw(err)
      })
    //}
    // catch (err) {
    //   throw(err)
    // }
  },
};
