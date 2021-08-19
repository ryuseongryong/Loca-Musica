/*eslint-disable*/

import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";

function PerformanceTag({ isSignin, performanceInfo }) {
  // 상태관리
  const dispatch = useDispatch();

  // 현재페이지에서만 관리되는 state
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  // 이벤트 핸들러 함수
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    // console.log(event.target.value);
    console.log(event.target.value, event.nativeEvent.data)
    if (event.target.value === ' ') {
      return
      // event.target.value.replace(" ", "");
    }
    setInputValue(event.target.value);
  };

  const inputDeletSpace = () => {
    const kcode = event.keyCode;
    if (kcode === 32) event.returnValue = false;
  };

  const sendHashtagRequestHandler = (event) => {
    event.preventDefault();

    const hashtag = inputValue;
    const title = performanceInfo.title;
    if(event.key === 'Enter') {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
          { title, hashtag },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("해시태그가 잘 등록되었어요");
          setInputValue('')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(err)
    }
 

  };

  return (
    <div>
      <div className="pfTagWrap">
        <p className="pfItem">태그</p>
        {/* 태그리스트 구현 필요 */}
        <form>
          <input
            className="inputHashtag"
            name="hashtag"
            type="text"
            maxLength="7"
            placeholder="# 새 태그 등록"
            value={inputValue}
            onChange={inputHandler}
            onKeyUp={inputDeletSpace}
            onKeyDown={(event) => event.key === "Enter" ? sendHashtagRequestHandler(event) : null}
          />
        </form>
      </div>
    </div>
  );
}
export default PerformanceTag;
