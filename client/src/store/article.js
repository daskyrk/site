import * as articleService from '../api/article';

export default {
  state() {
    return {
      list: [],
      total: 0,
      detail: {},
      fetch: false,
    }
  },

  mutations: {

    GET_ART_LIST(state, data) {
      const {
        list,
        total
      } = data;
      state.list = list;
      state.total = total;
      if (list.length) {
        state.detail = list[0]
      }
      state.fetch = false;
    },

    GET_ART_DETAIL(state, data) {
      state.detail = data;
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
      const res = await articleService.getArts(data)
        .catch(err => console.error(err))
        console.log('res:', res);
      // TODO: 统一处理包裹的code、msg层
      if (res && res.code === 1) {
        commit('GET_ART_LIST', res.result)
      } else commit('FETCH_ART_END')
    },

    // 获取文章详情
    async getArt({
      commit,
      state
    }, id) {
      commit('FETCH_ART_START')
      const res = await articleService.getArt(id)
        .catch(err => console.error(err))
      if (res && res.code === 1) {
        commit('GET_ART_DETAIL', res.result)
      } else commit('FETCH_ART_END')
    },

  }
}
