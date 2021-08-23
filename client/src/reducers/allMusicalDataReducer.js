// bookmark기능과 관련하여 상태관리를 하게될 reducer
import { initialState } from "./initialState";
import { STORE_ALL_MUISCAL_DATA } from "../actions/index";

const allMusicalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ALL_MUISCAL_DATA:
      return Object.assign({}, state, {
        arrAllMusicalData: action.payload
      });
    default:
      return state;
  }
};

export default allMusicalDataReducer;
