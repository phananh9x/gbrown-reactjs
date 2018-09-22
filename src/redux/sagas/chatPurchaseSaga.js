import { call, put, takeLatest } from 'redux-saga/effects';
import { chatPurchaseApi } from '../../services/api';
import { chatPurchaseActionSuccess, chatPurchaseActionError } from '../actions/chatAction';
import { CHAT_PURCHASE } from '../actions/actionType';

export function* chat(param) {
  try {
    const data = yield call(chatPurchaseApi, param.data);
    console.log(data, 'aaaaaa');

    yield put(chatPurchaseActionSuccess(data));
  } catch (e) {
    yield put(chatPurchaseActionError(e));
  }
}

export default function* app() {
  yield takeLatest(CHAT_PURCHASE.CHAT_PURCHASE_REQUEST, chat);
}
