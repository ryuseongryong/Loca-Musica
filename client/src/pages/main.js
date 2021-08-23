import axios from "axios";
import { useEffect } from "react";
import Loader from '../components/loader'

function Main() {
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_END_POINT}/musical/main`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
    });
  });
  return (
    <>
      <div className="allPageWrap">
        {/* main 대신 musical로 변경 */}
        Main페이지입니다.
      </div>
      <Loader/>
    </>
  );
}

export default Main;
