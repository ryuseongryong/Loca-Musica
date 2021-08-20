import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/Header.css";
import { GoSearch } from "react-icons/go";
import { signout } from "../actions/index";

function Header() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { isSignin, userInfo } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
    };
  });

  // 로그아웃 핸들러
  const signoutRequestHandler = () => {
    axios
      .post(`${process.env.REACT_APP_END_POINT}/user/signout`, null, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(signout());
      })
      .then((res) => {
        // dispatch(notify('bye'))
        console.log("bye");
        history.push("/musical/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 제목 검색 
  const filterTitleMusical = (event) => {
    let filterTitle = document.querySelector('#headerSearchTitleInput').value;
    console.log('입력 title', filterTitle);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_END_POINT}/musical`,
      params: {
        title: filterTitle,
      }
    }).then((res) => {
      /* res.data.data = {검색된 뮤지컬 객체} -> 객체 1개만 return
      data : {
      actors: "타잔"
      code: "PF177939"
      contents: "아~~~~~~~~~아아아~~~~~~~~~~~아~~~~아아아아아아~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
      id: 13
      state: "공연완료"
      thumbnail: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF177939_210804_095959.gif"
      title: "정글북"
      }
      */
      // res.data.data 값을 전달해야 한다 -> 1.redux이용 2.app.js에서 state만들어서 전달
      console.log(res.data.data);
      history.push('/musical/main'); // 메인페이지 이동
    })
      .catch(function (error) {
        // 서버가 연결되어 있는 경우 에러처리
        if (error.response) {
          // 찾는 결과가 없는 경우(404)
          if (error.response.status === 404) {
            alert('조건에 해당하는 뮤지컬이 없습니다')
          }
          // 서버 에러(500)
          else {
            alert('서버에러가 발생하였습니다.')
          }
        }
      });

  }
  // 추천받기 버튼 클릭시 사용자 추천 시스템 화면 이동
  const goRecommend = (event) => {
    history.push('/search');
    // window.location.reload();
  }

  return (
    <div className="header-main">
      <div className="header-logo">
        <a href="/" className="logo">
          Loca Musica
        </a>
      </div>
      <div className="header-section1">
        {/* <Link to="/search" className="header-link-router"> */}
        <div className="recommend-musical-button" onClick={goRecommend}>
          뮤지컬 추천 &nbsp;{">"}
          {/* <FiChevronRight className='header-search-btn-icon' /> */}
        </div>
        {/* </Link> */}
      </div>
      <div className="header-section2">
        {/* admin일 경우에만 작품등록 버튼이 보이도록 설정 */}
        {userInfo.admin === 1 ? (
          <Link to="/admin" className="header-link-router">
            <div className="admin-musical-post-button">작품 등록</div>
          </Link>
        ) : null}
      </div>
      <div className="header-section3">
        <div className="search-div">
          <div className="search-icon-div">
            <GoSearch className="search-icon" onClick={filterTitleMusical} />
          </div>
          <div className="search-input-div">
            <input className="search-input" placeholder="뮤지컬 검색" id='headerSearchTitleInput'></input>
          </div>
        </div>
      </div>
      {/* 로그인 상태에 따라 보이는 버튼이 달라지도록 설정 */}
      <div className="header-section4">
        {isSignin ? (
          <Link to="/user/info" className="header-link-router">
            <div className="signin-button">마이페이지</div>
          </Link>
        ) : (
          <Link to="/user/signin" className="header-link-router">
            <div className="signin-button">로그인</div>
          </Link>
        )}
      </div>
      <div className="header-section5">
        {isSignin ? (
          <div className="signout-button" onClick={signoutRequestHandler}>
            로그아웃
          </div>
        ) : (
          <Link to="/user/signup" className="header-link-router">
            <div className="signup-button">회원가입</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
