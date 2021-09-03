// import { TagCloud } from 'react-tagcloud'
import WordCloud from 'react-d3-cloud';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import '../css/wordcloud.css';
import _ from 'lodash';
import ChoiceModal from './choiceModal';

let count = 0;
function WordCloud1({ isSignin, controlLikeRequestHandler, hashtagsData }) {
  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const memoizedData = useMemo(() => {
    let data = makeWordcloudData(hashtagsData);
    setData(data);
    return data;
  }, [hashtagsData]);

  let fill = getRandomColor();

  const windowWidth = window.innerWidth; // 현재 화면의 width
  const wordCloudHeight = wordCloudWidth(windowWidth) * (1 / 1.168); // width 에 따른 height (모바일, PC 2가지)
  const wordCount = data.length; // 해쉬태그 개수

  useEffect(() => {
    count++;
    // console.log('Render Count: ', count);
    // setData(makeWordcloudData(hashtagsData));
  }, [hashtagsData]);

  function makeWordcloudData(data) {
    return data.map((el) => {
      return {
        text: el.name,
        value: el.likeCount,
      };
    });
  }

  // wordcloud 전체의 width
  function wordCloudWidth() {
    // 모바일: 400, PC: 700
    return windowWidth <= 768 ? 400 : 700;
  }

  // 해쉬태그 개수에 따른 가중치 (해쉬태그가 많아질수록 개별 해쉬태그의 글자크기가 상대적으로 줄어듦)
  function wordCountValue(wordCount) {
    // 10개이하: 2, 10개이상: 30/wordCount (y = 30/x 그래프)
    return wordCount <= 10 ? 2 : 30 / wordCount;
  }

  // 글자 크기
  function fontSizeMapper(word) {
    // word.value 가 작을수록 글자 크기가 커짐.
    if (windowWidth <= 768) {
      return 7 * (Math.log2(word.value) + 1) * wordCountValue(wordCount);
    } else {
      // (y = 20 * ( log2(value) + 1 ) 그래프 https://www.desmos.com/calculator?lang=ko)
      return 14 * (Math.log2(word.value) + 1) * wordCountValue(wordCount);
    }
  }

  function onWordClick(event) {
    event.preventDefault();
    if (!isSignin) {
      //setIsModal(true);
      setIsModal(true); // 로그인을 해야 작성가능(로그인 모달창이 열림)
      return;
    }

    let style = event.target.style;
    style.fill = fill;

    let hashtag = event.target.textContent;
    //console.log('hashtag: ', hashtag);

    controlLikeRequestHandler(hashtag);
    // setData(makeWordcloudData(hashtagsData));
  }

  function onWordMouseOver(event) {
    let style = event.target.style;
    style.cursor = 'pointer';
    fill = style.fill;
    style.fill = '#fff';
  }

  function onWordMouseOut(event) {
    let style = event.target.style;
    style.textDecoration = 'none';
    style.cursor = 'none';
    style.fill = fill;
  }
  function getRandomColor() {
    var hexLetters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += hexLetters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <div className="wordcloud-container">
        <WordCloud
          className="wordcloud"
          data={memoizedData}
          width={wordCloudWidth()}
          height={wordCloudHeight}
          fontSizeMapper={fontSizeMapper}
          font={'Montserrat'}
          onWordClick={onWordClick}
          onWordMouseOver={onWordMouseOver}
          onWordMouseOut={onWordMouseOut}
        />
      </div>
      {isModal ? (
        <ChoiceModal isModal={isModal} setIsModal={setIsModal} />
      ) : null}
    </>
  );
}

// export default React.memo(WordCloud1, (prev, next) => {
//     if (!_.isEqual(prev, next)) {
//       return true;
//     }
//     return false;
// });
export default React.memo(WordCloud1);
