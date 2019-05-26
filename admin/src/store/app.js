import { set, toggle } from '~/utils/vuex'

export default {
  state() {
    return {
      drawer: null,
      color: 'success',
      image: '/img/sidebar-bg2.jpg',
    }
  },

  mutations: {
    setDrawer: set('drawer'),
    setImage: set('image'),
    setColor: set('color'),
    toggleDrawer: toggle('drawer'),
  },

  actions: {
    // 添加图片上传记录
    // async addImage({ commit, state }, data) {
    //   const res = await this.$axios.$post(`/image`, data)
    //   return res
    // },
  },
}
