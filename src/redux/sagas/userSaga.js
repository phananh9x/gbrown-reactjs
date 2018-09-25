import { call, put, takeLatest } from 'redux-saga/effects';
import { userListApi, updateUser } from '../../services/api';
import {
  requestUserListSuccess, requestUserListError, requestUserList, admineUserProfileError
} from '../actions/userAction';
import { USER } from '../actions/actionType';

export function* userListSagas() {
  try {
    const data = yield call(userListApi);
    yield put(requestUserListSuccess(data));
  } catch (e) {
    yield put(requestUserListError(e));
  }
}

export function* adminUpdateProfileSaga(param) {
  try {
    yield call(updateUser, param.data);
    yield put(requestUserList());
  } catch (e) {
    yield put(admineUserProfileError(e));
  }
}

export default function* app() {
  yield takeLatest(USER.USER_LIST_REQUEST, userListSagas);
  yield takeLatest(USER.ADMIN_UPDATE_PROFILE_REQUEST, adminUpdateProfileSaga);
}
