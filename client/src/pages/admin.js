import { useState } from 'react'; // 임시로 state지정, redux로 변경 
import '../css/Admin.css';
import SearchModal from '../components/searchModal';
import MusicalBaseImage from '../images/musical_baseimage.jpg'
import axios from 'axios';


function Admin() {
    const [isOpen, setIsOpen] = useState(false); // 임시로 state지정, redux로 변경
    // kopis 검색이후 클릭된 뮤지컬 기본 정보
    const [nowClickMusical, setNowClickMusical] = useState({
        image: '',
        title: '',
        state: '',
        code: ''
    });
    // 관리자가 작성한 게시글 정보(server에 보낼것)
    const [adminPostInfo, setAdminPostInfo] = useState({
        code: nowClickMusical.code,
        title: nowClickMusical.title,
        thumbnail: nowClickMusical.image,
        contents: '',
        state: nowClickMusical.state,
        actors: '',
        numbers: [],
        hashtags: ''
    });
    // 장르 지정 state변수
    const [genre, setGenre] = useState('');
    // 동행인 지정 state변수
    const [withPeople, setWithPeople] = useState('');

    const searchModalOpen = () => {
        setIsOpen(true);
    }
    const searchModalClose = () => {
        setIsOpen(false);
    }
    // 배우 입력
    const writeActors = (event) => {
        setAdminPostInfo(Object.assign(adminPostInfo, { actors: event.target.value }));
    }
    // 줄거리 작성
    const writeStory = (event) => {
        setAdminPostInfo(Object.assign(adminPostInfo, { contents: event.target.value }));
    }

    // 넘버 작성

    // 장르 선택
    const writeGenre = (event) => {
        setGenre(event.target.value);
    }
    // 동행인 선택
    const writeWithPeople = (event) => {
        setWithPeople(event.target.value);
    }

    // '장르 선택'을 선택 못하도록 설정
    const disableGenreInfo = () => {
        document.querySelector('#admin-musical-genre-info').setAttribute('disabled', true); // disabled 추가
    }
    // '동행인 선택'을 선택 못하도록 설정
    const disableWithPeopleInfo = () => {
        document.querySelector('#admin-musical-withPeople-info').setAttribute('disabled', true); // disabled 추가
    }

    // 게시글 등록 버튼 클릭
    const adminPostDB = () => {
        //! number, category, hashtag 작성 값 처리
        // admin-musical-title-input -> 뮤지컬 넘버 title input
        // admin-musical-videoId-input -> 뮤지컬 넘버 video id input
        // admin-musical-hashtag -> 해시태그 작성 input

        let tempNumberTitleList = document.querySelectorAll('.admin-musical-title-input');
        let numberTilteList = []; // number title만 모인 array
        for (let i = 0; i < tempNumberTitleList.length; i++) {
            numberTilteList.push(tempNumberTitleList[i].value);
        }

        let tempNumberVideoIdList = document.querySelectorAll('.admin-musical-videoId-input');
        let numberVideoIdList = []; // number videoId만 모인 array
        for (let j = 0; j < tempNumberVideoIdList.length; j++) {
            numberVideoIdList.push(tempNumberVideoIdList[j].value);
        }

        // {title: title, videoId: youtube video ID} -> number List 각 요소
        let numberList = [];
        for (let k = 0; k < numberTilteList.length; k++) {
            numberList.push({
                title: numberTilteList[k],
                videoId: numberVideoIdList[k]
            })
        }

        // category list
        let categoryList = [genre, withPeople];

        let hashtag = document.querySelector('.admin-musical-hashtag').value;
        // hashtag작성시 전달, optional이기 때문(빈칸이 없어야 전달됨)
        if (hashtag && !hashtag.includes(' ')) {
            categoryList.push(`#${hashtag}`);
        }
        // number목록(url)
        setAdminPostInfo(Object.assign(adminPostInfo, { numbers: numberList }));
        // category + hashtag 목록
        setAdminPostInfo(Object.assign(adminPostInfo, { hashtags: categoryList }));

        // thumbnail
        setAdminPostInfo(Object.assign(adminPostInfo, { thumbnail: nowClickMusical.image }));
        // title
        setAdminPostInfo(Object.assign(adminPostInfo, { title: nowClickMusical.title }));
        // state
        setAdminPostInfo(Object.assign(adminPostInfo, { state: nowClickMusical.state }));
        // code
        setAdminPostInfo(Object.assign(adminPostInfo, { code: nowClickMusical.code }));

        console.log(adminPostInfo);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_END_POINT}/admin/post`,
            data: {
                ...adminPostInfo
            },
            withCredentials: true,
        })
            .then(function (response) {
                alert("새 글이 작성완료 되었습니다.");
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    // 해시태그 입력시 빈칸이 들어갈 수 없도록 설정
    const noSpaceHashtag = (event) => {
        if (event.target.value.includes(' ')) {
            alert('해시태그에 빈칸을 입력할 수 없습니다!');
            event.target.value = ''
        }
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
                                <img src={nowClickMusical.image ? nowClickMusical.image : MusicalBaseImage}
                                    alt="musical-postimage" className='admin-musical-post' />
                            </div>
                            <div className='admin-auto-info-input'>
                                <div className='admin-auto-musical-title-div'>
                                    <div className='admim-auto-musical-title'>공연명 :</div>
                                    <div className='admin-auto-musical-title-input'>{nowClickMusical.title}</div>
                                </div>
                                <div className='admin-auto-info-musical-state-div'>
                                    <div className='admin-auto-info-musical-state'>공연상태 : </div>
                                    {nowClickMusical.state ?
                                        // 현재 클릭한 정보가 있는 경우
                                        nowClickMusical.state === '공연완료' ?
                                            <div className='admin-auto-info-musical-state-input-end '>공연완료</div>
                                            :
                                            <div className='admin-auto-info-musical-state-input-ing '>공연중</div>
                                        :
                                        // 현재 클릭한 정보가 없는 경우
                                        ''
                                    }

                                </div>
                                <div className='admin-auto-info-actor-div'>
                                    <div className='admin-auto-info-actor'>출연진 :</div>
                                    <input type="text" className='admin-auto-info-actor-input' placeholder='뮤지컬 배우 입력' onChange={writeActors} />
                                </div>
                                <div className='admin-auto-info-story-div'>
                                    <div className='admin-auto-info-story'>줄거리</div>
                                    <textarea className='admin-auto-info-story-input' rows='8' placeholder='줄거리 입력' onChange={writeStory} />
                                </div>
                            </div>
                        </div>
                        <div className='admin-manual-info'>
                            <div className='admin-manual-info-url'>
                                <p className='admin-manual-url-text'>대표넘버</p>
                                <div className='admin-manual-info-url-div'>
                                    <div className='admin-manual-title'>title</div>
                                    <input type="text" className='admin-musical-title-input' placeholder='뮤지컬 넘버 title 입력' />
                                    <div className='admin-manual-videoId'>video Id</div>
                                    <input type="text" className='admin-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' />
                                </div>
                                <div className='admin-manual-info-url-div'>
                                    <div className='admin-manual-title'>title</div>
                                    <input type="text" className='admin-musical-title-input' placeholder='뮤지컬 넘버 title 입력' />
                                    <div className='admin-manual-videoId'>video Id</div>
                                    <input type="text" className='admin-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' />
                                </div>
                                <div className='admin-manual-info-url-div'>
                                    <div className='admin-manual-title'>title</div>
                                    <input type="text" className='admin-musical-title-input' placeholder='뮤지컬 넘버 title 입력' />
                                    <div className='admin-manual-videoId'>video Id</div>
                                    <input type="text" className='admin-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' />
                                </div>
                            </div>
                            <div className='admin-manual-info-category'>
                                <p className='admin-manual-category-text'>분류기준</p>
                                <div className='admin-manual-category-div'>
                                    <div className='admin-manual-category-div-category'>
                                        <div className='admin-musical-category-info'>장르</div>
                                        {/* <input type="text" className='admin-musical-category' placeholder='뮤지컬 장르 입력' /> */}
                                        <div className='admin-musical-category'>
                                            <select className='admin-musical-category-select' onChange={writeGenre} onClick={disableGenreInfo}>
                                                <option className='admin-musical-category-value' id='admin-musical-genre-info' value=''>장르 선택</option>
                                                <option className='admin-musical-category-genre-value' value='드라마' >드라마</option>
                                                <option className='admin-musical-category-genre-value' value='로맨스' >로맨스</option>
                                                <option className='admin-musical-category-genre-value' value='판타지' >판타지</option>
                                                <option className='admin-musical-category-genre-value' value='코미디' >코미디</option>
                                                <option className='admin-musical-category-genre-value' value='역사' >역사</option>
                                                <option className='admin-musical-category-genre-value' value='스릴러' >스릴러</option>
                                                <option className='admin-musical-category-genre-value' value='가족' >가족</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='admin-manual-category-div-category'>
                                        <div className='admin-musical-category-info'>동행인</div>
                                        {/* <input type="text" className='admin-musical-category' placeholder='뮤지컬 동행인 분류 입력' /> */}
                                        <div className='admin-musical-category'>
                                            <select className='admin-musical-category-select' onChange={writeWithPeople} onClick={disableWithPeopleInfo}>
                                                <option className='admin-musical-category-value' id='admin-musical-withPeople-info' value=''>동행인 기준 선택</option>
                                                <option className='admin-musical-category-together-value' value='혼자' >혼자</option>
                                                <option className='admin-musical-category-together-value' value='연인과 함께' >연인과 함께</option>
                                                <option className='admin-musical-category-together-value' value='가족과 함께' >가족과 함께</option>
                                                <option className='admin-musical-category-together-value' value='친구와 함께' >친구와 함께</option>
                                                <option className='admin-musical-category-together-value' value='아이와 함께' >아이와 함께</option>
                                                <option className='admin-musical-category-together-value' value='동료와 함께' >동료와 함께</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='admin-manual-category-div-hashtag'>
                                        <div className='admin-musical-hashtag-info'>해시태그</div>

                                        <input type="text" className='admin-musical-hashtag' placeholder='해시태그 입력(최대 7글자)' maxLength='7' onChange={noSpaceHashtag} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='admin-section2-bottom'>
                        <button className='admin-musical-post-btn' onClick={adminPostDB}>등록</button>
                    </div>
                </div>
                <div className='admin-section3'></div>
                <SearchModal isOpen={isOpen} searchModalClose={searchModalClose} setNowClickMusical={setNowClickMusical} />
            </div>
        </div>
    )
}

export default Admin;