// 이메일 유효성검사
const emailChecker = (email) => {
    const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(email.length > 0) {
        if(regex.test(email) === false) {
            return 'invalidEmail'
        } 
        else {
            return 'validEmail'
        }
    } 
    else {
        return 'emptyEmail'
    }
}

// 사용자이름 유효성검사
const usernameChecker = (username) => {
    const regex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;
    if(username.length < 2 && username.length > 0) {
        return 'shortUsername'
    } 
    else {
        if(regex.test(username) === false) {
            return 'invalidUsername'
        }
        else {
            return 'validUsername'
        }
    }
}

// 비밀번호 유효성검사
const passwordChecker = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if(regex.test(password) === false) {
        if(password.length === 0) {
            return 'emptyPassword'
        }
        else if(password.length > 0 && password.length < 8) {
            return 'shortPassword'
        }
        else {
            return 'invalidPassword'
        }
    }
    else {
        return 'validPassword'
    }
}


// 회원가입 시 모든 입력값 유효성검사
const valuesChecker = (email, username, password) => {
    const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const usernameRegex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    // 모든 입력값이 유효할 때 true를 return
    return emailRegex.test(email) && usernameRegex.test(username) && passwordRegex.test(password)
}


export { emailChecker, usernameChecker, passwordChecker, valuesChecker }