import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "../css/signin.css";
import KakaoLogin from "../components/kakaoOAuth";
import { signin, notify } from "../actions/index";

function Signin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const pathname = useSelector((state) => state.pathnameReducer.pathname);

  // 현재 페이지에서만 관리가 필요한 state
  //* input에 입력되는 value(로그인에 필요한 사용자정보)
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  //* input에 입력되는 value에 따른 에러메세지
  const [errMessage, setErrMessage] = useState("");

  // 핸들러함수
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  //* 로그인 핸들러
  const signinRequestHandler = (event) => {
    const { email, password } = inputValue;

    if (email && password) {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/user/signin`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          // console.log("로그인에대한응답", res);
          dispatch(signin(res.data.data));
          dispatch(notify("반갑습니다"));
        })
        .then((res) => {
          if (pathname !== "/musical/main") {
            history.push(`${pathname.slice(9)}`);
          }
          history.push(`${pathname}`);
        })
        .catch((err) => {
          console.log("로그인에러", err.response);
          if (err.response.data.message === "invalid password") {
            setErrMessage("비밀번호를 다시 확인해주세요.");
          } else if (err.response.data.message === "invalid email") {
            setErrMessage("사용자 정보를 찾을 수 없습니다. 회원가입 해주세요.");
          } else if (err.response.data.message === "resigned user") {
            setErrMessage("사용할 수 없는 이메일입니다.");
          }
        });
    }
  };

  //* 카카오로그인 핸들러
  const kakaoSigninRequestHandler = () => {
    window.location.assign(process.env.REACT_APP_KAKAO_REDIRECT);
    console.log(process.env.REACT_APP_KAKAO_REDIRECT);
  };

  return (
    <div id="signin">
      <div className="signinContainer">
        <p className="signinText">로그인</p>
        <form>
          <input
            className="inpt"
            name="email"
            type="email"
            placeholder="이메일"
            required
            value={inputValue.email}
            onChange={inputHandler}
            onFocus={() => {
              setErrMessage("");
            }}
          />
          <input
            className="inpt"
            name="password"
            type="password"
            placeholder="비밀번호"
            required
            value={inputValue.password}
            onChange={inputHandler}
            onFocus={() => {
              setErrMessage("");
            }}
            onKeyUp={(event) =>
              event.key === "Enter" ? signinRequestHandler(event) : null
            }
          />
        </form>
        <div>{errMessage && <p className="errMsg">{errMessage}</p>}</div>
        <button className="btnSignin" onClick={signinRequestHandler}>
          로그인
        </button>
        <div>
          <button
            className="btnKakaoSignin"
            onClick={kakaoSigninRequestHandler}
          ></button>
          <KakaoLogin />
        </div>
        <div className="signupCheckWrap">
          <p>계정이 없으신가요?</p>
          <span onClick={() => history.push("/user/signup")}> 가입하기</span>
        </div>
      </div>
    </div>
  );
}

export default Signin;
