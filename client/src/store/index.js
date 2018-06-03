
import cookieparser from 'cookieparser';

import service from '../api';

export default {
  // plugins: [check],
  state() {
    return {
      fetch: {},
      token: null,
    };
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      let accessToken = null;
      if (req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie);
        accessToken = parsed.Authorization;
      }
      commit('SET_TOKEN', accessToken);
    },
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data;
    },
  },
};
