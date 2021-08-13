import '../css/SearchModal.css';

function SearchModal({ isOpen, searchModalClose }) {
    const closeModal = () => {
        searchModalClose();
    }

    return (
        <>
            {isOpen ?
                <div className='searchModal-back'>
                    <div className='searchModal-wrapper'>
                        <div className='searchModal-main'>
                            <div className='searchModal-section1'>
                                <div className='searchModal-left'></div>
                                <div className='searchModal-middle'>
                                    <div className='searchModal-middle-top'></div>
                                    <div className='searchModal-middle-input'>
                                        <input type="date" placeholder='시작날짜 8자리(예시 : 20210811)' id='startdate' />
                                        <input type="date" placeholder='종료날짜 8자리(예시 : 20210811)' id='endddate' />
                                        <input type="number" placeholder='현재페이지' id='currentpage' />
                                        <input type="number" placeholder='페이지당 목록 수' id='rows' />
                                        <input type="text" placeholder='공연명' id='musicaltitle' />
                                    </div>
                                    <div className='searchModal-middle-bottom'>
                                        <button className='searchModal-search-btn'>KOPIS 검색</button>
                                    </div>
                                </div>
                                <div className='searchModal-right'>
                                    <a href="#" class="close-thik" onClick={closeModal} />
                                </div>
                            </div>
                            <div className='searchModal-seperate-area'>
                                <div className='searchModal-seperate-line'></div>
                            </div>
                            {/* 검색결과 */}
                            <div className='searchModal-section2'>
                                <ul className='searchModal-result-ul'>
                                    {/* 검색결과가 있는 경우 */}
                                    <li className='searchModal-result-li'>
                                        <div className='searchModal-result-image'>
                                            <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF171092_210119_100127.gif"
                                                alt="searchModal-result-image" className='searchModal-result-post' />
                                        </div>
                                        <div className='searchModal-result-input'>
                                            <div className='searchModal-result-title'>
                                                <div className='searchModal-result-title-info'>작품명 :</div>
                                                <div className='searchModal-result-title-input'>위키드</div>
                                            </div>
                                            <div className='searchModal-result-id'>
                                                <div className='searchModal-result-id-info'>공연ID :</div>
                                                <div className='searchModal-result-id-input'>PF132236</div>
                                            </div>
                                            <div className='searchModal-result-state-now'>공연중</div>
                                            {/* <div className='searchModal-result-state-end'>공연완료</div> */}
                                        </div>
                                    </li>

                                    <li className='searchModal-result-li'>
                                        <div className='searchModal-result-image'>
                                            <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF155057_190925_092515.gif"
                                                alt="searchModal-result-image" className='searchModal-result-post' />
                                        </div>
                                        <div className='searchModal-result-input'>
                                            <div className='searchModal-result-title'>
                                                <div className='searchModal-result-title-info'>작품명 :</div>
                                                <div className='searchModal-result-title-input'>레베카</div>
                                            </div>
                                            <div className='searchModal-result-id'>
                                                <div className='searchModal-result-id-info'>공연ID :</div>
                                                <div className='searchModal-result-id-input'>PA132236</div>
                                            </div>
                                            {/* <div className='searchModal-result-state-now'>공연중</div> */}
                                            <div className='searchModal-result-state-end'>공연완료</div>
                                        </div>
                                    </li>
                                    {/* 검색결과가 없는 경우 */}
                                    {/* <li className='searchModal-result-li'>검색 결과가 없습니다.</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </>

    )
}

export default SearchModal;