import './signin.css'
import Footer from '../components/footer';

function Signup () {
    // 핸들러함수


    return (
        <div id='signup'>
            <div className='signupContainer'>
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
                <button className='btnSignup'>
                    회원가입
                </button>
                <button className='btnKakaoSignup'>
                </button>

                <div className='signinCheckWrap'>
                    <p>이미 계정이 있으신가요?</p>
                    <span>로그인</span>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup;