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
      summary: {},
    };
  },

  mutations: {
    GET_BOOKS(state, data) {
      const { list, total } = data;
      state.list = list;
      state.total = total;
    },

    UPDATE_PAGE(state, data) {
      state.query = data;
    },

    SET_BOOK_QUERY(state, data) {
      state.searchList = data.slice(0, 3);
    },

    SET_BOOK_SUMMARY(state, data) {
      state.summary = data;
    },
  },

  actions: {
    async getBooks({ commit, state }, data) {
      const query = { ...state.query, ...data };
      const res = await this.$axios.$get('/book', { params: query });
      commit('UPDATE_PAGE', query);
      if (res.code === 1) {
        commit('GET_BOOKS', res.result);
      }
      return res;
    },

    async search({ commit, state }, data) {
      const res = await this.$axios.$get('/proxy/douban/v2/book/search', { params: data });
      commit('SET_BOOK_QUERY', res.books);
      return res;
    },

    async addBook({ dispatch }, data) {
      const res = await this.$axios.$post('/admin/book', data);
      if (res.code === 1) {
        await dispatch('getBooks');
      }
      return res;
    },

    async updateBook({ dispatch }, { _id, ...data }) {
      const res = await this.$axios.$put(`/admin/book/${_id}`, data);
      if (res.code === 1) {
        await dispatch('getBooks');
      }
      return res;
    },

    async delBook({ dispatch }, _id) {
      const res = await this.$axios.$delete(`/admin/book/${_id}`);
      if (res.code === 1) {
        let pageNo = state.query.pageNo;
        if (state.list.length === 1) {
          pageNo--;
        }
        await dispatch('getBooks', { pageNo });
      }
      return res;
    },

    // 统计
    async summary({ commit }, id) {
      const res = await this.$axios.$get(`/admin/book/summary`);
      if (res.code === 1) {
        commit('SET_BOOK_SUMMARY', res.result);
      }
      return res;
    },
  },
};
