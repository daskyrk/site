export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 20,
      },
    }
  },

  mutations: {
    SET_IMAGE_LIST(state, { list, total }) {
      state.list = list
      state.total = total
    },
  },

  actions: {
    // 获取图片上传记录
    async getImages({ commit, state }, params) {
      const res = await this.$axios.$get(`/image`, {
        params: { ...state.query, ...params },
      })
      if (res.success) {
        commit('SET_IMAGE_LIST', res.data)
      }
    },

    // 添加图片上传记录
    async addImage({ commit, state }, data) {
      const res = await this.$axios.$post(`/admin/image`, data)
      return res
    },
  },
}
