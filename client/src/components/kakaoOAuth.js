/*eslint-disable*/

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, notify } from '../actions/index';

function KakaoLogin() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);
  const pathname = useSelector((state) => state.pathnameReducer.pathname);

  // Kakao 로그인 구현
  useEffect(() => {
    const OAuthKakao = (authorizationCode) => {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/oauth/kakao`,
          {
            code: authorizationCode,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log('카카오에 대한 응답', res);
          dispatch(signin(res.data.data));
          dispatch(notify('반갑습니다'));
        })
        .then((res) => {
          if (pathname !== '/musical/main') {
            history.push(`${pathname.slice(9)}`);
          }
          history.push(`${pathname}`);
        })
        .catch((err) => {
          console.log('카카오로그인에러', err);
        });
    };
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      OAuthKakao(authorizationCode);
    }
  }, []);

  return <></>;
}

export default KakaoLogin;
