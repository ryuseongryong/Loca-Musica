// bookmark기능과 관련하여 상태관리를 하게될 reducer
import { initialState } from "./initialState";
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from "../actions/index";

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return Object.assign({}, state, {
        // bookmarkList에 payload로 전달된 작품을 배열에 추가
        bookmarkList: [...state.bookmarkList, action.payload],
      });
    case REMOVE_BOOKMARK:
      return Object.assign({}, state, {
        // bookmarkList에서 payload로 전달된 작품의 제목과 같은 것을 배열에서 제외
        bookmarkList: state.bookmarkList.filter(
          (el) => el.title !== action.payload.title
        ),
      });
    default:
      return state;
  }
};

export default bookmarkReducer;
