import { takeLatest, put, call } from 'redux-saga/effects';
import { loginApi, updateProfile } from '../../services/api';
import {
  loginSuccess, loginError, updateProfileSuccess, updateProfileError
} from '../actions/login';
import { LOGIN, USER } from '../actions/actionType';
import http from '../../services/http';
import { updateToken } from '../../API';

export function* loginSagas(param) {
  try {
    const data = yield call(loginApi, param.data);
    if (!data.results.role) {
      yield put(loginError(new Error('Bạn chưa được cấp quyền')));
    } else {
      localStorage.setItem('@user', JSON.stringify(Object.assign(data, param)));
      http.setAuthorizationHeader(data.results.token);
      updateToken(data.results.token);
      yield put(loginSuccess(data));
    }
  } catch (e) {
    yield put(loginError(new Error('Tài khoản hoặc mật khẩu không đúng')));
  }
}

export function* updateProfileSagas(param) {
  try {
    const data = yield call(updateProfile, param.data);
    const dataUpdated = {
      results: data
    };
    localStorage.setItem('@user', JSON.stringify(Object.assign(dataUpdated, param)));
    yield put(updateProfileSuccess(dataUpdated));
  } catch (e) {
    yield put(updateProfileError(e));
  }
}

export default function* app() {
  yield takeLatest(LOGIN.LOGIN_REQUEST, loginSagas);
  yield takeLatest(USER.UPDATE_PROFILE_REQUEST, updateProfileSagas);
}
