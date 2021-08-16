import { useSelector } from 'react-redux';
import Toast from './toast';

function NofiticationCenter() {
  const state = useSelector(state => state.notificationReducer);

  return (
    <div className="notification-container top-right">
      <Toast key={state.uuid} text={state.message} dismissTime={state.dismissTime} />
    </div>
  )  
}

export default NofiticationCenter