<template>
  <div class="search-result">
    <div class="search-by">
      Searched By:
      <span v-if="tag" class="search-tag">
        <i class="iconfont icon-biaoqian"></i>
        {{nameMap[tag]}}
      </span>
      <span v-if="keyword" class="search-keyword">
        <i class="iconfont icon-search"></i>
        {{keyword}}
      </span>
    </div>
    <article-card :list="list" />
    <LoadMore :hasMore="hasMore" :load='loadMore' domSelector=".search-result"></LoadMore>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ArticleCard from '~/components/common/article-card';
import LoadMore from '~/components/common/load-more';

export default {
  components: {
    ArticleCard,
    LoadMore,
  },

  async fetch({ store, query }) {
    await store.dispatch('search/doSearch', query);
  },

  data() {
    const { tag, keyword } = this.$route.query;
    return { tag, keyword };
  },

  computed: {
    ...mapState('search', ['list', 'query']),
    ...mapGetters('search', ['hasMore']),
    ...mapGetters('tag', ['nameMap']),
  },

  beforeDestroy() {
    this.$store.commit('search/CLEAR_SEARCH');
  },

  methods: {
    loadMore() {
      return this.$store.dispatch('search/doSearch', {
        ...this.$route.query,
        pageNo: this.query.pageNo + 1,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.tag-list {
  margin-top: 1rem;
}

.search-by {
  margin-bottom: 2rem;
  font-size: 1.4rem;
  > span {
    margin-left: 1rem;
  }

  i {
    font-size: 1.4rem;
  }
}
</style>
