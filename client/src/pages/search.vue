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
    <div v-if="list.length">
      <article-card :list="list" />
      <LoadMore :hasMore="hasMore" :load='loadMore' domSelector=".search-result"></LoadMore>
    </div>
    <empty-holder v-else large>
      这里神马都没有
      <span class="btn" @click="goback">返回</span>
    </empty-holder>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ArticleCard from '~/components/article/article-card';
import LoadMore from '~/components/common/load-more';

export default {
  components: {
    ArticleCard,
    LoadMore,
  },

  async fetch({ store, query }) {
    const { tag, keyword } = query;
    await store.dispatch('search/doSearch', { tag, keyword });
  },

  watchQuery: ['tag', 'keyword'],

  computed: {
    ...mapState('search', ['list', 'query']),
    ...mapGetters('search', ['hasMore']),
    ...mapGetters('tag', ['nameMap']),
    tag() {
      return this.$route.query.tag;
    },
    keyword() {
      return this.$route.query.keyword;
    },
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
    goback() {
      return this.$router.back();
    },
  },
};
</script>

<style lang='scss' scoped>
.search-result {
  width: 60%;
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

.btn {
  text-decoration: underline;
  color: $color-primary;
  cursor: pointer;
}
</style>
