/*eslint-disable*/

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { ImHeart } from "react-icons/im";

function PerformanceInfo({ performanceInfo }) {
  const dispatch = useDispatch();
  const bookmarkList = useSelector(
    (state) => state.bookmarkReducer.bookmarkList
  );

  // 핸들러 함수
  //# 북마크추가 및 제거 핸들러 함수 구현 필요
  const addBookmark = () => {};
  const removeBookmark = () => {};

  return (
    <div>
      <div className="pfInfo">
        <ul className="pfInfoTextWrap">
          <li className="pfTitleWrap">
            <h4 className="pfTitle">{performanceInfo.title}</h4>
            <span className="cGreen">
              {performanceInfo.state === 2 ? "공연 중" : "공연 종료"}
            </span>
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
          <button id="btnBookmark">
            <ImHeart className="iconBtn" />
            북마크 추가
          </button>
        </div>
      </div>
      <div className="pfNumberWrap">
        <p className="pfItem">대표넘버</p>
        <div className="pfNumberList">
          {performanceInfo.numbersData.map((el, index) => {
            <div className="numberVideo">
              <iframe
                className="video"
                key={index}
                src={el.videoId}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>{el.title}</p>
            </div>;
          })}
        </div>
      </div>
    </div>
    // <div>
    //   <div className="pfInfo">
    //     <ul className="pfInfoTextWrap">
    //       <li className="pfTitleWrap">
    //         <h4 className="pfTitle">몬테크리스토</h4>
    //         <span className="cGreen">공연 중! &nbsp;</span>
    //         <span>공연 종료</span>
    //       </li>
    //       <li>
    //         <p className="pfItem">줄거리</p>
    //         <div className="pfStory">
    //           정의는 갖는 자의 것, 사랑은 주는 자의 것촉망 받는 젊은 선원
    //           에드몬드 단테스는 아름다운 메르세데스와 결혼을 앞두고 있지만,
    //           그녀를 흠모하는 몬데고와 선장자리를 차지하려는 당글라스, 정치적
    //           야심을 가진 빌포트 검사장의 모함과 음모로 억울한 누명을 쓰고 악명
    //           높은 감옥 섬 쌰또 디프에 갇히게 되는데...
    //         </div>
    //       </li>
    //       <li>
    //         <p className="pfItem">출연진</p>
    //         <div>엄기준, 신성록, 옥주현, 이지혜, 최민철, 김준현, 강태을 등</div>
    //       </li>
    //     </ul>
    //     <div className="pfInfoImgWrap">
    //       <img className="pfPoster" alt="작품 포스터 이미지" />
    //       <button id="btnBookmark">
    //         <ImHeart className="iconBtn" />
    //         북마크 추가
    //       </button>
    //     </div>
    //   </div>
    //   <div className="pfNumberWrap">
    //     <p className="pfItem">대표넘버</p>
    //     {/* 넘버리스트 구현 필요 */}
    //     <div className="pfNumberList">
    //       <div className="numberVideo">
    //         <iframe
    //           className="video"
    //           src="https://www.youtube.com/embed/dZ55pb_edC0"
    //           frameBorder="0"
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //         ></iframe>
    //         <p>너희에게 선사하는 지옥</p>
    //       </div>
    //       <div className="numberVideo">
    //         <iframe
    //           className="video"
    //           src="https://www.youtube.com/embed/pH8Cq5uMSqw"
    //           frameBorder="0"
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //         ></iframe>
    //         <p>너희에게 선사하는 지옥</p>
    //       </div>
    //       <div className="numberVideo">
    //         <iframe
    //           className="video"
    //           src="https://www.youtube.com/embed/fD9VU6NvN8I"
    //           frameBorder="0"
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //         ></iframe>
    //         <p>너희에게 선사하는 지옥</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default PerformanceInfo;
