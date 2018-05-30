<template>
  <div class="article">
    <nuxt-child />
  </div>
</template>


<script>
export default {

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