export default {
  state() {
    return {
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      list: [],
      total: 0,
    };
  },

  getters: {
    hasMore: state => {
      return state.total > state.query.pageNo * state.query.pageSize;
    },
  },

  mutations: {
    UPDATE_QUERY(state, data) {
      state.query = { ...data, ...state.query };
    },

    SET_RESULT(state, data) {
      const { list, total } = data;
      state.list = list;
      state.total = total;
    },

    CLEAR_SEARCH(state) {
      state.query = {
        pageNo: 1,
        pageSize: 10,
      };
      state.list = [];
      state.total = 0;
    },
  },

  actions: {
    async doSearch({ dispatch, commit, state, rootState, ...rest }, params) {
      if (params.tag && !rootState.tag.list.length) {
        await dispatch('tag/getTags', null, { root: true });
      }
      commit('UPDATE_QUERY', { pageNo: params.pageNo || 1 });
      const res = await this.$axios.$get('/article', {
        params: { ...state.query, ...params },
      });
      if (res.code === 1) {
        commit('SET_RESULT', res.result);
      }
      return res;
    },
  },
};
