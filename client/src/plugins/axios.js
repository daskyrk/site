import axios from 'axios';
import { encode } from 'querystring';
import config from '../config';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.transformRequest = [
  function(data, headers) {
    return encode(data);
  },
];

// plugin在每次server render时都会注册一次，这里只要注册一次就行，所以判断一下
export default ({ app, store, redirect }) => {
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response && error.response.status === 401) {
        redirect('/login');
      }
      return Promise.reject(error);
    },
  );
};
