import * as tagService from '../api/tag';

export default {
  state() {
    return {
      tags: [],
    };
  },

  mutations: {
    GET_TAGS(state, data) {
      state.tags = data;
    },
  },

  actions: {
    async getTags({ commit, state }, data) {
      const res = await tagService.getTags(data);
      if (res.code === 1) {
        commit('GET_TAGS', res.data);
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
