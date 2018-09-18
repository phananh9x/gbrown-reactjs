import { all, fork } from 'redux-saga/effects';
import login from './login';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([
    fork(login),
    fork(userSaga)
  ]);
}
