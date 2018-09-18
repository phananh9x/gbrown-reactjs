import { call, put, takeLatest } from 'redux-saga/effects';
import { userListApi } from '../../services/api';
import { requestUserListSuccess, requestUserListError } from '../actions/userAction';
import { USER } from '../actions/actionType';

export function* userListSagas() {
  try {
    const data = yield call(userListApi);
    yield put(requestUserListSuccess(data));
  } catch (e) {
    yield put(requestUserListError(e));
  }
}

export default function* app() {
  yield takeLatest(USER.USER_LIST_REQUEST, userListSagas);
}
