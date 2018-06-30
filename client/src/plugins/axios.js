// import { encode } from 'querystring';
import { Message } from 'element-ui';

export default function({ $axios, store, redirect }) {
  // $axios.setToken(store.state.user.token || '', 'Bearer');
  // $axios.onRequest(config => {
  //   config.headers.Authorization = `Bearer ${store.state.user.token || ''}`;
  // });

  $axios.onResponse(response => {
    const { data, config } = response;
    // get请求不展示消息
    if (data && config.method !== 'get') {
      Message[data.code === 1 ? 'success' : 'warning']({
        message: data.msg,
      });
    }
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      store.commit('user/LOGOUT');
    }
  });
}
