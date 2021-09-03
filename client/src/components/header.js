import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Header.css';
import { signout, notify, rememberPathname } from '../actions/index';
import { CgChevronRight } from 'react-icons/cg';
import { BiSearchAlt2, BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

import Searchbar from './searchbar';
import MobileSearchbar from './mobileSearchbar';
import { useState } from 'react';
import dummyProfile from '../images/dummyProfile.png';

function Header({ isLanding, setIsLanding }) {
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
  const [isMobileSearchbarOpen, setIsMobileSearchbarOpen] = useState(false);
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
        console.log('로그아웃 되었습니다');
        dispatch(rememberPathname('/musical/main'));
        dispatch(notify('로그아웃 되었습니다'));
      })
      .then((res) => {
        history.push('/musical/main');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .get(`${process.env.REACT_APP_END_POINT}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios
                .post(`${process.env.REACT_APP_END_POINT}/user/signout`, null, {
                  withCredentials: true,
                })
                .then((res) => {
                  dispatch(signout());
                })
                .then((res) => {
                  console.log('로그아웃 되었습니다');
                  dispatch(rememberPathname('/musical/main'));
                  dispatch(notify('로그아웃 되었습니다'));
                })
                .then((res) => {
                  history.push('/musical/main');
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
              if (err.response.data.message === 'invalid refresh token') {
                dispatch(
                  notify(
                    '사용자 정보를 확인할 수 없습니다. 다시 로그인해주세요'
                  )
                );
              } else if (err.response.data.message === 'user not found') {
                dispatch(
                  notify('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요')
                );
              } else if (
                err.response.data.message === 'internal server error'
              ) {
                dispatch(
                  notify('서버와의 통신 오류입니다. 다시 로그인해주세요')
                );
              }
            });
        }
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
    if (url.pathname.includes('/search')) {
      if (url.host === 'localhost:3000') {
        window.location.assign(`http://localhost:3000/search`);
      } else if (url.host === 'loca-musica.com') {
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
    if (url.pathname.includes('/musical/main')) {
      if (url.host === 'localhost:3000') {
        window.location.assign(`http://localhost:3000/musical/main`);
      } else if (url.host === 'loca-musica.com') {
        window.location.assign(`https://loca-musica.com/musical/main`);
      }
    } else {
      history.push(`/musical/main`);
    }
    setIsLanding(false);
  };

  // mobile header 동작 함수
  const hiddenMenuOpenHandler = () => {
    setIsHiddenMeunOpen(!isHiddenMeunOpen);
  };

  const mobileSearchbarOpenHandler = () => {
    setIsMobileSearchbarOpen(true);
  };

  // header 상태 변경 함수
  const changeHeaderStateHandler = () => {
    setIsLanding(false);
  };

  return (
    <div>
      <div className="header-main">
        <div className="headerLeftSide">
          <div className="header-logo">
            <div className="logo" onClick={gotoMain}>
              Loca Musica
            </div>
          </div>
          {isLanding ? null : (
            <div className="header-section1">
              <div className="recommend-musical-button" onClick={goRecommend}>
                뮤지컬 추천
                <CgChevronRight size="22" />
              </div>
            </div>
          )}
        </div>
        <div className="headerRightSide">
          {isLanding ? null : (
            <div className="header-section3">
              <Searchbar />
            </div>
          )}

          {/* 로그인 상태에 따라 보이는 버튼이 달라지도록 설정 */}
          <div className="header-section4">
            {!isSignin ? (
              <Link to="/user/signin" className="header-link-router">
                <div
                  className="signin-button"
                  onClick={changeHeaderStateHandler}
                >
                  로그인
                </div>
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
          </div>
          <div className="header-section5">
            {isSignin ? (
              <div className="signout-button" onClick={signoutRequestHandler}>
                로그아웃
              </div>
            ) : (
              <Link to="/user/signup" className="header-link-router">
                <div
                  className="signup-button"
                  onClick={changeHeaderStateHandler}
                >
                  회원가입
                </div>
              </Link>
            )}
          </div>
        </div>
        {/* 모바일 버전 Header */}
        <div className="mobileRightSideWrap">
          <div className="mobileRightSide">
            <BiSearchAlt2
              className="mobileSearchIcon"
              onClick={mobileSearchbarOpenHandler}
            />
            <BiMenu
              className="mobileHeaderIcon"
              onClick={hiddenMenuOpenHandler}
            />
          </div>
          {isHiddenMeunOpen ? (
            <div className="mobileRightSideHidden">
              <div className="mobileRightTop">
                {isSignin ? (
                  <Link
                    to="/user/info"
                    className="mobileMypage"
                    onClick={hiddenMenuOpenHandler}
                  >
                    <img
                      className="imgMobileProfile"
                      src={
                        userInfo.profile !== null
                          ? userInfo.profile
                          : dummyProfile
                      }
                      alt="사용자 프로필"
                      onClick={hiddenMenuOpenHandler}
                    />
                    <p
                      className="imgMobileText"
                      onClick={hiddenMenuOpenHandler}
                    >
                      {userInfo.username}
                    </p>
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
                  <div>
                    <Link to="/user/info">
                      <p
                        className="btnMobileMember"
                        onClick={hiddenMenuOpenHandler}
                      >
                        마이페이지
                      </p>
                    </Link>
                    <p
                      className="btnMobileMember"
                      onClick={signoutRequestHandler}
                    >
                      로그아웃
                    </p>
                  </div>
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
      {isMobileSearchbarOpen ? (
        <MobileSearchbar setIsMobileSearchbarOpen={setIsMobileSearchbarOpen} />
      ) : null}
    </div>
  );
}

export default Header;
