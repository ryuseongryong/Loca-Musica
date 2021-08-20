import "../css/modal.css";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";

function ChoiceModal({ setIsModal }) {
  return (
    <div className="choiceModalWrap">
      <div className="choiceModal">
        <span className="btnCloseModal" onClick={() => setIsModal(false)}>
          <CgClose />
        </span>
        <div className="modalTextWrap">
          <p>로그인이 필요한 서비스입니다.</p>
          <p>로그인하시겠습니까?</p>
          <Link to="/user/signin" className="linkTag">
            로그인
          </Link>
          <Link to="/user/signup" className="linkTag">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChoiceModal;
