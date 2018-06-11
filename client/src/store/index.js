import cookieparser from 'cookieparser';
import * as service from '../api/index';

export default {
  // plugins: [check],
  state() {
    return {
      fetch: {},
      breadcrumb: [],
      uploadToken: null,
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

    async getUploadToken({ commit }) {
      const res = await service.getUploadToken();
      if (res && res.code === 1) {
        commit('SET_UPLOAD_TOKEN', res.result);
      }
    },
  },
  mutations: {
    SET_BREADCRUMB(state, data) {
      state.breadcrumb = data;
    },

    SET_UPLOAD_TOKEN(state, data) {
      state.uploadToken = data;
    },
  },
};
