import cookieparser from 'cookieparser'

export default {
  state() {
    return {
      fetch: {},
      breadcrumb: [],
      uploadToken: null,
      story: {},
      ip: null,
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
        console.log('error in init:', error);
      }
    },

    async getIP({ commit }) {
      const ip = await this.$axios.$get('http://icanhazip.com')
      commit('SET_IP', ip.replace(/[\r\n]/g, ""))
    },

    async getUploadToken({ commit }) {
      const res = await this.$axios.$get('/uploadToken')
      if (res && res.success) {
        commit('SET_UPLOAD_TOKEN', res.data)
      }
    },

    async getBingStory({ commit }) {
      // TODO: change to another api
      const res = await this.$axios.$get(
        'https://api.berryapi.net/bing?AppKey=rOQmtNTWzw',
      )
      console.log('res:', res);
      // commit('SET_BING_STORY', res)
    },
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

    SET_BING_STORY(state, data) {
      state.story = data
    },
  },
}
