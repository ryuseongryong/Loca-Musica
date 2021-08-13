import '../css/Search.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchResult from '../components/searchResult';
import { useState } from 'react';

function Search() {
    // 추천 결과 여부 파악 state변수
    const [isRecommend, setIsRecommend] = useState(true);

    // 추천결과 출력
    const doRecommend = () => {
        setIsRecommend(false);
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
                                    {/* 추천하기 이전 */}
                                    <div className='search-left'></div>
                                    <div className='search-right-info'>
                                        <p className='search-info'>취향에 따라 최대 3개를 선택해주세요(카테고리 내 중복선택 가능)</p>
                                    </div>
                                </div>
                                <div className='search-section2-middle'>
                                    {/* 추천하기 이전 */}
                                    <div className='search-category1'>
                                        <div className='search-left'>분류 기준1</div>
                                        <div className='search-right'>
                                            {/* 선택안되면 클래스명 category만 존재/주석 */}
                                            <span className='category'>
                                                <span className='category-text'>#???</span>
                                                {/* 선택 안되면 클래스명 none-category-closebtn 으로 변경/주석 */}
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            {/* 선택되면 클래스명  selected-category 추가/주석 */}
                                            <span className='category selected-category'>
                                                <span className='category-text'>#가나다라마</span>
                                                {/* 선택되면 클래스명 show-category-closebtn 으로 변경/주석 */}
                                                <div className='show-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text'>#???</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text'>#???</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text'>#???</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='search-category2'>
                                        <div className='search-left'>분류 기준2</div>
                                        <div className='search-right'>
                                            <span className='category'>
                                                <span className='category-text'>#???</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text'>#가나다라마</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text'>#???</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            <span className='category'>
                                                <span className='category-text'>#???</span>
                                                <div className='none-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                            <span className='category selected-category'>
                                                <span className='category-text'>#바사아자차</span>
                                                <div className='show-category-closebtn'>
                                                    <div className='category-select-cancel-btn'>x</div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='search-hashtags'>
                                        <div className='search-left'></div>
                                        <div className='search-right'>
                                            <ul className='hashtags-list'>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그1</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    {/* hashtag들에서 선택될때는 클래스명이 오직  selected-category 만 존재해야 한다(category 존재x)/주석 */}
                                                    <span className='selected-category'>
                                                        <span className='category-text'>#나는해시태그2</span>
                                                        <div className='show-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그3</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그4</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그5</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그6</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그7</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그8</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그9</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                                {/* 1개 해시태그/주석 */}
                                                <li className='hashtag'>
                                                    <span className='category'>
                                                        <span className='category-text'>#나는해시태그10</span>
                                                        <div className='none-category-closebtn'>
                                                            <div className='category-select-cancel-btn'>x</div>
                                                        </div>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='search-section2-bottom'>
                                    {/* 추천하기 이전 */}
                                    <div className='recommend-result-btn' onClick={doRecommend}>
                                        추천받기 &nbsp;{'>'}
                                    </div>
                                </div>
                            </div>
                            <div className='search-section3'></div>
                        </div>
                    </div>
                    :
                    <SearchResult setIsRecommend={setIsRecommend} />
            }
        </>
    )
}

export default Search;