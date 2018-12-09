export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 1000,
      },
      searchList: [],
      count: 36,
    };
  },

  mutations: {
    GET_MUSICS(state, data) {
      const { list, total } = data;
      state.list = list;
      state.total = total;
    },

    UPDATE_PAGE(state, data) {
      state.query = data;
    },

    SET_MUSIC_QUERY(state, data) {
      state.searchList = data;
    },

    SET_MUSIC_SUMMARY(state, data) {
      state.summary = data;
    },
  },

  actions: {
    async searchById({ commit, state }, { id, limit = 2, offset = 0 }) {
      const res = await this.$axios.$get(
        `/api/proxy/lylares/netmusic/?query=music&id=${id}&limit=2&offset=0`,
        { params: { id, limit, offset } },
      );
      commit('SET_MUSIC_QUERY', res.books);
      return res;
    },

    async search({ commit, state }, data) {
      const { kw, limit = 20, offset = 0 } = this.props;
      const res = await this.$axios.$get(`/api/proxy/lylares/netmusic/?query=s&kw=${kw}&t=1&limit=${limit}&offset=${offset}`, {
        params: data,
      });
      commit('SET_MUSIC_QUERY', res.books);
      return res;
    },

    async getPlaylist({ commit, state }, id) {
      const res = await this.$axios.$get(`/api/proxy/lylares/netmusic/?query=playlist&id=${id}`, {
        params: data,
      });
      commit('SET_PLAYLIST', res.books);
      return res;
    },

    async getAlbum({ commit, state }, id) {
      const res = await this.$axios.$get(`/api/proxy/lylares/netmusic/?query=album&id=${id}`, {
        params: data,
      });
      commit('SET_ALBUM', res.books);
      return res;
    },

  },
};
