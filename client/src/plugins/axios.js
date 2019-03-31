// import { encode } from 'querystring';
import { Message } from 'element-ui'

export default function({ $axios, store }) {
  // $axios.setToken(store.state.user.token || '', 'Bearer');
  $axios.onRequest(config => {
    store.commit('START_FETCH', config.url.substring(1) + '#' + config.method)
  })

  $axios.onResponse(response => {
    const { data: body, config } = response
    const url = config.url.slice(config.url.indexOf('/api') + 5)
    const { success, msg } = body || {}
    store.commit('END_FETCH', url + '#' + config.method)
    // get请求不展示消息
    if (process.browser && msg && config.method !== 'get') {
      Message[success ? 'success' : 'warning']({
        message: msg,
      })
    }
    const keys = Object.keys(body);
    // 包含success和data字段的认为是blog后台的接口返回，取出data
    if (keys.length < 3 && keys.includes('success' && keys.includes('data'))) {
      return body;
    }
    return response
  })

  $axios.onError(error => {
    // store.commit('END_FETCH', error.response)
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.commit('user/LOGOUT')
    }
  })
}
