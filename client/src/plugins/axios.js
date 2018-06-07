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

// plugin在每次server render时都会注册一次，所以必须是纯函数，不能修改返回值。。
export default ({ app, store, redirect }) => {
  axios.interceptors.request.use(
    function(config) {
      config.headers.Authorization = `Bearer ${store.state.user.token || ''}}`
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    function(response) {
      const { data, config } = response;
      // get请求不展示消息
      if (data && config.method !== 'get') {
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
