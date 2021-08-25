import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Footer from "../components/footer";
import "../css/landing.css";
import { GiTheaterCurtains } from "react-icons/gi";

function Landing() {
  let history = useHistory();
  const isSignin = useSelector((state) => state.userReducer.isSignin);

  return (
    <>
      <div className="landingPageWrap">
        <div id="landing">
          <div className="landingTextWrap">
            <p>
              뮤지컬을 잘 아는 사람도, 잘 모르는 사람도 어떤 뮤지컬을 감상할지
              고민이 된다면?
            </p>
            <p>키워드를 선택하고 딱 맞는 뮤지컬을 추천 받을 수 있습니다</p>
          </div>
          <div className="landingTextWrap">
            <p>라이선스? 오리지널? 창작? 뮤지컬 구분은 너무 어렵다?</p>
            <p>좀 더 익숙한 방법으로 뮤지컬을 분류했습니다</p>
          </div>
          <div className="landingTextWrap">
            <p>아이와 함께 갔는데 19금 장면이?</p>
            <p>
              함께하는 사람을 선택하면 맞춤으로 뮤지컬을 추천 받을 수 있습니다
            </p>
          </div>
          <div className="landingTextWrap">
            <p>내가 등록한 해시태그가 뮤지컬 추천의 기준이 된다?</p>
            <p>일곱 글자 해시태그로 간단한 감상을 나누고 공감해주세요</p>
          </div>
          <div>
            <Link to="/search">
              <button className="btnLanding">뮤지컬 추천 받기</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing;
