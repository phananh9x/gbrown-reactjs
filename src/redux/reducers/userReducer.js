import { USER } from '../actions/actionType';

const initialState = {
  data: [],
  error: {},
  fetching: false,
  success: false
};

export default function UserList(state = initialState, action) {
  switch (action.type) {
    case USER.USER_LIST_REQUEST:
      return {
        ...state,
        fetching: true,
        success: false,
        error: {}
      };
    case USER.USER_LIST_REQUEST_SUCCESS:
      // action.data.results.sort();
      return {
        ...state,
        data: action.data.results,
        fetching: false,
        success: true,
        error: {}
      };
    case USER.USER_LIST_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false,
        success: false,
        data: []
      };
    default:
      return state;
  }
}
