<template>
  <div class="container">
    <p>Hello {{ name }}!</p>
    <p>
      <nuxt-link to="/about" class="button is-medium is-primary hvr-float-shadow">Go to /about</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/user" class="button is-medium hvr-float-shadow">Go to /user</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  asyncData() {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve({
          name: "world"
        });
      }, 1000);
    });
  }
};
</script>

<style scoped>
.container {
  margin: 5rem auto;
  min-height: calc(100vh - 200px);
  text-align: center;
}
</style>