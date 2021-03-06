<template>
  <div class="search-result">
    <div class="search-by">
      <input
        v-model="q"
        type="text"
        placeholder="想找点什么?"
        @keypress.enter="doSearch"
      >
      <i
        class="iconfont icon-search"
        :class="{ active: q && q.length }"
      />
    </div>
    <TagList
      :tags="tags"
      :on-click="setTag"
    />
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
import TagList from '~/components/common/tag-list'

export default {
  components: {
    PostCard,
    LoadMore,
    TagList,
  },

  layout: 'default-gray',

  data() {
    return {
      tag: this.$route.query.tag,
      q: this.$route.query.q,
    }
  },

  watchQuery: ['tag', 'q'],

  computed: {
    ...mapState('search', ['list', 'query']),
    ...mapGetters('search', ['hasMore']),
    ...mapState({
      tags: state => state.tag.list,
    }),
  },

  async fetch({ store, query }) {
    const { tag, q } = query
    await store.dispatch('search/doSearch', { tag, q })
    await store.dispatch('tag/getTags')
  },

  beforeDestroy() {
    this.$store.commit('search/CLEAR_SEARCH')
  },

  methods: {
    doSearch() {
      let query = '?'
      if (this.q) {
        query += `q=${this.q}&`
      }
      if (this.tag) {
        query += `tag=${this.tag}`
      }
      this.$router.replace(`/search${query}`)
    },
    setTag({ name }) {
      this.tag = this.tag === name ? '' : name
      this.doSearch()
    },
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

  .search-by {
    position: relative;
    margin-bottom: 2rem;
    font-size: 1.4rem;

    $search-input-height: 2.5rem;

    input {
      width: 100%;
      height: $search-input-height;
      padding-right: 2rem;
      padding-left: 1rem;
      color: $c-black;
      font-size: 14px;
      line-height: $search-input-height;
      background-color: $c-white;
      border: 1px solid rgba(184, 197, 214, .2);
      border-radius: $search-input-height;
      outline: 0;
      box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
      transition: box-shadow .2s;
      -webkit-appearance: none;

      &:hover,
      &:focus {
        box-shadow: 0 1px 8px $color-dark-1;
      }
    }

    > span {
      margin-left: 1rem;
    }

    i {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: 60px;
      font-size: 1rem;
      line-height: $search-input-height;
      text-align: center;
      border-radius: 100%;

      &.active {
        color: $color-active-red;
      }
    }
  }

  .tag-list {
    margin-bottom: 2rem;

    .tag-item {
      margin: 10px 1rem 0 0;
      padding: .25rem .75rem;
      border: none;
    }
  }

  .btn {
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: $color-active-red;
    }
  }
}

@include sm-width() {
  .search-result {
    width: 90%;
  }
}
</style>
