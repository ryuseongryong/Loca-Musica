import '../css/detail.css'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { notify } from "../actions/index";
import ChoiceModal from "./choiceModal";

function HashtagForm({
  isSignin,
  userInfo,
  hashtagsData,
  sendHashtagRequestHandler,
}) {
  const email = userInfo.email;
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [delta, setDelta] = useState(Date.now());
  const [isModal, setIsModal] = useState(false);

  function isDoubleKeyDown() {
    setDelta(Date.now());
    let now = Date.now();
    if (now - delta < 1000) {
      // console.log('Prevent double enter!');
      return true;
    }
    return false;
  }

  function checkDoubleLike(hashtag, email) {
    let arrSelectedHashtag = hashtagsData.filter((el) => el.name === hashtag);
    // 기존에 등록된 해시태그가 아닐경우
    if (arrSelectedHashtag.length === 0) {
      return false;
    } 
    // 기존에 등록된 해시태그일 경우
    else {
      let isUserLiked = arrSelectedHashtag[0].userInfo
        .map((el) => el.email)
        .includes(email);
      // 유저가 이미 공감을 했을 경우
      if (isUserLiked) return true;
      // 아닐 경우
      else return false;
    }
  }

  function regiesterHashtag() {
    if (!isSignin) {
      setIsModal(true); // 로그인을 해야 작성가능(로그인 모달창이 열림)
      return;
    }

    let hashtag = `#${inputValue.replace(/ /gi, '')}`;
    // 입력값 유효성 확인을 위한 정규식(기호금지, 영어, 한글, 숫자만)
    let regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

    // 아무것도 입력하지 않았을 경우
    if (hashtag.length === 1) {
      dispatch(notify('해시태그를 입력해주세요'));
      return;
    }
    // 7자를 초과해서 작성했을 때
    if (hashtag.length > 8) {
      dispatch(notify('해시태그는 7자 이하로 입력해주세요'));
      return;
    }

    let isHashtagValid = regex.test(hashtag.slice(1))

    // 해시태그에 기호를 사용했을때
    if (!isHashtagValid) {
      dispatch(notify('해시태그는 기호를 사용할 수 없습니다.'));
      return;
    }
    
    let isDoubleLike = checkDoubleLike(hashtag, email)
    // 이미 공감을 표시한 해시태그를 이중등록할때
    if (isDoubleLike) {
      dispatch(notify('이미 공감을 표시한 해시태그입니다'));
      return;
    }
    setInputValue('');
    sendHashtagRequestHandler(hashtag);
  }

  function handleChange(event) {
    let str = event.target.value;
    if (str.slice(-1) === ' '){
      // console.log("There is a space in the string@!!!!!")
      str = str.slice(0, str.length - 1)
    }
    // console.log(str)
    // if (str.includes(' ')) console.log("str has space")
    setInputValue(str);
  }

  // function handleKeydown(event) {
  //   if (event.key === ' ') {
  //     event.preventDefault();
  //     return;
  //   }
  //   if (event.key !== 'Enter') return;
  //   event.preventDefault();
  //   // console.log('Enter Pressed!');
  //   if (isDoubleKeyDown()) return;
  //   setInputValue('');
  //   regiesterHashtag();
  // }

  function handleClick(event) {
    event.preventDefault();
    regiesterHashtag()
  }

  return (
    <>
      <form>
        <input
          id='inputHashtag'
          name='hashtag'
          type='text'
          placeholder='해시태그는공백없이7자이하로입력해야등록이됩니다!'
          value={inputValue}
          onChange={handleChange}
          // onKeyDown={handleKeydown}
          autoComplete='off'
        />
        <button id='btnHashtag' onClick={handleClick}>
          등록
        </button>
        {/* <div>{message && <p className='errMsg'>{message}</p>}</div> */}
      </form>
      {isModal ? <ChoiceModal isModal={isModal} setIsModal={setIsModal} /> : null}
    </>
  );
};

export default HashtagForm;
