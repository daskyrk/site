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
let registered = false;
export default ({ app, store, redirect }) => {
  if (registered) {
    return;
  }
  axios.interceptors.response.use(
    function(response) {
      // TODO: 统一处理包裹的code、msg层
      return response.data;
    },
    function(error) {
      if (error.response && error.response.status === 401) {
        redirect('/login');
      }
      return Promise.reject(error);
    },
  );
  registered = true;
};
