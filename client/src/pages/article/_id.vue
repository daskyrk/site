<template>
  <div class="article">
    <div class="content markdown-content" v-html="marked(detail.content)">

    </div>
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

<style lang="scss">
.article {
  width: 40%;
  min-width: 41.25rem;

}
</style>