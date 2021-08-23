import axios from "axios";
import Loader from '../components/loader'
import { useEffect, useState } from "react";
import '../css/Main.css';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeAllMusicalInfo } from '../actions/index';

function Main() {
  const [allMusical, setAllMusical] = useState([]);
  const [allHashtag, setAllHashtag] = useState([]);
  const [searchHashtagMusical, setSearchHashtagMusical] = useState([]); // sidebar hashtag 클릭시 검색결과
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
        return el.name !== '드라마' && el.name !== '로맨스' && el.name !== '판타지' && el.name !== '코미디' && el.name !== '역사'
          && el.name !== '스릴러' && el.name !== '가족' && el.name !== '혼자' && el.name !== '연인과함께' && el.name !== '가족과함께'
          && el.name !== '친구와함께' && el.name !== '아이와함께' && el.name !== '동료와함께'
      })
      let sortUserHashtag = userHashtag.sort((a, b) => b.totalLikeCount - a.totalLikeCount); // '총 좋아요 수' 내림차순(높은 순서 -> 낮은 순서)
      setAllHashtag(sortUserHashtag);
    });
  }, []);

  // 해시태그 클릭시
  const searchHashtag = (event) => {
    let hashtag = event.target.textContent;
    axios({
      method: "get",
      url: `${process.env.REACT_APP_END_POINT}/search/${hashtag}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // 이미지 클릭시
  const gotoDetail = (event) => {
    let title = event.target.nextSibling.value; // 클릭한 뮤지컬 title 얻기
    history.push(`/musical/${title}`);
  }

  return (
    <div className="allPageWrap">
      <Loader/>
      {/* main 대신 musical로 변경 */}
      <div className='main-section1'>
        <div className='main-sidebar-genre-div'>
          <p className='main-sidebar-genre-info'>장르</p>
          <ul className='main-sidebar-genreList'>
            <li className='main-sidebar-genre' onClick={searchHashtag}>드라마</li>
            <li className='main-sidebar-genre' onClick={searchHashtag}>로맨스</li>
            <li className='main-sidebar-genre' onClick={searchHashtag}>판타지</li>
            <li className='main-sidebar-genre' onClick={searchHashtag}>코미디</li>
            <li className='main-sidebar-genre' onClick={searchHashtag}>역사</li>
            <li className='main-sidebar-genre' onClick={searchHashtag}>스릴러</li>
            <li className='main-sidebar-genre' onClick={searchHashtag}>가족</li>
          </ul>
        </div>
        <div className='main-sidebar-withPeople-div'>
          <p className='main-sidebar-withPeople-info'>누구와 함께</p>
          <ul className='main-sidebar-withPeopleList'>
            <li className='main-sidebar-withPeople' onClick={searchHashtag}>혼자</li>
            <li className='main-sidebar-withPeople' onClick={searchHashtag}>연인과함께</li>
            <li className='main-sidebar-withPeople' onClick={searchHashtag}>가족과함께</li>
            <li className='main-sidebar-withPeople' onClick={searchHashtag}>친구와함께</li>
            <li className='main-sidebar-withPeople' onClick={searchHashtag}>아이와함께</li>
            <li className='main-sidebar-withPeople' onClick={searchHashtag}>동료와함께</li>
          </ul>
        </div>
        <div className='main-sidebar-hashtag-div'>
          <p className='main-sidebar-hashtag-info'>해시태그</p>
          <ul className='main-sidebar-hashtagList'>
            {allHashtag.map((el, index) => <li className='main-sidebar-hashtag' onClick={searchHashtag} key={index}>{el.name}</li>)}
          </ul>
        </div>
      </div>
      <div className='main-section2'>
        <div className='main-musicalList-info'>분류 : 모든 뮤지컬</div>
        <ul className='main-musicalList'>
          {allMusical.length === 0 ? <li>등록된 뮤지컬이 없습니다.</li>
            :
            allMusical.map((el, index) =>
              <li className='main-musical' key={index}>
                <img className='main-musical-image' src={el.thumbnail}
                  alt='main-musical-post' onClick={gotoDetail} />
                <input type='hidden' value={el.title} />
              </li>)
          }
        </ul>
      </div>
      <div className='main-section3'></div>
    </div>
  );
}

export default Main;
