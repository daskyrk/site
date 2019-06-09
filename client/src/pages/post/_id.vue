<template>
  <Post :detail="detail" />
</template>


<script>
import Post from '~/components/post/post-page'
import { mapState } from 'vuex'

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
    const randomPick = arr => arr[Math.floor(Math.random() * arr.length)]
    this.$store.dispatch('music/getPlaylist', this.defaultListId).then(list => {
      const theOne = randomPick(list)
      const { artist, title } = theOne
      this.$msg.info(`来一首${artist}的${title}吧~`)
      this.$store.dispatch('music/getSong', theOne.id)
    })
  },
}
</script>
