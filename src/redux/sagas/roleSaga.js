import { takeLatest, call, put } from 'redux-saga/effects';
import { getUserRole } from '../../services/api';
import { userRoleSuccess, userRoleError } from '../actions/roleAction';
import { USER_ROLE } from '../actions/actionType';


export function* userRoleSaga() {
  try {
    const data = yield call(getUserRole);
    yield put(userRoleSuccess(data));
  } catch (e) {
    yield put(userRoleError(e));
  }
}

export default function* () {
  yield takeLatest(USER_ROLE.ROLE_LIST_REQUEST, userRoleSaga);
}
