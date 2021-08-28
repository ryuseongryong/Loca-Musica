import axios from 'axios';
import "../css/DeleteProfileModal.css";
import WarningImage from '../images/warning_image.png'
import { useDispatch } from "react-redux";
import { notify, updateUserInfo } from "../actions/index";
import dummyProfile from "../images/dummyProfile.png";


function EditHashtagModal({ setIsDeleteModal }) {
	const dispatch = useDispatch();
	// 삭제하기
	const doDelete = (event) => {
		axios({
			method: "patch",
			url: `${process.env.REACT_APP_END_POINT}/user/editprofile`,
			data: {
				url: null,
			},
			withCredentials: true,
		})
			.then((res) => {
				dispatch(notify("프로필이 삭제되었습니다.")); // 알림 메시지
				dispatch(updateUserInfo(res.data.data)); // 프로필이 삭제된 회원정보를 redux state에 적용
				setIsDeleteModal(false);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	// 모달창 닫기
	const closeDeleteModal = (event) => {
		setIsDeleteModal(false);
	}

	return (
		<>
			<div className="deleteProfileModal-back">
				<div className="deleteProfileModal-wrapper">
					<div className="deleteProfileModal-main">
						<div className='deleteProfileModal-info-div'>
							<div className='deleteProfileModal-info'>Delete Profile</div>
						</div>
						<div className='deleteProfileModal-image-div'>
							<img src={WarningImage} alt='deleteProfileModal-image' className='deleteProfileModal-image' />
							<div className='deleteProfileModal-text'>프로필을 삭제하시겠습니까?</div>
							<div className='deleteProfileModal-text2'>삭제된 프로필은 복구할 수 없습니다.</div>
						</div>
						<div className='deleteProfileModal-button-div'>
							<button className='deleteProfileModal-delete-btn' onClick={doDelete}>삭제하기</button>
							<button className='deleteProfileModal-close-btn' onClick={closeDeleteModal}>취소하기</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditHashtagModal;