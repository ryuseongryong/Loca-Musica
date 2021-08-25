import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../css/userinfo.css";
import { notify, updateUserInfo } from "../actions/index";
import { usernameChecker, passwordChecker } from "../utils/validateCheck";
import BookmarkList from "../components/bookmarkList";
import Footer from "../components/footer";
import dummyProfile from "../images/dummyProfile.png";
import WithdrawalModal from "../components/withdrawalModal";
import AWS from "aws-sdk";
import DeleteProfileModal from '../components/deleteProfileModal';


function UserInfo() {
  const dispatch = useDispatch();
  const { isSignin, userInfo, bookmarksData } = useSelector((state) => {
    return {
      isSignin: state.userReducer.isSignin,
      userInfo: state.userReducer.userInfo,
      bookmarksData: state.bookmarksReducer.bookmarksData,
    };
  });

  // 현재 페이지에서만 관리가 필요한 state
  const [inputValue, setInputValue] = useState({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
    newUsername: "",
    newProfile: "",
  });
  //* input에 입력되는 value에 따른 에러 또는 결과 메세지
  const [message, setMessage] = useState({
    usernameMessage: "",
    passwordMessage: "",
    profileMessage: "",
  });
  //* modal창을 관리
  const [isModal, setIsModal] = useState(false);
  // delete modal 여부 state
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // 핸들러 함수
  //* 이미지 변경 요청 함수(구현 중)
  //* 이미지 삭제 요청 함수(구현 중)
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  //* input에 입력되는 비밀번호에 따른 결과메세지 변경 함수
  const resultMessageHandler = (message) => {
    switch (message) {
      // 사용자 이름 유효성 검사 후 에러메세지
      case "shortUsername":
        setMessage({
          ...message,
          usernameMessage: "사용자 이름은 2글자 이상이어야 합니다",
        });
        break;
      case "invalidUsername":
        setMessage({
          ...message,
          usernameMessage:
            "한글, 영어, 숫자를 포함하여 2자 이상으로 설정해 주세요",
        });
        break;
      case "validUsername":
        setMessage({
          ...message,
          usernameMessage: "",
        });
        break;

      // 비밀번호 유효성 검사 후 에러메세지
      case "emptyPassword":
        setMessage({
          ...message,
          passwordMessage: "영문, 숫자, 기호를 포함하며 공백이 없어야 합니다",
        });
        break;
      case "shortPassword":
        setMessage({
          ...message,
          passwordMessage: "비밀번호는 8자 이상이어야 합니다",
        });
        break;
      case "invalidPassword":
        setMessage({
          ...message,
          passwordMessage:
            "영어, 숫자, 기호를 포함하여 8자 이상으로 설정해 주세요",
        });
        break;
      case "validPassword":
        setMessage({
          ...message,
          passwordMessage: "",
        });
        break;
      default:
        return "";
    }
  };
  //* 결과메세지 초기화 함수
  const clearMessage = () => {
    setMessage({
      usernameMessage: "",
      passwordMessage: "",
      profileMessage: "",
    });
  };

  //* 사용자이름 변경 요청 함수
  const usernameChangeRequestHandler = (event) => {
    event.preventDefault();
    const { newUsername } = inputValue;
    if (usernameChecker(newUsername) === "validUsername") {
      axios
        .patch(
          `${process.env.REACT_APP_END_POINT}/user/editusername`,
          { newUsername },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          dispatch(updateUserInfo(res.data.data));
          console.log("사용자이름 잘 변경되었어요");
        })
        .then(() => {
          //& 임시, 왜 notification이 두개가 나오는거지??????
          dispatch(notify("사용자이름이 변경되었습니다"));
          setInputValue({
            ...inputValue,
            newUsername: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage({
        ...message,
        usernameMessage: "새 사용자이름을 확인해주세요",
      });
    }
  };

  //* 비밀번호 변경 요청 함수
  const passwordChangeRequestHandler = () => {
    const { password, newPassword, newPasswordCheck } = inputValue;
    if (password === newPassword) {
      setMessage({
        ...message,
        passwordMessage: "기존 비밀번호와 똑같이 변경할 수 없습니다",
      });
    } else if (newPassword !== newPasswordCheck) {
      setMessage({
        ...message,
        passwordMessage: "입력하신 새 비밀번호가 일치하지 않습니다",
      });
    } else if (passwordChecker(newPassword) === "validPassword") {
      axios
        .patch(
          `${process.env.REACT_APP_END_POINT}/user/editpassword`,
          { password, newPassword },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("비번변경 결과", res);
          dispatch(updateUserInfo(res.data.data));
          //!비밀번호 변경하면 토큰을 다시 받아와야하는가?????
          console.log("비밀번호가 변경되었습니다.");
        })
        .then(() => {
          // notification으로 결과를 사용자에게 보여줌
          dispatch(notify("비밀번호가 변경되었습니다"));
          setInputValue({
            ...inputValue,
            password: "",
            newPassword: "",
            newPasswordCheck: "",
          });
        })
        .catch((err) => {
          console.log("회원탈퇴가 안되면 알려줘", err);
        });
    }
  };

  //* 회원탈퇴 모달 오픈 실행 함수
  const withdrawalModalHandler = () => {
    // 회원탈퇴 과정은 withdrawalModal 컴포넌트에서 실행
    setIsModal(!isModal);
  };

  //! S3를 이용한 파일 업로드
  // s3 연결 설정
  const awsConfig = {
    bucketName: "locamusica-user-profile",
    region: "ap-northeast-2",
    accessKeyId: process.env.REACT_APP_THUMBNAIL_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_THUMBNAIL_SECRET_ACCESS_KEY,
  };
  const s3 = new AWS.S3(awsConfig);

  // uploads to s3(file을 받아서 s3에 업로드, 비동기 함수 형식)
  const handleUpload = async (file) => {
    const fileKey = `${Date.now()}-${file.name}`; // '시간 + 파일명'으로 파일명 변경 형삭 ex)1629430434288-lesMiserables.jpeg

    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: "locamusica-user-profile",
      Key: fileKey,
    };

    try {
      await s3.putObject(params).promise();
      return fileKey; // promise 객체로 반환하기 때문에 await로 받아야 값을 받을 수 있다.
    } catch (err) {
      alert(err);
    }
  };

  // delete upload file from s3(s3에 업로드된 파일 제거, 비동기 함수 형식)
  // 파라미터로 제거할 업로드 이미지의 경로를 넘겨준다
  // const deleteUpload = async (fileKey) => {
  //   const params = {
  //     Bucket: "locamusica-user-profile",
  //     Key: fileKey,
  //   };

  //   try {
  //     // await s3.deleteObject(params).promise();
  //     s3.deleteObject(params, function (err, data) {
  //       if (err) console.log(err, err.stack);  // error
  //       else console.log('work');                 // deleted
  //     });
  //   } catch (err) {
  //     alert(err);
  //   }
  // }

  // s3에 업로드된 이미지를 접근할 수 있도록 src경로를 설정하여 반환(img태그에서 src 속성값으로 할당할 수 있는 value값)
  const handleImageSrc = async (file) => {
    const fileKey = await handleUpload(file); // 실제 업로드된 파일명(s3에 이미지 파일 업로드f)
    // img태그에서 실제 s3에 업로드된 이미지파일에 접근하기 위해서 s3주소를 추가하여 src경로 지정
    let uploadProfileSrc = `https://locamusica-user-profile.s3.ap-northeast-2.amazonaws.com/${fileKey}`;
    return uploadProfileSrc; // promise 객체를 반환한다 -> 여기서 state변수에 저장후 해당 state변수로 경로값을 얻는다.
  };
  //!
  //! edit profile [code start]
  //! edit profile 순서 [1.span 클릭 -> 2. input[type=file]에 변경할 프로필 이미지 업로드 -> 3. 변경한 이미지를 s3에 업로드 -> 4. server와 통신하여 프로필 변경]
  // 업로드된 이미지를 지정한 img태그에 미리 보여주는 함수
  const readURL = (input) => {
    // console.log(input.files[0]); // 업로드한 파일정보를 담고있는 객체
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        // 지정한 img태그에 input에서 업로드한 이미지를 미리보기 설정
        document
          .querySelector("#userProfileImg")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  // 이미지 변경 클릭시 input[type=file]이 실행
  const editProfile = (event) => {
    // input[type=file]클릭
    const editProfileInput = document.querySelector("#editProfileInput");
    editProfileInput.click(); // 이미지 클릭시 file업로드 input태그 실행
  };

  // input[type=file]에 파일이 업로드 되면 지정된 img태그에 이미지를 미리보기(input 이벤트 핸들러)
  // + input[type='file']에서 이미지 변경시 바로 s3에 업로드 되고 state변수에 경로 저장
  // + 업로드 된 이미지 경로를 반환하는 함수가 promise객체 형태로 반환하기 때문에 비동기함수(async)로 이벤트 핸들러를 지정한후 업로드된 경로를 전달받음
  //! s3에 이미지 업로드 가능, 업로드 된 이미지 제거기능 필요
  const previewEditProfile = async (event) => {
    console.log("work");
    // 현재 변경되기 전 프로필 이미지
    let nowProfile = document.querySelector("#userProfileImg").src;
    // event.target.files[0] -> 현재 업로드된 이미지 파일, 이 파일을 s3에 업로드 할 것
    readURL(event.target); // 이미지 업로드시 미리보기

    // s3에 이미지 업로드후 업로드 된 이미지 경로 반환(단 promise객체를 반환하기 때문에 비동기함수를 이용하여 return값을 가져온다.)
    let uploadProfileSrc = await handleImageSrc(event.target.files[0]); // s3에 업로드된 이미지 경로 반환
    // 변경하려는 경우
    if (window.confirm("정말 해당 이미지로 프로필을 변경하시겠습니까?")) {
      // server에 변경할 이미지 경로 전달(s3 업로드 경로)
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_END_POINT}/user/editprofile`,
        data: {
          url: uploadProfileSrc,
        },
        withCredentials: true,
      })
        .then((res) => {
          dispatch(notify("프로필이 변경되었습니다.")); // 알림 메시지
          dispatch(updateUserInfo(res.data.data)); // 변경된 회원정보를 redux state에 적용
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 변경안하는 경우
    else {
      document.querySelector("#userProfileImg").setAttribute("src", nowProfile); // 변경한 프로필에서 이전 프로필로 변경
      // input[type=file]에서 같은 파일을 연속해서 업로드시
      // onChange에서 인식을 못하는 경우가 있는데 이 때 value값을 ''으로 지정하면 onChange에서 인식할 수 있다.
      document.querySelector("#editProfileInput").value = ""; // input[type=file]이 연속적으로 같은 파일을 올려도 onChange가 인식하도록 설정
      dispatch(notify("프로필이 변경이 취소되었습니다.")); // 알림 메시지
      // uploadProfileSrc -> 방금 변경된 프로필 이미지가 s3에 업로드 된 후 접근하려는 경로
      // deleteUpload(uploadProfileSrc); // s3에 업로드된 이미지 제거(db에 저장하지 않고 s3에 우선적으로 업로드된 이미지 제거) -> 추후 구현
    }
  };
  //! edit profile [code end]
  // 프로필 삭제 클릭시 삭제 모달 클릭
  const deleteProfile = (event) => {
    setIsDeleteModal(true);
  }

  return (
    <div className="allPageWrap">
      <div id="userInfo">
        <div className="textWelcome">
          <p>반가워요, {userInfo.username} 님!</p>
          <p className="fs20px">{userInfo.email}</p>
        </div>
        <div className="userInfoChangeWrap">
          <div className="imgChangeWrap">
            <img
              alt="사용자 프로필"
              src={userInfo.profile !== null ? userInfo.profile : dummyProfile}
              id="userProfileImg"
            />
            <span onClick={editProfile}>이미지 변경</span>
            <span onClick={deleteProfile}>이미지 삭제</span>
            <input
              type="file"
              id="editProfileInput"
              onChange={previewEditProfile}
            />
          </div>
          <div className="infoChangeWrap">
            <p>사용자 이름 변경</p>
            <form>
              <input
                name="newUsername"
                type="text"
                placeholder="새 사용자 이름"
                required
                value={inputValue.newUsername}
                onChange={inputHandler}
                onFocus={clearMessage}
                onKeyDown={(event) =>
                  event.key === "Enter"
                    ? usernameChangeRequestHandler(event)
                    : null
                }
              />
            </form>
            <div>
              {message.usernameMessage && (
                <p className="mypageMsg">{message.usernameMessage}</p>
              )}
            </div>
            <button onClick={usernameChangeRequestHandler}>변경</button>
          </div>
          {/* 카카오로 로그인한 유저는 비밀번호 변경이 안보이게 */}
          {userInfo.kakao === 0 ? (
            <div className="infoChangeWrap">
              <p>비밀번호 변경</p>
              <form>
                <input
                  name="password"
                  type="password"
                  placeholder="기존 비밀번호"
                  required
                  value={inputValue.password}
                  onChange={inputHandler}
                  onFocus={clearMessage}
                />
                <input
                  name="newPassword"
                  type="password"
                  placeholder="새 비밀번호"
                  required
                  value={inputValue.newPassword}
                  onChange={inputHandler}
                  onFocus={clearMessage}
                  onKeyUp={() =>
                    resultMessageHandler(
                      passwordChecker(inputValue.newPassword)
                    )
                  }
                />
                <input
                  name="newPasswordCheck"
                  type="password"
                  placeholder="새 비밀번호 확인"
                  required
                  value={inputValue.newPasswordCheck}
                  onChange={inputHandler}
                  onFocus={clearMessage}
                  onKeyUp={(event) =>
                    event.key === "Enter"
                      ? passwordChangeRequestHandler(event)
                      : null
                  }
                />
              </form>
              <div>
                {message.passwordMessage && (
                  <p className="mypageMsg">{message.passwordMessage}</p>
                )}
              </div>
              <button onClick={passwordChangeRequestHandler}>변경</button>
            </div>
          ) : null}
        </div>

        <div className="bookmarkWrap">
          <p>북마크한 뮤지컬</p>
          <BookmarkList />
        </div>

        <button className="btnWithdrawal" onClick={withdrawalModalHandler}>
          회원탈퇴
        </button>
        {isModal ? (
          <WithdrawalModal
            withdrawalModalHandler={withdrawalModalHandler}
            userInfo={userInfo}
          />
        ) : null}
      </div>
      {isDeleteModal ? <DeleteProfileModal setIsDeleteModal={setIsDeleteModal} /> : ''}
      <Footer />
    </div>
  );
}

export default UserInfo;
