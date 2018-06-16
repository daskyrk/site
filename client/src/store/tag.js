
export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },

  mutations: {
    GET_TAGS(state, data) {
      const { list, total } = data;
      state.list = list;
      state.total = total;
    },

    UPDATE_PAGE(state, data) {
      state.query = data;
    },
  },

  actions: {
    async getTags({ commit, state }, data) {
      const query = { ...state.query, ...data };
      const res = await this.$axios.$get('/tag', { params: query });
      commit('UPDATE_PAGE', query);
      if (res.code === 1) {
        commit('GET_TAGS', res.result);
      }
      return res;
    },

    async addTag({ commit, dispatch, state }, data) {
      const res = await this.$axios.$post('/tag', data);
      if (res.code === 1) {
        await dispatch('getTags');
      }
      return res;
    },

    async updateTag({ commit, dispatch, state }, { id, ...data }) {
      const res = await this.$axios.$put(`/tag/${id}`, data);
      if (res.code === 1) {
        await dispatch('getTags');
      }
      return res;
    },

    async delTag({ commit, dispatch, state }, id) {
      const res = await this.$axios.$delete('/tag', id);
      if (res.code === 1) {
        let pageNo = state.query.pageNo;
        if (state.list.length === 1) {
          pageNo--;
        }
        await dispatch('getTags', { pageNo });
      }
      return res;
    },
  },
};
