import '../css/SearchModal.css';

interface Iprops {
    isOpen: boolean;
    searchModalClose: Function;
}

function SearchModal({ isOpen, searchModalClose }: Iprops) {
    const closeModal = () => {
        searchModalClose();
    }

    return (
        <>
            {isOpen ?
                <div className='searchModal-back' onClick={closeModal}>
                    <div className='searchModal-wrapper'>
                        <div className='searchModal-main'>
                            <div className='searchModal-section1'>
                                <div className='searchModal-left'></div>
                                <div className='searchModal-middle'>
                                    <div className='searchModal-middle-top'></div>
                                    <div className='searchModal-middle-input'>
                                        <input type="date" placeholder='시작날짜 8자리(예시 : 20210811)' />
                                        <input type="date" placeholder='종료날짜 8자리(예시 : 20210811)' />
                                        <input type="number" placeholder='현재페이지' />
                                        <input type="number" placeholder='페이지당 목록 수' />
                                        <input type="text" placeholder='공연명' />
                                    </div>
                                    <div className='searchModal-middle-bottom'>
                                        <button>KOPIS 검색</button>
                                    </div>
                                </div>
                                <div className='searchModal-right'></div>
                            </div>
                            <br></br>
                            {/* 검색결과 */}
                            <div className='searchModal-section2'>
                                <ul>
                                    <li>
                                        <div className='searchModal-result'>
                                            <div className='searchModal-result-image'>
                                                <img src="#" alt="searchModal-result-image" />
                                            </div>
                                            <div className='searchModal-result-input'>
                                                <div className='searchModal-result-title'>공연명</div>
                                                <div className='searchModal-result-id'>공연 ID</div>
                                                <div className='searchModal-result-state'>공연 상태(공연중/공연완료)</div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className='searchModal-result'>
                                            <div className='searchModal-result-image'>
                                                <img src="#" alt="search-result-image" className='searchModal-result-post' />
                                            </div>
                                            <div className='searchModal-result-input'>
                                                <div className='searchModal-result-title'>공연명</div>
                                                <div className='searchModal-result-id'>공연 ID</div>
                                                <div className='searchModal-result-state'>공연 상태(공연중/공연완료)</div>
                                            </div>
                                        </div>
                                    </li>
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