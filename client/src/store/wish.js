export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 1000,
      },
    }
  },

  mutations: {
    GET_WISHES(state, data) {
      const { list, total } = data
      state.list = list
      state.total = total
    },

    UPDATE_PAGE(state, data) {
      state.query = data
    },
  },

  actions: {
    async getWishes({ commit, state }, data) {
      const query = { ...state.query, ...data }
      const res = await this.$axios.$get('/wish', { params: query })
      commit('UPDATE_PAGE', query)
      if (res.success) {
        commit('GET_WISHES', res.data)
      }
      return res
    },

    async addWish({ dispatch }, data) {
      const res = await this.$axios.$post('/wish', data)
      if (res.success) {
        await dispatch('getWishes')
      }
      return res
    },

    async delWish({ dispatch, state }, _id) {
      const res = await this.$axios.$delete(`/admin/wish/${_id}`)
      if (res.success) {
        let pageNo = state.query.pageNo
        if (state.list.length === 1) {
          pageNo--
        }
        await dispatch('getWishes', { pageNo })
      }
      return res
    },
  },
}
