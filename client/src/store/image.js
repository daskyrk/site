export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 20,
      },
      randomImage: '',
    }
  },

  mutations: {
    SET_IMAGE_LIST(state, { list, total }) {
      state.list = list
      state.total = total
    },

    SET_RANDOM_IMAGE(state, url) {
      state.randomImage = url
    },
  },

  actions: {
    // 获取随机图片
    // async getRandomImage({ commit }, type) {
    //   const resString = await this.$axios.$get(`/proxy/randomImage`, {
    //     params: { type },
    //   })
    //   const res = JSON.parse(resString.trim());
    //   if (res.code === "200") {
    //     commit('SET_RANDOM_IMAGE', res.imgurl.replace(/\/\/\w+\.sinaimg/, '//ws3.sinaimg'))
    //   }
    // },

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
      const res = await this.$axios.$post(`/image`, data, { tip: '上传图片' })
      return res
    },
  },
}
