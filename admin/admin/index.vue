<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware: ['auth', 'breadcrumb'],
  layout: 'manage',
  meta: {
    breadcrumb: '管理后台'
  }
}
</script>
