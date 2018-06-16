<template>
  <div class="article" v-html="marked(detail.content)">
  </div>
</template>


<script>
import { mapState } from 'vuex';
import markdown from '~/plugins/marked';

export default {
  computed: mapState('article', ['detail']),

  async fetch({ store, params }) {
    await store.dispatch('article/getArt', params.id);
  },
  methods: {
    marked(content) {
      return markdown(content);
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  width: 50%;
  min-width: 41.25rem;
}
</style>