/*eslint-disable*/

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ImHeart, ImCheckmark } from "react-icons/im";
import { useState, useEffect } from "react";
import { addBookmark, removeBookmark, notify } from "../actions/index";

import ChoiceModal from "./choiceModal";

function PerformanceInfo({ performanceInfo, isSignin }) {
  //? 변수
  const title = performanceInfo.title;
  const dispatch = useDispatch();
  const bookmarksData = useSelector(
    (state) => state.bookmarksReducer.bookmarksData
  );
  // console.log("북마크리스트를 보여주세요", bookmarksData);
  const checkBookmarksData = (title) => {
    return bookmarksData.map((el) => el.title).includes(title);
  };

  // 현재 페이지에서 필요한 상태관리
  const [isModal, setIsModal] = useState(false);

  // 핸들러 함수
  //* 북마크추가 및 제거 핸들러 함수
  const controlBookmark = (event) => {
    if (!isSignin) {
      setIsModal(true);
    } else if (isSignin) {
      if (!checkBookmarksData(title)) {
        axios
          .post(
            `${process.env.REACT_APP_END_POINT}/musical/bookmark`,
            { title },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(
              "북마크추가의 결과는?",
              res.data.data.updatedBookmarkData[0]
            );
            // const newBookmark = res.data.data.slice(-1);
            dispatch(addBookmark(res.data.data.updatedBookmarkData));
            // 응답결과를 바탕으로 북마크추가 or 북마크추가됨 상태를 업데이트 해야함
            dispatch(notify(`북마크리스트에 ${title}이(가) 추가되었습니다.`));
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (checkBookmarksData(title)) {
        axios
          .delete(
            `${process.env.REACT_APP_END_POINT}/musical/bookmark/${title}`,
            { withCredentials: true }
          )
          .then((res) => {
            console.log(
              "북마크제거의 결과는?",
              res.data.data.updatedBookmarkData[0]
            );
            dispatch(
              removeBookmark(res.data.data.updatedBookmarkData[0].title)
            );
            dispatch(notify(`북마크리스트에서 ${title}이(가) 제거되었습니다.`));
          })
          .catch((err) => {
            console.log("북마크제거 에러나면 보여줘", err);
          });
      }
    }
  };

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
          <button id="btnBookmark" onClick={controlBookmark}>
            {checkBookmarksData(title) ? (
              <ImCheckmark className="iconBtn" />
            ) : (
              <ImHeart className="iconBtn" />
            )}
            {checkBookmarksData(title) ? "북마크 추가됨" : "북마크 추가"}
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
                {el.videoId ? (
                  <iframe
                    className="video"
                    src={el.videoId}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="video video-error">
                    영상을 불러오는데 실패했습니다.
                  </div>
                )}
                {/* <div className="video">영상을 불러오는데 실패했습니다.</div> */}
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
