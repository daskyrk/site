<template>
  <div class="error-page">
    <h1>An error occured {{ error }}</h1>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Error,
    },
  },
}
</script>

<style>
.error-page {
  padding-top: 10%;
  text-align: center;
}
</style>
