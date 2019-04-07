export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 1000,
      },
      nameMap: {},
      summary: {},
    }
  },

  getters: {
    nameMap: state => {
      const nameMap = {}
      state.list.forEach(tag => {
        nameMap[tag.id] = tag.name
      })
      return nameMap
    },
  },

  mutations: {
    GET_TAGS(state, data) {
      const { list, total } = data
      state.list = list
      state.total = total
    },

    UPDATE_PAGE(state, data) {
      state.query = data
    },

    SET_TAG_SUMMARY(state, data) {
      state.summary = data
    },
  },

  actions: {
    async getTags({ commit, state }, data) {
      const query = { ...state.query, ...data }
      const res = await this.$axios.$get('/tag', { params: query })
      commit('UPDATE_PAGE', query)
      if (res.success) {
        commit('GET_TAGS', res.data)
      }
      return res
    },

    async addTag({ dispatch }, data) {
      const res = await this.$axios.$post('/admin/tag', data)
      if (res.success) {
        await dispatch('getTags')
      }
      return res
    },

    async updateTag({ dispatch }, { id, ...data }) {
      const res = await this.$axios.$put(`/admin/tag/${id}`, data)
      if (res.success) {
        await dispatch('getTags')
      }
      return res
    },

    async delTag({ dispatch, state }, id) {
      const res = await this.$axios.$delete(`/admin/tag/${id}`)
      if (res.success) {
        let pageNo = state.query.pageNo
        if (state.list.length === 1) {
          pageNo--
        }
        await dispatch('getTags', { pageNo })
      }
      return res
    },

    // 统计
    async summary({ commit }, id) {
      const res = await this.$axios.$get(`/admin/tag/summary`)
      if (res.success) {
        commit('SET_TAG_SUMMARY', res.data)
      }
      return res
    },
  },
}
