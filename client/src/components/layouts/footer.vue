<template>
  <footer>涅尘 | <nuxt-link class="about-link" to="/about">@daskyrk</nuxt-link>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $footer-height;
  background: $white;
  border-top: 1px solid $color-border;

  .about-link {
    margin-left: 0.2rem;
  }
}
</style>
