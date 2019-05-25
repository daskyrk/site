import cookieparser from 'cookieparser'

export default {
  state() {
    return {
      fetch: {},
      breadcrumb: [],
      uploadToken: null,
      ip: null,
      bgImage: ''
    }
  },
  actions: {
    async nuxtServerInit({ dispatch, commit }, { req }) {
      try {
        if (req.headers.cookie) {
          const { token } = cookieparser.parse(req.headers.cookie)
          if (token) {
            await dispatch('user/getMyInfo')
            commit('user/SET_TOKEN', token)
          }
        }
        // 不应该在这里，否则拿到的应该是node端的ip了
        // await dispatch('getIP')
      } catch (error) {
        console.log('error in init:', error)
      }
    },

    async getIP({ commit }) {
      const ip = await this.$axios.$get('http://icanhazip.com')
      commit('SET_IP', ip.replace(/[\r\n]/g, ''))
    },

    async getUploadToken({ commit }) {
      const res = await this.$axios.$get('/uploadToken')
      if (res && res.success) {
        commit('SET_UPLOAD_TOKEN', res.data)
      }
    }
  },
  mutations: {
    SET_BREADCRUMB(state, data) {
      state.breadcrumb = data
    },

    SET_UPLOAD_TOKEN(state, data) {
      state.uploadToken = data
    },

    SET_IP(state, data) {
      state.ip = data
    },

    START_FETCH(state, url) {
      state.fetch[url] = true
    },

    END_FETCH(state, url) {
      state.fetch[url] = false
    },

    SET_BG_IMAGE(state, data) {
      state.bgImage = data
    }
  }
}
