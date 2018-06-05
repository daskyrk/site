
import cookieparser from 'cookieparser';
import service from '../api';

export default {
  // plugins: [check],
  state() {
    return {
      fetch: {},
      breadcrumb: [],
    };
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      let accessToken = null;
      if (req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie);
        accessToken = parsed.Authorization;
      }
      commit('user/SET_TOKEN', accessToken);
    },
  },
  mutations: {
    SET_BREADCRUMB(state, data) {
      state.breadcrumb = data;
    },
  },
};
