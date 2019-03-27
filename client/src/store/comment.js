export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 50,
      },
    }
  },

  mutations: {
    SET_COMMENT_LIST(state, { list, total }) {
      state.list = list
      state.total = total
    },

    LIKE_PLUS(state, id) {
      const target = state.list.find(cm => cm._id === id)
      console.log('target:', target)
      target.likes++
      state.list = state.list.map(cm => (cm._id === id ? target : cm))
    },
  },

  actions: {
    // 获取评论列表
    async getComments({ commit, state }, params) {
      const res = await this.$axios.$get(`/comment`, {
        params: { ...state.query, ...params },
      })
      if (res.success) {
        commit('SET_COMMENT_LIST', res.result)
      }
    },

    // 添加评论
    async addComment({ state }, data) {
      const res = await this.$axios.$post(`/comment`, data)
      return res
    },

    // 点赞评论
    async likeComment({ commit }, id) {
      const res = await this.$axios.$put(`/likeComment/${id}`)
      if (res.success) {
        commit('LIKE_PLUS', id)
      }
      return res
    },
  },
}
