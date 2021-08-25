/* eslint-disable */
import { GoSearch } from 'react-icons/go';
import '../css/searchbar.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Hangul from 'korean-regexp';

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

  const numResultsVisible = 3 - 1; // 검색결과에 기본적으로 보이는 <li>의 수. index 를 맞추기 위해 -1
  const scrollBehavior = 'smooth'; // 'auto', 'smooth'
  // const olHeight = 250; // Height of <ol> element

  const handleChange = (e) => {
    setStr(e.target.value);
  };

  const filterResults = (searchValue) => {
    if (!searchValue) return;

    const reg = Hangul.getRegExp(searchValue);
    const filtered = allMusicalData.filter((item) => {
      return reg.test(item.title);
    });
    //console.log(filtered);
    setSearchResult(filtered);
  };

  const handleClickSearchResult = (title) => {
    console.log('Clicked a title: ', title);
    setStr('');
    const url = new URL(window.location.href);
    console.log('current url: ', url);
    if (url.pathname.includes('/musical')) {
      console.log("I'm in /musical page");
      if (url.host === 'localhost:3000') {
        window.location.assign(`http://localhost:3000/musical/${title}`);
      } else if (url.host === 'loca-musica.com') {
        window.location.assign(`https://loca-musica.com/musical/${title}`);
      }
    } else {
      history.push(`/musical/${title}`);
      console.log(history);
    }
  };

  const isDoubleKeyDown = () => {
    setDelta(Date.now());
    let now = Date.now();
    if (now - delta < 10) {
      console.log('Prevent double keydown!');
      return true;
    }
    return false;
  };
  const handleKeyDown = (event) => {
    if (searchResult.length === 0) return;

    const key = event.key;
    const scrollTop = olElm.current.scrollTop;
    const scrollHeight = olElm.current.scrollHeight;
    const liHeight = scrollHeight / searchResult.length;
    function scrollTo(e) { olElm.current.scrollTo(e);}
    // const extraOlHeight = olHeight - numResultsVisible * liHeight;

    if (key === 'ArrowDown') {
      event.preventDefault();
      if (isDoubleKeyDown()) 
        return;

      if (highlightIdx + 1 < searchResult.length){
        if (highlightIdx + 1 > numResultsVisible) {
          scrollTo({
            top: scrollTop + liHeight, 
            behavior: scrollBehavior
          })
        }
        setHighlightIdx(highlightIdx + 1);
      }
      else {
        scrollTo({
          top: 0, 
          behavior: scrollBehavior
        });
        setHighlightIdx(0);
      }
    } 
    else if (key === 'ArrowUp') {
      event.preventDefault();
      if (isDoubleKeyDown()) 
        return;

      if (highlightIdx - 1 >= 0) { 
        if (highlightIdx - 1 <= searchResult.length - numResultsVisible) { // TODO:
          scrollTo({
            top: scrollTop - liHeight, 
            behavior: scrollBehavior
          })
        }
        setHighlightIdx(highlightIdx - 1);
      }
      else {
        scrollTo({
          top: scrollHeight, 
          behavior: scrollBehavior
        });
        setHighlightIdx(searchResult.length - 1);
      }
    } 
    else if (key === 'Enter') {
      event.preventDefault();
      if (isDoubleKeyDown()) 
        return;

      let value = searchResult[highlightIdx].title;
      handleClickSearchResult(value);
    }
  };

  useEffect(() => {
    if (str) {
      filterResults(str);
      setHighlightIdx(0);
    } else {
      setSearchResult([]);
      setHighlightIdx(-1);
    }
  }, [str]);

  return (
    <div className={'searchbar-container'}>
      <div className='searchbar-div'>
        <div className='searchbar-icon-div'>
          <GoSearch className='searchbar-icon' />
        </div>
        <div className='searchbar-input-div'>
          <input
            autoComplete='off'
            className='searchbar-input'
            placeholder='뮤지컬 검색'
            id='headerSearchTitleInput'
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
}

export default Searchbar;
