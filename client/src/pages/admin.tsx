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
                                <img src="" alt="musical-postimage" className='admin-musical-post' />
                            </div>
                            <div className='admin-auto-info-input'>
                                <div>자동 완성 공연명</div>
                                <div>자동 완성 공연상태(공연중/공연완료)</div>
                            </div>
                        </div>
                        <div className='admin-manual-info'>
                            <div className='admin-manual-info-url'>
                                <p>대표넘버</p>
                                <input type="text" className='admin-musical-url' placeholder='뮤지컬 넘버 url 입력' />
                                <input type="text" className='admin-musical-url' placeholder='뮤지컬 넘버 url 입력' />
                                <input type="text" className='admin-musical-url' placeholder='뮤지컬 넘버 url 입력' />
                            </div>
                            <div className='admin-manual-info-category'>
                                <p>분류기준</p>
                                <input type="text" className='admin-musical-category' placeholder='뮤지컬 category 입력' />
                                <input type="text" className='admin-musical-category' placeholder='뮤지컬 category 입력' />
                                <input type="text" className='admin-musical-hashtag' placeholder='뮤지컬 hashtag 입력' />
                            </div>
                        </div>
                    </div>
                    <div className='admin-section2-bottom'></div>
                </div>
                <div className='admin-section3'></div>
                <SearchModal isOpen={isOpen} searchModalClose={searchModalClose} />
            </div>
        </div>
    )
}

export default Admin;