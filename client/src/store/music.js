import { setList } from '@/utils/vuex'

export default {
  state() {
    return {
      playlist: [],
      songIds: [],
      song: {},
    }
  },

  mutations: {
    ...setList(['playlist', 'songIds', 'song']),
  },

  actions: {
    async getPlaylist({ commit }, id) {
      const data = await this.$axios.$get('/music/playlist', {
        params: { id },
        tip: '歌曲列表',
      });
      if (data.success) {
        commit('setPlaylist', data.data);
        // commit('setSongIds', data.playlist.trackIds.map(o => o.id));
      }
      return data.data;
    },

    async getSong({ commit }, id) {
      const data = await this.$axios.$get('/music/song', {
        params: { id },
        tip: '歌曲',
      })
      if (data.success) {
        commit('setSong', data.data);
      }
      return data.data;
    },

    // async search({ commit, state }, data) {
    //   const { kw, limit = 20, offset = 0 } = this.props
    //   const res = await this.$axios.$get(
    //     `/api/proxy/lylares/netmusic/?query=s&kw=${kw}&t=1&limit=${limit}&offset=${offset}`,
    //     {
    //       params: data,
    //     },
    //   )
    //   commit('getSong', res.books)
    //   return res
    // },
  },
}
