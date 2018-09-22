import http from './http';
import { server } from '../API';

export const loginApi = (data) => {
  const url = `${server}user/sign_in`;
  return http.post(url, data);
};

export const userListApi = () => {
  const url = `${server}user/all`;
  return http.get(url, {});
};

export const chatPurchaseApi = (data) => {
  const url = `${server}chat/purchase/${data.purchaseId}/create`;
  return http.post(url, data);
};
