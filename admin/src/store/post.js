export default {
  state() {
    return {
      list: [],
      total: 0,
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      types: [],
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

    SET_POST_TYPES(state, data) {
      state.types = data
    },

    SET_POST(state, data) {
      state.list = state.list.map(art => (art.id === data.id ? data : art))
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
      const res = await this.$axios.$get('/post', { params: query })
      commit('UPDATE_QUERY', query)
      if (res.success) {
        commit('GET_POST_LIST', res.data)
      }
    },

    // 获取文章类型
    async getPostTypes({ commit, ...rest }, id) {
      const res = await this.$axios.$get('/post/types')
      if (res.success) {
        commit('SET_POST_TYPES', res.data)
      }
    },

    // 添加文章
    async addPost({ commit, dispatch }, data) {
      const res = await this.$axios.$post('/post', data, { tip: '添加文章' })
      if (res.success) {
        await dispatch('getPostList')
      }
      return res
    },

    // 获取文章详情
    async getPost({ commit, ...rest }, params) {
      const res = await this.$axios.$get('/post', { params })
      if (res && res.success) {
        commit('SET_POST_DETAIL', res.data)
      }
    },

    // 编辑文章
    async updatePost({ commit, dispatch }, data) {
      // 获取文章时会自动把tags替换为对象，保存时要再取出id来
      let tags = []
      if (typeof data.tags[0] !== 'string') {
        tags = data.tags.map(t => t.id)
      }
      const res = await this.$axios.$put('/post', { ...data, tags }, { tip: '更新文章' })
      if (res.success) {
        commit('SET_POST', data)
      }
      return res
    },

    // 删除文章
    async delPost({ commit, dispatch, state }, id) {
      const res = await this.$axios.$delete('/post', { params: { id } }, { tip: '删除文章' })
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
      const res = await this.$axios.$get(`/post/summary`)
      if (res.success) {
        commit('SET_POST_SUMMARY', res.data)
      }
      return res
    },
  },
}
