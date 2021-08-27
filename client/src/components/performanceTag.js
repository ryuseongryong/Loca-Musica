/*eslint-disable*/

import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../actions/index";
import ChoiceModal from "./choiceModal";
import WordCloud1 from "./wordCloud";

function PerformanceTag({ isSignin, userInfo }) {
  //? 변수
  const url = new URL(window.location.href);
  const title = decodeURI(url.pathname.slice(9));
  const email = userInfo.email;
  const dispatch = useDispatch();

  // 상태관리
  //* 현재페이지에서만 관리되는 state
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [hashtagsData, setHashtagsData] = useState([]); // 페이지 내에 있는 해시태그에 대한 유저 정보를 포함
  const [userHashtag, setUserHashtag] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [delta, setDelta] = useState(Date.now());
  const [isUpdate, setIsUpdate] = useState(false);

  // const memoizedHashtagsData = useMemo(() => hashtagsData);

  //? 사용자가 해시태그에 공감버튼을 눌렀는지 안 눌렀는지 확인하기 위한 데이터
  const checkHashtagUser = (hashtag, email) => {
    const clickedHashtag = hashtagsData.filter((el) => el.name === hashtag);
    return clickedHashtag[0].userInfo.map((el) => el.email).includes(email);
  };

  const isDoubleKeyDown = () => {
    setDelta(Date.now());
    let now = Date.now();
    if (now - delta < 1000) {
      console.log("Prevent double keydown!");
      return true;
    }
    return false;
  };

  useEffect(() => {
    // 컴포넌트가 렌더링되면 해시태그데이터를 목록으로 가져옴
    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("지금응답은?", res.data.data);

        setHashtagsData(res.data.data.hashtagsData);
        setUserHashtag(res.data.data.userHashtag);
      })
      .catch((err) => {
        console.log("해시태그 데이터를 불러오지 못한 이유는?", err);
      });
  }, [isUpdate]);

  // console.log("해시태그에 담긴 정보(hashtagData", hashtagsData);
  // console.log("공감을 한 유저정보", userHashtag);

  // 이벤트 핸들러 함수
  //* input에 입력되는 value 변경 함수(space입력불가)
  const inputHandler = (event) => {
    // setInputValue(event.target.value);
    let str = event.target.value;
    if (str.slice(-1) === " ") {
      return;
    }
    setInputValue(str);
  };

  //* 해시태그 등록 기능 함수
  const sendHashtagRequestHandler = (event) => {
    console.log("hashtag state data: ", hashtagsData);
    if (event.key === "Enter") console.log("Enter Pressed!");
    event.preventDefault();
    if (isDoubleKeyDown()) return;

    const hashtag = `#${inputValue.replace(/ /gi, "")}`;
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/; // 입력값 유효성 확인을 위한 정규식(기호금지, 영어, 한글, 숫자만)

    const checkUser = (hashtag, email) => {
      const choicedHashtag = hashtagsData.filter((el) => el.name === hashtag);
      if (choicedHashtag.length === 0) {
        return true;
      } else {
        const temp = choicedHashtag[0].userInfo
          .map((el) => el.email)
          .includes(email);
        if (temp) return false;
        return true;
      }
    };

    console.log(checkUser(hashtag, email));

    if (!isSignin) {
      setIsModal(true); // 로그인을 해야 작성가능(로그인 모달창이 열림)
      return;
    }
    if (hashtag.length === 1) {
      dispatch(notify("해시태그를 입력해주세요")); // 아무것도 입력하지 않으면 사용자에게 보여주는 메세지
    } else if (hashtag.length > 8) {
      dispatch(notify("해시태그는 7자 이하로 입력해주세요")); // 7자를 초과해서 작성했을 때 사용자에게 보여주는 메세지
    } else if (!regex.test(hashtag.slice(1))) {
      dispatch(notify("해시태그는 기호를 사용할 수 없습니다.")); // 해시태그에 기호를 사용했을때 사용자에게 보여주는 메세지
    } else if (regex.test(hashtag.slice(1)) && hashtag.length < 9) {
      if (!checkUser(hashtag, email)) {
        dispatch(notify("이미 공감을 표시한 해시태그입니다")); // 이미 공감을 표시한 해시태그를 이중등록할때 사용자에게 보여주는 메세지
      } else if (checkUser(hashtag, email)) {
        // console.log(checkUser(hashtag, email));
        axios
          .post(
            `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
            { title, hashtag },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            setHashtagsData(res.data.data.hashtagsData);
            setIsUpdate(!isUpdate);
          })
          .then(() => {
            console.log("반영후 결과", hashtagsData);
            setInputValue("");
            dispatch(notify("해시태그가 등록되었습니다"));
          })
          .catch((err) => {
            console.log("해시태그 입력 기능에 대한 오류", err, err.response);
            if (err.response.data.message === "double enter") {
              console.log("이미 입력되었습니다.");
            } else if (
              err.response.data.message === "let's use the right words"
            ) {
              dispatch(notify("해시태그에 부적절한 표현이 보이네요")); // 부정적인 표현이 등록될때 사용자에게 보여주는 메세지
            }
          });
      }
    }
  };

  //* 해시태그 공감표시 기능 함수
  const controlLikeRequestHandler = (event) => {
    event.preventDefault();
    let hashtag = event.target.textContent;
    console.log("hashtag: ", hashtag);

    if (!isSignin) {
      setIsModal(true);
      return;
    }
    if (!checkHashtagUser(hashtag, email)) {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
          { title, hashtag },
          { withCredentials: true }
        )
        .then((res) => {
          // console.log("공감을 표시했습니다");
          // console.log("공감표시의 결과에 대한 응답은?", res);
          setHashtagsData(res.data.data.hashtagsData);
          dispatch(notify(`Hashtag '${hashtag}'에 공감을 표시했습니다.`));
        })
        .catch((err) => {
          console.log("공감기능에 대한 오류", err.response);
        });
    } else if (checkHashtagUser(hashtag, email)) {
      if (hashtag[0] === "#") {
        hashtag = `%23${hashtag.slice(1)}`;
      }
      console.log(hashtag, title);
      axios
        .delete(
          `${process.env.REACT_APP_END_POINT}/musical/hashtag/${title}/${hashtag}`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log("공감취소의 결과에 대한 응답은?", res);
          // console.log("공감이 취소되었습니다");
          setHashtagsData(res.data.data.hashtagsData);
          dispatch(notify("공감이 취소 되었습니다"));
        })
        .catch((err) => {
          console.log("공감취소에 대한 오류", err.response);
        });
    }
  };

  // const memoizedControlLikeRequestHandler = useCallback((e)=>{controlLikeRequestHandler(e)}, [e])

  return (
    <div>
      <div className="pfHashtagWrap">
        <p className="pfItem">태그</p>
        {/* <div className="pfHashtags">
          <ul id="hashtagItemList">
            {hashtagsData.map((el, index) => (
              <li
                className="hashtagItem"
                key={index}
                onClick={controlLikeRequestHandler}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div> */}
        <WordCloud1
          controlLikeRequestHandler={controlLikeRequestHandler}
          hashtagsData={hashtagsData}
        />
        <form>
          <input
            id="inputHashtag"
            name="hashtag"
            type="text"
            placeholder="해시태그는공백없이7자이하로입력해야합니다"
            value={inputValue}
            onChange={inputHandler}
            onKeyDown={(event) =>
              event.key === "Enter" ? sendHashtagRequestHandler(event) : null
            }
          />
          <button id="btnHashtag" onClick={sendHashtagRequestHandler}>
            등록
          </button>
          <div>{message && <p className="errMsg">{message}</p>}</div>
        </form>
      </div>
      {isModal ? <ChoiceModal setIsModal={setIsModal} /> : null}
    </div>
  );
}
export default PerformanceTag;
