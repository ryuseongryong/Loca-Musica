import { GoSearch } from 'react-icons/go';
import '../css/searchbar.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Searchbar() {
  const [str, setStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const allMusicalData = useSelector((state) => {
    let data = state.allMusicalDataReducer.arrAllMusicalData
    console.log('Data from redux store: ', data);
    return data;
  })
  const history = useHistory();

  const handleChange = (e) => {
    setStr(e.target.value);
  };

  const filterResults = (searchValue) => {
    if (!searchValue) return;
    
    const reg = new RegExp(searchValue, 'i'); // i -> case insensative
    const filtered = allMusicalData.filter((item) => {
      return reg.test(item.title);
    });
    //console.log(filtered);
    setSearchResult(filtered);
  };

  const handleClickSearchResult = (title) => {
    console.log("Clicked a title: ", title);
    setStr('');
    history.push(`/musical/${title}`);
  };

  useEffect(() => {
    if (str) {
      filterResults(str);
    } else {
      setSearchResult([]);
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
            autocomplete="off"
            className='searchbar-input'
            placeholder='뮤지컬 검색'
            id='headerSearchTitleInput'
            value={str}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      {searchResult.length ? (
        <ol className='searchbar-result-ol'>
          {searchResult.map((item, idx) => {
            return (
              <li
                key={idx}
                className='searchbar-result-li'
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
