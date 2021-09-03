import { REMEMBER_PATHNAME } from "../actions/index";
import { initialState } from "./initialState";

const pathnameReducer = (state = initialState.pathname, action) => {
  //   console.log("확인용", state);
  switch (action.type) {
    case REMEMBER_PATHNAME:
      return {
        pathname: action.payload.pathname,
      };
    default:
      return state;
  }
};

export default pathnameReducer;
