import { useState } from "react";
import "../css/SearchModal.css";
import axios from "axios";
import MusicalBaseImage from '../images/musical_baseimage.jpg'

function SearchModal({ isOpen, searchModalClose, setNowClickMusical }) {
  const [searchInput, setSearchInput] = useState({
    service: process.env.REACT_APP_KOPIS_SERVICE,
    stdate: "",
    eddate: "",
    cpage: "",
    rows: "",
    signgucode: 11,
    shcate: "AAAB",
  });

  const [kopisSearchList, setkopisSearchList] = useState([]);

  // modal창 종료
  const closeModal = () => {
    // state변수 초기화
    setSearchInput({
      service: process.env.REACT_APP_KOPIS_SERVICE,
      stdate: "",
      eddate: "",
      cpage: "",
      rows: "",
      signgucode: 11,
      shcate: "AAAB",
    });
    setkopisSearchList([]);
    searchModalClose();
  };

  // start date
  const getStartDate = (event) => {
    // 2021-01-01 -> 20210101 change
    const startDate = event.target.value.replaceAll("-", "");
    setSearchInput(Object.assign(searchInput, { stdate: startDate }));
  };
  const setMaxStartDate = (event) => {
    // 만약 종료날짜가 지정된 경우 해당 종료날짜보다 이 후 날짜를 선택할 수 없도록 설정
    if (searchInput.eddate) {
      let eddate = document.querySelector("#endddate").value;
      event.target.setAttribute("max", eddate);
    } else {
      // 종료날짜가 지정이 안된 경우
      // today이후는 선택 못하도록 설정(종료날짜가 지정되지 않는 경우 어제 이후로 선택 못하도록 설정)
      let today = new Date().toISOString().split("T")[0]; // 현재 날짜 바로 전날, yyyy-mm-dd형태
      event.target.setAttribute("max", today);
    }
  };

  // end date
  const getEndDate = (event) => {
    // today이후는 선택 못하도록 설정
    let today = new Date().toISOString().split("T")[0]; // 현재 날짜 바로 전날, yyyy-mm-dd형태
    event.target.setAttribute("max", today);

    const endDate = event.target.value.replaceAll("-", "");
    setSearchInput(Object.assign(searchInput, { eddate: endDate }));
  };
  const setMaxEndDate = (event) => {
    // today이후는 선택 못하도록 설정
    let today = new Date().toISOString().split("T")[0]; // 현재 날짜 바로 전날, yyyy-mm-dd형태
    event.target.setAttribute("max", today);
  };

  // current page
  const getCurrentPage = (event) => {
    setSearchInput(Object.assign(searchInput, { cpage: event.target.value }));
  };
  // row
  const getRow = (event) => {
    setSearchInput(Object.assign(searchInput, { rows: event.target.value }));
  };
  // musical title
  const getMusicalTitle = (event) => {
    setSearchInput(Object.assign(searchInput, { shprfnm: event.target.value }));
  };
  // 검색
  const searchKOPIS = () => {
    // 필수 값 입력 여부(whether to enter require value)
    // 모두 입력된 경우 + 1~999범위 작성
    // cpage, row Number형변환
    let tempCpage = Number(searchInput.cpage); // 현재 페이지 수
    let tempRows = Number(searchInput.rows); // 1페이지당 목록수
    if (
      searchInput.stdate &&
      searchInput.eddate &&
      searchInput.cpage &&
      searchInput.rows &&
      tempCpage > 0 &&
      tempCpage < 1000 &&
      tempRows > 0 &&
      tempRows < 1000
    ) {
      console.log(searchInput);
      // KOPIS 목록 검색
      // 'http://kopis.or.kr/openApi/restful/pblprfr'
      // 'http://localhost:3001/admin/getKopisSearch'
      // `${process.env.REACT_APP_END_POINT}/admin/getKopisSearch` -> server에 api임의 추가시 url
      axios({
        method: "get",
        url: `${process.env.REACT_APP_END_POINT}/admin/getKopisSearch`,
        params: searchInput,
      }).then((result) => {
        // Object.keys(obj).length === 0 -> 빈객체 확인, 길이가 0이면 빈객체
        // let result2 = convert.xml2js(result.data, { compact: true });
        // console.log(result2.dbs.db);

        //server api 추가시
        console.log(result.data);
        // 검색 결과가 없는 경우
        if (Object.keys(result.data.data.dbs).length === 0) {
          setkopisSearchList([]);
        }
        // 여러개 검색된 경우, 배열로 반환됨으로 배열로 유지
        else if (Array.isArray(result.data.data.dbs.db)) {
          console.log(result.data.data.dbs.db);
          setkopisSearchList(result.data.data.dbs.db);
        }
        // 1개만 검색된 경우, 객체로 반환됨으로 배열로 변경
        else {
          console.log(result.data.data.dbs.db);
          setkopisSearchList([result.data.data.dbs.db]);
        }


        // // 검색 결과가 없는 경우
        // if (Object.keys(result2.dbs.db).length === 0) {
        //   setkopisSearchList([]);
        // }
        // // 여러개 검색된 경우, 배열로 반환됨으로 배열로 유지
        // else if (Array.isArray(result2.dbs.db)) {
        //   console.log(result2.dbs.db);
        //   setkopisSearchList(result2.dbs.db);
        // }
        // // 1개만 검색된 경우, 객체로 반환됨으로 배열로 변경
        // else {
        //   console.log(result2.dbs.db);
        //   setkopisSearchList([result2.dbs.db]);
        // }
      });
    }
    // 필수요소중 1개라도 입력이 안된 경우 + 1~999범위내 작성안한 경우
    else {
      if (!searchInput.stdate) {
        alert("시작 날짜를 입력해 주세요");
      } else if (!searchInput.eddate) {
        alert("종료 날짜를 입력해 주세요");
      } else if (!searchInput.cpage) {
        alert("조회할 페이지를 입력해 주세요");
      } else if (!searchInput.rows) {
        alert("1페이지당 조회할 공연목록 수를 입력해 주세요");
      } else if (tempCpage < 1 || tempCpage > 999) {
        alert("현재 페이지의 범위내 숫자를 입력해 주세요(1~999)");
      } else {
        alert("페이지당 목록수 범위내 숫자를 입력해 주세요(1~999)");
      }
    }
  };

  // 이미지 클릭시 기본정보 가져오기
  const getKopisMusical = (event) => {
    // 1. 클릭한 이미지 정보 가져오기
    let clickImage = event.target.src;
    // 2. hidden으로 숨겨진 값 가져오기('공연명#공연ID#공연상태' 형태로 값이 지정되어 있음)
    let tempClickInfo = event.target.parentNode.children[1].value;
    console.log(tempClickInfo);
    let clickInfo = tempClickInfo.split("#"); // '#'으로 구분한다.
    // 3. 클릭한 뮤지컬 기본 정보를 띄운다
    setNowClickMusical({
      image: clickImage,
      title: clickInfo[0],
      state: clickInfo[2],
      code: clickInfo[1],
    });
    // 4. 모달창 종료
    closeModal();
  };

  return (
    <>
      {isOpen ? (
        <div className="searchModal-back">
          <div className="searchModal-wrapper">
            <div className="searchModal-main">
              <div className="searchModal-section1">
                <div className="searchModal-left"></div>
                <div className="searchModal-middle">
                  <div className="searchModal-middle-top"></div>
                  <div className="searchModal-middle-input">
                    <input
                      type="date"
                      placeholder="시작날짜 8자리(예시 : 20210811)"
                      id="startdate"
                      onChange={getStartDate}
                      onClick={setMaxStartDate}
                    />
                    <input
                      type="date"
                      placeholder="종료날짜 8자리(예시 : 20210811)"
                      id="endddate"
                      onChange={getEndDate}
                      onClick={setMaxEndDate}
                    />
                    <input
                      type="number"
                      placeholder="현재페이지(1~999)"
                      id="currentpage"
                      onChange={getCurrentPage}
                      min="1"
                      max="999"
                    />
                    <input
                      type="number"
                      placeholder="페이지당 목록 수(1~999)"
                      id="rows"
                      onChange={getRow}
                      min="1"
                      max="999"
                    />
                    <input
                      type="text"
                      placeholder="공연명(선택 옵션)"
                      id="musicaltitle"
                      onChange={getMusicalTitle}
                    />
                  </div>
                  <div className="searchModal-middle-bottom">
                    <button
                      className="searchModal-search-btn"
                      onClick={searchKOPIS}
                    >
                      KOPIS 검색
                    </button>
                  </div>
                </div>
                <div className="searchModal-right">
                  <p className="close-thik" onClick={closeModal} />
                </div>
              </div>
              <div className="searchModal-seperate-area">
                <div className="searchModal-seperate-line"></div>
              </div>
              {/* 검색결과 */}
              <div className="searchModal-section2">
                <ul className="searchModal-result-ul">
                  {kopisSearchList.length === 0 ? (
                    // 검색결과가 없는 경우
                    <li className="anythingNo">검색결과가 없습니다.</li>
                  ) : (
                    // 검색결과가 있는 경우
                    kopisSearchList.map((el) => (
                      <li
                        key={el.mt20id._text}
                        className="searchModal-result-li"
                      >
                        <div className="searchModal-result-image">
                          <img
                            src={el.poster._text}
                            alt={MusicalBaseImage}
                            className="searchModal-result-post"
                            onClick={getKopisMusical}
                          />
                          <input
                            type="hidden"
                            value={`${el.prfnm._text}#${el.mt20id._text}#${el.prfstate._text}`}
                          />
                        </div>
                        <div className="searchModal-result-input">
                          <div className="searchModal-result-title">
                            <div className="searchModal-result-title-info">
                              작품명:
                            </div>
                            <div className="searchModal-result-title-input">
                              {el.prfnm._text}
                            </div>
                          </div>
                          <div className="searchModal-result-id">
                            <div className="searchModal-result-id-info">
                              공연ID :
                            </div>
                            <div className="searchModal-result-id-input">
                              {el.mt20id._text}
                            </div>
                          </div>
                          {el.prfstate._text === "공연완료" ? (
                            <div className="searchModal-result-state-end">
                              공연완료
                            </div>
                          ) : (
                            <div className="searchModal-result-state-now">
                              공연중
                            </div>
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SearchModal;
