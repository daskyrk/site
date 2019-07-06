import cookieparser from 'cookieparser'

export default {
  state() {
    return {
      fetch: {},
      breadcrumb: [],
      uploadToken: null,
      ip: null,
      bgImage: '',
    }
  },
  actions: {
    async nuxtServerInit({ dispatch, commit }, { req }) {
      try {
        if (req.headers.cookie) {
          const { token } = cookieparser.parse(req.headers.cookie)
          if (token) {
            await dispatch('user/getMyInfo')
            commit('user/SET_TOKEN', token)
          }
        }
      } catch (error) {
        console.log('error in init:', error);
      }
    },

    // 在页面加载时执行，因为nuxt的入口分散在各个layout中，所以这里算是个统一入口
    async nuxtClientInit({ dispatch, commit }, { req }) {
      try {
        dispatch('getIP');

        this.$wsOn('msg', m => {
          console.log('[socket] msg:', m)
          this.$wsSend('notify', 'wtf')
        })
        this.$wsOn('ip_recevied', m => {
          // this.$msg('ip:', m)
          console.log('bk get ip:', m);
        })
      } catch (error) {
        console.log('error in init:', error)
      }
    },

    async getIP({ commit }) {
      let ip = await this.$axios.$get('http://icanhazip.com')
      ip = ip.replace(/[\r\n]/g, "");
      commit('SET_IP', ip)
      this.$wsSend('msg', { type: 'get_IP', ip })
      return ip;
    },

    async getUploadToken({ commit }) {
      const res = await this.$axios.$get('/uploadToken')
      if (res && res.success) {
        commit('SET_UPLOAD_TOKEN', res.data)
      }
    },
  },
  mutations: {
    SET_BREADCRUMB(state, data) {
      state.breadcrumb = data
    },

    SET_UPLOAD_TOKEN(state, data) {
      state.uploadToken = data
    },

    SET_IP(state, data) {
      state.ip = data
    },

    START_FETCH(state, url) {
      state.fetch[url] = true
    },

    END_FETCH(state, url) {
      state.fetch[url] = false
    },

    SET_BG_IMAGE(state, data) {
      state.bgImage = data
    },
  },
}
