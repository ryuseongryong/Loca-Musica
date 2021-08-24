import '../css/Search.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Slider from "react-slick";
import { Link } from 'react-router-dom';
import MusicalBaseImage from '../images/musical_baseimage.jpg';
import Footer from "../components/footer";


function Search({
  setIsRecommend,
  setRecommendUserHashtag,
  recommendMusicalList,
}) {
  // react-slider require object
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true,
  // };

  // recommendUserHashtag = [hashtag1 [,hashtag2] [,hashtag3]] / 사용자에게 받은 해시태그

  // 다시 추천 받기
  const replayRecommend = () => {
    // 사용자가 이전에 지정한 hashtag들 빈 배열로 초기화
    setRecommendUserHashtag([]);
    // 추천을 받는 페이지 전환
    setIsRecommend(true);
  };

  return (
    <div className="search-container">
      <div className="search-main">
        <div className="search-section1"></div>
        <div className="search-section2">
          <div className="search-section2-top">
            <div className="search-result-info-div">
              <p className="search-result-info">
                선택하신 결과에 따른 추천 작품입니다.
              </p>
            </div>
          </div>
          <div className="search-section2-middle">
            <ul className="search-result-list">
              {/* li wireFrame */}
              {/* <li className="search-result-musical">
                <img
                  src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF156128_191015_094221.jpg"
                  alt="musical-image"
                  className="search-result-musical-image"
                />
              </li> */}
              {recommendMusicalList.length !== 0 ? (
                recommendMusicalList.map((el, index) => (
                  <li className="search-result-musical" key={index}>
                    <Link
                      to={`/musical/${el.title}`}
                      className="goto-detailLink"
                    >
                      <img
                        src={el.thumbnail}
                        alt={MusicalBaseImage}
                        className="search-result-musical-image"
                      />
                    </Link>
                  </li>
                ))
              ) : (
                <li className="search-result-musical">
                  <p className="no-search-result">이런! 추천결과가 없습니다.</p>
                </li>
              )}
            </ul>
          </div>
          <div className="search-section2-bottom">
            <button className="search-replay-btn" onClick={replayRecommend}>
              다시 추천받기 &nbsp;{'>'}
            </button>
          </div>
        </div>
        <div className="search-section3"></div>
      </div>
      <div className='search-footer-div'>
        <Footer />
      </div>
    </div>
  );
}

export default Search;
