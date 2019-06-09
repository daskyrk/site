import cookieparser from 'cookieparser'

export default {
  state() {
    return {
      fetch: {},
      breadcrumb: [],
      uploadToken: null,
    }
  },
  actions: {
    // 注意这里不是nuxtServerInit，是通过plugin实现的，因为nuxtServerInit不在spa模式运行
    async nuxtClientInit({ dispatch, commit }, { req }) {
      try {
        await dispatch('user/getMyInfo')
      } catch (error) {
        console.log('error in init:', error)
      }
    },

    async getUploadToken({ commit }) {
      const res = await this.$axios.$get('/uploadToken')
      if (res.success) {
        commit('SET_UPLOAD_TOKEN', res.data)
      }
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
  },
}
