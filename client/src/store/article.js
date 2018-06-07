import * as articleService from '../api/article';

export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      detail: {},
      fetch: false,
    };
  },

  mutations: {
    GET_ART_LIST(state, { list, total }) {
      state.list = list;
      state.total = total;
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

    UPDATE_QUERY(state, data) {
      state.query = data;
    },
  },

  actions: {
    // 获取文章列表
    async getArtList({ commit, state }, data) {
      commit('FETCH_ART_START');
      const query = { ...state.query, ...data };
      const res = await articleService.getArts(query);
      commit('UPDATE_QUERY', query);
      if (res.code === 1) {
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
    async addArt({ commit, dispatch }, data) {
      const res = await articleService.addArt(data);
      if (res.code === 1) {
        await dispatch('getArtList');
      }
      return res;
    },

    // 编辑文章
    async updateArt({ commit, dispatch }, { _id, ...data }) {
      const res = await articleService.updateArt(_id, data);
      if (res.code === 1) {
        await dispatch('getArtList');
      }
      return res;
    },

    // 删除文章
    async delArt({ commit, dispatch }, _id) {
      const res = await articleService.delArt(_id);
      if (res.code === 1) {
        let pageNo = state.query.pageNo;
        if (state.list.length === 1) {
          pageNo--;
        }
        await dispatch('getArtList', { pageNo });
      }
      return res;
    },
  },
};
