/*eslint-disable*/

import axios from "axios";
import { useEffect, useState } from "react";
import ChoiceModal from "./choiceModal";

function PerformanceTag({ isSignin }) {
  //? 변수
  const url = new URL(window.location.href);
  const title = url.searchParams.get("title");

  // 상태관리
  //* 현재페이지에서만 관리되는 state
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [hashtagsData, setHashtagsData] = useState([]);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    // 컴포넌트가 렌더링되면 해시태그데이터를 목록으로 가져옴
    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {
        setHashtagsData(res.data.data.hashtagsData);
      })
      .catch((err) => {
        console.log("해시태그 데이터를 불러오지 못한 이유는?", err);
      });
  }, []);

  // 이벤트 핸들러 함수
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    // setInputValue(event.target.value);
    let str = event.target.value;
    if (str.slice(-1) === " ") {
      return;
    }
    if (str[0] !== "#") {
      str = `#${str}`;
    }
    setInputValue(str);
  };
  //* input창에 공백 자동삭제 기능 구현 함수
  //! 기능개발중
  const inputDeletSpace = () => {
    const kcode = event.keyCode;
    if (kcode === 32) event.returnValue = false;
  };

  //* 해시태그 등록 기능 함수
  const sendHashtagRequestHandler = (event) => {
    event.preventDefault();
    //# 차선책!! 공백을 입력하지 못하게 막거나 자동으로 삭제할 수는 없지만 DB에는 공백을 제거하고 입력되도록 구현
    const hashtag = inputValue.replace(/ /gi, "");
    if (!isSignin) {
      setIsModal(true);
    } else if (hashtag.length > 9) {
      setMessage("7자이하로 작성해주세요!");
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
          setHashtagsData(res.data.data.HashtagsData);
          setInputValue("");

          //& 해시태그 등록을 마치면 유저에게 등록이 잘 되었다는 메시지(개발 중 이후 notification으로 변경 예정)
          setMessage("해시태그가 등록되었습니다");
        })
        .then(() => {
          //& 3초 후에 메세지가 사라지게 구현(개발 중 이후 notification으로 변경 예정)
          let timer = setTimeout(() => {
            setMessage("");
          }, 3000);
          return () => {
            clearTimeout(timer);
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //* 해시태그 공감표시 가능 함수
  const addLikeRequestHandler = (event) => {
    // console.log("event를 보여줘", event.target.innerText);
    const hashtag = event.target.innerText;
    if (!isSignin) {
      setIsModal(true);
    } else if (isSignin) {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
          { title, hashtag },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("공감을 표시했습니다");
          // console.log(res.data.data.HashtagsData);
          setHashtagsData(res.data.data.HashtagsData);

          //& 공감을 하면 유저에게 공감이 반영되었다는 메시지(개발 중 이후 notification으로 변경 예정)
          setMessage("공감을 표시했습니다");
        })
        .catch((err) => {
          console.log(err);
        });
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
                onClick={addLikeRequestHandler}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
        <form>
          <input
            id="inputHashtag"
            name="hashtag"
            type="text"
            placeholder="#해시태그는공백없이7자이내로넣어야등록이됩니다"
            value={inputValue}
            onChange={inputHandler}
            onKeyDown={(event) =>
              event.key === "Enter" ? sendHashtagRequestHandler(event) : null
            }
          />
          <div>{message && <p className="errMsg">{message}</p>}</div>
        </form>
      </div>
      {isModal ? <ChoiceModal setIsModal={setIsModal} /> : null}
    </div>
  );
}
export default PerformanceTag;
