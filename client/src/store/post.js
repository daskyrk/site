export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 6,
      },
      types: [],
      detail: {},
    }
  },

  getters: {
    hasMore: state => {
      return state.total > state.query.pageNo * state.query.pageSize
    },
  },

  mutations: {
    GET_POST_LIST(state, { list, total }) {
      state.list = state.list.concat(list)
      state.total = total
    },

    SET_POST_DETAIL(state, data) {
      state.detail = data
    },

    UPDATE_QUERY(state, data) {
      state.query = data
    },

    SET_POST_TYPES(state, data) {
      state.types = data
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
    async getPostList({ commit, state }, data) {
      const query = { ...state.query, ...data }
      const res = await this.$axios.$get('/post', { params: query })
      commit('UPDATE_QUERY', query)
      if (res.success) {
        commit('GET_POST_LIST', res.data)
      }
    },

    // 获取文章详情
    async getPost({ commit, ...rest }, params) {
      const res = await this.$axios.$get('/post', { params })
      if (res && res.success) {
        commit('SET_POST_DETAIL', res.data)
      }
    },

    // 获取文章类型
    async getPostTypes({ commit, ...rest }, id) {
      const res = await this.$axios.$get('/post/types')
      if (res.success) {
        commit('SET_POST_TYPES', res.data)
      }
    },

    // 喜欢文章
    async likePost({ commit, dispatch, state }, id) {
      const res = await this.$axios.$put('/post/like', { id })
      if (res.success) {
        commit('LIKE_PLUS', id)
      }
      return res
    },
  },
}
