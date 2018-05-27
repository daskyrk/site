<template>
  <div class="note">
    <articleView :list="list" @loadMore='loadMore'/>
  </div>
</template>

<script>
import articleView from '~/components/common/article';

export default {
  data() {
    return {};
  },

  fetch({ store }) {
    return store.dispatch('article/getArtList');
  },

  computed: {
    list() {
      return this.$store.state.article.list;
    },
  },

  methods: {
    loadMore() {
      console.log('call loadMore');
    }
  },

  components: {
    articleView
  }
};
</script>

<style lang='scss' scoped>
.note {
}
</style>