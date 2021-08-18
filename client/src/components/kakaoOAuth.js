/*eslint-disable*/

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signin } from "../actions";

function KakaoLogin() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);

  // Kakao 로그인 구현
  useEffect(() => {
    const getAccessToken = (authorizationCode) => {
      axios
        .post(`${process.env.REACT_APP_END_POINT}/oauth/kakao`, {
          code: authorizationCode,
        })
        .then((res) => {
          console.log("카카오에 대한 응답", res);
          // dispatch로 로그인상태 state 관리
          dispatch(signin(res.data.data));
        })
        .then((res) => {
          history.push("/musical/main");
        })
        .catch((err) => {
          console.log("카카오로그인에러", err);
        });
    };
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    // console.log('인증 코드', authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  }, []);

  return <></>;
}

export default KakaoLogin;
