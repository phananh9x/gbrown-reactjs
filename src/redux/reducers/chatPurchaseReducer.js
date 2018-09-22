import { CHAT_PURCHASE } from '../actions/actionType';

const initialState = {
  data: {},
  error: {},
  fetching: false,
  success: false
};

export default function ChatPurchase(state = initialState, action) {
  switch (action.type) {
    case CHAT_PURCHASE.CHAT_PURCHASE_REQUEST:
      return {
        ...state,
        data: {},
        error: {},
        fetching: true,
        success: false
      };
    case CHAT_PURCHASE.CHAT_PURCHASE_SUCCESS:
      return {
        ...state,
        data: action.data.results,
        error: {},
        fetching: false,
        success: true
      };
    case CHAT_PURCHASE.CHAT_PURCHASE_ERROR:
      return {
        ...state,
        data: {},
        error: action.error,
        fetching: false,
        success: false
      };

    default:
      return state;
  }
}
