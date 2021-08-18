import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bookmarkReducer from "./bookMarkReducer";
import notificationReducer from "./notificationReducer";

// 필요한 reducer를 import해온다.

const rootReducer = combineReducers({
  // reducer를 만들고 불러온다
  userReducer,
  bookmarkReducer,

  //? 이건 쓸지말지... 아직은 작동불가
  notificationReducer,
});

export default rootReducer;

// npm(https://www.npmjs.com/package/redux-persist) Nested Presists 참고
