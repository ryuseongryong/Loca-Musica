import '../css/searchbar.css';
import '../css/mobileSearchbar.css';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as Hangul from 'korean-regexp';
import { IoChevronBackSharp } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';

const MobileSearchbar = function ({ setIsMobileSearchbarOpen }) {
  // Redux State
  const allMusicalData = useSelector((state) => {
    let data = state.allMusicalDataReducer.arrAllMusicalData;
    //console.log('Data from redux store: ', data);
    return data;
  });

  // Local State
  const [str, setStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (str) {
      filterResults(str);
    } else {
      setSearchResult([]);
    }
  }, [str]);

  function filterResults(searchValue) {
    if (!searchValue) return;

    const reg = Hangul.getRegExp(searchValue);
    const filtered = allMusicalData.filter((item) => {
      return reg.test(item.title);
    });
    setSearchResult(filtered);
  }

  function handleChange(e) {
    setStr(e.target.value);
  }

  function handleClose() {
    setIsMobileSearchbarOpen(false);
  }

  function handleClickSearchResult(title) {
    setStr('');
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
