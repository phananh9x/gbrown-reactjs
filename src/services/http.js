import axios from 'axios';

const API_ROOT = process.env.REACT_APP_CONTACTS_API_URL || 'http://103.7.41.176:3000/';

axios.defaults.baseURL = API_ROOT;
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

const http = {
  setAuthorizationHeader(accessToken) {
    axios.defaults.headers.token = accessToken;
  },
  request(config = {}) {
    return axios.request(config);
  },
  get(url, config = {}) {
    return axios.get(url, config);
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  }
};

export default http;
