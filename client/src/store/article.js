import * as articleService from '../api/article';

export default {
  state() {
    return {
      list: [],
      total: 0,
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      detail: {},
      fetch: false,
    };
  },

  mutations: {
    GET_ART_LIST(state, data) {
      const { list, total, page } = data;
      state.list = list;
      state.total = total;
      state.pagination.pageNo = page;
      if (list.length) {
        state.detail = list[0];
      }
      state.fetch = false;
    },

    GET_ART_DETAIL(state, data) {
      state.detail = data;
    },

    FETCH_ART_START(state) {
      state.fetch = true;
    },

    FETCH_ART_END(state) {
      state.fetch = false;
    },
  },

  actions: {
    // 获取文章列表
    async getArtList(
      { commit },
      params = {
        pageNo: 1,
      },
    ) {
      commit('FETCH_ART_START');
      const res = await articleService.getArts(params);
      if (res && res.code === 1) {
        commit('GET_ART_LIST', res.result);
      } else commit('FETCH_ART_END');
    },

    // 获取文章详情
    async getArt({ commit }, id) {
      commit('FETCH_ART_START');
      const res = await articleService.getArt(id);
      if (res && res.code === 1) {
        commit('GET_ART_DETAIL', res.result);
      } else commit('FETCH_ART_END');
    },

    // 添加文章
    async addArt({ commit }, data) {
      const res = await articleService.addArt(data);
      return res;
    },

    // 编辑文章
    async updateArt({ commit }, { _id, ...data }) {
      const res = await articleService.updateArt(_id, data);
      return res;
    },

    // 获得标签
    async getTags({ commit }, { _id, ...data }) {
      const res = await articleService.getTags(_id, data);
      return res;
    },
  },
};
