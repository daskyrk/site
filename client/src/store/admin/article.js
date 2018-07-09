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
    };
  },

  mutations: {
    GET_ART_LIST(state, { list, total }) {
      state.list = list;
      state.total = total;
    },

    SET_ART_DETAIL(state, data) {
      state.detail = data;
    },

    UPDATE_QUERY(state, data) {
      state.query = data;
    },

    RESET_LIST(state) {
      state.list = [];
      state.total = 0;
      state.query = {
        pageNo: 1,
        pageSize: 6,
      };
    },
  },

  actions: {
    // 获取文章列表
    async getArtList({ commit, state }, data) {
      const query = { ...state.query, ...data };
      const res = await this.$axios.$get('/admin/article', { params: query });
      commit('UPDATE_QUERY', query);
      if (res.code === 1) {
        commit('GET_ART_LIST', res.result);
      };
    },

    // 获取文章详情
    async getArt({ commit, ...rest }, id) {
      const res = await this.$axios.$get(`/article/${id}`);
      if (res && res.code === 1) {
        commit('SET_ART_DETAIL', res.result);
      };
    },

    // 添加文章
    async addArt({ commit, dispatch }, data) {
      const res = await this.$axios.$post(`/admin/article`, data);
      if (res.code === 1) {
        await dispatch('getArtList');
      }
      return res;
    },

    // 编辑文章
    async updateArt({ commit, dispatch }, { _id, ...data }) {
      const res = await this.$axios.$put(`/admin/article/${_id}`, data);
      // if (res.code === 1) {
      //   await dispatch('getArtList');
      // }
      return res;
    },

    // 删除文章
    async delArt({ commit, dispatch, state }, id) {
      const res = await this.$axios.$delete(`/admin/article/${id}`);
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
