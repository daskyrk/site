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
  },

  async fetch({ store, params }) {
    await store.dispatch('post/getPost', params.id)
    await store.dispatch('tag/getTags', { pageSize: 100 })
  },
}
</script>
