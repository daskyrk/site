import * as articleService from '../api/article';

export default {
  state() {
    return {
      list: [],
      total: 0,
      fetch: false,
    }
  },

  mutations: {

    SET_ART_SUCCESS(state, data) {
      const {
        list,
        total
      } = data;
      state.list = list;
      state.total = total;
      state.fetch = false;
    },

    FETCH_ART_START(state) {
      state.fetch = true
    },

    FETCH_ART_END(state) {
      state.fetch = false
    },

  },

  actions: {
    // 获取文章
    async getArtList({
      commit,
      state
    }, data = {
      current_page: 1
    }) {
      commit('FETCH_ART_START')
      const res = await articleService.getArticles(data)
        .catch(err => console.error(err))
        console.log('res:', res);
      // TODO: 统一处理包裹的code、msg层
      if (res && res.code === 1) {
        commit('SET_ART_SUCCESS', res.result)
      } else commit('FETCH_ART_END')
    },

  }
}
