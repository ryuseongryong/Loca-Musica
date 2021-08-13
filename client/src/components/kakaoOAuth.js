import axios from 'axios'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function KakaoLogin () {
    let history = useHistory()

  // Kakao 로그인 구현
  useEffect(async () => {
    const getAccessToken = authorizationCode => {
      axios
        .post(`${process.env.REACT_APP_END_POINT}/oauth/kakao`, {
          code: authorizationCode,
        })
        .then(res => {
          // console.log('카카오에 대한 응답', res);
          history.push('/musical/main')
        })
        .catch((err)=> {
          // console.log('카카오로그인에러', err)
        })
    }
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    // console.log('인증 코드', authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode)
    }
  },[])


    return (
        <></>
    )
}

export default KakaoLogin;