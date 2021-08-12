import './userinfo.css'
import BookmarkList from '../components/bookmarkList';
import Footer from '../components/footer';

function UserInfo () {
    // 핸들러 함수

    return (
        <div className='userInfoWrap'>
            <div id='userInfo'>
                <div className='userInfoWrap'>
                    <div className='txtWelcome'>
                        {/* userInfo에 따라 다르게 보이도록 대체 */}
                        <p className='fs28px'>반가워요, 김코딩님!</p>
                        <p className='fs20px'>kimcoding@code.com</p>
                    </div>
                    <div className='userInfoChangeWrap'>
                        <div className='imgChangeWrap'>
                            <img 
                                className='dummyProfile'
                                alt='사용자 프로필'
                            />
                            <span>이미지 변경</span>
                            <span>이미지 삭제</span>
                        </div>
                        <div className='infoChangeWrap'>
                            <p>사용자 이름 변경</p>
                            <form>
                                <input
                                    name='username'
                                    type='text'
                                    placeholder='사용자 이름' 
                                />
                            </form>
                            <button className='btnChangeInfo'>
                                변경
                            </button>
                        </div>
                        <div className='infoChangeWrap'>
                            <p>비밀번호 변경</p>
                            <form>
                                <input
                                    name='password'
                                    type='password'
                                    placeholder='기존 비밀번호' 
                                />
                                <input
                                    name='newPassword'
                                    type='password'
                                    placeholder='새 비밀번호' 
                                />
                                <input
                                    name='newPasswordcheck'
                                    type='password'
                                    placeholder='새 비밀번호 확인' 
                                />
                            </form>
                            <button className='btnChangeInfo'>
                                변경
                            </button>
                        </div>
                    </div>
                </div>

                <div className='bookmarkWrap'>
                    <p className='fs28px'>북마크한 뮤지컬</p>
                    <div className='testWrap'>
                        <span className='testimg'></span>
                        <span className='testimg'></span>
                        <span className='testimg'></span>
                        <span className='testimg'></span>
                        <span className='testimg'></span>
                    </div>
                    {/* <BookmarkList /> */}
                </div>

                <button className='btnWithdrawal'>
                    회원탈퇴
                </button>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default UserInfo;