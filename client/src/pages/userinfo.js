/*eslint-disable*/

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../css/userinfo.css";
import { signout, notify, signin } from "../actions";
import { usernameChecker, passwordChecker } from "../utils/validateCheck";
import BookmarkList from "../components/bookmarkList";
import Footer from "../components/footer";
import dummyProfile from "../images/dummyProfile.png";
import WithdrawalModal from "../components/withdrawalModal";

function UserInfo() {
  const dispatch = useDispatch();
  const { isSignin, userInfo } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
    };
  });

  // 현재 페이지에서만 관리가 필요한 state
  const [inputValue, setInputValue] = useState({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
    newUsername: "",
    newProfile: "",
  });
  //* input에 입력되는 value에 따른 에러 또는 결과 메세지
  const [message, setMessage] = useState({
    usernameMessage: "",
    passwordMessage: "",
    profileMessage: "",
  });
  //* modal창을 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 핸들러 함수
  //* 이미지 변경 요청 함수(구현 중)
  //* 이미지 삭제 요청 함수(구현 중)
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  //* input에 입력되는 비밀번호에 따른 결과메세지 변경 함수
  const resultMessageHandler = (message) => {
    switch (message) {
      // 사용자 이름 유효성 검사 후 에러메세지
      case "shortUsername":
        setMessage({
          ...message,
          usernameMessage: "사용자 이름은 2글자 이상이어야 합니다",
        });
        break;
      case "invalidUsername":
        setMessage({
          ...message,
          usernameMessage:
            "한글, 영어, 숫자를 포함하여 2자 이상으로 설정해 주세요",
        });
        break;
      case "validUsername":
        setMessage({
          ...message,
          usernameMessage: "",
        });
        break;

      // 비밀번호 유효성 검사 후 에러메세지
      case "emptyPassword":
        setMessage({
          ...message,
          passwordMessage: "영문, 숫자, 기호를 포함하며 공백이 없어야 합니다",
        });
        break;
      case "shortPassword":
        setMessage({
          ...message,
          passwordMessage: "비밀번호는 8자 이상이어야 합니다",
        });
        break;
      case "invalidPassword":
        setMessage({
          ...message,
          passwordMessage:
            "영어, 숫자, 기호를 포함하여 8자 이상으로 설정해 주세요",
        });
        break;
      case "validPassword":
        setMessage({
          ...message,
          passwordMessage: "",
        });
        break;
      default:
        return "";
    }
  };
  //* 결과메세지 초기화 함수
  const clearMessage = () => {
    setMessage({
      usernameMessage: "",
      passwordMessage: "",
      profileMessage: "",
    });
  };

  //* 사용자이름 변경 요청 함수
  const usernameChangeRequestHandler = () => {
    const { newUsername } = inputValue;
    //# 부분수정 필요 enter을 하면 조건에 맞지 않는데도 불구하고 실행이 되는 버그
    const regex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;
    if (regex.test(newUsername)) {
      axios
        .patch(
          `${process.env.REACT_APP_END_POINT}/user/editusername`,
          { newUsername },
          { withCredentials: true }
        )
        .then((res) => {
          dispatch(signin(res.data.data));
          console.log("사용자이름 잘 변경되었어요");
        })
        .then(() => {
          //! 임시, test용
          setMessage({
            ...message,
            usernameMessage: "사용자이름이 변경되었습니다",
          });
          setInputValue({
            ...inputValue,
            newUsername: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //* 비밀번호 변경 요청 함수
  const passwordChangeRequestHandler = () => {
    const { password, newPassword, newPasswordCheck } = inputValue;
    if (password === newPassword) {
      setMessage({
        ...message,
        passwordMessage: "기존 비밀번호와 똑같이 변경할 수 없습니다",
      });
    } else if (newPassword !== newPasswordCheck) {
      setMessage({
        ...message,
        passwordMessage: "입력하신 새 비밀번호가 일치하지 않습니다",
      });
    } else if (passwordChecker(newPassword) === "validPassword") {
      axios
        .patch(
          `${process.env.REACT_APP_END_POINT}/user/editpassword`,
          { password, newPassword },
          { withCredentials: true }
        )
        .then((res) => {
          dispatch(signin(res.data.data));
          console.log("비밀번호 잘 변경되었어요");
        })
        .then(() => {
          //! 임시, test용
          setMessage({
            ...message,
            passwordMessage: "비밀번호가 변경되었습니다",
          });
          setInputValue({
            ...inputValue,
            password: "",
            newPassword: "",
            newPasswordCheck: "",
          });
        })
        .catch((err) => {
          console.log("회원탈퇴가 안되면 알려줘", err);
        });
    }
  };

  //* 회원탈퇴 요청 함수
  const withdrawalModalHandler = () => {
    // 탈퇴버튼을 누르면 모달이 하나 생기고, 그 모달 안에서 동의버튼에 체크하고 비밀번호 치고 submit버튼 누르면 실행되게
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="userInfoWrap">
      <div id="userInfo">
        <div className="userInfoWrap">
          <div className="txtWelcome">
            {/* userInfo에 따라 다르게 보이도록 대체 */}
            <p className="fs28px">반가워요, {userInfo.username} 님!</p>
            <p className="fs20px">{userInfo.email}</p>
          </div>
          <div className="userInfoChangeWrap">
            <div className="imgChangeWrap">
              <img
                className="dummyProfile"
                alt="사용자 프로필"
                // 사용자프로필 유무에 따라서 따르게 적용
                src={
                  userInfo.profile !== null ? userInfo.profile : dummyProfile
                }
              />
              <span>이미지 변경</span>
              <span>이미지 삭제</span>
            </div>
            <div className="infoChangeWrap">
              <p>사용자 이름 변경</p>
              <form>
                <input
                  name="newUsername"
                  type="text"
                  placeholder="새 사용자 이름"
                  required
                  value={inputValue.newUsername}
                  onChange={inputHandler}
                  onFocus={clearMessage}
                  onKeyUp={() => {
                    resultMessageHandler(
                      usernameChecker(inputValue.newUsername)
                    );
                  }}
                />
              </form>
              <div>
                {message.usernameMessage && (
                  <p className="mypageMsg">{message.usernameMessage}</p>
                )}
              </div>
              <button
                className="btnChangeInfo"
                onClick={usernameChangeRequestHandler}
              >
                변경
              </button>
            </div>
            <div className="infoChangeWrap">
              <p>비밀번호 변경</p>
              <form>
                <input
                  name="password"
                  type="password"
                  placeholder="기존 비밀번호"
                  required
                  value={inputValue.password}
                  onChange={inputHandler}
                  onFocus={clearMessage}
                />
                <input
                  name="newPassword"
                  type="password"
                  placeholder="새 비밀번호"
                  required
                  value={inputValue.newPassword}
                  onChange={inputHandler}
                  onFocus={clearMessage}
                  onKeyUp={() =>
                    resultMessageHandler(
                      passwordChecker(inputValue.newPassword)
                    )
                  }
                />
                <input
                  name="newPasswordCheck"
                  type="password"
                  placeholder="새 비밀번호 확인"
                  required
                  value={inputValue.newPasswordCheck}
                  onChange={inputHandler}
                  onFocus={clearMessage}
                  onKeyUp={(event) => {
                    event.key === "Enter"
                      ? passwordChangeRequestHandler(event)
                      : null;
                  }}
                />
              </form>
              <div>
                {message.passwordMessage && (
                  <p className="mypageMsg">{message.passwordMessage}</p>
                )}
              </div>
              <button
                className="btnChangeInfo"
                onClick={passwordChangeRequestHandler}
              >
                변경
              </button>
            </div>
          </div>
        </div>

        <div className="bookmarkWrap">
          <p className="fs28px">북마크한 뮤지컬</p>
          <div className="testWrap">
            <span className="testimg"></span>
            <span className="testimg"></span>
            <span className="testimg"></span>
            <span className="testimg"></span>
            <span className="testimg"></span>
          </div>
          {/* <BookmarkList /> */}
        </div>

        <button className="btnWithdrawal" onClick={withdrawalModalHandler}>
          회원탈퇴
        </button>
        {isModalOpen ? <WithdrawalModal /> : null}
      </div>
      <Footer />
    </div>
  );
}

export default UserInfo;
