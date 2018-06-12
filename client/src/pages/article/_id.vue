<template>
  <div class="article">
    {{detail}}
  </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('article', ['detail']),

  async fetch({ store, params }) {
    await store.dispatch('article/getArt', params.id);
  },
};
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>