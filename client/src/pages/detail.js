import "../css/detail.css";
import { useDispatch, useSelector } from "react-redux";
import PerformanceInfo from "../components/performanceInfo";
import PerformanceTag from "../components/performanceTag";
import Footer from "../components/footer";

function Detail() {
  // 상태관리
  const dispatch = useDispatch();
  const { isSignin, userInfo } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
    };
  });

  // 핸들러함수
  return (
    <div className="detailPageWrap">
      <div id="detailPage">
        {userInfo.admin === 1 ? (
          <div className="adminBtnWrap">
            <button>수정</button>
            <button>삭제</button>
          </div>
        ) : null}
        <div className="pfInfoContainer">
          <PerformanceInfo />
          <PerformanceTag />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
