import { Link } from 'react-router-dom';
import '../css/Header.css';
import { FiChevronRight } from "react-icons/fi";
import { GoSearch } from "react-icons/go";

function Header() {
    return (
        <div className='header-main'>
            <div className='header-logo'>
                <a href="/" className='logo'>
                    Loca Musica
                </a>
            </div>
            <div className='header-section1'>
                <Link to='/search' className='header-link-router'>
                    <div className='recommend-musical-button'>
                        뮤지컬 추천 &nbsp;{'>'}
                        {/* <FiChevronRight className='header-search-btn-icon' /> */}
                    </div>
                </Link>
            </div>
            <div className='header-section2'>
                <Link to='/admin' className='header-link-router'>
                    <div className='admin-musical-post-button'>
                        작품 등록
                    </div>
                </Link>
            </div>
            <div className='header-section3'>
                <div className='search-div'>
                    <div className='search-icon-div'>
                        <GoSearch className='search-icon' />
                    </div>
                    <div className='search-input-div'>
                        <input className='search-input' placeholder='뮤지컬 검색'></input>
                    </div>
                </div>
            </div>
            <div className='header-section4'>
                {/* 로그인 버튼 */}
                <Link to='/user/signin' className='header-link-router'>
                    <div className='signin-button'>
                        로그인
                    </div>
                </Link>

                {/* 마이페이지 이동 */}
                {/* <button>회원명</button> */}
            </div>
            <div className='header-section5'>
                {/* 회원가입 버튼 */}
                <Link to='/user/signup' className='header-link-router'>
                    <div className='signup-button'>
                        회원가입
                    </div>
                </Link>

                {/* 로그아웃 버튼 */}
                {/* <div className='signout-button'>
                    로그아웃
                </div> */}
            </div>
        </div>
    )
}

export default Header;