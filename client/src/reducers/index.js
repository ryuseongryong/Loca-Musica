import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 필요한 reducer를 import해온다. 


const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    // storage에 저장할 reducer의 리스트를 적는다
  ],
  blacklist: [
    // storage에 저장하지 않을 reducer의 리스트를 적는다
  ]
};

const rootReducer = combineReducers({
//   reducer를 만들고 불러온다
});

export default persistReducer(persistConfig, rootReducer);


// npm(https://www.npmjs.com/package/redux-persist) Nested Presists 참고