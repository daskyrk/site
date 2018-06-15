import * as userService from '../api/user';
import Cookie from 'js-cookie';
import { getLS, setLS } from '../utils';

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
      Cookie.remove('Authorization');
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
      const res = await userService.login(data);

      if (res && res.code === 1) {
        commit('SET_USER_INFO', res.result.userInfo);
        commit('SET_TOKEN', res.result.token);
        Cookie.set('Authorization', res.result.token);
      } else {
        commit('SET_USER_INFO', {});
      }
      commit('SET_LOGGING', false);
      return res;
    },

    async getUserInfo({ commit, state }) {
      const res = await userService.getUserInfo();

      if (res && res.code === 1) {
        commit('SET_USER_INFO', res.result);
      }
      return res;
    },

    async updateConfig({ commit, state }, data) {
      const res = await userService.updateConfig(data);
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
