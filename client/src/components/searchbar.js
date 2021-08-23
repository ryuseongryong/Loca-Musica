import { GoSearch } from 'react-icons/go';
import '../css/searchbar.css';
import { useState, useEffect } from 'react';

function Searchbar() {
  // 제목 검색
  // const filterTitleMusical = (event) => {
  //   let filterTitle = document.querySelector('#headerSearchTitleInput').value;
  //   console.log('입력 title', filterTitle);
  //   axios({
  //     method: 'get',
  //     url: `${process.env.REACT_APP_END_POINT}/musical`,
  //     params: {
  //       title: filterTitle,
  //     }
  //   }).then((res) => {
  //     /* res.data.data = {검색된 뮤지컬 객체} -> 객체 1개만 return
  //     data : {
  //     actors: "타잔"
  //     code: "PF177939"
  //     contents: "아~~~~~~~~~아아아~~~~~~~~~~~아~~~~아아아아아아~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  //     id: 13
  //     state: "공연완료"
  //     thumbnail: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF177939_210804_095959.gif"
  //     title: "정글북"
  //     }
  //     */
  //     // res.data.data 값을 전달해야 한다 -> 1.redux이용 2.app.js에서 state만들어서 전달
  //     console.log(res.data.data);
  //     history.push('/musical/main'); // 메인페이지 이동
  //   })
  //     .catch(function (error) {
  //       // 서버가 연결되어 있는 경우 에러처리
  //       if (error.response) {
  //         // 찾는 결과가 없는 경우(404)
  //         if (error.response.status === 404) {
  //           alert('조건에 해당하는 뮤지컬이 없습니다')
  //         }
  //         // 서버 에러(500)
  //         else {
  //           alert('서버에러가 발생하였습니다.')
  //         }
  //       }
  //     });
  // }
  const [str, setStr] = useState('');

  const handleChange = (e) => {
    setStr(e.target.value);
  };

  const handleSearch = (searchValue) => {
    if (!searchValue) return;
  };

  useEffect(() => {
    handleSearch(str);
  }, [str]);

  return (
    <div className='searchbar-container'>
      <div className='searchbar-div'>
        <div className='searchbar-icon-div'>
          <GoSearch className='searchbar-icon' />
        </div>
        <div className='searchbar-input-div'>
          <input
            className='searchbar-input'
            placeholder='뮤지컬 검색'
            id='headerSearchTitleInput'
            value={str}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <ol className='searchbar-result-ol'>
          <li className='searchbar-result-li'>
            <img
              className='searchbar-result-poster'
              alt='포스터 이미지'
              src='https://www.m-i.kr/news/photo/202010/752129_531615_4159.jpg'
            />
            <span className='searchbar-result-title'>몬테크리스토</span>
          </li>
          <li className='searchbar-result-li'>
            <img
              className='searchbar-result-poster'
              alt='포스터 이미지'
              src='https://www.m-i.kr/news/photo/202010/752129_531615_4159.jpg'
            />
            <span className='searchbar-result-title'>몬테크리스토</span>
          </li>
        </ol>
    </div>
  );
}

export default Searchbar;
