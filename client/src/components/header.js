import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/Header.css";
import { FiChevronRight } from "react-icons/fi";
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

  return (
    <div className="header-main">
      <div className="header-logo">
        <a href="/" className="logo">
          Loca Musica
        </a>
      </div>
      <div className="header-section1">
        <Link to="/search" className="header-link-router">
          <div className="recommend-musical-button">
            뮤지컬 추천 &nbsp;{">"}
            {/* <FiChevronRight className='header-search-btn-icon' /> */}
          </div>
        </Link>
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
            <GoSearch className="search-icon" />
          </div>
          <div className="search-input-div">
            <input className="search-input" placeholder="뮤지컬 검색"></input>
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
