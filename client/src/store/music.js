import { setList } from '@/utils/vuex'
import { appConfig } from '@@/config'
import { randomPick } from '@/utils'

export default {
  state() {
    return {
      defaultListId: appConfig.playListId,
      playlist: [],
      songIds: [],
      song: {},
      autoplay: false,
    }
  },

  mutations: {
    ...setList(['playlist', 'songIds', 'song', 'autoplay']),
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

    async nextSong({ state, dispatch }, random = false) {
      let nextSong = {};
      if (state.playlist.length) {
        if (random) {
          nextSong = randomPick(state.playlist);
        } else {
          const curIndex = state.playlist.findIndex(item => String(item.id) === String(state.song.id));
          nextSong = state.playlist[curIndex + 1];
        }
        dispatch('getSong', nextSong.id);
      }
      return nextSong;
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
