/*eslint-disable*/

import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../css/signin.css";
import { signin, notify } from "../actions/index";
import {
  emailChecker,
  usernameChecker,
  passwordChecker,
  valuesChecker,
} from "../utils/validateCheck";
import KakaoLogin from "../components/kakaoOAuth";

function Signup() {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);
  const pathname = useSelector((state) => state.pathnameReducer.pathname);

  // 현재 페이지에서만 관리가 필요한 state
  //* input에 입력되는 value(회원가입에 필요한 사용자정보)
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
  });
  //* input에 입력되는 value에 따른 에러메세지
  const [errMessage, setErrMessage] = useState({
    errEmail: "",
    errUsername: "",
    errPassword: "",
    errPasswordCheck: "",
    errOverall: "",
  });

  // 핸들러함수
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  //* input에 입력되는 value에 따른 에러메세지 변경 함수
  const errMessageHandler = (message) => {
    switch (message) {
      // 이메일 유효성 검사 후 에러메세지
      case "invalidEmail":
        setErrMessage({
          ...errMessage,
          errEmail: "이메일이 유효하지 않습니다",
        });
        break;
      case "validEmail":
        setErrMessage({
          ...errMessage,
          errEmail: "",
        });
        break;

      // 사용자이름 유효성 검사 후 에러메세지
      case "shortUsername":
        setErrMessage({
          ...errMessage,
          errUsername: "사용자 이름은 2글자 이상이어야 합니다",
        });
        break;
      case "invalidUsername":
        setErrMessage({
          ...errMessage,
          errUsername: "한글, 영어, 숫자를 포함하여 2자 이상으로 설정해 주세요",
        });
        break;
      case "validUsername":
        setErrMessage({
          ...errMessage,
          errUsername: "",
        });
        break;

      // 비밀번호 유효성 검사 후 에러메세지
      case "emptyPassword":
        setErrMessage({
          ...errMessage,
          errPassword: "영문, 숫자, 기호를 포함하며 공백이 없어야 합니다",
        });
        break;
      case "shortPassword":
        setErrMessage({
          ...errMessage,
          errPassword: "비밀번호는 8자 이상이어야 합니다",
        });
        break;
      case "invalidPassword":
        setErrMessage({
          ...errMessage,
          errPassword: "영어, 숫자, 기호를 포함하여 8자 이상으로 설정해 주세요",
        });
        break;
      case "validPassword":
        setErrMessage({
          ...errMessage,
          errPassword: "",
        });
        break;
    }
  };

  //* 에러메세지 초기화 함수
  const clearErrMessage = () => {
    setErrMessage({
      errEmail: "",
      errUsername: "",
      errPassword: "",
      errOverall: "",
    });
  };

  //* 회원가입 요청 함수
  const signupRequestHandler = (event) => {
    const { email, username, password, passwordCheck } = inputValue;

    // 유효성 검사를 통과하지 못하면 에러메세지
    if (!email || !username || !password || !passwordCheck) {
      setErrMessage({
        ...errMessage,
        errOverall: "모든 항목을 올바르게 입력해주세요",
      });
    } else if (
      valuesChecker(email, username, password) &&
      password === passwordCheck
    ) {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/user/signup`,
          {
            email: email,
            username: username,
            password: password,
          },
          { withCredentials: true }
        )
        .then(() => {
          axios
            .post(
              `${process.env.REACT_APP_END_POINT}/user/signin`,
              {
                email: email,
                password: password,
              },
              { withCredentials: true }
            )
            .then((res) => {
              // 로그인이 완료되면 state를 변경하고 사용자에게 메세지를 전달
              dispatch(signin(res.data.data));
              dispatch(notify("회원가입이 되었습니다"));
            })
            .then(() => {
              //! 상세페이지에서 로그인했으면 다시 상세페이지로 다시 이동, 아니면 main페이지로 이동
              if (pathname !== "/musical/main") {
                history.push(`${pathname.slice(9)}`);
              }
              history.push(`${pathname}`);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          // console.log("회원가입에러", err.response.data.message);
          if (err.response.data.message === "email conflict") {
            setErrMessage({
              ...errMessage,
              errOverall: "이미 사용하고 있는 이메일입니다",
            });
          } else if (err.response.data.message === "resigned user") {
            setErrMessage({
              ...errMessage,
              errOverall: "사용할 수 없는 이메일입니다",
            });
          }
        });
    }
  };

  //* 카카오로그인 핸들러
  const kakaoSignupRequestHandler = () => {
    window.location.assign(process.env.REACT_APP_KAKAO_REDIRECT);
    console.log(process.env.REACT_APP_KAKAO_REDIRECT);
  };

  return (
    <div id="signup">
      <div className="signupContainer">
        <p className="signinText">회원가입</p>
        <form>
          <div>
            <input
              className="inpt"
              name="email"
              type="email"
              placeholder="이메일"
              required
              value={inputValue.email}
              onChange={inputHandler}
              onKeyUp={() => errMessageHandler(emailChecker(inputValue.email))}
              onFocus={clearErrMessage}
            />
            {errMessage.errEmail && (
              <p className="errMsg">{errMessage.errEmail}</p>
            )}
          </div>
          <div>
            <input
              className="inpt"
              name="username"
              type="text"
              placeholder="사용자 이름"
              required
              value={inputValue.username}
              onChange={inputHandler}
              onKeyUp={() =>
                errMessageHandler(usernameChecker(inputValue.username))
              }
              onFocus={clearErrMessage}
            />
            {errMessage.errUsername && (
              <p className="errMsg">{errMessage.errUsername}</p>
            )}
          </div>
          <div>
            <input
              className="inpt"
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              value={inputValue.password}
              onChange={inputHandler}
              onKeyUp={() =>
                errMessageHandler(passwordChecker(inputValue.password))
              }
              onFocus={clearErrMessage}
            />
            {errMessage.errPassword && (
              <p className="errMsg">{errMessage.errPassword}</p>
            )}
          </div>
          <div>
            <input
              className="inpt"
              name="passwordCheck"
              type="password"
              placeholder="비밀번호 확인"
              required
              value={inputValue.passwordCheck}
              onChange={inputHandler}
              onFocus={clearErrMessage}
              onKeyUp={(event) =>
                event.key === "Enter" ? signupRequestHandler(event) : null
              }
            />
            {inputValue.password &&
              inputValue.passwordCheck &&
              inputValue.password !== inputValue.passwordCheck && (
                <p className="errMsg">비밀번호가 일치하지 않습니다</p>
              )}
          </div>
        </form>
        {errMessage.errOverall && (
          <p className="errMsg">{errMessage.errOverall}</p>
        )}
        <button className="btnSignup" onClick={signupRequestHandler}>
          회원가입
        </button>
        <div>
          <button
            className="btnKakaoSignup"
            onClick={kakaoSignupRequestHandler}
          ></button>
          <KakaoLogin />
        </div>

        <div className="signinCheckWrap">
          <p>이미 계정이 있으신가요?</p>
          <span onClick={() => history.push("/user/signin")}>로그인</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
