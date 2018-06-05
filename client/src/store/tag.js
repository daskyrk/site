import * as tagService from '../api/tag';

export default {
  state() {
    return {
      tags: [],
      total: 0,
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },

  mutations: {
    GET_TAGS(state, data) {
      const { list, total } = data;
      state.tags = list;
      state.total = total;
    },

    UPDATE_PAGE(state, data) {
      state.pagination.pageNo = data;
    },
  },

  actions: {
    async getTags({ commit, state }, data) {
      const res = await tagService.getTags(data);
      if (res.code === 1) {
        commit('GET_TAGS', res.result);
      }
      return res;
    },

    async addTag({ commit, state }, data) {
      const res = await tagService.addTag(data);
      return res;
    },

    async updateTag({ commit, state }, { _id, ...data }) {
      const res = await tagService.updateTag(_id, data);
      return res;
    },

    async delTag({ commit, state }, data) {
      const res = await tagService.delTag(id);
      return res;
    },
  },
};
