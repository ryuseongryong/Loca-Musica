import "../css/Search.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchResult from "../components/searchResult";
import { useEffect, useState } from "react";
import axios from 'axios';

function Search() {
    // 추천 결과 여부 파악 state변수
    const [isRecommend, setIsRecommend] = useState(true);
    // 유저 추천 해시태그 list(카테고리 + 해시태그)
    const [recommendUserHashtag, setRecommendUserHashtag] = useState([]);
    // 전체 해시태그 목록(맨처음 화면 랜더링시 필요)
    const [allHashtag, setAllHashtag] = useState(['한글최대길이7', 'abcdefghijklm', '포카칩', '에어컨', '치킨', '시간순삭', '돈아까움', '내돈내산', '연기가 훌륭', '아무거나 작성', '오늘 뭐먹지?', '하품이 나옴', '환불각', '불후의명작', '역대 최고의 작품']);
    // 맨처음 화면 렌더링시 모든 해시태르 목록을 받아오기 위해서 useEffect사용, 모든 해시태그 목록이 변동시 마다 실행
    useEffect(() => {
        /* server에서 요청해서 값을 받아온다.
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_END_POINT}/search/allTag`,
        }, { withCredentials: true })
            .then(function (response) {
                // server에서 response형태 -> { data: [해시태그들] }
                // console.log(response.data.data); // 배열에 접근하기 위해서 
                setAllHashtag(response.data.data);
            });
        */
    }, [allHashtag]);
    // 추천결과 출력
    const doRecommend = () => {
        setIsRecommend(false);
    };
    // 카테고리를 클릭한 경우
    const selectCategory = (event) => {
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
            // 2-1. 취소버튼이 표시되도록 'none-category-closebtn' -> 'show-category-closebtn'으로 변경
            event.target.parentNode.lastChild.classList.remove('none-category-closebtn');
            event.target.parentNode.lastChild.classList.add('show-category-closebtn');
        }
        // 4개 이상을 선택하려는 경우 선택이 안되도록 설정
        else {
            alert('이미 3개가 선택되었습니다!');
        }

    }
    // 선택한 카테고리를 취소
    const deselectCategory = (event) => {

        // span
        // 1. 선택이 되는 경우를 표시하는 className 'selected-category'제거
        event.target.parentNode.parentNode.classList.remove('selected-category');
        // 2. 선택이 안되는 경우를 표시하는 className 'category'추가
        event.target.parentNode.parentNode.classList.add('category');
        // div
        // 3. 버튼을 감싸는 div가 display:none이 되도록 'show-category-closebtn'->'none-category-closebtn'으로 변경
        event.target.parentNode.classList.remove('show-category-closebtn');
        event.target.parentNode.classList.add('none-category-closebtn');

        // state변수 제거, 선택된 카테고리 제거
        let deleteHashtag = event.target.parentNode.previousSibling.textContent;
        let updateHashtagList = recommendUserHashtag.filter((el) => el !== deleteHashtag);
        setRecommendUserHashtag(updateHashtagList);
    }
    // 해시태그를 클릭한 경우
    const selectHashtag = (event) => {
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
                let onlyTextHashtag = event.target.textContent.slice(1);
                setRecommendUserHashtag([...recommendUserHashtag, onlyTextHashtag]);
            }

            // 1. 선택이 안되는 경우를 표시하는 className 'category'제거
            event.target.parentNode.classList.remove('category');
            // 2. 선택이 되는 경우를 표시하는 className 'selected-category'추가
            event.target.parentNode.classList.add('selected-hashtag');
            // 2-1. 취소버튼이 표시되도록 'none-category-closebtn' -> 'show-category-closebtn'으로 변경
            event.target.parentNode.lastChild.classList.remove('none-category-closebtn');
            event.target.parentNode.lastChild.classList.add('show-category-closebtn');
        }
        // 4개 이상을 선택하려는 경우 선택이 안되도록 설정
        else {
            alert('이미 3개가 선택되었습니다!');
        }
    }
    // 선택한 해시태그를 취소
    const deselectHashtag = (event) => {
        // console.log(event.target);
        // span
        // 1. 선택이 되는 경우를 표시하는 className 'selected-hashtag'제거
        event.target.parentNode.parentNode.classList.remove('selected-hashtag');
        // 2. 선택이 안되는 경우를 표시하는 className 'category'추가
        event.target.parentNode.parentNode.classList.add('category');
        // div
        // 3. 버튼을 감싸는 div가 display:none이 되도록 'show-category-closebtn'->'none-category-closebtn'으로 변경
        event.target.parentNode.classList.remove('show-category-closebtn');
        event.target.parentNode.classList.add('none-category-closebtn');

        // state변수 제거, 선택된 카테고리 제거
        let deleteHashtag = event.target.parentNode.previousSibling.textContent.slice(1); // 맨앞 '#'을 제거
        let updateHashtagList = recommendUserHashtag.filter((el) => el !== deleteHashtag);
        setRecommendUserHashtag(updateHashtagList);
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
                                    <div className='search-left'></div>
                                    <div className='search-right-info'>
                                        <p className='search-info'>취향에 따라 최대 3개를 선택해주세요(카테고리 내 중복선택 가능)</p>
                                    </div>
                                </div>
                                <div className='search-section2-middle'>
                                    <div className='search-category1'>
                                        <div className='search-left'>장르</div>
                                        <div className='search-right-category'>
                                            {/* 선택안되면 클래스명 category만 존재/주석 */}
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>드라마</span>
                                                {/* 선택 안되면 클래스명 none-category-closebtn 으로 변경/주석 */}
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>로맨스</span>
                                                {/* 선택 안되면 클래스명 none-category-closebtn 으로 변경/주석 */}
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            {/* hashtag들에서 선택될때는 클래스명이 오직  selected-category 만 존재해야 한다(category 존재x)/주석 */}
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>판타지</span>
                                                {/* 선택되면 클래스명 show-category-closebtn 으로 변경/주석 */}
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>코미디</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>역사</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>스릴러</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>가족</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='search-category2'>
                                        <div className='search-left'>동행인 기준</div>
                                        <div className='search-right-category'>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>혼자</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>연인과 함께</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>가족과 함께</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>친구와 함께</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>아이와 함께</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text' onClick={selectCategory}>동료와 함께</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn' onClick={deselectCategory}>x</div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='search-hashtags'>
                                        <div className='search-left-hashtag'></div>
                                        <div className='search-right'>
                                            <ul className='hashtags-list'>
                                                {allHashtag.map((el, index) => (
                                                    // 1개 해시태그/주석
                                                    <li className='hashtag' key={index}>
                                                        <span className='category'>
                                                            <span className='category-text' onClick={selectHashtag}>#{el}</span>
                                                            <div className='none-category-closebtn'>
                                                                <div className='category-select-cancel-btn' onClick={deselectHashtag}>x</div>
                                                            </div>
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='search-section2-bottom'>
                                    <div className='recommend-result-btn' onClick={doRecommend}>
                                        추천받기 &nbsp;{'>'}
                                    </div>
                                </div>
                            </div>
                            <div className='search-section3'></div>
                        </div>
                    </div>
                    :
                    <SearchResult setIsRecommend={setIsRecommend} recommendUserHashtag={recommendUserHashtag} />
            }
        </>
    )

}

export default Search;
