// sign in &  out 및 userInfo에 관련된 action
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

// Bookmark 관리와 관련된 action
export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

export const NOTIFY = "NOTIFY";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";

// 로그인 액션
export const signin = (data) => {
  console.log("data를 보여줘", data);
  const { email, username, profile, resign, admin, kakao } = data;
  return {
    type: SIGN_IN,
    payload: {
      isSignin: true,
      userInfo: {
        email,
        username,
        profile,
        resign,
        admin,
        kakao,
      },
    },
  };
};
// 회원가입 액션
export const signout = () => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignin: false,
      userInfo: "",
    },
  };
};

// bookmark(유저정보에 따로 보낼지, 함께 보낼지에 따라 달라짐)
export const bookmark = () => {};

// bookmark 더하기
export const addBookmark = (title) => {
  return {
    type: ADD_BOOKMARK,
    payload: {
      title,
    },
  };
};
// bookmark 취소하기
export const remaveBookmark = (title) => {
  return {
    type: REMOVE_BOOKMARK,
    payload: {
      title,
    },
  };
};

// 알림창 작동과 관련된 액션
export const notify =
  (message, dismissTime = 5000) =>
  (dispatch) => {
    const uuid = Math.random();
    dispatch(enqueueNotification(message, dismissTime, uuid));
    setTimeout(() => {
      dispatch(dequeueNotification());
    }, dismissTime);
  };

export const enqueueNotification = (message, dismissTime, uuid) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
      uuid,
    },
  };
};

export const dequeueNotification = () => {
  return {
    type: DEQUEUE_NOTIFICATION,
  };
};
