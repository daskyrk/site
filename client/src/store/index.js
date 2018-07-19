import cookieparser from 'cookieparser';

export default {
  state() {
    return {
      fetch: {},
      breadcrumb: [],
      uploadToken: null,
      story: {},
    };
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      let token = null;
      if (req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie);
        token = parsed.token;
      }
      commit('user/SET_TOKEN', token);
    },

    async getUploadToken({ commit }) {
      const res = await this.$axios.$get('/uploadToken');
      if (res && res.code === 1) {
        commit('SET_UPLOAD_TOKEN', res.result);
      }
    },

    async getBingStory({ commit }) {
      const res = await this.$axios.$get(`https://api.lylares.com/bing/?AppKey=rOQmtNTWzw`);
      if (res.code === 200) {
        commit('SET_BING_STORY', res);
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

    START_FETCH(state, url) {
      state.fetch[url] = true;
    },

    END_FETCH(state, url) {
      state.fetch[url] = false;
    },

    SET_BING_STORY(state, data) {
      state.story = data;
    },
  },
};
