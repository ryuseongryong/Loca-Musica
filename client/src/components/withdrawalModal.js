/*eslint-disable*/

import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signout } from '../actions';
import { CgClose } from 'react-icons/cg';

function WithdrawalModal({ withdrawalModalHandler, userInfo }) {
  let history = useHistory();
  const dispatch = useDispatch();

  // 현재페이지에서만 관리되는 state
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  // 이벤트 핸들러 함수
  //* input에 입력되는 value 변경 함수
  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };

  //* 일반 사용자 탈퇴요청
  const withdrawalRequestHandler = (event) => {
    const password = inputValue;
    axios
      .patch(
        `${process.env.REACT_APP_END_POINT}/user/delete`,
        { password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        dispatch(signout());
      })
      .then(() => {
        console.log('탈퇴처리가 잘 되었어요');
        history.push('/musical/main');
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (
          err.response.status === 401 &&
          err.response.data.message === 'invalid access token'
        ) {
          axios
            .get(`${process.env.REACT_APP_END_POINT}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios
                .patch(
                  `${process.env.REACT_APP_END_POINT}/user/delete`,
                  { password },
                  { withCredentials: true }
                )
                .then((res) => {
                  console.log(res);
                  dispatch(signout());
                })
                .then(() => {
                  console.log('탈퇴처리가 잘 되었어요');
                  history.push('/musical/main');
                })
                .catch((err) => {
                  if (
                    err.response.status === 401 &&
                    err.response.data.message === 'invalid password'
                  ) {
                    setMessage(
                      '비밀번호가 일치하지 않습니다. 다시 확인해주세요'
                    );
                  }
                });
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
        if (
          err.response.status === 401 &&
          err.response.data.message === 'invalid password'
        ) {
          setMessage('비밀번호가 일치하지 않습니다. 다시 확인해주세요');
        }
      });
  };

  //! 카카오사용자 탈퇴요청
  const kakaoWithdrawalRequestHandler = (event) => {
    axios
      .patch(`${process.env.REACT_APP_END_POINT}/user/delete`, null, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(signout());
      })
      .then(() => {
        console.log('카카오 사용자 탈퇴처리가 잘 되었어요');
        history.push('/musical/main');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .get(`${process.env.REACT_APP_END_POINT}/user/auth`, {
              withCredentials: true,
            })
            .then((res) => {
              axios
                .patch(`${process.env.REACT_APP_END_POINT}/user/delete`, null, {
                  withCredentials: true,
                })
                .then((res) => {
                  dispatch(signout());
                })
                .then(() => {
                  console.log('카카오 사용자 탈퇴처리가 잘 되었어요');
                  history.push('/musical/main');
                });
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
        console.log(err.response);
      });
  };

  return (
    <div className="withdrawalModalWrap">
      <span className="btnCloseModal" onClick={withdrawalModalHandler}>
        <CgClose />
      </span>
      <div className="withdrawalInfo">
        <div>탈퇴 전 꼭 읽어주세요!</div>
        <p>
          회원탈퇴 후 부정이용 방지를 위하여 동일 이메일로 재 회원가입이
          불가합니다.
        </p>
        <p>
          회원탈퇴 후에도 등록한 게시물은 그대로 남아 있습니다. 삭제를 원하는
          게시글이 있다면 탈퇴 전 삭제하시기 바랍니다.
        </p>
      </div>
      {userInfo.kakao === 0 ? (
        <div className="withdrawalwithPassword">
          <form>
            <input
              className="inputWithdrawal"
              name="password"
              type="password"
              placeholder="비밀번호 확인"
              required
              value={inputValue}
              onChange={inputHandler}
              onFocus={() => setMessage('')}
            />
            {message === '' ? (
              <p>안전한 사용을 위해 비밀번호를 입력해주세요</p>
            ) : (
              <p className="c_e30052">{message}</p>
            )}
            <p className="lastCheck">
              유의 사항을 모두 확인하였으며, 이에 동의합니다.
            </p>
            <input name="checkbox" type="checkbox" required />
          </form>
          <button
            className="btnWithdrawalCheck"
            onClick={withdrawalRequestHandler}
          >
            확인
          </button>
        </div>
      ) : (
        <div className="withdrawalForKakao">
          <p className="lastCheck">
            유의 사항을 모두 확인하였으며, 이에 동의합니다.
          </p>
          <form>
            <input name="checkbox" type="checkbox" required />
          </form>
          <button
            className="btnWithdrawalCheck"
            onClick={kakaoWithdrawalRequestHandler}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
}

export default WithdrawalModal;
