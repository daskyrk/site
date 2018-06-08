<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware: ['auth', 'breadcrumb'],
  layout: 'manage',
  meta: {
    breadcrumb: '管理后台',
  },
  // fetch({ store }) {
  //   console.log('fetch:');
  //   store.dispatch('user/getUserInfo');
  // },
};
</script>