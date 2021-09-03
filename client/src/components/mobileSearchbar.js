import '../css/searchbar.css';
import '../css/mobileSearchbar.css';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as Hangul from 'korean-regexp';
import { IoChevronBackSharp } from 'react-icons/io5';
import { AiOutlineHistory } from 'react-icons/ai';
// import {ReactComponent as TrashIcon} from '../images/delete_black_24dp_fill.svg';

const MobileSearchbar = function ({ setIsMobileSearchbarOpen }) {
  // Redux State
  const allMusicalData = useSelector((state) => {
    let data = state.allMusicalDataReducer.arrAllMusicalData;
    return data;
  });

  // Local State
  const [str, setStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [arrSearchHistory, setArrSearchHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) || []
  );

  const history = useHistory();

  useEffect(() => {
    if (str) {
      filterResults(str);
    } else {
      setSearchResult([]);
    }
  }, [str]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(arrSearchHistory));
  }, [arrSearchHistory]);

  function filterResults(searchValue) {
    if (!searchValue) return;

    const reg = Hangul.getRegExp(searchValue);
    const filtered = allMusicalData.filter((item) => {
      return reg.test(item.title);
    });
    setSearchResult(filtered);
  }

  function handleDeleteHistory(title) {
    let arr = arrSearchHistory.filter((item) => item !== title);
    setArrSearchHistory([...arr]);
  }

  function handleClearHistory() {
    setArrSearchHistory([]);
  }

  function handleChange(e) {
    setStr(e.target.value);
  }

  function handleClose() {
    setIsMobileSearchbarOpen(false);
  }

  function handleClickSearchResult(title) {
    const url = new URL(window.location.href);

    // 현재 /musical/:title 페이지에 있다면
    if (url.pathname.includes('/musical')) {
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
    }

    setStr('');

    let idx = arrSearchHistory.indexOf(title);
    if (idx === -1) {
      setArrSearchHistory([title, ...arrSearchHistory]);
    } else {
      let arr = arrSearchHistory.filter((item) => item !== title);
      setArrSearchHistory([title, ...arr]);
    }
  }

  return (
    <div className='m-searchbar-container'>
      <div className='m-searchbar-div'>
        <div className=' m-searchbar-icon-div'>
          <IoChevronBackSharp
            className='searchbar-icon'
            onClick={handleClose}
          />
        </div>
        <div className='m-searchbar-input-div'>
          <input
            autoComplete='off'
            className='m-searchbar-input'
            placeholder='뮤지컬 검색'
            value={str}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      {!str ? (
        <div className='m-search-history-div'>
          <div className="m-search-history-title-div">
            <span className='m-search-history-title-span-1'>최근 검색어</span>
            {/* <TrashIcon className="m-search-history-trash-icon" fill={"#fff"}/> */}
            <span className='m-search-history-title-span-2' onClick={handleClearHistory}>전체삭제</span>
          </div>
          <ol>
            {arrSearchHistory.length
              ? arrSearchHistory.map((title, idx) => {
                  return (
                    <li key={idx} className='m-search-history-li'>
                      <AiOutlineHistory className='AiOutlineHistory' />
                      <span
                        className='m-search-history-li-span'
                        onClick={() => handleClickSearchResult(title)}
                      >
                        {title}
                      </span>
                      <span
                        className='m-search-history-li-span-close'
                        onClick={() => handleDeleteHistory(title)}
                      >
                        ✕
                      </span>
                    </li>
                  );
                })
              : null}
          </ol>
        </div>
      ) : null}
      {searchResult.length ? (
        <ol className='m-searchbar-result-ol'>
          {searchResult.map((item, idx) => {
            return (
              <li
                key={idx}
                className='m-searchbar-result-li'
                onClick={() => handleClickSearchResult(item.title)}
              >
                <img
                  className='m-searchbar-result-poster'
                  alt={`${item.title} 포스터`}
                  src={item.thumbnail}
                />
                <span className='m-searchbar-result-title'>{item.title}</span>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
};

export default MobileSearchbar;
