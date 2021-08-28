import axios from 'axios';
import '../css/DeleteProfileModal.css';
import WarningImage from '../images/warning_image.png';
import { useDispatch } from 'react-redux';
import { notify, updateUserInfo } from '../actions/index';
import dummyProfile from '../images/dummyProfile.png';

function EditHashtagModal({ setIsDeleteModal }) {
  const dispatch = useDispatch();
  // 삭제하기
  const doDelete = (event) => {
    axios({
      method: 'patch',
      url: `${process.env.REACT_APP_END_POINT}/user/editprofile`,
      data: {
        url: null,
      },
      withCredentials: true,
    })
      .then((res) => {
        dispatch(notify('프로필이 삭제되었습니다.')); // 알림 메시지
        dispatch(updateUserInfo(res.data.data)); // 프로필이 삭제된 회원정보를 redux state에 적용
        setIsDeleteModal(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .get(`${process.env.REACT_APP_END_POINT}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios({
                method: 'patch',
                url: `${process.env.REACT_APP_END_POINT}/user/editprofile`,
                data: {
                  url: null,
                },
                withCredentials: true,
              })
                .then((res) => {
                  dispatch(notify('프로필이 삭제되었습니다.')); // 알림 메시지
                  dispatch(updateUserInfo(res.data.data)); // 프로필이 삭제된 회원정보를 redux state에 적용
                  setIsDeleteModal(false);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
              if (err.response.data.message === 'invalid refresh token') {
                dispatch(
                  notify(
                    '사용자 정보를 확인할 수 없습니다. 다시 로그인해주세요'
                  )
                );
              } else if (err.response.data.message === 'user not found') {
                dispatch(
                  notify('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요')
                );
              } else if (
                err.response.data.message === 'internal server error'
              ) {
                dispatch(
                  notify('서버와의 통신 오류입니다. 다시 로그인해주세요')
                );
              }
            });
        }
        console.log(err);
      });
  };

  // 모달창 닫기
  const closeDeleteModal = (event) => {
    setIsDeleteModal(false);
  };

  return (
    <>
      <div className="deleteProfileModal-back">
        <div className="deleteProfileModal-wrapper">
          <div className="deleteProfileModal-main">
            <div className="deleteProfileModal-info-div">
              <div className="deleteProfileModal-info">Delete Profile</div>
            </div>
            <div className="deleteProfileModal-image-div">
              <img
                src={WarningImage}
                alt="deleteProfileModal-image"
                className="deleteProfileModal-image"
              />
              <div>프로필 사진을 제거할 경우 기본 프로필로 변경됩니다.</div>
            </div>
            <div className="deleteProfileModal-button-div">
              <button
                className="deleteProfileModal-delete-btn"
                onClick={doDelete}
              >
                삭제하기
              </button>
              <button
                className="deleteProfileModal-close-btn"
                onClick={closeDeleteModal}
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditHashtagModal;
