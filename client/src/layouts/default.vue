<template>
  <div
    class="app-layout"
    :class="cls"
  >
    <my-header />

    <div class="container">
      <nuxt />
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

  props: {
    class: String,
  },

  computed: {
    cls() {
      return this.class
    },
  },

}
</script>

<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  &.gray-bg {
    background-color: $whitesmoke;
  }

  .container {
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
    margin: 6rem auto 1rem;
  }
}
</style>
