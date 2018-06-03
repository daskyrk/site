<template>
  <div class="article">
    {{detail}}
  </div>
</template>


<script>
export default {
  data() {
    return {
      detail: this.$store.state.article.detail,
    };
  },

  fetch({ store, params }) {
    return store.dispatch('article/getArt', params.id);
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