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
  async fetch({ store }) {
    await store.dispatch('user/getUserInfo')
  },
}
</script>
