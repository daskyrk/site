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
  width: 38rem;
  margin: 5rem auto;
  text-align: center;
}
</style>

