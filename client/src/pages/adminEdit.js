import { useState } from 'react'; // 임시로 state지정, redux로 변경 
import '../css/AdminEdit.css';
import SearchModal from '../components/searchModal';
import MusicalBaseImage from '../images/musical_baseimage.jpg'
import axios from 'axios';


function AdminEdit() {
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
		document.querySelector('#adminEdit-musical-genre-info').setAttribute('disabled', true); // disabled 추가
	}
	// '동행인 선택'을 선택 못하도록 설정
	const disableWithPeopleInfo = () => {
		document.querySelector('#adminEdit-musical-withPeople-info').setAttribute('disabled', true); // disabled 추가
	}

	// 게시글 등록 버튼 클릭
	const adminPostDB = () => {
		//! number, category, hashtag 작성 값 처리
		// adminEdit-musical-title-input -> 뮤지컬 넘버 title input
		// adminEdit-musical-videoId-input -> 뮤지컬 넘버 video id input
		// adminEdit-musical-hashtag -> 해시태그 작성 input

		let tempNumberTitleList = document.querySelectorAll('.adminEdit-musical-title-input');
		let numberTilteList = []; // number title만 모인 array
		for (let i = 0; i < tempNumberTitleList.length; i++) {
			numberTilteList.push(tempNumberTitleList[i].value);
		}

		let tempNumberVideoIdList = document.querySelectorAll('.adminEdit-musical-videoId-input');
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

		let hashtag = document.querySelector('.adminEdit-musical-hashtag').value;
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
			url: `${process.env.REACT_APP_END_POINT}/admin/edit`,
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
	// 업로드된 이미지를 지정한 img태그에 미리 보여주는 함수
	const readURL = (input) => {
		console.log(input.files[0]); // 업로드한 파일정보를 담고있는 객체
		if (input.files && input.files[0]) {
			let reader = new FileReader();
			reader.onload = function (e) {
				// 지정한 img태그에 input에서 업로드한 이미지를 미리보기 설정
				document.querySelector('.adminEdit-musical-post').setAttribute('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	// 뮤지컬 이미지 클릭시 파일 업로드
	const updateMusicalImage = (event) => {
		const uploadImageInput = document.querySelector('#adminEdit-update-musicalImage-input');
		uploadImageInput.click(); // 이미지 클릭시 file업로드 input태그 실행
	}
	// input파일에 파일이 업로드 되면 지정된 img태그에 이미지를 미리보기
	const previewUploadImage = (event) => {
		// console.log('work!');
		readURL(event.target); // 이미지 업로드시 미리보기
	}
	// 관리자가 뮤지컬 이름을 직접 작성하여 변경하는 경우
	const adminEditMusicalTitle = (event) => {
		// server에 전달 객체에 작성 값 할당
		adminPostInfo.title = event.target.value;
	}

	return (
		<div className='adminEdit-container'>
			<div className='adminEdit-main'>
				<div className='adminEdit-section1'></div>
				<div className='adminEdit-section2'>
					<div className='adminEdit-section2-top'>
						<button className='adminEdit-musical-search-btn' onClick={searchModalOpen}>작품검색</button>
					</div>
					<div className='adminEdit-section2-middle'>
						<div className='adminEdit-auto-info'>
							<div className='adminEdit-auto-info-image'>
								<img src={nowClickMusical.image ? nowClickMusical.image : MusicalBaseImage}
									alt="musical-postimage" className='adminEdit-musical-post' onClick={updateMusicalImage} />
								{/* accept : 업로드 되는 파일 형식 지정, 여기서는 이미지파일만 지정 */}
								<input type='file' id='adminEdit-update-musicalImage-input' accept="image/jpeg, image/jpg, image/png"
									onChange={previewUploadImage} />
							</div>
							<div className='adminEdit-auto-info-input'>
								<div className='adminEdit-auto-musical-title-div'>
									<div className='adminEdit-auto-musical-title'>공연명 :</div>
									<input type='text' className='adminEdit-auto-musical-title-input' value={nowClickMusical.title} onChange={adminEditMusicalTitle} />
								</div>
								<div className='adminEdit-auto-info-musical-state-div'>
									<div className='adminEdit-auto-info-musical-state'>공연상태 : </div>
									{nowClickMusical.state ?
										// 현재 클릭한 정보가 있는 경우
										nowClickMusical.state === '공연완료' ?
											<div className='adminEdit-auto-info-musical-state-input-end '>공연완료</div>
											:
											<div className='adminEdit-auto-info-musical-state-input-ing '>공연중</div>
										:
										// 현재 클릭한 정보가 없는 경우
										''
									}

								</div>
								<div className='adminEdit-auto-info-actor-div'>
									<div className='adminEdit-auto-info-actor'>출연진 :</div>
									<input type="text" className='adminEdit-auto-info-actor-input' placeholder='뮤지컬 배우 입력' onChange={writeActors} />
								</div>
								<div className='adminEdit-auto-info-story-div'>
									<div className='adminEdit-auto-info-story'>줄거리</div>
									<textarea className='adminEdit-auto-info-story-input' rows='8' placeholder='줄거리 입력' onChange={writeStory} />
								</div>
							</div>
						</div>
						<div className='adminEdit-manual-info'>
							<div className='adminEdit-manual-info-url'>
								<p className='adminEdit-manual-url-text'>대표넘버</p>
								<div className='adminEdit-manual-info-url-div'>
									<div className='adminEdit-manual-title'>title</div>
									<input type="text" className='adminEdit-musical-title-input' placeholder='뮤지컬 넘버 title 입력' />
									<div className='adminEdit-manual-videoId'>video Id</div>
									<input type="text" className='adminEdit-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' />
								</div>
								<div className='adminEdit-manual-info-url-div'>
									<div className='adminEdit-manual-title'>title</div>
									<input type="text" className='adminEdit-musical-title-input' placeholder='뮤지컬 넘버 title 입력' />
									<div className='adminEdit-manual-videoId'>video Id</div>
									<input type="text" className='adminEdit-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' />
								</div>
								<div className='adminEdit-manual-info-url-div'>
									<div className='adminEdit-manual-title'>title</div>
									<input type="text" className='adminEdit-musical-title-input' placeholder='뮤지컬 넘버 title 입력' />
									<div className='adminEdit-manual-videoId'>video Id</div>
									<input type="text" className='adminEdit-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' />
								</div>
							</div>
							<div className='adminEdit-manual-info-category'>
								<p className='adminEdit-manual-category-text'>분류기준</p>
								<div className='adminEdit-manual-category-div'>
									<div className='adminEdit-manual-category-div-category'>
										<div className='adminEdit-musical-category-info'>장르</div>
										<div className='adminEdit-musical-category'>
											<select className='adminEdit-musical-category-select' onChange={writeGenre} onClick={disableGenreInfo}>
												<option className='adminEdit-musical-category-value' id='adminEdit-musical-genre-info' value=''>장르 선택</option>
												<option className='adminEdit-musical-category-genre-value' value='드라마' >드라마</option>
												<option className='adminEdit-musical-category-genre-value' value='로맨스' >로맨스</option>
												<option className='adminEdit-musical-category-genre-value' value='판타지' >판타지</option>
												<option className='adminEdit-musical-category-genre-value' value='코미디' >코미디</option>
												<option className='adminEdit-musical-category-genre-value' value='역사' >역사</option>
												<option className='adminEdit-musical-category-genre-value' value='스릴러' >스릴러</option>
												<option className='adminEdit-musical-category-genre-value' value='가족' >가족</option>
											</select>
										</div>
										<div className='adminEdit-musical-category-info'>누구와 함께</div>
										<div className='adminEdit-musical-category'>
											<select className='adminEdit-musical-category-select' onChange={writeWithPeople} onClick={disableWithPeopleInfo}>
												<option className='adminEdit-musical-category-value' id='adminEdit-musical-withPeople-info' value=''>동행인 선택</option>
												<option className='adminEdit-musical-category-together-value' value='혼자' >혼자</option>
												<option className='adminEdit-musical-category-together-value' value='연인과함께' >연인과함께</option>
												<option className='adminEdit-musical-category-together-value' value='가족과함께' >가족과함께</option>
												<option className='adminEdit-musical-category-together-value' value='친구와함께' >친구와함께</option>
												<option className='adminEdit-musical-category-together-value' value='아이와함께' >아이와함께</option>
												<option className='adminEdit-musical-category-together-value' value='동료와함께' >동료와함께</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div className='adminEdit-manual-update-hashtag-div'>
								<div className='adminEdit-manual-category-div-hashtag'>
									<div className='adminEdit-musical-hashtag-info'>해시태그</div>
									<input type="text" className='adminEdit-musical-hashtag' placeholder='여러개 해시 태그들' maxLength='7' onChange={noSpaceHashtag} />
								</div>
							</div>
						</div>
					</div>
					<div className='adminEdit-section2-bottom'>
						<button className='adminEdit-musical-post-btn' onClick={adminPostDB}>수정하기</button>
					</div>
				</div>
				<div className='adminEdit-section3'></div>
				<SearchModal isOpen={isOpen} searchModalClose={searchModalClose} setNowClickMusical={setNowClickMusical} />
			</div>
		</div>
	)
}

export default AdminEdit;