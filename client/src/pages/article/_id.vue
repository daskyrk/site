<template>
  <div class="article">
    {{detail}}
  </div>
</template>

<script>
export default {
  // validate({ params }) {
  //   return !isNaN(+params.id);
  // },

  // async asyncData({ store, params }) {
  //   const id = params.id;
  //   console.log('id:', id);
  //   const target = store.state.article.list.filter(item => item._id === id);
  //   if (!target) {
  //     await store.dispatch('article/getArt', id);
  //   }
  //   return { target };
  // },

  computed: {
    detail() {
      return this.$store.state.article.detail;
    },
  },

  fetch({ store, params }) {
    return store.dispatch('article/getArt', params.id);
  }
};
</script>

<style lang="scss" scoped>
.article {
  display: flex;
}
</style>