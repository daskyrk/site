<template>
  <div class="post-list">
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

export default {
  components: {
    PostCard,
    LoadMore,
  },

  layout: 'default-gray',

  computed: {
    ...mapState('post', ['list', 'total', 'query']),
    ...mapGetters('post', ['hasMore']),
  },

  async fetch({ store }) {
    await store.dispatch('post/getPostList')
  },

  beforeDestroy() {
    this.$store.commit('post/RESET_LIST')
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
