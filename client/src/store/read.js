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
      count: 36,
    }
  },

  mutations: {
    GET_BOOKS(state, data) {
      const { list, total } = data
      state.list = list
      state.total = total
    },

    UPDATE_PAGE(state, data) {
      state.query = data
    },

    SET_BOOK_QUERY(state, data) {
      state.searchList = data
    },

    SET_BOOK_SUMMARY(state, data) {
      state.summary = data
    },
  },

  actions: {
    async getBooks({ commit, state }, data) {
      const query = { ...state.query, ...data }
      const res = await this.$axios.$get('/post/book', { params: query })
      commit('UPDATE_PAGE', query)
      if (res.success) {
        commit('GET_BOOKS', res.data)
      }
      return res
    },

    async search({ commit, state }, data) {
      const res = await this.$axios.$get('/post/book/search', {
        params: data,
      })
      commit('SET_BOOK_QUERY', res.books)
      return res
    },

    async addBook({ dispatch }, data) {
      const res = await this.$axios.$post('/book', data)
      if (res.success) {
        await dispatch('getBooks')
      }
      return res
    },

    async updateBook({ dispatch }, { id, ...data }) {
      const res = await this.$axios.$put(`/book/${id}`, data)
      if (res.success) {
        await dispatch('getBooks')
      }
      return res
    },

    async delBook({ dispatch }, id) {
      const res = await this.$axios.$delete(`/book/${id}`)
      if (res.success) {
        let pageNo = state.query.pageNo
        if (state.list.length === 1) {
          pageNo--
        }
        await dispatch('getBooks', { pageNo })
      }
      return res
    },

    // 统计
    async summary({ commit }, id) {
      const res = await this.$axios.$get(`/book/summary`)
      if (res.success) {
        commit('SET_BOOK_SUMMARY', res.data)
      }
      return res
    },
  },
}
