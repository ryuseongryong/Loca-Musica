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
              <span className="pfState cGreen">{performanceInfo.state}</span>
            ) : (
              <span className="pfState">{performanceInfo.state}</span>
            )}
          </li>
          <li>
            <p className="pfStoryItem">줄거리</p>
            <div className="pfStory">{performanceInfo.contents}</div>
            {/* <div className="pfStory">
              불러 이상 풀이 부패뿐이다. 열매를 귀는 투명하되 주는 쓸쓸하랴?
              청춘의 끝에 인간이 방황하였으며, 아름답고 예가 영락과 주는 그것을
              봄바람이다. 때에, 청춘의 붙잡아 인간은 만물은 방황하여도, 심장은
              가는 위하여 아니다. 유소년에게서 위하여, 우리는 우리의 관현악이며,
              그들의 청춘을 발휘하기 그러므로 운다. 피는 고행을 풍부하게 가슴이
              예가 눈에 것이다.보라, 것이다. 바이며, 있는 쓸쓸한 이상이 가는
              용감하고 청춘의 실로 새가 말이다. 끝까지 풍부하게 착목한는
              방지하는 없으면 피고 것은 불러 것이다. 긴지라 광야에서 구하지
              있다. 그들의 거선의 구할 어디 용기가 긴지라 심장은 봄바람이다.
              장식하는 할지니, 꽃이 힘차게 생명을 품에 이것을 봄바람이다. 싶이
              귀는 대한 할지라도 일월과 이 하였으며, 소담스러운 크고 위하여서.
            </div> */}
          </li>
          <li className="pfActors">
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
              <div className="numberVideoWrap" key={index}>
                <div className="iframbox">
                  {el.videoId ? (
                    <iframe
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
                </div>
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
