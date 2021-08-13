import { useState } from 'react';
import axios from 'axios';

import './signin.css'
import { emailChecker, usernameChecker, passwordChecker, valuesChecker } from '../utils/validateCheck'

function Signup () {
    // 현재 페이지에서만 관리가 필요한 state
    //* input에 입력되는 value(회원가입에 필요한 사용자정보)
    const [inputValue, setInputValue] = useState({
        email: '',
        username: '',
        password: '',
        passwordCheck: ''
    })
    //* input에 입력되는 value에 따른 에러메세지
    const [errMessage, setErrMessage] = useState({
        errEmail: '',
        errUsername: '',
        errPassword: '',
        errPasswordCheck: '',
        errOverall: ''
    })


    // 핸들러함수
    //* input에 입력되는 value 변경 함수
    const inputHandler = (event) => {
        const { name, value } = event.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }
    //* input에 입력되는 value에 따른 에러메세지 변경 함수
    const errMessageHandler = () => {
        
    }



    //* 회원가입 요청 함수
    const signupRequestHandler = (event) => {
        
        const { email, username, password, passwordCheck } = inputValue
        
        // 유효성 검사를 통과하지 못하면 에러메세지
        if(!valuesChecker(email, username, password) && !passwordCheck) {
            setErrMessage({
                ...errMessage,
                errOverall: '모든 항목을 올바르게 입력해주세요'
            })
        }
        else {
            axios
                .post(
                    `${process.event.REACT_APP_END_POINT}/user/signup`,
                    {
                        email: email,
                        username: username,
                        password: password
                    },
                    { withCredentials: true }
                )
                .then(() => {
                    axios
                        .post(
                            `${process.event.REACT_APP_END_POINT}/user/signin`,
                            {
                                email: email,
                                password: password
                            },
                            { withCredentials: true }
                        )
                            .then(() => {
                                
                            })
                    
                })
        }
        

    }


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
                        required
                        value={inputValue.email}
                        onChange={inputHandler}
                    />
                    <input
                        className='inpt'
                        name='username'
                        type='text'
                        placeholder='사용자 이름'
                        required
                        value={inputValue.username}
                        onChange={inputHandler}
                    />
                    <input
                        className='inpt'
                        name='password'
                        type='password'
                        placeholder='비밀번호'
                        required
                        value={inputValue.password}
                        onChange={inputHandler}
                    />
                    <input
                        className='inpt'
                        name='passwordcheck'
                        type='password'
                        placeholder='비밀번호 확인'
                        required
                        value={inputValue.passwordCheck}
                        onChange={inputHandler}
                    />
                </form>
                {
                    errMessage.errOverall &&
                    <p>{errMessage.errOverall}</p>
                }
                <button 
                    className='btnSignup'
                    onClick={signupRequestHandler}
                >
                    회원가입
                </button>
                <button className='btnKakaoSignup'>
                </button>

                <div className='signinCheckWrap'>
                    <p>이미 계정이 있으신가요?</p>
                    <span>로그인</span>
                </div>
            </div>
        </div>
    )
}

export default Signup;