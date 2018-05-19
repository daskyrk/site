<template>
  <div class="container">
    <p>About Page</p>
    <p><nuxt-link to="/" class="button is-medium is-info hvr-wobble-vertical">Back home</nuxt-link></p>
  </div>
</template>

<script>
export default {
  // layout: 'dark',
  transition: 'bounce',
  // asyncData() {
  //   return new Promise((resolve) => {
  //     setTimeout(function () {
  //       resolve({})
  //     }, 1000)
  //   })
  // }
}
</script>

<style scoped>
.container {
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
}
</style>