import '../css/Search.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Search() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
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

                        {/* 추천하기 이후 */}
                        {/* <div className='search-result-info-div'>
                            <p className='search-result-info'>선택하신 결과에 따른 추천 작품입니다.</p>
                        </div> */}
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

                        {/* 추천하기 이후 */}
                        {/* <ul className='search-result-list'>
                            <li className='search-result-musical'>
                                <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF156128_191015_094221.jpg"
                                    alt="musical-image" className='search-result-musical-image' />
                            </li>
                            <li className='search-result-musical'>
                                <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF171092_210119_100127.gif"
                                    alt="musical-image" className='search-result-musical-image' />
                            </li>
                            <li className='search-result-musical'>
                                <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF155057_190925_092515.gif"
                                    alt="musical-image" className='search-result-musical-image' />
                            </li>
                        </ul> */}
                        {/* 추천결과가 없는 경우 */}
                        {/* <ul className='search-result-list'>
                            <li className='search-result-musical'>
                                <p className='no-search-result'>이런! 추천결과가 없습니다.</p>
                            </li>
                        </ul> */}
                    </div>
                    <div className='search-section2-bottom'>
                        {/* 추천하기 이전 */}
                        <div className='recommend-result-btn'>
                            추천받기 &nbsp;{'>'}
                        </div>

                        {/* 추천하기 이후 */}
                        {/* <button className='search-replay-btn'>다시 추천받기 &nbsp;{'>'}</button> */}
                    </div>
                </div>
                <div className='search-section3'></div>
            </div>
        </div>
    )
}

export default Search;