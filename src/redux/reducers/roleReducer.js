import { USER_ROLE } from '../actions/actionType';

const initialState = {
  data: [],
  error: {},
  fetching: false,
  success: false
};

export default function UserRole(state = initialState, action) {
  switch (action.type) {
    case USER_ROLE.ROLE_LIST_REQUEST:
      return {
        ...state,
        fetching: true,
        success: false,
        error: {}
      };
    case USER_ROLE.ROLE_LIST_SUCCESS:
      return {
        ...state,
        data: action.data.results,
        fetching: false,
        success: true,
        error: {}
      };
    case USER_ROLE.ROLE_LIST_ERROR:
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
