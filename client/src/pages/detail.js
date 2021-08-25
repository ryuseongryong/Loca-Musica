/*eslint-disable*/

import "../css/detail.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rememberPathname } from "../actions/index";
import PerformanceInfo from "../components/performanceInfo";
import PerformanceTag from "../components/performanceTag";
import Footer from "../components/footer";
import Loader from "../components/loader";
import { useHistory } from "react-router-dom"; // 페이지 이동

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

  // 현재페이지에서만 관리되는 state
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
  const [isLoading, setIsLoading] = useState(true);

  // const _url = new URL(window.location.href)
  // const [url, setUrl] = useState(_url);
  // const [title, setTitle] = useState(decodeURI(_url.pathname.slice(9)))

  // 작품정보 가져오기
  useEffect(() => {
    // 첫 방문 시에 url에서 작품 제목을 받아오기
    const url = new URL(window.location.href);
    const title = decodeURI(url.pathname.slice(9));
    console.log("url: ", url, "title: ", title);
    console.log("useEffect 가 실행되었습니다.");
    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPerformanceInfo(res.data.data);
      })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("작품정보를 불러오지 못한 이유는?", err);
      });

    // 첫 방문 시에 url에서 pathname을 받아와서 redux상태 관리에 사용
    dispatch(rememberPathname(decodeURI(url.pathname)));
  }, []);

  //! Edit Musical [code start]
  const history = useHistory();
  const adminEditMusical = (event) => {
    let sendData = {
      id: performanceInfo.id,
      code: performanceInfo.code,
      title: performanceInfo.title,
      thumbnail: performanceInfo.thumbnail,
      contents: performanceInfo.contents,
      state: performanceInfo.state,
      actors: performanceInfo.actors,
      numbersData: [],
      hashtagsData: [],
    };

    axios({
      method: "get",
      url: `${process.env.REACT_APP_END_POINT}/musical/${performanceInfo.title}`,
      withCredentials: true,
    })
      .then((res) => {
        sendData.numbersData = res.data.data.numbersData;
        sendData.hashtagsData = res.data.data.hashtagsData; // 해시태그 변동성 때문에 최신 해시태그 값을 가져옴(추가,삭제)
        history.push({
          pathname: "/adminEdit", // 게시글 변경 페이지 이동
          props: sendData, // 게시글 상세 정보 전달
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //! Edit Musical [code end]
  //! Delete Musical [code start]
  const adminDeleteMusical = (event) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_END_POINT}/admin/delete/${performanceInfo.title}`,
      withCredentials: true,
    }).then((res) => {
      alert("게시글이 삭제되었습니다!");
      history.push("/musical/main"); // 삭제후 메인 이동
    });
  };
  //! Delete Musical [code end]

  // 핸들러함수
  return (
    <>
      {isLoading ? (
        <div className="detailPageLoader">
          <Loader />
        </div>
      ) : (
        <div className="detailPageWrap">
          <div id="detailPage">
            {userInfo.admin === 1 ? (
              <div className="adminBtnWrap">
                <button onClick={adminEditMusical}>수정</button>
                <button onClick={adminDeleteMusical}>삭제</button>
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
      )}
    </>
  );
}

export default Detail;
