import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signout, notify, signin } from "../actions";

function WithdrawalModal() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state.userReducer.userInfo,
    };
  });
  //

  // 이벤트 핸들러 함수
  //* 비밀번호 입력
  //* 탈퇴요청
  //! 탈퇴요청이 완료되면 signout의 과정을 거처야함

  return (
    <div className="withdrawalModalWrap">
      <span>닫기</span>
      <p>비밀번호 입력 후 탈퇴완료 버튼을 누르면 회원탈퇴가 됩니다</p>
      <p>회원탈퇴에 따른 안내문이 들어가야함</p>
      <form>
        <input
          name="password"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <p>진짜 동의합니까????</p>
        <input name="checkbox" type="checkbox" required />
      </form>
      <button>탈퇴완료</button>
    </div>
  );
}

export default WithdrawalModal;
