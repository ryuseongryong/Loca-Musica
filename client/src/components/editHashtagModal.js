import { useState } from 'react';
import "../css/EditHashtagModal.css";

function EditHashtagModal() {
	const [editHashText, setEditHashText] = useState('#');

	// 취소하기 버튼 클릭시 모달창 닫기
	const closeEditModal = () => {
		// display: none을 모달창에 지정 -> 'editModaldisplayno' 클래스명 추가시 모달창이 닫힘
		document.querySelector('.editHashtagModal-back').classList.add('editModaldisplayno');
		setEditHashText('#'); // 맨앞 #
	}
	// 변경하려는 해시태그 입력
	const editHashTextValue = (event) => {
		// code제공
		let str = event.target.value;
		// console.log("input string: ", str);

		// 입력값의 제일 마지막 문자가 빈칸일 경우 종료
		let lastStr = str[str.length - 1];
		if (lastStr === ' ') {
			// console.log('space entered');
			return;
		}
		// #만 있을 때 지우려고 하면 #유지
		if (str === '') {
			str = "#" + str;
		}
		// #앞에 작성하려고 하면 #으로 고정
		if (str[0] !== "#") {
			str = '#';
		}

		// state 반영
		setEditHashText(str)
		//

		// 변경되는 값을 state변수에 저장
		// setEditHashText(`#${event.target.value}`);
	}
	// 변경하기 버튼 클릭시
	const finalEdit = () => {
		// 전달받은 이전 해시태그 값 가져오기
		let beforeHashtag = document.querySelector('#thisClickHashtagValue').textContent;

		//! 변경하는 해시태그가 뮤지컬내 존재하는 해시태그와 중복이 있는지 확인(중복된것이 있으면 변경 불가)
		// 1. li전체 가져온다(li는 해시태그들)
		let hashtagList = document.querySelectorAll('li');
		let hashtagValueList = [];
		// 2. 실제 해시태그들의 텍스트값을 가진 배열 생성
		for (let i = 0; i < hashtagList.length; i++) {
			hashtagValueList.push(hashtagList[i].textContent);
		}
		// 3. 현재 변경하려는 해시태그 값이 해당 뮤지컬 내 해시태그중 중복되는 것이 있는지 체크
		let checkDuplicateHashtag = false;
		for (let k = 0; k < hashtagValueList.length; k++) {
			if (hashtagValueList[k] === editHashText) {
				checkDuplicateHashtag = true;
			}
		}

		// 만약 빈칸이거나 공백만 있으면 변경이 불가
		if (document.querySelector('#thisEditHashtagValue').value.trim() === '#') {
			alert('변경값이 공백이거나 어떠한 값도 없다면 변경할 수 없습니다.');
			setEditHashText('#');
		}
		// 같은 값이면 변경 불가
		else if (document.querySelector('#thisEditHashtagValue').value === beforeHashtag) {
			alert('같은 값으로 변경할 수 없습니다.');
			// document.querySelector('#thisEditHashtagValue').value = '#';
			setEditHashText('#');
		}
		// 이미 해시태그가 존재하는 경우 변경 불가
		else if (checkDuplicateHashtag) {
			alert('해당 게시글에 같은 해시태그가 존재합니다.');
			setEditHashText('#');
		}
		// 해시태그에 빈칸 넣을 경우 변경불가
		else if (document.querySelector('#thisEditHashtagValue').value.trim().includes(' ')) {
			alert('해시태그에 공백을 포함할 수 없습니다.');
			// document.querySelector('#thisEditHashtagValue').value = '#';
			setEditHashText('#');
		}
		// 정상적인 경우 변경가능
		else {
			// 1. li전체 가져온다(li는 해시태그들)
			let hashtagList = document.querySelectorAll('li');
			// 2. li중 textContent가 일치하는 li의 textContent를 변경된 값으로 바꿔준다.
			for (let i = 0; i < hashtagList.length; i++) {
				if (hashtagList[i].textContent === beforeHashtag) {
					hashtagList[i].textContent = editHashText;
					break;
				}
			}

			// 변경된 값 입력한 input value 초기화
			document.querySelector('#thisEditHashtagValue').value = '';

			// state변수 초기화
			setEditHashText('#');

			// 모달창 닫기
			document.querySelector('.editHashtagModal-back').classList.add('editModaldisplayno');

			alert('해시태그가 변경되었습니다.');
		}
	}

	return (
		<>
			<div className="editHashtagModal-back editModaldisplayno">
				<div className="editHashtagModal-wrapper">
					<div className="editHashtagModal-main">
						<div className='editHashtagModal-info-div'>
							<div className='editHashtagModal-info'>Edit Hashtag</div>
						</div>
						<div className='editHashtagModal-input-div'>
							<div className='editHashtagModal-hashtagValue-div'>
								<div className='editHashtagModal-hashtagValue-info'>기존 해시태그: </div>
								<div id='thisClickHashtagValue'>#오늘은금요일</div>
							</div>
							<input type='text' className='editHashtagModal-input' maxLength='8' value={editHashText}
								id='thisEditHashtagValue' placeholder='변경할 해시태그를 입력하세요' onChange={editHashTextValue} />
						</div>
						<div className='editHashtagModal-button-div'>
							<button className='editHashtagModal-update-btn' onClick={finalEdit}>변경하기</button>
							<button className='editHashtagModal-close-btn' onClick={closeEditModal}>취소하기</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditHashtagModal;