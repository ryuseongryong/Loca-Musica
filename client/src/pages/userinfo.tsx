import BookmarkList from '../components/bookmarkList';

function UserInfo () {
    // 핸들러 함수

    return (
        <div id='userInfo'>
            <div className='userInfoWrap'>
                <div className=''>
                    {/* userInfo에 따라 다르게 보이도록 대체 */}
                    <div>반가워요, 김코딩님!</div>
                    <div>kimcoding@code.com</div>
                </div>
                <div className='userInfoChangeWrap'>
                    <div className='userImgWrap'>
                        <img 
                            alt='사용자 프로필'
                        />
                        <span>이미지 변경</span>
                        <span>이미지 삭제</span>
                    </div>
                    <div className='usernameWrap'>
                        <p>사용자 이름 변경</p>
                        <input
                            className=''
                            name='username'
                            type='text'
                            placeholder='사용자 이름' 
                        />
                        <button className=''>
                            변경
                        </button>
                    </div>
                    <div className='passwordWrap'>
                        <p>비밀번호 변경</p>
                        <form>
                            <input
                                className=''
                                name='password'
                                type='password'
                                placeholder='기존 비밀번호' 
                            />
                            <input
                                className=''
                                name='newPassword'
                                type='password'
                                placeholder='새 비밀번호' 
                            />
                            <input
                                className=''
                                name='newPasswordcheck'
                                type='password'
                                placeholder='새 비밀번호 확인' 
                            />
                        </form>
                        <button className=''>
                            변경
                        </button>
                    </div>
                </div>
            </div>

            <div className='bookmarkWrap'>
                <p>북마크한 뮤지컬</p>
                <BookmarkList />
            </div>

            <button className=''>
                회원탈퇴
            </button>
        </div>
    )
}

export default UserInfo;