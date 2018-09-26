import { USER_ROLE } from './actionType';

export const userRoleAction = () => ({
  type: USER_ROLE.ROLE_LIST_REQUEST
});

export const userRoleSuccess = data => ({
  type: USER_ROLE.ROLE_LIST_SUCCESS,
  data
});


export const userRoleError = error => ({
  type: USER_ROLE.ROLE_LIST_ERROR,
  error
});
