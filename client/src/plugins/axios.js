// import { encode } from 'querystring';
import { Message } from 'element-ui'

export default function({ $axios, store }) {
  // $axios.setToken(store.state.userInfo.token || '', 'Bearer');
  $axios.onRequest(config => {
    store.commit('START_FETCH', config.url.substring(1) + '#' + config.method)
  })

  $axios.onResponse(response => {
    const { data: body, config } = response
    const url = config.url.slice(config.url.indexOf('/api') + 5)
    const { success, message } = body || {}
    store.commit('END_FETCH', url + '#' + config.method)
    // get请求不展示消息
    if (process.browser && message && config.method !== 'get') {
      Message[success ? 'success' : 'warning']({ message })
    }
    const keys = Object.keys(body)
    // 包含success和data字段的认为是blog后台的接口返回，取出data
    if (keys.includes('success' && (keys.includes('data') || keys.includes('message')))) {
      return body
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
