export default {
  state() {
    return {
      userInfo: {},
      logining: false,
      token: null,
      registerable: false,
    }
  },

  mutations: {
    LOGIN_START(state, data) {
      state.logining = true
    },

    SET_USER_INFO(state, data) {
      state.userInfo = data
    },

    SET_LOGGING(state, data) {
      state.logining = data
    },

    LOGOUT(state) {
      state.userInfo = {}
      state.token = null
    },

    SET_TOKEN(state, data) {
      state.token = data
    },

    CLEAR_TOKEN(state) {
      state.token = null
    },

    SET_REGISTERABLE(state, data) {
      state.registerable = data
    },
  },

  actions: {
    async login({ commit }, data) {
      commit('SET_LOGGING', true)
      const res = await this.$axios.$post('/login', data)

      if (res && res.success) {
        const { userInfo, token } = res.result
        commit('SET_USER_INFO', userInfo)
        commit('SET_TOKEN', token)
      } else {
        commit('SET_USER_INFO', {})
      }
      commit('SET_LOGGING', false)
      return res
    },

    async add({ commit }, data) {
      const res = await this.$axios.$post('/user', data)

      if (res && res.success) {
        const { userInfo, token } = res.result
        commit('SET_USER_INFO', userInfo)
        commit('SET_TOKEN', token)
      } else {
        commit('SET_USER_INFO', {})
      }
      return res
    },

    async getUserInfo({ commit }) {
      const res = await this.$axios.$get('/user')

      if (res && res.success) {
        commit('SET_USER_INFO', res.result)
      }
      return res
    },

    async updateConfig({ dispatch }, data) {
      const res = await this.$axios.$put('/admin/user/updateConfig', data)
      await dispatch('getUserInfo')
      return res
    },

    async checkRegisterable({ commit }) {
      const res = await this.$axios.$get('/user/registerable')
      commit('SET_REGISTERABLE', res.result)
    },
  },
}
