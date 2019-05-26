<template>
  <v-app class="use-material-theme">
    <core-side-panel />

    <core-toolbar />

    <core-drawer />

    <core-container />
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
