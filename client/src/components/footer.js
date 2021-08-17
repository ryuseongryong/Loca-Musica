import "../css/footer.css";
import Github from "./githubLogo";

function Footer() {
  return (
    <div id="footer">
      <div className="footerWrap">
        <p id="footerBI">Loca Musica</p>
        <div id="footerInfoWrap">
          <div>
            <p>
              Developed by
              <span
                onClick={() =>
                  (window.location.href = "https://github.com/ryuseongryong")
                }
              >
                <Github />
                유성룡,
              </span>
              <span
                onClick={() =>
                  (window.location.href = "https://github.com/ezyeon07")
                }
              >
                <Github />
                이지연,
              </span>
              <span
                onClick={() =>
                  (window.location.href = "https://github.com/200911184")
                }
              >
                <Github />
                정승환,
              </span>
              <span
                onClick={() =>
                  (window.location.href = "https://github.com/jhoryong")
                }
              >
                <Github />
                정호룡
              </span>
            </p>
          </div>
          <p>Copyright 2021&#169; Loca Musica All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
