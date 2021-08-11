import '../css/Search.css';

function Search() {
    return (
        <div className='search-main'>
            <div className='search-section1'></div>
            <div className='search-section2'>
                <div className='search-section2-top'>
                    {/* 추천하기 이전 */}
                    <div className='search-left'></div>
                    <div className='search-right'>
                        <p className='search-info'>취향에 따라 최대 3개를 선택해주세요(카테고리 내 중복선택 가능)</p>
                    </div>

                    {/* 추천하기 이후 */}
                    {/* <div className='search-left'></div>
                    <div className='search-right'>
                        <p className='search-result-info'>선택하신 결과에 따른 추천 작품입니다.</p>
                    </div> */}
                </div>
                <div className='search-section2-middle'>
                    {/* 추천하기 이전 */}
                    <div className='category1'>
                        <div className='search-left'>분류기준1</div>
                        <div className='search-right'>
                            <span className='category'>분류기준1-1</span>
                            <span className='category'>분류기준1-2</span>
                            <span className='category'>분류기준1-3</span>
                            <span className='category'>분류기준1-4</span>
                            <span className='category'>분류기준1-5</span>
                        </div>
                    </div>
                    <div className='category2'>
                        <div className='search-left'>분류기준2</div>
                        <div className='search-right'>
                            <span className='category'>분류기준2-1</span>
                            <span className='category'>분류기준2-2</span>
                            <span className='category'>분류기준2-3</span>
                            <span className='category'>분류기준2-4</span>
                            <span className='category'>분류기준2-5</span>
                        </div>
                    </div>
                    <div className='hashtags'>
                        <div className='search-left'></div>
                        <div className='search-right'>
                            <ul className='hashtags-list'>
                                <li className='hashtag'>해시1</li>
                                <li className='hashtag'>해시2</li>
                                <li className='hashtag'>해시3</li>
                                <li className='hashtag'>해시4</li>
                                <li className='hashtag'>해시5</li>
                                <li className='hashtag'>해시6</li>
                                <li className='hashtag'>해시7</li>
                                <li className='hashtag'>해시8</li>
                                <li className='hashtag'>해시9</li>
                                <li className='hashtag'>해시10</li>
                            </ul>
                        </div>
                    </div>

                    {/* 추천하기 이후 */}
                    {/* <ul className='search-result-list'>
                        <li className='search-result-musical'>
                            <img src="" alt="musical-image" className='search-result-musical-image' />
                        </li>
                        <li className='search-result-musical'>
                            <img src="" alt="musical-image" className='search-result-musical-image' />
                        </li>
                        <li className='search-result-musical'>
                            <img src="" alt="musical-image" className='search-result-musical-image' />
                        </li>
                    </ul> */}
                    {/* 추천결과가 없는 경우 */}
                    {/* <ul className='search-result-list'>
                        추천결과가 없습니다.
                    </ul> */}
                </div>
                <div className='search-section2-bottom'>
                    {/* 추천하기 이전 */}
                    <button>추천받기{'>'}</button>

                    {/* 추천하기 이후 */}
                    {/* <button>다시 추천받기{'>'}</button> */}
                </div>
            </div>
            <div className='search-section3'></div>
        </div>
    )
}

export default Search;