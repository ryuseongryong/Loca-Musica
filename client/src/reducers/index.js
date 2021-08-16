import { combineReducers } from "redux";
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

// 필요한 reducer를 import해온다. 

const rootReducer = combineReducers({
  // reducer를 만들고 불러온다
  userReducer,
  notificationReducer
});

export default rootReducer;


// npm(https://www.npmjs.com/package/redux-persist) Nested Presists 참고