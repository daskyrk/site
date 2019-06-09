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

    addWish(state, data) {
      state.list = [data].concat(state.list);
    },

    updateWish(state, data) {
      state.list = state.list.map(item => item.id === data.id ? data : item);
    },

    deleteWish(state, id) {
      state.list = state.list.filter(item => item.id !== id);
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

    async add({ commit }, data) {
      const res = await this.$axios.$post('/wish', data)
      if (res.success) {
        await commit('addWish', res.data)
      }
      return res
    },

    async delete({ commit }, id) {
      const res = await this.$axios.$delete('/wish', { params: { id } })
      if (res.success) {
        await commit('deleteWish', id)
      }
      return res
    },

    async reply({ commit }, data) {
      const res = await this.$axios.$patch('/wish/reply', data)
      if (res.success) {
        await commit('updateWish', res.data)
      }
      return res
    },
  },
}
