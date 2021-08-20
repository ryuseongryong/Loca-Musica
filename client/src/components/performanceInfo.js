/*eslint-disable*/

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ImHeart } from "react-icons/im";
import { useState } from "react";

import ChoiceModal from "./choiceModal";

function PerformanceInfo({ performanceInfo, isSignin }) {
  // 상태관리
  const dispatch = useDispatch();
  const { bookmarkList } = useSelector((state) => {
    return {
      bookmarkList: state.bookmarkReducer,
    };
  });
  const [isModal, setIsModal] = useState(false);
  // const checkBookmark
  const [isAddBookmark, setIsAddBookmark] = useState("");

  // 핸들러 함수
  //* Modal 상태변경 함수
  // const modalOpenHandler = () => {
  //   setIsModal(!isModal);
  // };
  //# 북마크추가 및 제거 핸들러 함수 구현 필요
  const addBookmark = () => {
    if (!isSignin) {
      setIsModal(true);
    }
  };
  const removeBookmark = () => {};

  return (
    <div>
      <div className="pfInfo">
        <ul className="pfInfoTextWrap">
          <li className="pfTitleWrap">
            <h4 className="pfTitle">{performanceInfo.title}</h4>
            {performanceInfo.state === "공연중" ? (
              <span className="cGreen">{performanceInfo.state}</span>
            ) : (
              <span>{performanceInfo.state}</span>
            )}
          </li>
          <li>
            <p className="pfItem">줄거리</p>
            <div className="pfStory">{performanceInfo.contents}</div>
          </li>
          <li>
            <p className="pfItem">출연진</p>
            <div>{performanceInfo.actors}</div>
          </li>
        </ul>
        <div className="pfInfoImgWrap">
          <img
            className="pfPoster"
            src={performanceInfo.thumbnail}
            alt={`${performanceInfo.title}포스터 이미지`}
          />
          <button id="btnBookmark" onClick={addBookmark}>
            <ImHeart className="iconBtn" />
            북마크 추가
          </button>
          {isModal ? <ChoiceModal setIsModal={setIsModal} /> : null}
        </div>
      </div>
      <div className="pfNumberWrap">
        <p className="pfItem">대표넘버</p>
        <div className="pfNumberList">
          {performanceInfo.numbersData.map((el, index) => {
            return (
              <div className="numberVideo" key={index}>
                <iframe
                  className="video"
                  src={el.videoId}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>{el.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PerformanceInfo;
