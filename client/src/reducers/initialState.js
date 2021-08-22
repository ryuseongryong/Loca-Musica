export const initialState = {
  // 로그인상태와 회원정보와 관련된 초기상태
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
  pathname: "/musical/main",

  // 사용자에게 전달되는 알림메세지의 초기상태
  notifications: [],
};
