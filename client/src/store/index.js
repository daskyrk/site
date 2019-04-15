import cookieparser from 'cookieparser'

export default {
  state() {
    return {
      fetch: {},
      breadcrumb: [],
      uploadToken: null,
      story: {},
    }
  },
  actions: {
    async nuxtServerInit({ dispatch, commit }, { req }) {
      let token = null
      if (req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        token = parsed.token
      }
      await dispatch('user/getMyInfo')
      commit('user/SET_TOKEN', token)
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
