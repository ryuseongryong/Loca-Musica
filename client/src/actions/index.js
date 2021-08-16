// sign in 및 userInfo에 관련된 action
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const NOTIFY = "NOTIFY";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";



// sign in
export const signin = (data) => {
  // console.log('data를 보여줘', data)
  const { email, username, profile, resign, admin } = data;
  return {
    type: SIGN_IN,
    payload: {
      isSignin: true,
      userInfo: {
        email, username, profile, resign, admin
      },
      // accessToken: data.accessToken
    }
  }
}

export const signout = () => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignin: false,
      userInfo: ''
    }
  }
}




export const notify = (message, dismissTime = 5000) => dispatch => {
  const uuid = Math.random()
  dispatch(enqueueNotification(message, dismissTime, uuid))
  setTimeout(() => {
    dispatch(dequeueNotification())
  }, dismissTime)
}

export const enqueueNotification = (message, dismissTime, uuid) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
      uuid
    }
  }
}

export const dequeueNotification = () => {
  return {
    type: DEQUEUE_NOTIFICATION
  }
}
