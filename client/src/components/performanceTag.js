/*eslint-disable*/

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../actions/index";
import ChoiceModal from "./choiceModal";
import WordCloud from "./wordCloud";

function PerformanceTag({ isSignin, userInfo, performanceInfo }) {
  //? 변수
  const url = new URL(window.location.href);
  const title = decodeURI(url.pathname.slice(9));
  const username = userInfo.username;
  const dispatch = useDispatch();

  // 상태관리
  //* 현재페이지에서만 관리되는 state
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [hashtagsData, setHashtagsData] = useState([]); // 페이지 내의 해시태그에 대한 정보
  const [userHashtag, setUserHashtag] = useState([]); // 해시태그 에서 작성자가 삭제할 수 있도록 확인
  const [isModal, setIsModal] = useState(false);

  // console.log("hashtagsData==>", hashtagsData);
  //? 사용자가 해시태그에 공감버튼을 눌렀는지 안 눌렀는지 확인하기 위한 데이터
  const checkHashtagUser = (hashtag, username) => {
    const clickedHashtag = hashtagsData.filter((el) => el.name === hashtag);
    return clickedHashtag[0].userInfo
      .map((el) => el.username)
      .includes(username);
  };

  // console.log("userHashtag==>", userHashtag);
  //? 사용자가 해시태그의 최초작성자인지 확인할 수 있는 데이터
  // const checkHashtagWriter = (hashtag, username) => {
  //   const clickedHashtag = userHashtag.filter((el) => el[0].name === hashtag);
  //   console.log("작성자찾기", clickedHashtag);
  // };

  useEffect(() => {
    // 컴포넌트가 렌더링되면 해시태그데이터를 목록으로 가져옴
    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("지금응답은?", res.data.data);
        setHashtagsData(res.data.data.hashtagsData);
        setUserHashtag(res.data.data.userHashtag);
      })
      .catch((err) => {
        console.log("해시태그 데이터를 불러오지 못한 이유는?", err);
      });
  }, []);

  // console.log("해시태그에 담긴 정보", userHashtag);
  // console.log("공감을 한 유저정보", userHashtag);

  // 이벤트 핸들러 함수
  //* input에 입력되는 value 변경 함수(space입력불가)
  const inputHandler = (event) => {
    // setInputValue(event.target.value);
    let str = event.target.value;
    if (str.slice(-1) === " ") {
      return;
    }
    // if (str[0] !== "#") {
    //   str = `#${str}`;
    // }
    setInputValue(str);
  };

  //* 해시태그 등록 기능 함수
  const sendHashtagRequestHandler = (event) => {
    event.preventDefault();
    const hashtag = `#${inputValue.replace(/ /gi, "")}`;
    if (!isSignin) {
      setIsModal(true);
    } else if (isSignin && hashtag.length > 9) {
      dispatch(notify("해시태그는 7자 이하로 작성해주세요"));
    } else if (isSignin && hashtag.length < 9) {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
          { title, hashtag },
          { withCredentials: true }
        )
        .then((res) => {
          // console.log(res.data.data.HashtagsData);
          console.log("해시태그가 잘 등록되었어요");
          setHashtagsData(res.data.data.hashtagsData);
          setInputValue("");
          dispatch(notify("해시태그가 등록되었습니다"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //* 해시태그 공감표시 가능 함수
  const controlLikeRequestHandler = (event) => {
    // console.log("event를 보여줘", event);
    let hashtag = event.target.innerText;

    checkHashtagUser(hashtag, username);
    console.log(checkHashtagUser(hashtag, username));

    if (!isSignin) {
      setIsModal(true);
    } else if (isSignin) {
      if (!checkHashtagUser(hashtag, username)) {
        axios
          .post(
            `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
            { title, hashtag },
            { withCredentials: true }
          )
          .then((res) => {
            console.log("공감을 표시했습니다");
            console.log("공감표시의 결과에 대한 응답은?", res);
            setHashtagsData(res.data.data.hashtagsData);
            dispatch(notify(`Hashtag '${hashtag}'에 공감을 표시했습니다.`));
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (checkHashtagUser(hashtag, username)) {
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
            console.log("공감이 취소되었습니다");
            setHashtagsData(res.data.data.hashtagsData);
            //& 공감을 하면 유저에게 공감이 취소되었다는 메시지(개발 중 이후 notification으로 변경 예정)
            dispatch(notify("공감이 취소 되었습니다"));
          })
          .catch((err) => {
            console.log("에러를 보여줘", err);
          });
      }
    }
  };

  return (
    <div>
      <div className="pfHashtagWrap">
        <p className="pfItem">태그</p>
        <div className="pfHashtags">
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
        </div>
        {/* <WordCloud hashtagsData={hashtagsData} /> */}
        <form>
          <input
            id="inputHashtag"
            name="hashtag"
            type="text"
            placeholder="해시태그는공백없이7자이내로넣어야등록이됩니다"
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
