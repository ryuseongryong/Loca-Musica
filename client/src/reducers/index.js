import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bookmarksReducer from "./bookMarksReducer";
import notificationReducer from "./notificationReducer";
import pathnameReducer from "./pathnameReducer";

// 필요한 reducer를 import해온다.

const rootReducer = combineReducers({
  // reducer를 만들고 불러온다
  userReducer,
  bookmarksReducer,
  notificationReducer,
  pathnameReducer,
});

export default rootReducer;

// npm(https://www.npmjs.com/package/redux-persist) Nested Presists 참고
