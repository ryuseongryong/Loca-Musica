import { useSelector } from "react-redux";
import Toast from "./toast";

function NofiticationCenter() {
  const state = useSelector((state) => state.notificationReducer);
  // console.log('state를 보여줘', state)
  return (
    <div className="notification-container top-right">
      <Toast text={state.message} dismissTime={state.dismissTime} />
    </div>
  );
}

export default NofiticationCenter;
