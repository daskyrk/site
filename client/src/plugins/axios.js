// import { encode } from 'querystring';
import { Message } from 'element-ui';

export default function({ $axios, store }) {
  // $axios.setToken(store.state.user.token || '', 'Bearer');
  $axios.onRequest(config => {
    store.commit('START_FETCH', config.url.substring(1));
  });

  $axios.onResponse(response => {
    const { data, config } = response;
    const url = config.url.slice(config.url.indexOf('/api') + 5);
    store.commit('END_FETCH', url);
    // get请求不展示消息
    if (process.browser && data && config.method !== 'get') {
      Message[data.code === 1 ? 'success' : 'warning']({
        message: data.msg,
      });
    }
  });

  $axios.onError(error => {
    // store.commit('END_FETCH', error.response)
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      store.commit('user/LOGOUT');
    }
  });
}
