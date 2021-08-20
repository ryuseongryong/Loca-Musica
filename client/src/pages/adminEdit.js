import { useEffect, useState } from 'react'; // 임시로 state지정, redux로 변경 
import '../css/AdminEdit.css';
import EditHashtagModal from '../components/editHashtagModal';
import axios from 'axios';


function AdminEdit() {
	// 전달받은 해사태그 중 유저가 작성한 해시태그 목록
	const [beforeUserHashtag, setBeforeUserHashtag] = useState([]);
	// 기존에 있던 정보 저장 객체
	const [beforeAdminPostInfo, setBeforeAdminPostInfo] = useState({
		id: 15,
		code: "PF176633",
		title: "헤드윅",
		thumbnail: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF176633_210630_094052.PNG",
		contents: "동베를린 (EAST BERLIN) 이야기는 베를린 장벽이 올랐을 무렵의 동독에서부터 시작된다. 비좁은 아파트에서 엄마와 단둘이 살고 있는 소년 한셀. 한셀의 유일한 즐거움은 미군 라디오 방송을 통해 데이빗 보위, 루 리드, 이기 팝 등의 록 음악을 듣는 것이다. 그러던 어느 날, 한셀에게 암울한 자신의 환경을 탈출할 기회가 찾아온다. 미군 병사 루터가 그에게 여자가 되는 조건으로 결혼을 제의한 것이다. 한셀은 엄마의 이름인 ‘헤드윅’으로 이름을 바꾸고 ",
		state: "공연중",
		actors: "오만석, 조승우, 이규형, 고은성, 이영미, 김려원, 이준 등",
		numbersData: [
			{
				"id": 45,
				"title": "19 뮤지컬 헤드윅 리허설 인터뷰",
				"videoId": "https://www.youtube.com/embed/-HGLZOULBSU"
			},
			{
				"id": 44,
				"title": "21 뮤지컬 헤드윅 메이킹 필름",
				"videoId": "https://www.youtube.com/embed/TEBmIoKXVpo"
			},
			{
				"id": 43,
				"title": "'The Origin of Love' - 조승우",
				"videoId": "https://www.youtube.com/embed/bcDlAitQSC0"
			}
		],
		hashtagsData: [
			{
				"name": "#컴온컴온",
				"likeCount": 1,
				"totalLikeCount": 1,
				"musicalCount": 1
			},
			{
				"name": "#창문은네모",
				"likeCount": 1,
				"totalLikeCount": 1,
				"musicalCount": 1
			},
			{
				"name": "#리액트",
				"likeCount": 1,
				"totalLikeCount": 1,
				"musicalCount": 1
			},
			{
				"name": "#오늘은금요일",
				"likeCount": 1,
				"totalLikeCount": 1,
				"musicalCount": 1
			},
			{
				"name": "#내일은토요일",
				"likeCount": 1,
				"totalLikeCount": 1,
				"musicalCount": 1
			},
			{
				"name": "#항상긍정적으로",
				"likeCount": 1,
				"totalLikeCount": 1,
				"musicalCount": 1
			},
			{
				"name": "#일이삼사오육칠",
				"likeCount": 1,
				"totalLikeCount": 1,
				"musicalCount": 1
			},
			{
				"name": "혼자",
				"likeCount": 1,
				"totalLikeCount": 4,
				"musicalCount": 4
			},
			{
				"name": "드라마",
				"likeCount": 1,
				"totalLikeCount": 3,
				"musicalCount": 3
			}
		]
	})
	// 관리자가 작성한 게시글 정보(server에 보낼것)
	const [adminPostInfo, setAdminPostInfo] = useState({
		code: beforeAdminPostInfo.code,
		title: beforeAdminPostInfo.title,
		thumbnail: beforeAdminPostInfo.thumbnail,
		contents: beforeAdminPostInfo.contents,
		state: beforeAdminPostInfo.state,
		actors: beforeAdminPostInfo.actors,
		numbers: beforeAdminPostInfo.numbersData,
		hashtags: beforeAdminPostInfo.hashtagsData
	});
	// 장르 지정 state변수
	const [genre, setGenre] = useState('');
	// 동행인 지정 state변수
	const [withPeople, setWithPeople] = useState('');

	// 만약에 작품검색을 통해 값을 가져오면 가져온 값으로 변경하기 위한 useEffect -> 1.code 2.title 3.image 4.state 변경
	useEffect(() => {
		// 1. category- 동행자 전달된 값으로 할당
		let withPeopleArr = beforeAdminPostInfo.hashtagsData.filter((el) => {
			return el.name === '혼자' || el.name === '연인과함께' || el.name === '가족과함께' || el.name === '친구와함께'
				|| el.name === '아이와함께' || el.name === '동료와함께'
		});
		setGenre(withPeopleArr[0].name);
		const optionList1 = document.querySelectorAll('.adminEdit-musical-category-together-value');
		for (let b = 0; b < optionList1.length; b++) {
			if (withPeopleArr[0].name === optionList1[b].value) {
				optionList1[b].setAttribute('selected', true);
				break;
			}
		}

		// 2. category - 장르 전달된 값으로 할당
		let genreArr = beforeAdminPostInfo.hashtagsData.filter((el) => {
			return el.name === '드라마' || el.name === '로맨스' || el.name === '판타지' || el.name === '코미디'
				|| el.name === '역사' || el.name === '스릴러' || el.name === '가족'
		});
		setWithPeople(genreArr[0].name);
		const optionList2 = document.querySelectorAll('.adminEdit-musical-category-genre-value');
		for (let c = 0; c < optionList2.length; c++) {
			if (genreArr[0].name === optionList2[c].value) {
				optionList2[c].setAttribute('selected', true);
				break;
			}
		}

		// 사용자가 작성 해시태그
		let userHashtagArr = beforeAdminPostInfo.hashtagsData.filter((el) => {
			return el.name !== genreArr[0].name && el.name !== withPeopleArr[0].name
		})

		setBeforeUserHashtag(userHashtagArr); // 전달받은 해시태그 중 유저가 직접 작성한 해시태그
		console.log(userHashtagArr);

	}, [])

	// code변경을 위한 state
	const [codeValue, setCodeValue] = useState(beforeAdminPostInfo.code);
	// thumbnail변경을 위한 state
	const [thumbnailSrcValue, setThumbnailSrcValue] = useState(beforeAdminPostInfo.thumbnail);
	// title변경을 위한 state
	const [titleValue, setTitleValue] = useState(beforeAdminPostInfo.title);
	// state변경을 위한 state
	const [stateValue, setStateValue] = useState(beforeAdminPostInfo.state);
	// actors변경을 위한 state
	const [actorsValue, setActorsValue] = useState(beforeAdminPostInfo.actors);
	// contents변경을 위한 state
	const [contentsValue, setContentsValue] = useState(beforeAdminPostInfo.contents);
	// numbers 변경을 위한 state
	// 넘버1 작성(title,videoId 순서)
	const [numberTitleValue1, setNumberTitleValue1] = useState(beforeAdminPostInfo.numbersData[0].title);
	const [numberVideoIdValue1, setNumberVideoIdValue1] = useState(beforeAdminPostInfo.numbersData[0].videoId);
	const [numberId1, setNumberId1] = useState(beforeAdminPostInfo.numbersData[0].id);
	// 넘버2 작성
	const [numberTitleValue2, setNumberTitleValue2] = useState(beforeAdminPostInfo.numbersData[1].title);
	const [numberVideoIdValue2, setNumberVideoIdValue2] = useState(beforeAdminPostInfo.numbersData[1].videoId);
	const [numberId2, setNumberId2] = useState(beforeAdminPostInfo.numbersData[1].id);
	// 넘버3 작성
	const [numberTitleValue3, setNumberTitleValue3] = useState(beforeAdminPostInfo.numbersData[2].title);
	const [numberVideoIdValue3, setNumberVideoIdValue3] = useState(beforeAdminPostInfo.numbersData[2].videoId);
	const [numberId3, setNumberId3] = useState(beforeAdminPostInfo.numbersData[2].id);
	// category 변경을 위한 state

	// 배우 입력
	const writeActors = (event) => {
		setActorsValue(event.target.value);
	}
	// 줄거리 작성
	const writeStory = (event) => {
		setContentsValue(event.target.value);
	}

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
		// actors 전달을 위한 전달 객체 할당
		setAdminPostInfo(Object.assign(adminPostInfo, { actors: actorsValue }));
		// contents 전달을 위한 전달 객체 할당
		setAdminPostInfo(Object.assign(adminPostInfo, { contents: contentsValue }));

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

		let numberIdList = [numberId1, numberId2, numberId3];
		console.log(numberIdList);

		// {title: title, videoId: youtube video ID} -> number List 각 요소
		let numberList = [];
		for (let k = 0; k < numberTilteList.length; k++) {
			numberList.push({
				id: numberIdList[k],
				title: numberTilteList[k],
				videoId: numberVideoIdList[k]
			})
		}

		// category list
		let categoryList = [genre, withPeople];
		// userHashtag list
		let tempHashtagList = document.querySelectorAll('.before-musical-hashtag');
		for (let r = 0; r < tempHashtagList.length; r++) {
			categoryList.push(tempHashtagList[r].textContent);
		}

		// number목록(url)
		setAdminPostInfo(Object.assign(adminPostInfo, { numbers: numberList }));
		// category + hashtag 목록
		setAdminPostInfo(Object.assign(adminPostInfo, { hashtags: categoryList }));

		// thumbnail
		setAdminPostInfo(Object.assign(adminPostInfo, { thumbnail: thumbnailSrcValue }));
		// title
		setAdminPostInfo(Object.assign(adminPostInfo, { title: titleValue }));
		// state
		setAdminPostInfo(Object.assign(adminPostInfo, { state: stateValue }));
		// code
		setAdminPostInfo(Object.assign(adminPostInfo, { code: codeValue }));

		console.log(adminPostInfo);
		axios({
			method: 'put',
			url: `${process.env.REACT_APP_END_POINT}/admin/edit`,
			data: {
				...adminPostInfo
			},
			withCredentials: true,
		})
			.then(function (response) {
				alert("게시글 성공적으로 변경되었습니다.");
				window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});

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
	const updateMusicalImage = () => {
		const uploadImageInput = document.querySelector('#adminEdit-update-musicalImage-input');
		uploadImageInput.click(); // 이미지 클릭시 file업로드 input태그 실행
	}
	// input파일에 파일이 업로드 되면 지정된 img태그에 이미지를 미리보기
	const previewUploadImage = (event) => {
		// console.log('work!');
		readURL(event.target); // 이미지 업로드시 미리보기
	}
	// 공연상태 클릭시 공연상태가 변경
	const editMusicalState = (event) => {
		// console.log(event.target);
		// 현재 공연완료 -> 공연중 으로 변경
		if (event.target.classList.contains('adminEdit-auto-info-musical-state-input-end')) {
			event.target.classList.remove('adminEdit-auto-info-musical-state-input-end'); // 공연완료 상태 제거
			event.target.classList.add('adminEdit-auto-info-musical-state-input-ing'); // 공연중 상태 추가
			event.target.textContent = '공연중';
			setStateValue('공연중')
		}
		// 현재 공연중 -> 공연완료 으로 변경
		else if (event.target.classList.contains('adminEdit-auto-info-musical-state-input-ing')) {
			event.target.classList.remove('adminEdit-auto-info-musical-state-input-ing'); // 공연중 상태 추가
			event.target.classList.add('adminEdit-auto-info-musical-state-input-end'); // 공연완료 상태 제거
			event.target.textContent = '공연완료';
			setStateValue('공연완료')
		}
	}

	// 공연명 변경을 위한 함수
	const EditTitleValue = (event) => {
		setTitleValue(event.target.value); // 초기값은 전달받은 값으로 지정
	}

	// 넘버값 변경을 위한 함수
	// 넘버 1
	const editNumberTitle1 = (event) => {
		setNumberTitleValue1(event.target.value);
	}
	const editNumberVideoId1 = (event) => {
		setNumberVideoIdValue1(event.target.value);
	}
	// 넘버 2
	const editNumberTitle2 = (event) => {
		setNumberTitleValue2(event.target.value);
	}
	const editNumberVideoId2 = (event) => {
		setNumberVideoIdValue2(event.target.value);
	}
	// 넘버 3
	const editNumberTitle3 = (event) => {
		setNumberTitleValue3(event.target.value);
	}
	const editNumberVideoId3 = (event) => {
		setNumberVideoIdValue3(event.target.value);
	}

	// 해시태그 클릭시 해당 해시태그 내용 수정
	// window.confirm('any text'); // 확인창
	const EditHashtag = (event) => {
		// 'editModaldisplayno'라는 클래스명 제거시 모달창이 보임
		document.querySelector('.editHashtagModal-back').classList.remove('editModaldisplayno');
		// 모달창에 현재 선택한 해시태그의 값을 표시
		document.querySelector('#thisClickHashtagValue').textContent = event.target.textContent;
	}

	return (
		<div className='adminEdit-container'>
			<div className='adminEdit-main'>
				<div className='adminEdit-section1'></div>
				<div className='adminEdit-section2'>
					{/* <div className='adminEdit-section2-top'>
						<button className='adminEdit-musical-search-btn' onClick={searchModalOpen}>작품검색</button>
					</div> */}
					<div className='adminEdit-section2-middle'>
						<div className='adminEdit-auto-info'>
							<div className='adminEdit-auto-info-image'>
								{/* 전달받은 기본값으로 초기화 이 후 변경 가능 */}
								<img src={thumbnailSrcValue}
									alt="musical-postimage" className='adminEdit-musical-post' onClick={updateMusicalImage} />
								{/* accept : 업로드 되는 파일 형식 지정, 여기서는 이미지파일만 지정 */}
								<input type='file' id='adminEdit-update-musicalImage-input' accept="image/jpeg, image/jpg, image/png"
									onChange={previewUploadImage} />
							</div>
							<div className='adminEdit-auto-info-input'>
								<div className='adminEdit-auto-musical-title-div'>
									<div className='adminEdit-auto-musical-title'>공연명 :</div>
									{/* 전달받은 기본값으로 초기화 이 후 변경 가능 */}
									<input type='text' className='adminEdit-auto-musical-title-input' onChange={EditTitleValue} value={titleValue} />
								</div>
								<div className='adminEdit-auto-info-musical-state-div'>
									<div className='adminEdit-auto-info-musical-state'>공연상태 : </div>
									{/* 전달받은 기본값으로 초기화 이 후 변경 가능 */}
									{stateValue === '공연완료' ?
										<div className='adminEdit-auto-info-musical-state-input-end' onClick={editMusicalState}>공연완료</div>
										:
										<div className='adminEdit-auto-info-musical-state-input-ing' onClick={editMusicalState}>공연중</div>
									}
								</div>
								<div className='adminEdit-auto-info-actor-div'>
									<div className='adminEdit-auto-info-actor'>출연진 :</div>
									{/* 전달받은 기본값으로 초기화 이 후 변경 가능 */}
									<input type="text" className='adminEdit-auto-info-actor-input' placeholder='뮤지컬 배우 입력' value={actorsValue} onChange={writeActors} />
								</div>
								<div className='adminEdit-auto-info-story-div'>
									<div className='adminEdit-auto-info-story'>줄거리</div>
									{/* 전달받은 기본값으로 초기화 이 후 변경 가능 */}
									<textarea className='adminEdit-auto-info-story-input' rows='8' placeholder='줄거리 입력' value={contentsValue} onChange={writeStory} />
								</div>
							</div>
						</div>
						<div className='adminEdit-manual-info'>
							<div className='adminEdit-manual-info-url'>
								<p className='adminEdit-manual-url-text'>대표넘버</p>
								<div className='adminEdit-manual-info-url-div'>
									<div className='adminEdit-manual-title'>title</div>
									<input type="text" className='adminEdit-musical-title-input' placeholder='뮤지컬 넘버 title 입력' value={numberTitleValue1} onChange={editNumberTitle1} />
									<div className='adminEdit-manual-videoId'>video Id</div>
									<input type="text" className='adminEdit-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' value={numberVideoIdValue1} onChange={editNumberVideoId1} />
								</div>
								<div className='adminEdit-manual-info-url-div'>
									<div className='adminEdit-manual-title'>title</div>
									<input type="text" className='adminEdit-musical-title-input' placeholder='뮤지컬 넘버 title 입력' value={numberTitleValue2} onChange={editNumberTitle2} />
									<div className='adminEdit-manual-videoId'>video Id</div>
									<input type="text" className='adminEdit-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' value={numberVideoIdValue2} onChange={editNumberVideoId2} />
								</div>
								<div className='adminEdit-manual-info-url-div'>
									<div className='adminEdit-manual-title'>title</div>
									<input type="text" className='adminEdit-musical-title-input' placeholder='뮤지컬 넘버 title 입력' value={numberTitleValue3} onChange={editNumberTitle3} />
									<div className='adminEdit-manual-videoId'>video Id</div>
									<input type="text" className='adminEdit-musical-videoId-input' placeholder='뮤지컬 넘버 video id 입력' value={numberVideoIdValue3} onChange={editNumberVideoId3} />
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
									{/* <div className='adminEdit-manual-hashtag-update-input-div'>
										<div className='adminEdit-manual-hashtag-div'>
											<div>해시태그 추가</div>
											<input type="text" className='adminEdit-manual-hashtag-newInput' placeholder='새로 추가할 해시태그' onChange={noSpaceHashtag} maxLength='7' />
										</div>
									</div> */}
								</div>
							</div>
							<div className='adminEdit-manual-update-hashtag-div'>
								<div className='adminEdit-manual-category-div-hashtag'>
									<div className='adminEdit-musical-hashtag-info'>사용자 해시태그</div>
									<ul className='adminEdit-musical-hashtag'>
										{beforeUserHashtag.length === 0 ?
											<li>사용자가 작성한 해시태그가 없습니다.</li>
											:
											beforeUserHashtag.map((el, index) =>
												<li className='before-musical-hashtag' onClick={EditHashtag} key={index}>
													{el.name}
													<input type='hidden' value={`${el.likeCount}-${el.totalLikeCount}-${el.musicalCount}`} />
												</li>
											)
										}
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className='adminEdit-section2-bottom'>
						<button className='adminEdit-musical-post-btn' onClick={adminPostDB}>수정하기</button>
					</div>
				</div>
				<div className='adminEdit-section3'></div>
				<EditHashtagModal />
			</div>
		</div>
	)
}

export default AdminEdit;