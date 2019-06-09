<template>
  <Post :detail="detail" />
</template>


<script>
import Post from '~/components/post/post-page'
import { mapState } from 'vuex'
import { randomPick } from '@/utils'

export default {
  components: {
    Post,
  },

  computed: {
    ...mapState('post', ['detail']),
    ...mapState('music', ['defaultListId']),
  },

  async fetch({ store, params }) {
    await store.dispatch('post/getPost', params)
    await store.dispatch('tag/getTags', { pageSize: 100 })
  },

  mounted() {
    this.$store.dispatch('music/getPlaylist', this.defaultListId).then(list => {
      const theOne = randomPick(list)
      const { artist, title } = theOne
      this.$msg.notify({
        iconImg: this.$getConfig('githubAvatar'),
        autoClose: true,
        title: '听歌吗亲?',
        content: `来一首 ${artist} 的 ${title} 吧~`,
        okText: '好啊~',
        closeText: '算了',
        position: 'top-right',
        onOk: () => {
          this.$store.dispatch('music/getSong', theOne.id)
          this.$store.commit('music/setAutoplay', true)
        },
      })
    })
  },
}
</script>
