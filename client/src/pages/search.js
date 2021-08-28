import "../css/Search.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import SearchResult from "../components/searchResult";
import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from '../components/loader'
import Footer from "../components/footer";
import { notify } from "../actions/index";
import { useDispatch } from "react-redux";
import RightIconWide from '../images/right_icon_wide.png'; // 배경이 진함


function Search() {
    // redux사용 하기 위한 dispatch
    const dispatch = useDispatch();
    // 추천 결과 여부 파악 state변수
    const [isRecommend, setIsRecommend] = useState(true);
    // 유저 추천 해시태그 list(카테고리 + 해시태그)
    const [recommendUserHashtag, setRecommendUserHashtag] = useState([]);
    // 장르 카테고리 목록(맨처음 화면 랜더링시 필요)
    const [allGenreCategory, setAllGenreCategory] = useState([]);
    // 동행인 조건 카테고리 목록(맨처음 화면 랜더링시 필요)
    const [allWithPeopleCategory, setAllWithPeopleCategory] = useState([]);
    // 전체 해시태그 목록(맨처음 화면 랜더링시 필요)
    const [allHashtag, setAllHashtag] = useState([]);
    // 유저 지정 해시태그로 filtering된 musical 목록
    const [recommendMusicalList, setRecommendMusicalList] = useState([]);
    // 로딩 페이지 지정 state변수
    const [isLoading, setIsLoading] = useState(false);

    // 맨처음 화면 렌더링시 모든 해시태르 목록을 받아오기 위해서 useEffect사용
    useEffect(() => {
        // server에서 요청해서 값을 받아온다.
        // url: `${process.env.REACT_APP_END_POINT}/search`, // 예전 api, 만약 hashtag로 변경이 안된 경우 해당 api로 다시 변경할 것
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_END_POINT}/hashtag`,
        }, { withCredentials: true })
            .then(function (response) {
                /* server에서 response형태
                { data : 
                    {
                        category1Data: ['장르에 대한 카테고리', '~', ...],
                        category2Data: ['동행인 조건에 대한 카테고리', '~', ...],
                        hashtagsData: [{ name: '해시태그 명', totalLikeCount: 총 카운트 수 }, {~}, ...]
                    }
                }
                */
                console.log(response.data.data);

                // 장르 카테고리
                setAllGenreCategory(response.data.data.category1Data);
                // 동행인 카테고리
                setAllWithPeopleCategory(response.data.data.category2Data);
                // 해시태그
                // 1. 총 카운트가 많은 순서대로 정렬(내림차순)
                let sortHashtags = response.data.data.hashtagsData.sort((a, b) => a.totalLikeCount - b.totalLikeCount);
                setAllHashtag(sortHashtags);
            }).catch((err) => {
                console.log(err);
            });

    }, []);
    // 추천결과 출력 화면 전환
    const doRecommend = () => {
        // console.log(recommendUserHashtag); // -> ['유저 지정 해시태그1', '~', ...]

        // 만약 유저 해시태크를 1개도 지정하지 않고 추천 받으려는 경우 추천안됨(최소 1개 이상)
        if (recommendUserHashtag.length === 0) {
            dispatch(notify('취향에 따라 1개 이상 선택해 주세요.')); // 알림 메시지
        }
        // 1개 이상의 해시태그 지정시 추천 받음 
        else {
            // loading페이지가 출력되도록 설정
            setIsLoading(true);

            let temp = {
                hashtag1: '',
                hashtag2: '',
                hashtag3: ''
            }
            recommendUserHashtag.map((el, index) => {
                return temp[`hashtag${index + 1}`] = el; // hashtag1,2,3에 넣어짐 값이 없으면 ''
            });

            console.log(temp);
            // server에서 filter된 뮤지컬 정보 얻어오기
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_END_POINT}/search`,
                params: temp
            })
                .then((res) => {
                    // 1. 추천 뮤지컬 목록 가져오기
                    setRecommendMusicalList(res.data.data);
                    // 2. 추천 결과 컴포넌트로 전환
                    setIsRecommend(false); // searchResult component전환
                    // 3. 로딩페이지가 0.5초후 없어지도록 설정
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // 카테고리를 클릭한 경우 -> 선택,취소 모두 한번에 할 것
    const selectCategory = (event) => {
        // 1. 선택 if 부모span className = category
        if (event.target.parentNode.classList.contains('category')) {
            // 현재 선택된 카테고리 + 해시태그가 3개 이하인 경우 선택이 되도록 설정
            if (recommendUserHashtag.length < 3) {

                // event.target -> 자식 span노드, event.target.parentNode가 부모 span노드 이기때문에 부모 노드에 클래스명 지정
                // 만약 부모 span에 이벤트 핸들러 지정시 자식노드가 지정됨 / className추가,변경시 예외상황 발생 -> 자식 span에 지정
                // console.log(event.target.textContent);

                // 0. state변수 할당
                // 조건) if className = selected-category (state변수 할당 안함) / className = category (state변수 할당)
                // element.classList.contains('클래스명') -> 해당 클래스명이 있는 경우 true, 없으면 false

                // 새로 선택이 되었기 때문에 state변수 할당 
                // event.target.textContent -> 선택된 카테고리 value
                if (event.target.parentNode.classList.contains('category')) {
                    setRecommendUserHashtag([...recommendUserHashtag, event.target.textContent])
                }

                // 1. 선택이 안되는 경우를 표시하는 className 'category'제거
                event.target.parentNode.classList.remove('category');
                // 2. 선택이 되는 경우를 표시하는 className 'selected-category'추가
                event.target.parentNode.classList.add('selected-category');
            }
            // 4개 이상을 선택하려는 경우 선택이 안되도록 설정
            else {
                dispatch(notify('이미 3개가 선택되었습니다!')); // 알림 메시지                
            }
        }
        // 2. 취소 if 부모span className = selected-category
        else {
            // span
            // 1. 선택이 되는 경우를 표시하는 className 'selected-category'제거
            event.target.parentNode.classList.remove('selected-category');
            // 2. 선택이 안되는 경우를 표시하는 className 'category'추가
            event.target.parentNode.classList.add('category');

            // state변수 제거, 선택된 카테고리 제거
            let deleteHashtag = event.target.textContent;
            let updateHashtagList = recommendUserHashtag.filter((el) => el !== deleteHashtag);
            setRecommendUserHashtag(updateHashtagList);
        }
    }

    // 해시태그를 클릭한 경우 -> 선택,취소 모두 한번에 할 것
    const selectHashtag = (event) => {
        // 1. 선택 if 부모span className = category 인 경우
        if (event.target.parentNode.classList.contains('category')) {
            // 현재 선택된 카테고리 + 해시태그가 3개 이하인 경우 선택이 되도록 설정
            if (recommendUserHashtag.length < 3) {

                // console.log(event.target);
                // event.target -> 자식 span노드, event.target.parentNode가 부모 span노드 이기때문에 부모 노드에 클래스명 지정

                // 0. state변수 할당
                // 조건) if className = selected-category (state변수 할당 안함) / className = category (state변수 할당)
                // element.classList.contains('클래스명') -> 해당 클래스명이 있는 경우 true, 없으면 false

                // 새로 선택이 되었기 때문에 state변수 할당 
                // event.target.textContent -> 선택된 카테고리 value
                if (event.target.parentNode.classList.contains('category')) {
                    // 0-1. '#'을 제거해 준다.
                    // let onlyTextHashtag = event.target.textContent.slice(1);

                    // '#'을 제거하지 않는다.
                    let onlyTextHashtag = event.target.textContent;
                    setRecommendUserHashtag([...recommendUserHashtag, onlyTextHashtag]);
                }

                // 1. 선택이 안되는 경우를 표시하는 className 'category'제거
                event.target.parentNode.classList.remove('category');
                // 2. 선택이 되는 경우를 표시하는 className 'selected-category'추가
                event.target.parentNode.classList.add('selected-hashtag');
            }
            // 4개 이상을 선택하려는 경우 선택이 안되도록 설정
            else {
                dispatch(notify('이미 3개가 선택되었습니다!')); // 알림 메시지
            }
        }
        // 2. 취소 if 부모span className = selected-hashtag 인 경우
        else {
            // console.log(event.target);
            // span
            // 1. 선택이 되는 경우를 표시하는 className 'selected-hashtag'제거
            event.target.parentNode.classList.remove('selected-hashtag');
            // 2. 선택이 안되는 경우를 표시하는 className 'category'추가
            event.target.parentNode.classList.add('category');

            // state변수 제거, 선택된 카테고리 제거
            // let deleteHashtag = event.target.textContent.slice(1); // 맨앞 '#'을 제거
            let deleteHashtag = event.target.textContent;
            let updateHashtagList = recommendUserHashtag.filter((el) => el !== deleteHashtag);
            setRecommendUserHashtag(updateHashtagList);
        }
    }

    return (
        <>
            {
                isRecommend ?
                    <div className='search-container'>
                        <div className='search-main'>
                            <div className='search-section1'></div>
                            <div className='search-section2'>
                                <div className='search-section2-top'>
                                    <p className='search-info'>취향에 따라 최대 3개를 선택해주세요(카테고리 내 중복선택 가능)</p>
                                </div>
                                <div className='search-section2-middle'>
                                    <div className='search-category1'>
                                        <div className='search-left'>장르</div>
                                        <div className='search-right-category'>
                                            {/* server에서 받아와서 처리 */}
                                            {allGenreCategory.map((el, index) =>
                                                <span className='category' key={index}>
                                                    <span className='category-text' onClick={selectCategory}>{el.name}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='search-category2'>
                                        <div className='search-left'>누구와 함께</div>
                                        <div className='search-right-category'>
                                            {/* server에서 받아와서 처리 */}
                                            {allWithPeopleCategory.map((el, index) =>
                                                <span className='category' key={index}>
                                                    <span className='category-text' onClick={selectCategory}>{el.name}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='search-hashtags'>
                                        <div className='search-left-hashtag'>해시태그</div>
                                        <div className='search-right'>
                                            <ul className='hashtags-list'>
                                                {allHashtag.length === 0 ?
                                                    // 현재 해시태그 없는 경우
                                                    <li className='noHashtagList'>현재 해시태그가 없습니다.</li>
                                                    :
                                                    // 해시태그가 존재하는 경우 + 총 좋아요 수가 높은 순서대로 상단에 위치(totalLikeCount)
                                                    allHashtag.map((el, index) => (
                                                        // 1개 해시태그/주석
                                                        <li className='hashtag' key={index}>
                                                            <span className='category'>
                                                                <span className='category-text' onClick={selectHashtag}>{el.name}</span>
                                                            </span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='search-section2-bottom'>
                                    <div className='recommend-result-btn' onClick={doRecommend}>
                                        추천받기 <img src={RightIconWide} alt='icon-image' className="right-icon" />
                                    </div>
                                </div>
                            </div>
                            <div className='search-section3'></div>
                        </div>
                        <div className='search-footer-div'>
                            <Footer />
                        </div>
                    </div>
                    :
                    isLoading ?
                        // 로딩중, server와 정상적으로 통신이 되어야 로딩창 제거
                        <div className='search-container'>
                            <div className='search-loading-div'>
                                <Loader />
                            </div>
                        </div>
                        :
                        // 로딩완료 이후 추천결과 페이지
                        <SearchResult setIsRecommend={setIsRecommend} setRecommendUserHashtag={setRecommendUserHashtag}
                            recommendMusicalList={recommendMusicalList} />
            }
        </>
    )

}

export default Search;
