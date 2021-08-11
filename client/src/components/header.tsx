import '../css/Header.css';

function Header() {
    return (
        <div className='header-main'>
            <div className='header-logo'>
                <a href="/search" className='logo'>
                    Loca Musica
                </a>
            </div>
            <div className='header-section1'>
                <button className='recommend-musical-button'>뮤지컬 추천 {'>'}</button>
            </div>
            <div className='header-section2'></div>
            <div className='header-section3'>
                <div className='search-div'>
                    <img alt='search-image' className='search-image' src='' />
                    <input className='search-input' placeholder='검색할 내용을 입력하세요'></input>
                </div>
            </div>
            <div className='header-section4'>
                <button className='signin-buuton'>로그인</button>
                {/* <button>회원명</button> */}
            </div>
            <div className='header-section5'>
                <button className='signup-button'>회원가입</button>
                {/* <button>로그아웃</button> */}
            </div>
        </div>
    )
}

export default Header;