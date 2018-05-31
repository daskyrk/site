import * as userService from '../api/user';

export default {
  state() {
    return {
      userInfo: {},
      logining: false,
    };
  },

  mutations: {
    LOGIN_START(state, data) {
      state.logining = true;
    },

    LOGIN_SUCCESS(state, data) {
      state.userInfo = data;
      state.logining = false;
    },

    LOGIN_FAIL(state, data) {
      state.userInfo = {};
      state.logining = false;
    },

  },

  actions: {
    // 获取文章列表
    async login({ commit, state }, data) {
      commit('LOGIN_START');
      const res = await userService
        .login(data)
        .catch(err => console.error(err));

      if (res && res.code === 1) {
        commit('LOGIN_SUCCESS', res.result);
      } else commit('LOGIN_FAIL');
      return res;
    },
  },
};
