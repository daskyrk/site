import { setList } from '@/utils/vuex'

export default {
  state() {
    return {
      playlist: [],
      songIds: [],
      songs: [],
    }
  },

  mutations: {
    ...setList(['playlist', 'songIds', 'songs']),
  },

  actions: {
    async getPlaylist({ commit }, id) {
      const data = await this.$axios.$get(`/proxy/hitokoto/nm/playlist/${id}`)
      commit('setPlaylist', data.playlist);
      commit('setSongIds', data.playlist.trackIds.map(o => o.id));
      return data;
    },

    async getSongs({ commit }, ids) {
      const data = await this.$axios.$get("/proxy/hitokoto/nm/summary/" + ids.join(",") + "?lyric=true&common=true")
      if (data.code === 200) {
        commit('setSongs', data.songs);
      }
      return data.songs;
    },

    // async search({ commit, state }, data) {
    //   const { kw, limit = 20, offset = 0 } = this.props
    //   const res = await this.$axios.$get(
    //     `/api/proxy/lylares/netmusic/?query=s&kw=${kw}&t=1&limit=${limit}&offset=${offset}`,
    //     {
    //       params: data,
    //     },
    //   )
    //   commit('getSongs', res.books)
    //   return res
    // },
  },
}
