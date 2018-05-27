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

    FETCH_ART(state) {
      state.fetch = true
    },

    SET_ART_SUCCESS(state, data) {
      const {
        list,
        total
      } = data.result;
      state.fetch = false
      state.list = list;
      state.total = total;
    },

    SET_ART_FAIL(state) {
      state.fetch = false
    }

  },

  actions: {
    // 获取文章
    async getArtList({
      commit,
      state
    }, data = {
      current_page: 1
    }) {
      commit('FETCH_ART')
      const res = await articleService.getArticles(data)
        .catch(err => console.error(err))
      // TODO: 统一处理包裹的code、msg层
      if (res && res.code === 1) {
        commit('SET_ART_SUCCESS', res)
      } else commit('SET_ART_FAIL')
    },

  }
}
