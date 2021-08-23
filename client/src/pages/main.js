import axios from "axios";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import "../css/Main.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeAllMusicalInfo } from '../actions/index';
import { AiOutlineVerticalAlignTop } from "react-icons/ai";

function Main() {
  const [allMusical, setAllMusical] = useState([]);
  const [allHashtag, setAllHashtag] = useState([]);
  const [searchHashtagMusical, setSearchHashtagMusical] = useState(0); // sidebar hashtag 클릭시 검색결과
  const [clickHashtag, setClickHashtag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_END_POINT}/musical/main`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.data);
      /*
      {
        allHashtagsData : [{id: 26, musicalCount: 4, name: "드라마", totalLikeCount: 4 }, {~}, ...],
        allMusicalsData : [{actors: "유성룡", code: "PF178138", contents: "자료구조/알고리즘 트라우마에 시달리는 성룡이",
                            id: 11, state: "공연완료", thumbnail: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF178138_210809_130056.gif",
                            title: "트라우마"}, {~}, ...]
      }
      */
      // all musical
      dispatch(storeAllMusicalInfo(res.data.data.allMusicalsData));
      setAllMusical(res.data.data.allMusicalsData);
      // hasgtag
      let userHashtag = res.data.data.allHashtagsData.filter((el) => {
        return (
          el.name !== "드라마" &&
          el.name !== "로맨스" &&
          el.name !== "판타지" &&
          el.name !== "코미디" &&
          el.name !== "역사" &&
          el.name !== "스릴러" &&
          el.name !== "가족" &&
          el.name !== "혼자" &&
          el.name !== "연인과함께" &&
          el.name !== "가족과함께" &&
          el.name !== "친구와함께" &&
          el.name !== "아이와함께" &&
          el.name !== "동료와함께"
        );
      });
      let sortUserHashtag = userHashtag.sort(
        (a, b) => b.totalLikeCount - a.totalLikeCount
      ); // '총 좋아요 수' 내림차순(높은 순서 -> 낮은 순서)
      setAllHashtag(sortUserHashtag);
      // server가 정상적으로 연결해서 통신이 완료 되었으므로 로딩페이지 제거
      // 0.5초후 state변수 변경
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  // 해시태그 클릭시
  const searchHashtag = (event) => {
    setIsLoading(true); // loading 표시 출력
    let hashtag = event.target.textContent;
    setClickHashtag(hashtag);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_END_POINT}/search`,
      withCredentials: true,
      params: {
        hashtag1: hashtag
      }
    })
      .then((res) => {
        // console.log(res.data.data); // [{id : 15, thumbnail : '~', title : '~'}, {~}, ...] (필터링된 뮤지컬 목록)
        // 0.5초후 state변수 변경
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setSearchHashtagMusical(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이미지 클릭시
  const gotoDetail = (event) => {
    let title = event.target.nextSibling.value; // 클릭한 뮤지컬 title 얻기
    history.push(`/musical/${title}`);
  };

  // 모든 뮤지컬 조회 클릭
  const backToAllMusical = (event) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_END_POINT}/musical/main`,
      withCredentials: true,
    })
      .then((res) => {
        setAllMusical(res.data.data.allMusicalsData); // all musical 갱신
        setSearchHashtagMusical(0); // 해시태그 클릭 안한 상태로 변경
        setClickHashtag(''); // 클릭한 해시태그 초기화
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // top버튼 클릭 맨위 이동
  const gotoTop = (event) => {
    window.scrollTo(0, 0);
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤이 올라감
  }

  return (
    <div className="main-wrap">
      {/* <Loader /> */}
      {/* main 대신 musical로 변경 */}
      <div className="main-section1">
        <div className="main-sidebar-genre-div">
          <p className="main-sidebar-genre-info">장르</p>
          <ul className="main-sidebar-genreList">
            <li className="main-sidebar-genre" onClick={searchHashtag}>
              드라마
            </li>
            <li className="main-sidebar-genre" onClick={searchHashtag}>
              로맨스
            </li>
            <li className="main-sidebar-genre" onClick={searchHashtag}>
              판타지
            </li>
            <li className="main-sidebar-genre" onClick={searchHashtag}>
              코미디
            </li>
            <li className="main-sidebar-genre" onClick={searchHashtag}>
              역사
            </li>
            <li className="main-sidebar-genre" onClick={searchHashtag}>
              스릴러
            </li>
            <li className="main-sidebar-genre" onClick={searchHashtag}>
              가족
            </li>
          </ul>
        </div>
        <div className="main-sidebar-withPeople-div">
          <p className="main-sidebar-withPeople-info">누구와 함께</p>
          <ul className="main-sidebar-withPeopleList">
            <li className="main-sidebar-withPeople" onClick={searchHashtag}>
              혼자
            </li>
            <li className="main-sidebar-withPeople" onClick={searchHashtag}>
              연인과함께
            </li>
            <li className="main-sidebar-withPeople" onClick={searchHashtag}>
              가족과함께
            </li>
            <li className="main-sidebar-withPeople" onClick={searchHashtag}>
              친구와함께
            </li>
            <li className="main-sidebar-withPeople" onClick={searchHashtag}>
              아이와함께
            </li>
            <li className="main-sidebar-withPeople" onClick={searchHashtag}>
              동료와함께
            </li>
          </ul>
        </div>
        <div className="main-sidebar-hashtag-div">
          <p className="main-sidebar-hashtag-info">해시태그</p>
          <ul className="main-sidebar-hashtagList">
            {allHashtag.map((el, index) => (
              <li
                className="main-sidebar-hashtag"
                onClick={searchHashtag}
                key={index}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isLoading ?
        // 로딩중
        <div className='main-section2-loading'>
          <Loader />
        </div>
        :
        // 로딩이 끝난 후
        <div className='main-section2'>
          {searchHashtagMusical === 0 ?
            <div className='main-musicalList-info'>분류 : 모든 뮤지컬</div>
            :
            <div className='main-musicalList-info'>분류 : {clickHashtag} 검색결과</div>
          }
          <ul className='main-musicalList'>
            {searchHashtagMusical === 0 ?
              // 해시태그 클릭을 하지 않는 상태(초기상태) 
              allMusical.length === 0 ? <li className='main-noSearch'>등록된 뮤지컬이 없습니다.</li>
                :
                allMusical.map((el, index) =>
                  <li className='main-musical' key={index}>
                    <img className='main-musical-image' src={el.thumbnail}
                      alt='main-musical-post' onClick={gotoDetail} />
                    <input type='hidden' value={el.title} />
                  </li>)
              :
              // 해시태그를 클릭한 상태
              searchHashtagMusical.length === 0 ? <li className='main-noSearch'>검색결과가 없습니다.</li>
                :
                searchHashtagMusical.map((el, index) =>
                  <li className='main-musical' key={index}>
                    <img className='main-musical-image' src={el.thumbnail}
                      alt='main-musical-post' onClick={gotoDetail} />
                    <input type='hidden' value={el.title} />
                  </li>)
            }
          </ul>
          <div className='back-allMusical-div'>
            {/* 현재 클릭한 해시태그가 있는 경우 모든 뮤지컬 조회 버튼이 출력되도록 설정 */}
            {clickHashtag === '' ?
              ''
              :
              <button className='back-allMusical-btn' onClick={backToAllMusical}>모든 뮤지컬 조회</button>
            }
          </div>
        </div>
      }
      <div className='main-section3'>
        <button className='main-top-btn' onClick={gotoTop}><AiOutlineVerticalAlignTop className='main-top-icon' /></button>
      </div>
    </div>
  );
}

export default Main;
