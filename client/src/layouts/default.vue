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
import myHeader from '~/components/layouts/header';
import myFooter from '~/components/layouts/footer';

export default {
  components: {
    myHeader,
    myFooter
  }
};
</script>

<style lang="scss">
.container {
  margin: 5rem auto;
  min-height: calc(100vh - 200px);
  text-align: center;
}
</style>

