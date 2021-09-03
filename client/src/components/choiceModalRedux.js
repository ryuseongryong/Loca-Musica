import '../css/modal.css';
import { useDispatch, useSelector } from "react-redux";
import {setIsModal} from '../actions/index'
import { Link } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';

function ChoiceModalRedux({ isModal, setIsModal }) {

  // const dispatch = useDispatch();
  // // Redux state
  // const isModal = useSelector(state => state.isModalReducer.isModal);

  // function handleCloseButton() {
  //   dispatch(setIsModal(false));
  // }

  return (
    <div className={isModal ? 'choiceModalWrap' : 'hideChoiceModal'}>
      <div className='choiceModal'>
        <span className='btnCloseModal' onClick={() => setIsModal(false)}>
          <CgClose />
        </span>
        <div className='modalTextWrap'>
          <p>로그인이 필요한 서비스입니다.</p>
          <p>로그인하시겠습니까?</p>
          <Link to='/user/signin' className='linkTag'>
            로그인
          </Link>
          <Link to='/user/signup' className='linkTag'>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChoiceModalRedux;
