export default {
  state() {
    return {
      userInfo: {},
      logined: false,
      token: null,
      registerable: true,
    }
  },

  mutations: {
    LOGIN_START(state, data) {
      state.logined = true
    },

    SET_USER(state, data) {
      state.userInfo = data
    },

    SET_LOGIN_STATE(state, data) {
      state.logined = data
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
      commit('SET_LOGIN_STATE', true)
      const res = await this.$axios.$post('/user/login', data)

      if (res && res.success) {
        const { user, token } = res.data
        commit('SET_USER', user)
        commit('SET_TOKEN', token)
      } else {
        commit('SET_USER', {})
      }
      commit('SET_LOGIN_STATE', false)
      return res
    },

    async add({ commit }, data) {
      const res = await this.$axios.$post('/user', data)

      if (res && res.success) {
        const { user, token } = res.data
        commit('SET_USER', user)
        commit('SET_TOKEN', token)
      } else {
        commit('SET_USER', {})
      }
      return res
    },

    async getUserInfo({ commit }) {
      const res = await this.$axios.$get('/user/info')

      if (res && res.success) {
        commit('SET_USER', res.data)
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
      commit('SET_REGISTERABLE', res.data)
    },
  },
}
