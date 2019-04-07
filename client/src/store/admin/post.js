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
      summary: [],
    }
  },

  mutations: {
    GET_POST_LIST(state, { list, total }) {
      state.list = list
      state.total = total
    },

    SET_POST_DETAIL(state, data) {
      state.detail = data
    },

    SET_POST(state, data) {
      state.list = state.list.map(art => (art._id === data._id ? data : art))
    },

    UPDATE_QUERY(state, data) {
      state.query = data
    },

    RESET_LIST(state) {
      state.list = []
      state.total = 0
      state.query = {
        pageNo: 1,
        pageSize: 6,
      }
    },

    SET_POST_SUMMARY(state, data) {
      state.summary = data
    },
  },

  actions: {
    // 获取文章列表
    async getPostList({ commit, state }, data) {
      const query = { ...state.query, ...data }
      const res = await this.$axios.$get('/admin/post', { params: query })
      commit('UPDATE_QUERY', query)
      if (res.success) {
        commit('GET_POST_LIST', res.data)
      }
    },

    // 获取文章详情
    async getPost({ commit, ...rest }, id) {
      const res = await this.$axios.$get(`/post/${id}`)
      if (res && res.success) {
        commit('SET_POST_DETAIL', res.data)
      }
    },

    // 添加文章
    async addPost({ commit, dispatch }, data) {
      const res = await this.$axios.$post(`/admin/post`, data)
      if (res.success) {
        await dispatch('getPostList')
      }
      return res
    },

    // 编辑文章
    async updatePost({ commit, dispatch }, { _id, ...data }) {
      const res = await this.$axios.$put(`/admin/post/${_id}`, data)
      if (res.success) {
        // await dispatch('getPostList');
        commit('SET_POST', { _id, ...data })
      }
      return res
    },

    // 删除文章
    async delPost({ commit, dispatch, state }, id) {
      const res = await this.$axios.$delete(`/admin/post/${id}`)
      if (res.success) {
        let pageNo = state.query.pageNo
        if (state.list.length === 1) {
          pageNo--
        }
        await dispatch('getPostList', { pageNo })
      }
      return res
    },

    // 文章统计
    async summary({ commit }, id) {
      const res = await this.$axios.$get(`/admin/post/summary`)
      if (res.success) {
        commit('SET_POST_SUMMARY', res.data)
      }
      return res
    },
  },
}
