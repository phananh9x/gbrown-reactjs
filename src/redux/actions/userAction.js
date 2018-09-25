import { USER } from './actionType';


export const requestUserList = () => ({
  type: USER.USER_LIST_REQUEST
});

export const requestUserListSuccess = data => ({
  type: USER.USER_LIST_REQUEST_SUCCESS,
  data
});

export const requestUserListError = error => ({
  type: USER.USER_LIST_REQUEST_ERROR,
  error
});


export const adminUserProfile = data => ({
  type: USER.ADMIN_UPDATE_PROFILE_REQUEST,
  data
});

export const adminUserProfileSuccess = data => ({
  type: USER.ADMIN_UPDATE_PROFILE_SUCCESS,
  data
});


export const admineUserProfileError = error => ({
  type: USER.ADMIN_UPDATE_PROFILE_ERROR,
  error
});
