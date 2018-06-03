<template>
  <div>
    <h1>登陆啦</h1>
    <nuxt-link to="/">Back to the home page</nuxt-link>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'manage',

}
</script>