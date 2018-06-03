import * as userService from '../api/user';
import Cookie from 'js-cookie';

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

    LOGIN_SUCCESS(state, data) {
      state.userInfo = data;
      state.logining = false;
    },

    LOGIN_FAIL(state, data) {
      state.userInfo = {};
      state.logining = false;
    },

    LOGOUT(state) {
      state.userInfo = {};
      state.token = null;
      Cookie.remove('Authorization');
    },

    LOGOUT_SUCCESS(state) {
      state.userInfo = {};
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
      commit('LOGIN_START');
      const res = await userService
        .login(data)
        .catch(err => console.error(err));

      if (res && res.code === 1) {
        commit('LOGIN_SUCCESS', res.result.userInfo);
        commit('SET_TOKEN', res.result.token);
        Cookie.set('Authorization', res.result.token);
      } else {
        commit('LOGIN_FAIL');
      }
      return res;
    },

    // async logout({ commit, state }, data) {
    //   const res = await userService
    //     .logout()
    //     .catch(err => console.error(err));

    //   if (res && res.code === 1) {
    //     commit('LOGOUT_SUCCESS');
    //     commit('CLEAR_TOKEN');
    //     Cookie.remove('Authorization');
    //   } else {
    //     commit('LOGOUT_FAIL');
    //   }
    //   return res;
    // },
  },
};
