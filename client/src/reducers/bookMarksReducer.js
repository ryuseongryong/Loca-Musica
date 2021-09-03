// bookmark기능과 관련하여 상태관리를 하게될 reducer
import { initialState } from "./initialState";
import {
  SIGN_IN,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  SIGN_OUT,
} from "../actions/index";

const bookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        // bookmarksData에 payload로 전달된 작품을 배열에 추가
        bookmarksData: [
          ...state.bookmarksData,
          ...action.payload.bookmarksData,
        ],
      };
    case SIGN_OUT:
      return Object.assign({}, state, {
        // bookmarksData에 payload로 전달된 작품을 배열에 추가
        bookmarksData: [],
      });

    case ADD_BOOKMARK:
      return {
        // bookmarksData에 payload로 전달된 작품을 배열에 추가
        bookmarksData: [...state.bookmarksData, ...action.payload],
      };
    case REMOVE_BOOKMARK:
      return {
        // bookmarksData에서 payload로 전달된 작품의 제목과 같은 것을 배열에서 제외
        bookmarksData: state.bookmarksData.filter(
          (el) => el.title !== action.payload.title
        ),
      };
    default:
      return state;
  }
};

export default bookmarksReducer;
