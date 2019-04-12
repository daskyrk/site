<template>
  <div class="search-result">
    <div class="search-by">
      Searched By:
      <span
        v-if="tag"
        class="search-tag"
      >
        <i class="iconfont icon-biaoqian" />
        {{ nameMap[tag] }}
      </span>
      <span
        v-if="q"
        class="search-keyword"
      >
        <i class="iconfont icon-search" />
        {{ q }}
      </span>
    </div>
    <div v-if="list.length">
      <post-card :list="list" />
      <LoadMore
        :has-more="hasMore"
        :load="loadMore"
        dom-selector=".search-result"
      />
    </div>
    <empty-holder
      v-else
      large
    >
      这里神马都没有
      <span
        class="btn"
        @click="goback"
      >
        返回
      </span>
    </empty-holder>
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

  watchQuery: ['tag', 'q'],

  computed: {
    ...mapState('search', ['list', 'query']),
    ...mapGetters('search', ['hasMore']),
    ...mapGetters('tag', ['nameMap']),
    tag() {
      return this.$route.query.tag
    },
    q() {
      return this.$route.query.q
    },
  },

  async fetch({ store, query }) {
    const { tag, q } = query
    await store.dispatch('search/doSearch', { tag, q })
  },

  beforeDestroy() {
    this.$store.commit('search/CLEAR_SEARCH')
  },

  methods: {
    loadMore() {
      return this.$store.dispatch('search/doSearch', {
        ...this.$route.query,
        pageNo: this.query.pageNo + 1,
      })
    },
    goback() {
      return this.$router.back()
    },
  },
}
</script>

<style lang='scss'>
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
  color: $color-primary;
  text-decoration: underline;
  cursor: pointer;
}
</style>
