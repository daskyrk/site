import axios from 'axios';
import { encode } from 'querystring';
import { Message } from 'element-ui';
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
      const data = response.data;
      if (data) {
        Message[data.code === 1 ? 'success' : 'warning']({
          message: data.msg,
        });
      }
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
