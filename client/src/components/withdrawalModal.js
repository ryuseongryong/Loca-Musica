import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signout } from "../actions";

function WithdrawalModal() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state.userReducer.userInfo,
    };
  });
  // 현재페이지에서만 관리되는 state
  const [inputValue, setInputValue] = useState("");

  // 이벤트 핸들러 함수
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };
  //* 탈퇴요청
  //! 탈퇴요청이 완료되면 signout의 과정을 거처야함
  const withdrawalRequestHandler = () => {
    const password = inputValue;
    axios
      .patch(
        `${process.env.REACT_APP_END_POINT}/user/delete`,
        { password: password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        dispatch(signout());
      })
      .then(() => {
        console.log("탈퇴처리가 잘 되었어요");
        history.push("/musical/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="withdrawalModalWrap">
      <span>닫기</span>
      <p>비밀번호 입력 후 탈퇴완료 버튼을 누르면 회원탈퇴가 됩니다</p>
      <p>회원탈퇴에 따른 안내문이 들어가야함</p>
      <form>
        <input
          name="password"
          type="text"
          placeholder="비밀번호 확인"
          required
          value={inputValue}
          onChange={inputHandler}
        />
        <p>진짜 동의합니까????</p>
        <input name="checkbox" type="checkbox" required />
      </form>
      <button onClick={withdrawalRequestHandler}>탈퇴완료</button>
    </div>
  );
}

export default WithdrawalModal;
