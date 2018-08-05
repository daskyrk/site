<template>
  <Article :detail="detail" />
</template>


<script>
import Article from '~/components/article/article-page';
import { mapState } from 'vuex';

export default {
  components: {
    Article,
  },

  async fetch({ store, params }) {
    await store.dispatch('article/getArt', params.id);
    await store.dispatch('tag/getTags', { pageSize: 100 });
  },

  computed: {
    ...mapState('article', ['detail']),
  },

};
</script>
