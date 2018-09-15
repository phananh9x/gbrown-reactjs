import { LOGIN } from '../actions/actionType';

const initalState = {
  data: {},
  error: {},
  fetching: false,
  success: false
};


export default function Login(state = initalState, action) {
  switch (action.type) {
    case LOGIN.LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
        success: false,
        data: action.data,
        error: {}
      };
    case LOGIN.LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        data: action.data,
        error: {}
      };
    case LOGIN.LOGIN_ERROR:
      return {
        ...state,
        data: {},
        fetching: false,
        success: false,
        error: action.error
      };
    case LOGIN.LOGOUT:
      return {
        ...state,
        data: {},
        fetching: false,
        success: false
      };
    default:
      return state;
  }
}
