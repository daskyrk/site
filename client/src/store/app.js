
  export default {
    state() {
      return {
        drawer: null,
        color: 'success',
        image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
      }
    },

    mutations: {
      SET_IMAGE(state, data) {
        state.image = data
      },
    },

    actions: {
      // 添加图片上传记录
      async addImage({ commit, state }, data) {
        const res = await this.$axios.$post(`/image`, data)
        return res
      },
    },
  }
