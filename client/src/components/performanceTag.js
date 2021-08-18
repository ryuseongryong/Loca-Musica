import axios from "axios";
import { useState } from "react";

function PerformanceTag() {
  // 핸들러 함수
  // 현재페이지에서만 관리되는 state
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  // 이벤트 핸들러 함수
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    // console.log(event.target.value);
    // if (event.key === " ") {
    //   event.target.value.replace(" ", "");
    // }
    setInputValue(event.target.value);
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
            onChange={inputHandler}
          />
        </form>
      </div>
    </div>
  );
}
export default PerformanceTag;
