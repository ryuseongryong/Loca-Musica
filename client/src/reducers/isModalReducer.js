import { IS_MODAL } from "../actions/index";
import { initialState } from "./initialState";

const isModalReducer = (state = initialState.isModal, action) => {
  //   console.log("확인용", state);
  switch (action.type) {
    case IS_MODAL:
      return {
        isModal: action.payload,
      };
    default:
      return state;
  }
};

export default isModalReducer;
