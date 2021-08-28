/*eslint-disable*/

import '../css/detail.css'
import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify, setIsModal } from "../actions/index";
import ChoiceModal from "./choiceModal";
import WordCloud1 from "./wordCloud";
import HashtagForm from "./hashtagForm"
// import WordCloudCover from "./wordCloudCover"
// import _ from "lodash";

function PerformanceTag({ isSignin, userInfo }) {
  //? 변수
  const url = new URL(window.location.href);
  const title = decodeURI(url.pathname.slice(9));
  const email = userInfo.email;
  const dispatch = useDispatch();

  // 상태관리
  //* 현재페이지에서만 관리되는 state
  const [hashtagsData, setHashtagsData] = useState([]); // 페이지 내에 있는 해시태그에 대한 유저 정보를 포함
  // const [userHashtag, setUserHashtag] = useState([]);
  // const [isModal, setIsModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  //? 사용자가 해시태그에 공감버튼을 눌렀는지 안 눌렀는지 확인하기 위한 데이터
  const checkHashtagUser = (hashtag, email) => {
    const clickedHashtag = hashtagsData.filter((el) => el.name === hashtag);
    return clickedHashtag[0].userInfo.map((el) => el.email).includes(email);
  };

  useEffect(() => {
    // 컴포넌트가 렌더링되면 해시태그데이터를 목록으로 가져옴
    axios
      .get(`${process.env.REACT_APP_END_POINT}/musical/${title}`, {
        withCredentials: true,
      })
      .then((res) => {

        // console.log('지금응답은?', res.data.data);
        let data = res.data.data.hashtagsData;

        // if (!_.isEqual(data, hashtagsData)) {
        //   setHashtagsData(data);
        // }

        setHashtagsData(res.data.data.hashtagsData);
        // setUserHashtag(res.data.data.userHashtag);
      })
      .catch((err) => {
        console.log('Failed to retrieve hashtag data from server.', err);
      });
  }, []);

  // console.log("해시태그에 담긴 정보(hashtagData", hashtagsData);
  // console.log("공감을 한 유저정보", userHashtag);

  //* 해시태그 등록 기능 함수
  const sendHashtagRequestHandler = (hashtag) => {
    axios
      .post(
        `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
        { title, hashtag },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        setHashtagsData(res.data.data.hashtagsData);
        setIsUpdate(!isUpdate);
        // console.log('반영후 결과', hashtagsData);
        // setInputValue('');
        dispatch(notify('해시태그가 등록되었습니다'));
      })
      .catch((err) => {
        console.log('해시태그 입력 기능에 대한 오류', err, err.response);
        // 이중 입력할 경우?
        if (err.response.data.message === 'double enter') {
          console.log('이미 입력되었습니다.');
        } 
        // 부정적인 표현이 등록했을때
        else if (
          err.response.data.message === "let's use the right words"
        ) {
          dispatch(notify('해시태그에 부적절한 표현이 보이네요')); 
        }
      });
  };

  // const memoSendHashtagRequestHandler = useCallback(() => {
  //   sendHashtagRequestHandler()
  // }, [hashtagsData])

  //* 해시태그 공감표시 기능 함수
  const controlLikeRequestHandler = (hashtag) => {
    // event.preventDefault();
    // let hashtag = event.target.textContent;
    // console.log('hashtag: ', hashtag);

    // if (!isSignin) {
    //   //setIsModal(true);
    //   setIsModal(true); // 로그인을 해야 작성가능(로그인 모달창이 열림)
    //   return;
    // }
    if (!checkHashtagUser(hashtag, email)) {
      axios
        .post(
          `${process.env.REACT_APP_END_POINT}/musical/hashtag`,
          { title, hashtag },
          { withCredentials: true }
        )
        .then((res) => {
          // console.log("공감을 표시했습니다");
          // console.log("공감표시의 결과에 대한 응답은?", res);
          setHashtagsData(res.data.data.hashtagsData);
          dispatch(notify(`Hashtag '${hashtag}'에 공감을 표시했습니다.`));
        })
        .catch((err) => {
          console.log("공감기능에 대한 오류", err.response);
        });
    } else if (checkHashtagUser(hashtag, email)) {
      if (hashtag[0] === "#") {
        hashtag = `%23${hashtag.slice(1)}`;
      }
      console.log(hashtag, title);
      axios
        .delete(
          `${process.env.REACT_APP_END_POINT}/musical/hashtag/${title}/${hashtag}`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log("공감취소의 결과에 대한 응답은?", res);
          // console.log("공감이 취소되었습니다");
          setHashtagsData(res.data.data.hashtagsData);
          dispatch(notify("공감이 취소 되었습니다"));
        })
        .catch((err) => {
          console.log("공감취소에 대한 오류", err.response);
        });
    }
  };

  return (
    <div>
      <div className="pfHashtagWrap">
        <p className="pfItem">태그</p>
        {/* <div className="pfHashtags">
          <ul id="hashtagItemList">
            {hashtagsData.map((el, index) => (
              <li
                className="hashtagItem"
                key={index}
                onClick={controlLikeRequestHandler}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div> */}
        {/* {!isSignin ? <WordCloudCover/> : null} */}
        <WordCloud1
          isSignin={isSignin}
          controlLikeRequestHandler={controlLikeRequestHandler}
          hashtagsData={hashtagsData}
        />
        <HashtagForm
          isSignin={isSignin}
          userInfo={userInfo}
          hashtagsData={hashtagsData}
          sendHashtagRequestHandler={sendHashtagRequestHandler}
          setHashtagsData={setHashtagsData}
          />
      </div>
      {/* {isModal ? <ChoiceModal setIsModal={setIsModal} /> : null} */}
    </div>
  );
}
export default PerformanceTag;
