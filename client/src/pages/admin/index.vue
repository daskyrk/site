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
    if (!store.state.user.userInfo) {
      await store.dispatch('user/getUserInfo')
    }
  },
}
</script>
