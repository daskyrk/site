
export default {
  state() {
    return {
      userInfo: {},
      logining: false,
      token: null,
    };
  },

  mutations: {
    LOGIN_START(state, data) {
      state.logining = true;
    },

    SET_USER_INFO(state, data) {
      state.userInfo = data;
    },

    SET_LOGGING(state, data) {
      state.logining = data;
    },

    LOGOUT(state) {
      state.userInfo = {};
      state.token = null;
    },

    SET_TOKEN(state, data) {
      state.token = data;
    },

    CLEAR_TOKEN(state) {
      state.token = null;
    },
  },

  actions: {
    async login({ commit, state }, data) {
      commit('SET_LOGGING', true);
      const res = await this.$axios.$post('/login', data);

      if (res && res.code === 1) {
        const { userInfo, token } = res.result;
        commit('SET_USER_INFO', userInfo);
        commit('SET_TOKEN', token);
      } else {
        commit('SET_USER_INFO', {});
      }
      commit('SET_LOGGING', false);
      return res;
    },

    async getUserInfo({ commit, state }) {
      const res = await this.$axios.$get('/user');

      if (res && res.code === 1) {
        commit('SET_USER_INFO', res.result);
      }
      return res;
    },

    async updateConfig({ commit, state }, data) {
      const res = await this.$axios.$put('/user/updateConfig', data);
    },
  },
};
