import { initialState } from "./initialState";
import { ENQUEUE_NOTIFICATION, DEQUEUE_NOTIFICATION } from "../actions/index";

const notificationReducer = (state = initialState.notification, action) => {
  switch (action.type) {
    case ENQUEUE_NOTIFICATION:
      return Object.assign({}, state, {
        notification: [...state.notifications, action.payload],
      });
    case DEQUEUE_NOTIFICATION:
      return Object.assign({}, state, {
        notification: state.notifications.slice(1),
      });
    default:
      return state;
  }
};

export default notificationReducer;
