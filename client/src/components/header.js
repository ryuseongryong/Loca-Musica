import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/Header.css";
import { signout, notify, rememberPathname } from "../actions/index";

import Searchbar from "./searchbar";

function Header() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { isSignin, userInfo, pathname } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
      pathname: state.pathnameReducer.pathname,
    };
  });
  // console.log(pathname);

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
        // dispatch(notify("로그아웃 되었습니다"));
        console.log("로그아웃 되었습니다");
        dispatch(rememberPathname("/musical/main"));
      })
      .then((res) => {
        history.push("/musical/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 추천받기 버튼 클릭시 사용자 추천 시스템 화면 이동
  const goRecommend = (event) => {
    // history.push("/search");
    // window.location.reload();
    const url = new URL(window.location.href)
    // 같은 url내에서 새로고침 효과
    if (url.pathname.includes("/search")) {
      if (url.host === "localhost:3000") {
        window.location.assign(`http://localhost:3000/search`);
      }
      else if (url.host === "loca-musica.com") {
        window.location.assign(`https://loca-musica.com/search`);
      }
    }
    else {
      history.push(`/search`);
    }
  };
  // 메인 이동
  const gotoMain = (event) => {
    const url = new URL(window.location.href)
    // 같은 url내에서 새로고침 효과
    if (url.pathname.includes("/musical/main")) {
      if (url.host === "localhost:3000") {
        window.location.assign(`http://localhost:3000/musical/main`);
      }
      else if (url.host === "loca-musica.com") {
        window.location.assign(`https://loca-musica.com/musical/main`);
      }
    }
    else {
      history.push(`/musical/main`);
    }
  }

  return (
    <div className="header-main">
      <div className="header-logo">
        <div className="logo" onClick={gotoMain}>
          Loca Musica
        </div>
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
        <Searchbar />
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
