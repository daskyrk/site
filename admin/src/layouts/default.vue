<template>
  <v-app class="use-material-theme">
    <core-nav />

    <core-sidebar />

    <core-container />

    <core-side-panel />
  </v-app>
</template>

<script>
export default {
  middleware: ['auth', 'breadcrumb'],
}
</script>
