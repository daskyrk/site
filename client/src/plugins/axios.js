// import Message from 'vue-m-message'
// ssr时引入umd包会导致 Unexpected Identifier 错误
let Message = {
  warning() { },
  notLoad: true,
}

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
    if (process.browser) {
      if (Message.notLoad) {
        import('vue-m-message').then(mod => Message = mod.default)
      }else {
        // get请求不展示消息
        if (success === true) {
          // config.method !== 'get' && Message.success({ message: message || actionMap[config.method] })
        } else if (success === false) {
          Message.warning({ message: message || '出错了' })
        }
      }
    }
    return response
  })

  $axios.onError(err => {
    store.commit('END_FETCH', err.response)
    const code = parseInt(err.response && err.response.status)
    switch (code) {
      case 401:
        return store.commit('user/LOGOUT')
      // case 404:
      //   error({ statusCode: code, message: err.message })
      default:
    }
    // 调用error并且必须返回err对象才会显示error页面
    error({ statusCode: code, message: err.message })
    return err
  })
}
