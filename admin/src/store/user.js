export default {
  state() {
    return {
      userInfo: {},
      logined: false,
      registerable: true,
    }
  },

  mutations: {
    SET_USER(state, data) {
      state.userInfo = data
      if (data.id) {
        state.logined = true
      }
    },

    SET_LOGIN_STATE(state, data) {
      state.logined = data
    },

    LOGOUT(state) {
      state.userInfo = {}
      state.logined = false
    },

    SET_REGISTERABLE(state, data) {
      state.registerable = data
    },
  },

  actions: {
    async login({ commit }, data) {
      const res = await this.$axios.$post('/user/login', data, { tip: '登录' })

      if (res.success) {
        const { user } = res.data
        commit('SET_USER', user)
      } else {
        commit('SET_USER', {})
        commit('SET_LOGIN_STATE', false)
      }
      return res
    },

    async add({ commit }, data) {
      const res = await this.$axios.$post('/user', data)

      if (res.success) {
        const { user } = res.data
        commit('SET_USER', user)
      } else {
        commit('SET_USER', {})
      }
      return res
    },

    async getMyInfo({ commit }) {
      const res = await this.$axios.$get('/user/info')

      if (res.success) {
        commit('SET_USER', res.data)
      }
      return res
    },

    async updateConfig({ dispatch }, data) {
      const res = await this.$axios.$put('/user', data)
      await dispatch('getMyInfo')
      return res
    },

    async checkRegisterable({ commit }) {
      const res = await this.$axios.$get('/user/registerable')
      commit('SET_REGISTERABLE', res.data)
    },
  },
}
