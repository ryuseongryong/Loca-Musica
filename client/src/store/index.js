import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(
  enhancedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

// redux-logger를 사용한 경우 npm i redux-logger 필요
// import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import rootReducer from '../reducers/index';
// import thunk from 'redux-thunk';

// const persistConfig = {
//   key: 'root',
//   storage
// };
// const middleware = [logger, thunk]
// const enhancedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(enhancedReducer, applyMiddleware(...middleware));

// export default store;
