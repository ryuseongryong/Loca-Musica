import './signin.css'
import Header from '../components/header';
import Footer from '../components/footer';


function Signin () {
    return (
        <div id='signin'>
            <div className='signinContainer'>
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
                <button className='btnSignin'>
                    로그인
                </button>
                <button className='btnKakaoSignin'>
                </button>
                <div className='signupCheckWrap'>
                    <p>계정이 없으신가요?</p>
                    <span> 가입하기</span>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signin;