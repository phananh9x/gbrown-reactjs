import { LOGIN, USER } from './actionType';


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

export const updateProfile = data => ({
  type: USER.UPDATE_PROFILE_REQUEST,
  data
});

export const updateProfileSuccess = data => ({
  type: USER.UPDATE_PROFILE_SUCCESS,
  data
});


export const updateProfileError = error => ({
  type: USER.UPDATE_PROFILE_ERROR,
  error
});
