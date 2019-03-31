<template>
  <div class="article-list">
    <article-card :list="list" />
    <LoadMore
      :has-more="hasMore"
      :load="loadMore"
      dom-selector=".article-list"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ArticleCard from '~/components/article/article-card'
import LoadMore from '~/components/common/load-more'

export default {
  components: {
    ArticleCard,
    LoadMore,
  },

  computed: {
    ...mapState('article', ['list', 'total', 'query']),
    ...mapGetters('article', ['hasMore']),
  },

  async fetch({ store }) {
    await store.dispatch('article/getArtList', { type: 'READ' })
  },

  beforeDestroy() {
    this.$store.commit('article/RESET_LIST')
  },

  methods: {
    loadMore() {
      return this.$store.dispatch('article/getArtList', {
        pageNo: this.query.pageNo + 1,
        type: 'READ',
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.article-list {
  min-width: 40rem;
  width: 56%;
  margin-top: 1rem;
}
</style>
