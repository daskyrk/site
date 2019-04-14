<template>
  <defaultLayout cls="gray-bg" />
</template>

<script>
import defaultLayout from '~/layouts/default'

export default {
  components: {
    defaultLayout,
  },
}
</script>

<style lang="scss" scoped>
.app-layout {
  .gray-bg {
    background-color: $whitesmoke;
  }
}
</style>
