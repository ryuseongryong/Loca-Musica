/*eslint-disable*/

import '../css/detail.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerformanceInfo from '../components/performanceInfo';
import PerformanceTag from '../components/performanceTag';
import Footer from '../components/footer';
import { useHistory } from "react-router-dom"; // 페이지 이동


function Detail() {
  // 상태관리
  const dispatch = useDispatch();
  const { isSignin, userInfo } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
    };
  });
  // console.log("사용자정보를 보여줘", userInfo);
  // console.log("뷱마크리스트를 보여줘", bookmarkList);
  const [performanceInfo, setPerformanceInfo] = useState({
    id: '',
    code: '',
    title: '',
    thumbnail: '',
    contents: '',
    state: '',
    actors: '',
    numbersData: [],
    hashtagsData: [],
  });

  // 작품정보 가져오기
  useEffect(() => {
    // 페이지 이동하면 쿼리에서 title만 가져오면..
    const url = new URL(window.location.href);
    const title = decodeURI(url.pathname.slice(9));

    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {
        // 응답으로 받은 데이터로 현재 페이지에서의 작품정보를 state로 관리
        // console.log(res.data.data);
        setPerformanceInfo(res.data.data);
      })
      .catch((err) => {
        console.log('작품정보를 불러오지 못한 이유는?', err);
      });
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
    }

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_END_POINT}/musical/${performanceInfo.title}`,
      withCredentials: true,
    })
      .then((res) => {
        sendData.numbersData = res.data.data.numbersData;
        sendData.hashtagsData = res.data.data.hashtagsData; // 해시태그 변동성 때문에 최신 해시태그 값을 가져옴(추가,삭제)
        history.push({
          pathname: '/adminEdit', // 게시글 변경 페이지 이동
          props: sendData // 게시글 상세 정보 전달
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  //! Edit Musical [code end]
  //! Delete Musical [code start]
  const adminDeleteMusical = (event) => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_END_POINT}/admin/delete/${performanceInfo.title}`,
      withCredentials: true,
    })
      .then((res) => {
        alert('게시글이 삭제되었습니다!');
        history.push('/musical/main'); // 삭제후 메인 이동
      })
  }
  //! Delete Musical [code end]

  // 핸들러함수
  return (
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
          <PerformanceTag
            performanceInfo={performanceInfo}
            isSignin={isSignin}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
