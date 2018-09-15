import http from './http';
import { server } from '../API';

export const loginApi = (data) => {
  const url = `${server}user/sign_in`;
  return http.post(url, data);
};
