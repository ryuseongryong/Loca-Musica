import { useDispatch } from "react-redux";
import { notify } from "../actions/index";

import axios from "axios";

function Auth() {
  const dispatch = useDispatch();
  const requestAccessToken = () => {
    axios
      .get(`${process.env.REACT_APP_END_POINT}/user/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("accessToke재요청에 대한 응답은?", res);
        dispatch(notify(""));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "invalid refresh token") {
          dispatch(
            notify("사용자 정보를 확인할 수 없습니다. 다시 로그인해주세요")
          );
        } else if (err.response.data.message === "user not found") {
          dispatch(
            notify("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요")
          );
        } else if (err.response.data.message === "internal server error") {
          dispatch(notify("서버와의 통신 오류입니다. 다시 로그인해주세요"));
        }
      });
  };
  return <div></div>;
}

export default Auth;
