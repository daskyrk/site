export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 10,
      },
    }
  },

  mutations: {
    SET_COMMENT_LIST(state, { list, total }) {
      state.list = list
      state.total = total
    },

    SET_COMMENT_STATE(state, { id, state: newState }) {
      state.list = state.list.map(
        item => (item._id === id ? { ...item, state: newState } : item),
      )
      // const target
    },
  },

  actions: {
    // 获取评论列表
    async getComments({ commit, state }, params) {
      const res = await this.$axios.$get(`/admin/comment`, {
        params: { ...state.query, ...params },
      })
      if (res.success) {
        commit('SET_COMMENT_LIST', res.data)
      }
    },

    // 添加评论
    async delComment({ state }, data) {
      const res = await this.$axios.$delete(`/admin/comment`, data)
      return res
    },

    // 更新评论
    async updateComment({ commit }, data) {
      const res = await this.$axios.$put(`/admin/comment`, data)
      commit('SET_COMMENT_STATE', data)
      return res
    },
  },
}
