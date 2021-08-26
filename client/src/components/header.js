import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/Header.css";
import { signout, notify, rememberPathname } from "../actions/index";
import { CgChevronRight } from "react-icons/cg";
import { BiSearchAlt2, BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import Searchbar from "./searchbar";
import { useState } from "react";

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
  // const userProfile = () => {
  //   if (userInfo.profile === null) {
  //   }
  // };
  const [isHiddenMeunOpen, setIsHiddenMeunOpen] = useState(false);
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
    // 모바일화면에서 이동 후 히든메뉴를 닫도록 처리
    setIsHiddenMeunOpen(!isHiddenMeunOpen);
  };

  // 추천받기 버튼 클릭시 사용자 추천 시스템 화면 이동
  const goRecommend = (event) => {
    // history.push("/search");
    // window.location.reload();
    const url = new URL(window.location.href);
    // 같은 url내에서 새로고침 효과
    if (url.pathname.includes("/search")) {
      if (url.host === "localhost:3000") {
        window.location.assign(`http://localhost:3000/search`);
      } else if (url.host === "loca-musica.com") {
        window.location.assign(`https://loca-musica.com/search`);
      }
    } else {
      history.push(`/search`);
    }
    // 모바일화면에서 이동 후 히든메뉴를 닫도록 처리
    setIsHiddenMeunOpen(!isHiddenMeunOpen);
  };
  // 메인 이동
  const gotoMain = (event) => {
    const url = new URL(window.location.href);
    // 같은 url내에서 새로고침 효과
    if (url.pathname.includes("/musical/main")) {
      if (url.host === "localhost:3000") {
        window.location.assign(`http://localhost:3000/musical/main`);
      } else if (url.host === "loca-musica.com") {
        window.location.assign(`https://loca-musica.com/musical/main`);
      }
    } else {
      history.push(`/musical/main`);
    }
  };

  // mobile header 동작 함수
  const hiddenMenuOpenHandler = () => {
    setIsHiddenMeunOpen(!isHiddenMeunOpen);
  };

  return (
    <div className="header-main">
      <div className="headerLeftSide">
        <div className="header-logo">
          <div className="logo" onClick={gotoMain}>
            Loca Musica
          </div>
        </div>
        <div className="header-section1">
          {/* <Link to="/search" className="header-link-router"> */}
          <div className="recommend-musical-button" onClick={goRecommend}>
            뮤지컬 추천 &nbsp;
            <CgChevronRight size="24" />
            {/* <FiChevronRight className='header-search-btn-icon' /> */}
          </div>
          {/* </Link> */}
        </div>
        {/* <div className="header-section2">
        {userInfo.admin === 1 ? (
          <Link to="/admin" className="header-link-router">
            <div className="admin-musical-post-button">작품 등록</div>
          </Link>
        ) : null}
      </div> */}
      </div>
      <div className="headerRightSide">
        <div className="header-section3">
          <Searchbar />
        </div>
        {/* 로그인 상태에 따라 보이는 버튼이 달라지도록 설정 */}
        <div className="header-section4">
          {!isSignin ? (
            <Link to="/user/signin" className="header-link-router">
              <div className="signin-button">로그인</div>
            </Link>
          ) : userInfo.admin === 1 ? (
            <Link to="/admin" className="header-link-router">
              <div className="admin-musical-post-button">작품 등록</div>
            </Link>
          ) : (
            <Link to="/user/info" className="header-link-router">
              <div className="signin-button">마이페이지</div>
            </Link>
          )}

          {/* {isSignin ? (
          <Link to="/user/info" className="header-link-router">
            <div className="signin-button">마이페이지</div>
          </Link>
        ) : (
          <Link to="/user/signin" className="header-link-router">
            <div className="signin-button">로그인</div>
          </Link>
        )} */}
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
      <div className="mobileRightSideWrap">
        <div className="mobileRightSide">
          <BiSearchAlt2 className="mobileSearchIcon" />
          <BiMenu
            className="mobileHeaderIcon"
            onClick={hiddenMenuOpenHandler}
          />
        </div>
        {isHiddenMeunOpen ? (
          <div className="mobileRightSideHidden">
            <div className="mobileRightTop">
              {isSignin ? (
                <Link to="/user/info" className="mobileMypage">
                  <img
                    className="imgMobileProfile"
                    src={userInfo.profile}
                    alt="사용자 프로필"
                  />
                  <p className="imgMobileText">{userInfo.username}</p>
                </Link>
              ) : (
                <span id="dummy"></span>
              )}
              <span className="btnMobileClose">
                <IoMdClose
                  className="mobileHeaderIcon"
                  onClick={hiddenMenuOpenHandler}
                />
              </span>
            </div>
            <div className="mobileRightBottom">
              <p className="btnMobileRecommand" onClick={goRecommend}>
                뮤지컬 추천
              </p>
              {isSignin ? (
                <p className="btnMobileMember" onClick={signoutRequestHandler}>
                  로그아웃
                </p>
              ) : (
                <div>
                  <Link to="/user/signin">
                    <p
                      className="btnMobileMember"
                      onClick={hiddenMenuOpenHandler}
                    >
                      로그인
                    </p>
                  </Link>
                  <Link to="/user/signup" className="btnMobileMember">
                    <p
                      className="btnMobileMember"
                      onClick={hiddenMenuOpenHandler}
                    >
                      회원가입
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
