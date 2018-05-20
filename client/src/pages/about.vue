<template>
  <div class="about">
    <p>About Page</p>
    <p><nuxt-link to="/">Back home</nuxt-link></p>
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