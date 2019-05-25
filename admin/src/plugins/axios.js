import Message from 'vue-m-message'

export default function ({ $axios, store, redirect, error }) {
  // $axios.setToken(store.state.userInfo.token || '', 'Bearer');
  $axios.onRequest((config) => {
    const ip = store.state.ip
    if (ip) {
      config.headers['X-Real-IP'] = ip
    }
    store.commit('START_FETCH', config.url.substring(1) + '#' + config.method)
  })

  $axios.onResponse((response) => {
    const { data, config } = response
    const { success, message } = data || {}
    const { url, method, tip } = config
    const _url = url.replace(/^\/api\//, '')

    store.commit('END_FETCH', _url + '#' + method)
    if (process.browser) {
      if (success === true) {
        // get请求不展示消息
        method !== 'get' && Message.success(`${tip}成功` || message || '成功')
      } else if (success === false) {
        Message.warning({ message: message || '出错了' })
      }
    }
    return response
  })

  $axios.onError((err) => {
    const { response, message } = err
    const { data, status } = response
    store.commit('END_FETCH', response)
    console.error(err)
    Message.error(data.message || message)
    if (status === 401) {
      store.commit('user/LOGOUT')
      redirect('/login')
    }
    // 调用error 会显示error页面
    // error({ statusCode: code, message: err.message })
  })
}
