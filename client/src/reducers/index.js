import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bookmarksReducer from "./bookMarksReducer";
import notificationReducer from "./notificationReducer";
import pathnameReducer from "./pathnameReducer";
import allMusicalDataReducer from "./allMusicalDataReducer";

// 필요한 reducer를 import해온다.

const rootReducer = combineReducers({
  // reducer를 만들고 불러온다
  userReducer,
  bookmarksReducer,
  notificationReducer,
  pathnameReducer,
  allMusicalDataReducer,
});

export default rootReducer;
