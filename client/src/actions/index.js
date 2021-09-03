// sign in &  out 및 userInfo에 관련된 action
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_USERINFO = "UPDATE_USERINFO";
export const IS_MODAL = "IS_MODAL";

// Bookmark 관리와 관련된 action
export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

// pathname과 관련된 action
export const REMEMBER_PATHNAME = "REMEMBER_PATHNAME";

// 알림센터와 관련된 action
export const NOTIFY = "NOTIFY";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";

// 모든 뮤지컬 정보 저장 action
export const STORE_ALL_MUISCAL_DATA = "STORE_ALL_MUISCAL_DATA";

// 로그인 액션
export const signin = (data) => {
  // console.log("data를 보여줘", data);
  const { email, username, profile, resign, admin, kakao, bookmarksData } =
    data;
  return {
    type: SIGN_IN,
    payload: {
      isSignin: true,
      userInfo: {
        email: email,
        username: username,
        profile: profile,
        resign: resign,
        admin: admin,
        kakao: kakao,
      },
      bookmarksData: bookmarksData,
    },
  };
};
// 로그아웃 액션
export const signout = () => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignin: false,
      userInfo: {
        email: "",
        username: "",
        profile: "",
        resign: "",
        admin: "",
        kakao: "",
      },
      bookmarksData: [],
      notifications: [],
    },
  };
};
// 회원정보변경 액션
export const updateUserInfo = (data) => {
  const { email, username, profile, resign, admin, kakao } = data;
  return {
    type: UPDATE_USERINFO,
    payload: {
      userInfo: {
        email: email,
        username: username,
        profile: profile,
        resign: resign,
        admin: admin,
        kakao: kakao,
      },
    },
  };
};

// 회원기능 클릭시 모달
export const setIsModal = (bool) => {
  return{
    type: IS_MODAL,
    payload: bool,
  }
}


// pathname 저장 액션
export const rememberPathname = (pathname) => {
  return {
    type: REMEMBER_PATHNAME,
    payload: {
      pathname,
    },
  };
};

// bookmark 더하기
export const addBookmark = (data) => {
  // console.log("북마크를 더했을때", data);
  return {
    type: ADD_BOOKMARK,
    payload: data,
  };
};
// bookmark 취소하기
export const removeBookmark = (title) => {
  return {
    type: REMOVE_BOOKMARK,
    payload: {
      title,
    },
  };
};

// 알림창 작동과 관련된 액션
export const notify =
  (message, dismissTime = 3000) =>
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

// 웹사이트에 최초 접속시 모든 뮤지컬 정보 저장(해시태그 정보는 제외)
export const storeAllMusicalInfo = (arrAllMusicalsData) => {
  return {
    type: STORE_ALL_MUISCAL_DATA,
    payload: arrAllMusicalsData,
  };
};
