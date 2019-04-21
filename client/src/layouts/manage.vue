<template>
  <v-app>
    <core-side-panel />

    <core-toolbar />

    <core-drawer />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import '~/assets/style/material.scss'

export default {
}
</script>

<style lang="scss" scoped>
</style>
