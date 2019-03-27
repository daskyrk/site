export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 6,
      },
      detail: {},
    }
  },

  getters: {
    hasMore: state => {
      return state.total > state.query.pageNo * state.query.pageSize
    },
  },

  mutations: {
    GET_ART_LIST(state, { list, total }) {
      state.list = state.list.concat(list)
      state.total = total
    },

    SET_ART_DETAIL(state, data) {
      state.detail = data
    },

    UPDATE_QUERY(state, data) {
      state.query = data
    },

    LIKE_PLUS(state, data) {
      const detail = { ...state.detail }
      detail.meta.likes += 1
      state.detail = detail
    },

    RESET_LIST(state) {
      state.list = []
      state.total = 0
      state.query = {
        pageNo: 1,
        pageSize: 6,
      }
    },
  },

  actions: {
    // 获取文章列表
    async getArtList({ commit, state }, data) {
      const query = { ...state.query, ...data }
      const res = await this.$axios.$get('/article', { params: query })
      commit('UPDATE_QUERY', query)
      if (res.success) {
        commit('GET_ART_LIST', res.result)
      }
    },

    // 获取文章详情
    async getArt({ commit }, id) {
      const res = await this.$axios.$get(`/article/${id}`)
      if (res && res.success) {
        commit('SET_ART_DETAIL', res.result)
      }
    },

    // 喜欢文章
    async likeArt({ commit, dispatch, state }, id) {
      const res = await this.$axios.$put(`/likeArt/${id}`)
      if (res.success) {
        commit('LIKE_PLUS', id)
      }
      return res
    },
  },
}
