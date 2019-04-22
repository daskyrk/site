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
import PostCard from '~/components/post/post-card'
import LoadMore from '~/components/common/load-more'
import 'meplayer'
import 'meplayer/dist/meplayer.min.css'

export default {
  components: {
    PostCard,
    LoadMore,
  },

  layout: 'default-gray',

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
      1356486334,
      28387594,
      131726,
      29713754,
    ])
  },

  beforeDestroy() {
    this.$store.commit('post/RESET_LIST')
  },

  mounted() {
    const song = this.songs[3]
    mePlayer({
      // theme: '可选，不指定时为默认主题，值为"mini"时为迷你版主题',
      music: {
        src: song.url,
        title: song.name,
        author: song.artists.join(' '),
        cover: song.album.picture,
        lrc: song.lyric.base,
      },
      target: '.music',
      autoplay: false, // 是否自动播放
    })
  },

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
