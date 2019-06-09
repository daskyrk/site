export default {
  state() {
    return {
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      list: [],
      total: 0,
    }
  },

  getters: {
    hasMore: state => {
      return state.total > state.query.pageNo * state.query.pageSize
    },
  },

  mutations: {
    UPDATE_QUERY(state, data) {
      state.query = { ...data, ...state.query }
    },

    SET_RESULT(state, data) {
      const { list, total } = data
      state.list = list
      state.total = total
    },

    CLEAR_SEARCH(state) {
      state.query = {
        pageNo: 1,
        pageSize: 10,
      }
      state.list = []
      state.total = 0
    },
  },

  actions: {
    async doSearch({ dispatch, commit, state, rootState, ...rest }, params) {
      let extra = {};
      if (params.tag){
        if (!rootState.tag.list.length) {
          await dispatch('tag/getTags', null, { root: true })
        }
        const matchTag = rootState.tag.list.find(item => item.name === params.tag);
        extra.tag = matchTag.id;
      }
      commit('UPDATE_QUERY', { pageNo: params.pageNo || 1 })
      const res = await this.$axios.$get('/post', {
        params: { ...state.query, ...params, ...extra },
      })
      if (res.success) {
        commit('SET_RESULT', res.data)
      }
      return res
    },
  },
}
