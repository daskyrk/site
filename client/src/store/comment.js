export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 20,
      },
    };
  },

  mutations: {
    SET_COMMENT_LIST(state, { list, total }) {
      state.list = list;
      state.total = total;
    },
  },

  actions: {
    // 获取评论列表
    async getComments({ commit, state }, id) {
      // commit('FETCH_ART_START');
      console.log('res.result:', id);
      const res = await this.$axios.$get(`/comment`, {
        parmas: { articleId: id, ...state.query },
      });
      if (res.code === 1) {
        commit('SET_COMMENT_LIST', res.result);
      }
      //  else commit('FETCH_ART_END');
    },

    // 添加评论
    async addComment({ commit, state }, data) {
      // const { id, comment } = data;
      const res = await this.$axios.$post(`/comment`, data);
    },

    // 点赞评论
    // async likeComment({ commit, dispatch, state }, id) {
    //   const res = await this.$axios.$put(`/likeComment/${id}`);
    //   if (res.code === 1) {
    //     commit('LIKE_PLUS', id);
    //   }
    //   return res;
    // },
  },
};
