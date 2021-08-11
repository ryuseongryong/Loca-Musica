import './signin.css'


function Signin () {
    return (
        <div className='signinContainer'>
            <button></button>
            <p className='signinText'>로그인</p>
            <form>
                <input
                    className='inpt'
                    name='email'
                    type='email'
                    placeholder='이메일' 
                />
                <input
                    className='inpt'
                    name='password'
                    type='password'
                    placeholder='비밀번호' 
                />
            </form>
            <button className='btn'>
                로그인
            </button>
            <button className='btnKakaoSignin'>
            </button>
            <div className='signupCheckWrap'>
                <p>계정이 없으신가요?&nbsp;&nbsp;</p>
                <span> 가입하기</span>
            </div>
        </div>
    )
}

export default Signin;