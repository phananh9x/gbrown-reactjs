import { CHAT_PURCHASE } from './actionType';

export const chatPurchaseAction = data => ({
  type: CHAT_PURCHASE.CHAT_PURCHASE_REQUEST,
  data,
});

export const chatPurchaseActionSuccess = data => ({
  type: CHAT_PURCHASE.CHAT_PURCHASE_SUCCESS,
  data,
});

export const chatPurchaseActionError = error => ({
  type: CHAT_PURCHASE.CHAT_PURCHASE_ERROR,
  error,
});
