import { takeLatest, put, call } from 'redux-saga/effects';
import { loginApi } from '../../services/api';
import { loginSuccess, loginError } from '../actions/login';
import { LOGIN } from '../actions/actionType';

export function* login(param) {
  try {
    const data = yield call(loginApi, param.data);
    localStorage.setItem('@user', JSON.stringify(Object.assign(data, param)));
    yield put(loginSuccess(data));
  } catch (e) {
    yield put(loginError(e));
  }
}

export default function* app() {
  yield takeLatest(LOGIN.LOGIN_REQUEST, login);
}
