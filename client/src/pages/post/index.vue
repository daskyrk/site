<template>
  <div class="post-list">
    <div class="music" />
    <post-card :list="list" />
    <LoadMore
      :has-more="hasMore"
      :load="loadMore"
      dom-selector=".post-list"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MusicPlayer from '~/components/common/music-player'

import PostCard from '~/components/post/post-card'
import LoadMore from '~/components/common/load-more'

export default {
  components: {
    PostCard,
    LoadMore,
    // MusicPlayer,
  },

  layout: 'default-gray',

  // data() {
  //   const song = this.$store.state.music.songs[3]
  //   return {
  //     musicConf: {
  //       // theme: '可选，不指定时为默认主题，值为"mini"时为迷你版主题',
  //       music: {
  //         src: song.url,
  //         title: song.name,
  //         author: song.artists.join(' '),
  //         cover: song.album.picture,
  //         lrc: song.lyric.base,
  //       },
  //       // target: '.player-container',
  //       autoplay: false, // 是否自动播放
  //     },
  //   }
  // },

  computed: {
    ...mapState('post', ['list', 'total', 'query']),
    ...mapGetters('post', ['hasMore']),
    ...mapState({
      songs: state => state.music.songs,
    }),
  },

  async fetch({ store }) {
    await store.dispatch('post/getPostList')
    await store.dispatch('music/getSongs', [
      483671599,
      // 28387594,
      // 131726,
      // 29713754,
    ])
  },

  beforeDestroy() {
    this.$store.commit('post/RESET_LIST')
  },

  // mounted() {
  //   const song = this.songs[3]
  //   mePlayer({
  //     // theme: '可选，不指定时为默认主题，值为"mini"时为迷你版主题',
  //     music: {
  //       src: song.url,
  //       title: song.name,
  //       author: song.artists.join(' '),
  //       cover: song.album.picture,
  //       lrc: song.lyric.base,
  //     },
  //     target: '.music',
  //     autoplay: false, // 是否自动播放
  //   })
  // },

  methods: {
    loadMore() {
      return this.$store.dispatch('post/getPostList', {
        pageNo: this.query.pageNo + 1,
      })
    },
  },
}
</script>

<style lang='scss'>
.post-list {
  width: 70%;
  max-width: $content-width;
  margin-top: 1rem;
  overflow: hidden;
}

.music {
  margin-top: 20px;
  padding: 20px;
}

@include md-width() {
  .post-list {
    width: 80%;
  }
}

@include sm-width() {
  .post-list {
    width: 90%;
  }
}
</style>
