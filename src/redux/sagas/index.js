import { all, fork } from 'redux-saga/effects';
import login from './login';
import userSaga from './userSaga';
import chatPurchaseSaga from './chatPurchaseSaga';
import roleSaga from './roleSaga';

export default function* rootSaga() {
  yield all([
    fork(login),
    fork(userSaga),
    fork(chatPurchaseSaga),
    fork(roleSaga)
  ]);
}
