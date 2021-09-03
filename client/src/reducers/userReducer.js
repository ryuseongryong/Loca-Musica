import { SIGN_IN, SIGN_OUT, UPDATE_USERINFO } from "../actions/index";
import { initialState } from "./initialState";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        isSignin: action.payload.isSignin,
        userInfo: action.payload.userInfo,
      });
    case SIGN_OUT:
      return Object.assign({}, state, {
        isSignin: action.payload.isSignin,
        userInfo: action.payload.userInfo,
        bookmarksData: action.payload.bookmarksData,
      });
    case UPDATE_USERINFO:
      return Object.assign({}, state, {
        userInfo: action.payload.userInfo,
      });

    default:
      return state;
  }
};

export default userReducer;
