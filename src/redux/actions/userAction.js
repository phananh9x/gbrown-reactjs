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
