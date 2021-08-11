

function Signup () {
    // 핸들러함수


    return (
        <div className='signinContainer'>
            <button></button>
            <p className='signinText'>회원가입</p>
            <form>
                <input
                    className='inpt'
                    name='email'
                    type='email'
                    placeholder='이메일' 
                />
                <input
                    className='inpt'
                    name='username'
                    type='text'
                    placeholder='사용자 이름' 
                />
                <input
                    className='inpt'
                    name='password'
                    type='password'
                    placeholder='비밀번호'
                />
                <input
                    className='inpt'
                    name='passwordcheck'
                    type='password'
                    placeholder='비밀번호 확인' 
                />
            </form>
            <button className='btn'>
                회원가입
            </button>
            <button className=''>
                카카오로 시작하기
            </button>

            <div className='signupCheckWrap'>
                <p>이미 계정이 있으신가요?</p>
                <span>로그인</span>
            </div>
        </div>
    )
}

export default Signup;