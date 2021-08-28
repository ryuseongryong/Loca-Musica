/* eslint-disable */
import { GoSearch } from 'react-icons/go';
import '../css/searchbar.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Hangul from 'korean-regexp';

let numListStartIdx = -1;
let numListEndIdx = -1;

function Searchbar() {
  // Redux State
  const allMusicalData = useSelector((state) => {
    let data = state.allMusicalDataReducer.arrAllMusicalData;
    //console.log('Data from redux store: ', data);
    return data;
  });

  // Local State
  const [str, setStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [delta, setDelta] = useState(Date.now());

  const history = useHistory();
  const olElm = useRef(null);

  const numVisibleLi = 3; // 검색결과에 기본적으로 보이는 <li>의 수.
  const scrollBehavior = 'smooth'; // 'auto', 'smooth'
  // const olHeight = 250; // Height of <ol> element

  useEffect(() => {
    if (str) {
      filterResults(str);
      setHighlightIdx(0);
    } else {
      setSearchResult([]);
      setHighlightIdx(-1);
    }
  }, [str]);

  function filterResults(searchValue) {
    if (!searchValue) return;

    let reg = Hangul.getRegExp(searchValue);
    let filtered = allMusicalData.filter((item) => {
      return reg.test(item.title);
    });
    setSearchResult(filtered);

    if (filtered.length === 0) {
      numListStartIdx = -1;
      numListEndIdx = -1;
      return;
    }

    numListStartIdx = 0;

    if (filtered.length >= numVisibleLi) {
      numListEndIdx = numVisibleLi - 1;
    } else {
      numListEndIdx = filtered.length - 1;
    }
  }

  function isDoubleKeyDown() {
    setDelta(Date.now());
    let now = Date.now();
    if (now - delta < 10) {
      console.log('Prevent double keydown!');
      return true;
    }
    return false;
  }

  function handleChange(e) {
    setStr(e.target.value);
  }

  function handleClickSearchResult(title) {
    //console.log('Clicked a title: ', title);
    setStr('');
    let url = new URL(window.location.href);
    //console.log('current url: ', url);

    // 현재 /musical/:title 페이지에 있다면
    if (url.pathname.includes('/musical')) {
      //console.log("I'm in /musical page");
      // localhost
      if (url.host === 'localhost:3000') {
        window.location.assign(`http://localhost:3000/musical/${title}`);
      }
      // loca-musica
      else if (url.host === 'loca-musica.com') {
        window.location.assign(`https://loca-musica.com/musical/${title}`);
      }
    }
    // 아니라면
    else {
      history.push(`/musical/${title}`);
      //console.log(history);
    }
  }

  function handleKeyDown(event) {
    if (searchResult.length === 0) return;

    let key = event.key;
    let scrollTop = olElm.current.scrollTop;
    let scrollHeight = olElm.current.scrollHeight;
    let liHeight = scrollHeight / searchResult.length;
    function scrollTo(options) {
      olElm.current.scrollTo(options);
    }
    // const extraOlHeight = olHeight - numVisibleLi * liHeight;

    switch (key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (isDoubleKeyDown()) return;

        // 검색결과가 3개 이하일 때 
        if (searchResult.length <= numVisibleLi) {
          // 리스트의 맨 아래에 다다랐을 경우
          if (highlightIdx + 1 >= searchResult.length) {
            setHighlightIdx(0);
          }
          // 아닐 경우
          else {
            setHighlightIdx(highlightIdx + 1);
          }
        }

        // 검색결과가 4개 이상일 때 TODO: else 위에 comment 쓰면 자동정렬 안됨!
        else {
          // 리스트의 맨 아래에 다다랐을 경우
          if (highlightIdx + 1 >= searchResult.length) {
            numListStartIdx = 0;
            numListEndIdx = numVisibleLi - 1;
            scrollTo({
              top: 0,
              behavior: scrollBehavior,
            });
            setHighlightIdx(0);
          }
          // 검색화면의 맨 아래에 다다랐을 경우
          else if (highlightIdx + 1 > numListEndIdx) {
            numListStartIdx++;
            numListEndIdx++;
            scrollTo({
              top: scrollTop + liHeight,
              behavior: scrollBehavior,
            });
            setHighlightIdx(highlightIdx + 1);
          }
          // 아닐 경우
          else {
            setHighlightIdx(highlightIdx + 1);
          }
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        if (isDoubleKeyDown()) return;

        // 검색결과가 3개 이하일 때
        if (searchResult.length <= numVisibleLi) {
          // 리스트의 맨 처음에 다다랐을 경우
          if (highlightIdx - 1 < 0) {
            setHighlightIdx(searchResult.length - 1);
          }
          // 아닐 경우
          else {
            setHighlightIdx(highlightIdx - 1);
          }
        }

        // 검색결과가 4개 이상일 때
        else {
          // 리스트의 맨 위에 다다랐을 경우
          if (highlightIdx - 1 < 0) {
            numListEndIdx = searchResult.length - 1;
            numListStartIdx = numListEndIdx - numVisibleLi + 1;
            scrollTo({
              top: scrollHeight,
              behavior: scrollBehavior,
            });
            setHighlightIdx(searchResult.length - 1);
          }
          // 검색화면의 맨 위에 다다랐을 경우
          else if (highlightIdx - 1 < numListStartIdx) {
            numListStartIdx--;
            numListEndIdx--;
            scrollTo({
              top: scrollTop - liHeight,
              behavior: scrollBehavior,
            });
            setHighlightIdx(highlightIdx - 1);
          }
          // 아닐 경우
          else {
            setHighlightIdx(highlightIdx - 1);
          }
        }
        break;
      }

      case 'Enter': {
        event.preventDefault();
        if (isDoubleKeyDown()) return;

        let value = searchResult[highlightIdx].title;
        handleClickSearchResult(value);

        break;
      }

      default:
        break;
    }
  }

  return (
    <div className='searchbar-container'>
      <div className='searchbar-div'>
        <div className='searchbar-icon-div'>
          <GoSearch className='searchbar-icon' />
        </div>
        <div className='searchbar-input-div'>
          <input
            autoComplete='off'
            className='searchbar-input'
            placeholder='뮤지컬 검색'
            // id='headerSearchTitleInput'
            value={str}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
      </div>
      {searchResult.length ? (
        <ol
          ref={olElm}
          className={`searchbar-result-ol ${
            searchResult.length > 2 ? 'searchbar-result-ol-scroll' : null
          }`}
        >
          {searchResult.map((item, idx) => {
            return (
              <li
                key={idx}
                className={`searchbar-result-li ${
                  highlightIdx === idx
                    ? 'searchbar-result-li-highlighted'
                    : null
                }`}
                onClick={() => handleClickSearchResult(item.title)}
              >
                <img
                  className='searchbar-result-poster'
                  alt={`${item.title} 포스터`}
                  src={item.thumbnail}
                />
                <span className='searchbar-result-title'>{item.title}</span>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
};

export default Searchbar;