// import { encode } from 'querystring';
import { Message } from 'element-ui'

export default function ({ $axios, store, redirect, error }) {
  // $axios.setToken(store.state.userInfo.token || '', 'Bearer');
  $axios.onRequest(config => {
    const ip = store.state.ip;
    if (ip) {
      config.headers['X-Real-IP'] = ip;
    }
    store.commit('START_FETCH', config.url.substring(1) + '#' + config.method)
  })

  $axios.onResponse(response => {
    const { data: body, config } = response
    const url = config.url.slice(config.url.indexOf('/api') + 5)
    const { success, message } = body || {}
    store.commit('END_FETCH', url + '#' + config.method)
    const actionMap = {
      put: '更新成功',
      delete: '删除成功',
      post: '创建成功',
    }
    if (process.browser) {
      // get请求不展示消息
      if (success) {
        config.method !== 'get' && Message.success({ message: message || actionMap[config.method] })
      } else {
        Message.warning({ message: message || '出错了' })
      }
    }
    return response
  })

  $axios.onError(err => {
    // store.commit('END_FETCH', err.response)
    const code = parseInt(err.response && err.response.status)
    if (code === 401) {
      store.commit('user/LOGOUT')
      // redirect('/login')
    }
    error({ statusCode: code, message: err.message })

  })
}
