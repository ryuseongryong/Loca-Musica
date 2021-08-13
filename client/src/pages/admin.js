import { useState } from 'react'; // 임시로 state지정, redux로 변경 
import '../css/Admin.css';
import SearchModal from '../components/searchModal';


function Admin() {
    const [isOpen, setIsOpen] = useState(false); // 임시로 state지정, redux로 변경
    const searchModalOpen = () => {
        setIsOpen(true);
    }
    const searchModalClose = () => {
        setIsOpen(false);
    }

    return (
        <div className='admin-container'>
            <div className='admin-main'>
                <div className='admin-section1'></div>
                <div className='admin-section2'>
                    <div className='admin-section2-top'>
                        <button className='admin-musical-search-btn' onClick={searchModalOpen}>작품검색</button>
                    </div>
                    <div className='admin-section2-middle'>
                        <div className='admin-auto-info'>
                            <div className='admin-auto-info-image'>
                                <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF171092_210119_100127.gif"
                                    alt="musical-postimage" className='admin-musical-post' />
                            </div>
                            <div className='admin-auto-info-input'>
                                <div className='admin-auto-musical-title-div'>
                                    <div className='admim-auto-musical-title'>공연명 :</div>
                                    <div className='admin-auto-musical-title-input'>위키드</div>
                                </div>
                                <div className='admin-auto-info-musical-state-div'>
                                    <div className='admin-auto-info-musical-state'>공연상태 : </div>
                                    <div className='admin-auto-info-musical-state-input-ing '>공연중</div>
                                    <div className='admin-auto-info-musical-state-input-end '>공연종료</div>
                                </div>
                                <div className='admin-auto-info-actor-div'>
                                    <div className='admin-auto-info-actor'>출연진 :</div>
                                    <input type="text" className='admin-auto-info-actor-input' placeholder='뮤지컬 배우 입력' />
                                </div>
                                <div className='admin-auto-info-story-div'>
                                    <div className='admin-auto-info-story'>줄거리</div>
                                    <textarea className='admin-auto-info-story-input' rows='8' placeholder='줄거리 입력' />
                                </div>
                            </div>
                        </div>
                        <div className='admin-manual-info'>
                            <div className='admin-manual-info-url'>
                                <p className='admin-manual-url-text'>대표넘버</p>
                                <div className='admin-manual-info-url-div'>
                                    <div className='admin-manual-url'>url1</div>
                                    <input type="text" className='admin-musical-url-input' placeholder='뮤지컬 넘버 url 입력' />
                                </div>
                                <div className='admin-manual-info-url-div'>
                                    <div className='admin-manual-url'>url2</div>
                                    <input type="text" className='admin-musical-url-input' placeholder='뮤지컬 넘버 url 입력' />
                                </div>
                                <div className='admin-manual-info-url-div'>
                                    <div className='admin-manual-url'>url3</div>
                                    <input type="text" className='admin-musical-url-input' placeholder='뮤지컬 넘버 url 입력' />
                                </div>
                            </div>
                            <div className='admin-manual-info-category'>
                                <p className='admin-manual-category-text'>분류기준</p>
                                <div className='admin-manual-category-div'>
                                    <div className='admin-manual-category-div-category'>
                                        <div className='admin-musical-category-info'>분류기준1</div>
                                        <input type="text" className='admin-musical-category' placeholder='뮤지컬 분류 입력' />
                                    </div>
                                    <div className='admin-manual-category-div-category'>
                                        <div className='admin-musical-category-info'>분류기준2</div>
                                        <input type="text" className='admin-musical-category' placeholder='뮤지컬 분류 입력' />
                                    </div>
                                    <div className='admin-manual-category-div-hashtag'>
                                        <div className='admin-musical-hashtag-info'>해시태그</div>
                                        <input type="text" className='admin-musical-hashtag' placeholder='뮤지컬 hashtag 입력' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='admin-section2-bottom'>
                        <button className='admin-musical-post-btn'>등록</button>
                    </div>
                </div>
                <div className='admin-section3'></div>
                <SearchModal isOpen={isOpen} searchModalClose={searchModalClose} />
            </div>
        </div>
    )
}

export default Admin;