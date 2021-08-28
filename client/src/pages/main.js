import axios from "axios";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import "../css/Main.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeAllMusicalInfo } from '../actions/index';
import Footer from "../components/footer";
import { CgChevronRight } from "react-icons/cg";
import { CgChevronDown } from "react-icons/cg";
import { BiArrowToTop } from "react-icons/bi";


function Main() {
  const [allMusical, setAllMusical] = useState([]);
  const [allHashtag, setAllHashtag] = useState([]);
  const [searchHashtagMusical, setSearchHashtagMusical] = useState(0); // sidebar hashtag 클릭시 검색결과
  const [clickHashtag, setClickHashtag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hashtagDropDown, setHashtagDropDown] = useState(false); // false면 해시태그 리스트가 안보임
  const [hiddenCategory, setHiddenCategory] = useState(false); // 768px이하 카테고리 보여지게 설정, false면 안보임
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
    })
      .catch((err) => {
        console.log(err);
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
        setSearchHashtagMusical(res.data.data);
        setHiddenCategory(false); // 768px이하 화면에서 카테고리 클릭시 카테고리 div 안보이도록 설정
        // document.querySelector('.main-container').scroll(0, 0);
        window.scrollTo(0, 0); // 최상단 이동
        setHashtagDropDown(false);
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
        document.querySelector('.main-container').scroll(0, 0); // 스크롤이 생긴 태그 지정후 scroll()함수 이용하여 맨위 이동
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // top버튼 클릭 맨위 이동
  const gotoTop = (event) => {
    document.querySelector('.main-container').scroll(0, 0); // 스크롤이 생긴 태그 지정후 scroll()함수 이용하여 맨위 이동
    // window.scrollTo(0, 0);
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤이 올라감
  }

  // 뮤지컬을 나타내는 li가 각각 다른 높이를 가질 수 있도록 랜덤으로 각 li 높이를 다르게 지정해준다
  // 클래스명 main-musical-one ~ main-musical-five까지 (0~4, 5개 숫자 랜덤)
  // masonry layout에서 사용하는 함수, 임의값을 랜덤하게 생성해서 새로 생성되는 요소에 높이를 임의로 지정하게 해서 서로 다른 높이을 가진 요소를 정렬
  // const randomHeight = () => {
  //   let randomIndex = Math.floor(Math.random() * 5);
  //   switch (randomIndex) {
  //     case 0: return 'one';
  //     case 1: return 'two';
  //     case 2: return 'three';
  //     case 3: return 'four';
  //     case 4: return 'five';
  //   }
  // }

  const showHashtag = (event) => {
    // 일반 화면에서 해시태그 클릭시 value = 'noHidden'
    // 768px이하 화면에서 해시태그 클릭시 value = 'hidden'
    // 오류 발생시 강제 종료
    if (event.target.nextSibling === null) {
      return;
    }
    const value = event.target.nextSibling.value;
    let hatagList = '';
    // 일반 화면에서 해시태그 클릭시 보이도록 일반화면 해시태그 ul선택
    if (value === 'noHidden') {
      hatagList = document.querySelectorAll('.main-sidebar-hashtagList')[0];
    }
    // 786px이하 화면에서 해시태그 클릭시 보이도록 768px이하 화면 해시태그 ul선택
    else {
      hatagList = document.querySelectorAll('.main-sidebar-hashtagList')[1];
    }
    // 현재 해시태그 리스트가 안보일 경우 보이도록 설정(클래스명에 noShow/noShow-wide 가 있으면 제거, 보이도록 show/show-wide추가)
    if (hatagList.classList.contains('noShow')) {
      hatagList.classList.remove('noShow');
      hatagList.classList.add('show');
      setHashtagDropDown(true);
    }
    else if (hatagList.classList.contains('noShow-wide')) {
      hatagList.classList.remove('noShow-wide');
      hatagList.classList.add('show-wide');
      setHashtagDropDown(true);
    }
    // 현재 해시태그 리스트가 보일 경우 안보이도록 설정(클래스명에 noShow/noShow-wide 추가, 보이는 show/show-wide 제거)
    else if (hatagList.classList.contains('show-wide')) {
      hatagList.classList.remove('show-wide');
      hatagList.classList.add('noShow-wide');
      setHashtagDropDown(false);
    }
    else {
      hatagList.classList.remove('show');
      hatagList.classList.add('noShow');
      setHashtagDropDown(false);
    }
  }

  // 768px이하 화면에서 카테고리 클릭시 카테고리들이 보이거나 사라지도록 설정
  const showHiddenCategory = () => {
    if (!hiddenCategory === false) {
      setHashtagDropDown(false); // 만약 해시태그를 보여지고 있는 상태에서 카테고리를 끌 경우 해시태그도 사라지도록 설정(icon변경 목적)
    }
    setHiddenCategory(!hiddenCategory);
  }

  const showHashtagForIcon = (value) => {
    let hatagList = '';
    // 일반 화면에서 해시태그 클릭시 보이도록 일반화면 해시태그 ul선택
    if (value === 'noHidden') {
      hatagList = document.querySelectorAll('.main-sidebar-hashtagList')[0];
    }
    // 786px이하 화면에서 해시태그 클릭시 보이도록 768px이하 화면 해시태그 ul선택
    else {
      hatagList = document.querySelectorAll('.main-sidebar-hashtagList')[1];
    }
    // 현재 해시태그 리스트가 안보일 경우 보이도록 설정(클래스명에 noShow/noShow-wide 가 있으면 제거, 보이도록 show/show-wide추가)
    if (hatagList.classList.contains('noShow')) {
      hatagList.classList.remove('noShow');
      hatagList.classList.add('show');
      setHashtagDropDown(true);
    }
    else if (hatagList.classList.contains('noShow-wide')) {
      hatagList.classList.remove('noShow-wide');
      hatagList.classList.add('show-wide');
      setHashtagDropDown(true);
    }
    // 현재 해시태그 리스트가 보일 경우 안보이도록 설정(클래스명에 noShow/noShow-wide 추가, 보이는 show/show-wide 제거)
    else if (hatagList.classList.contains('show-wide')) {
      hatagList.classList.remove('show-wide');
      hatagList.classList.add('noShow-wide');
      setHashtagDropDown(false);
    }
    else {
      hatagList.classList.remove('show');
      hatagList.classList.add('noShow');
      setHashtagDropDown(false);
    }
  }

  return (
    <>
      {isLoading ?
        // 로딩중
        <div className='main-section2-loading'>
          <Loader />
        </div>
        :
        <div>
        <div className="main-wrap">
          {/* main 대신 musical로 변경 */}
          <div className='main-container'>
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
                <p className="main-sidebar-hashtag-info" onClick={showHashtag}>해시태그
                  {hashtagDropDown ? <CgChevronDown size='22' onClick={() => showHashtagForIcon('noHidden')} />
                    : <CgChevronRight size='22' onClick={() => showHashtagForIcon('noHidden')} />}
                </p>
                <input type='hidden' value='noHidden' />
                {/* 만약 해시태그는 클릭해야 보이지만 해시태그 리스트의 height는 유지하고 싶을 경우 noShow-wide className사용 */}
                {/* noShow / noShow-wide : 둘 다 해시태그 리스트가 클릭 전까지는 안보이지만 noShow-wide는 높이는 유지한다 */}
                {/* <ul className="main-sidebar-hashtagList noShow-wide"> */}
                <ul className="main-sidebar-hashtagList noShow">
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
            {/* 768px이하 화면에서 카테고리 화면 */}
            {hiddenCategory ?
              <div className='main-hidden-category-div'>
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
                  <p className="main-sidebar-hashtag-info" onClick={showHashtag}>해시태그
                    {hashtagDropDown ? <CgChevronDown size='22' onClick={() => showHashtagForIcon('hidden')} />
                      : <CgChevronRight size='22' onClick={() => showHashtagForIcon('hidden')} />}
                  </p>
                  <input type='hidden' value='hidden' />
                  <ul className="main-sidebar-hashtagList noShow">
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
              : ''}
            <div className='main-section2'>
              <div className='main-hidden-category-info'>
                <div className='main-hidden-category-info-left' onClick={showHiddenCategory}>카테고리
                  {hiddenCategory ? <CgChevronDown size='22' onClick={() => showHiddenCategory()} />
                    : <CgChevronRight size='22' onClick={() => showHiddenCategory()} />}
                </div>
                {searchHashtagMusical === 0 ?
                  <div className='main-hidden-category-info-right'>분류 : 모든 뮤지컬</div>
                  :
                  <div className='main-hidden-category-info-right'>분류 : {clickHashtag} 검색결과</div>
                }
              </div>
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
                      // <li className={`main-musical-${randomHeight()}`} key={index}>
                      <li className={`main-musical`} key={index}>
                        <img className='main-musical-image' src={el.thumbnail}
                          alt='main-musical-post' onClick={gotoDetail} />
                        <input type='hidden' value={el.title} />
                      </li>)
                  :
                  // 해시태그를 클릭한 상태
                  searchHashtagMusical.length === 0 ? <li className='main-noSearch'>검색결과가 없습니다.</li>
                    :
                    searchHashtagMusical.map((el, index) =>
                      // <li className={`main-musical-${randomHeight()}`} key={index}>
                      <li className={`main-musical`} key={index}>
                        <img className='main-musical-image' src={el.thumbnail}
                          alt='main-musical-post' onClick={gotoDetail} />
                        <input type='hidden' value={el.title} />
                      </li>)
                }
                {/* 758px ~ 376px에서 사용할 layout용, left로 정렬되기 위해서 지정 / 1~3개가 있을때 중앙에 배치되는 것을 방지 */}
                <li className='filling-empty-space'></li>
                <li className='filling-empty-space'></li>
                <li className='filling-empty-space'></li>
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
            {/* <div className='main-section3'>
            </div> */}
          </div>
          <button className='main-top-btn' onClick={gotoTop}><BiArrowToTop className='main-top-icon' /></button>
          
        </div>
        <Footer className='main-footer' />
        </div>
      }
    </>
  );
}

export default Main;
