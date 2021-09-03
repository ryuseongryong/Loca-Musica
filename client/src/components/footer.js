import "../css/footer.css";
import github from "../images/github_logo.png";

function Footer() {
  return (
    <div id="footer">
      <div className="footerWrap">
        <p id="footerBI">Loca Musica</p>
        <div id="footerInfoWrap">
          <p>Developed by</p>
          <span
            onClick={() =>
              (window.location.href = "https://github.com/ryuseongryong")
            }
          >
            <img className="github" alt="github logo" src={github} />
            유성룡,
          </span>
          <span
            onClick={() =>
              (window.location.href = "https://github.com/ezyeon07")
            }
          >
            <img className="github" alt="github logo" src={github} />
            이지연,
          </span>
          <span
            onClick={() =>
              (window.location.href = "https://github.com/200911184")
            }
          >
            <img className="github" alt="github logo" src={github} />
            정승환,
          </span>
          <span
            onClick={() =>
              (window.location.href = "https://github.com/jhoryong")
            }
          >
            <img className="github" alt="github logo" src={github} />
            정호룡
          </span>
        </div>
        <div className="footerSrcWrap">
          <p className="apiSource">
            Loca Musica 는 (재)예술경영지원센터
            공연예술통합전산망(www.kopis.or.kr) API 를 사용하고 있습니다.
          </p>
          <p>Copyright 2021&#169; Loca Musica All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
