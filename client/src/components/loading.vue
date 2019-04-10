<template>
  <div
    v-if="loading"
    class="loading-page"
  >
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  font-size: 30px;
  font-family: sans-serif;
  text-align: center;
  background: rgba(255, 255, 255, .8);
}
</style>
