<template>
  <div class="article-list">
    <article-card :list="list" />
    <LoadMore :hasMore="hasMore" :load='loadMore' domSelector=".article-list"></LoadMore>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleCard from '~/components/common/article-card';
import LoadMore from '~/components/common/load-more';

export default {
  components: {
    ArticleCard,
    LoadMore,
  },

  async fetch({ store }) {
    await store.dispatch('article/getArtList');
  },

  computed: {
    ...mapState('article', ['list', 'total', 'query']),
    hasMore() {
      return this.total > this.query.pageNo * this.query.pageSize;
    },
  },

  beforeDestroy() {
    this.$store.commit('article/RESET_LIST');
  },

  methods: {
    loadMore() {
      return this.$store.dispatch('article/getArtList', {
        pageNo: this.query.pageNo + 1,
        type: 1,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.article-list {
  min-width: 38rem;
  width: 60%;
}
</style>
