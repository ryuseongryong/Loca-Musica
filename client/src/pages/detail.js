/*eslint-disable*/

import "../css/detail.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remaveBookmark, rememberPathname } from "../actions/index";
import PerformanceInfo from "../components/performanceInfo";
import PerformanceTag from "../components/performanceTag";
import Footer from "../components/footer";

function Detail() {
  // 상태관리
  const dispatch = useDispatch();
  const { isSignin, userInfo, pathname } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
      pathname: state.pathnameReducer.pathname,
    };
  });
  // console.log("저장된 패스네임은??", pathname);

  // console.log("사용자정보를 보여줘", userInfo);
  const [performanceInfo, setPerformanceInfo] = useState({
    id: "",
    code: "",
    title: "",
    thumbnail: "",
    contents: "",
    state: "",
    actors: "",
    numbersData: [],
    hashtagsData: [],
  });

  // 작품정보 가져오기
  useEffect(() => {
    // 첫 방문 시에 url에서 작품 제목을 받아오기
    const url = new URL(window.location.href);
    const title = decodeURI(url.pathname.slice(9));
    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPerformanceInfo(res.data.data);
      })
      .catch((err) => {
        console.log("작품정보를 불러오지 못한 이유는?", err);
      });

    // 첫 방문 시에 url에서 pathname을 받아와서 redux상태 관리에 사용
    dispatch(rememberPathname(decodeURI(url.pathname)));
  }, []);

  // 핸들러함수
  return (
    <div className="detailPageWrap">
      <div id="detailPage">
        {userInfo.admin === 1 ? (
          <div className="adminBtnWrap">
            <button>수정</button>
            <button>삭제</button>
          </div>
        ) : null}
        <div className="pfInfoContainer">
          <PerformanceInfo
            performanceInfo={performanceInfo}
            isSignin={isSignin}
          />
          <PerformanceTag userInfo={userInfo} isSignin={isSignin} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
