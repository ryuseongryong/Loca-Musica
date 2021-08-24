/* eslint-disable */
import { GoSearch } from 'react-icons/go';
import '../css/searchbar.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Hangul from 'korean-regexp';

function Searchbar() {
  const [str, setStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [delta, setDelta] = useState(Date.now());

  const allMusicalData = useSelector((state) => {
    let data = state.allMusicalDataReducer.arrAllMusicalData;
    //console.log('Data from redux store: ', data);
    return data;
  })
  const history = useHistory();

  const handleChange = (e) => {
    setStr(e.target.value);
  };

  const filterResults = (searchValue) => {
    if (!searchValue) return;
    
    //const reg = new RegExp(searchValue, 'i'); // i -> case insensative
    const reg = Hangul.getRegExp(searchValue);
    const filtered = allMusicalData.filter((item) => {
      return reg.test(item.title);
    });
    //console.log(filtered);
    setSearchResult(filtered);
  };

  const handleClickSearchResult = (title) => {
    console.log("Clicked a title: ", title);
    setStr('');
    const url = new URL(window.location.href)
    console.log("current url: ", url)
    if (url.pathname.includes("/musical")) {
      console.log("I'm in /musical page");
      if (url.host === "localhost:3000"){
        window.location.assign(`http://localhost:3000/musical/${title}`); 
      }
      else if (url.host === "loca-musica.com"){
        window.location.assign(`https://loca-musica.com/musical/${title}`); 
      }
    }
    else {
      history.push(`/musical/${title}`);
      console.log(history);
    }
  };

  const isDoubleKeyDown = () => {
    setDelta(Date.now());
    let now = Date.now();
    if (now - delta < 10){
      console.log("Prevent double keydown!")
      return true;
    }
    return false;
  }

  const handleKeyDown = (event) => {
    if (searchResult.length === 0) return;
    
    const key = event.key;
    //console.log("key: ", key);
    //console.log("highlightIdx: ", highlightIdx)

    if (key === 'ArrowDown') {
      event.preventDefault();
      if (isDoubleKeyDown()) return;
      if (highlightIdx + 1 < searchResult.length)
        setHighlightIdx(highlightIdx + 1);
      else{
        setHighlightIdx(0);
      }
    }

    else if (key === 'ArrowUp') {
      event.preventDefault();
      if (isDoubleKeyDown()) return;
      if (highlightIdx - 1 >= 0)
        setHighlightIdx(highlightIdx - 1)
      else 
        setHighlightIdx(searchResult.length - 1)
    }

    else if (key === 'Enter') {
      event.preventDefault();
      if (isDoubleKeyDown()) return;
      let value = searchResult[highlightIdx].title;
      handleClickSearchResult(value);
    }
  }

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
            autoComplete="off"
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
        <ol className='searchbar-result-ol'>
          {searchResult.map((item, idx) => {
            return (
              <li
                key={idx}
                className={`searchbar-result-li ${highlightIdx === idx ? ' searchbar-result-li-highlighted' : null}`}
                onClick={()=>handleClickSearchResult(item.title)}
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
