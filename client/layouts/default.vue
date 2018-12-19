<template>
  <div class="app">
    <my-header />

    <div class="container">
      <nuxt/>
    </div>

    <my-footer />
  </div>
</template>

<script>
import myHeader from '~/components/layouts/header'
import myFooter from '~/components/layouts/footer'

export default {
  components: {
    myHeader,
    myFooter,
  },
}
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.container {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  margin: 6rem auto 1rem;
}
</style>
