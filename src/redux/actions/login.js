import { LOGIN } from './actionType';


export const loginRequest = data => ({
  type: LOGIN.LOGIN_REQUEST,
  data
});

export const loginSuccess = data => ({
  type: LOGIN.LOGIN_SUCCESS,
  data
});

export const loginError = error => ({
  type: LOGIN.LOGIN_ERROR,
  error
});

export const loginLogout = error => ({
  type: LOGIN.LOGOUT,
  error
});
