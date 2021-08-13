const EmailCheck = (email) => {
    const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(email.length > 0) {
        if(!regex.test(email)) {
            return 'invalidEmail'
        } else {
            return 'validEmail'
        }
    } else {
        return 'emptyEmail'
    }
}

export { EmailCheck }