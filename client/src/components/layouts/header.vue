<template>
  <header>
    <div class="header-left">
      <nav>
        <nuxt-link v-for="(nav, index) in navs"
          :key='index'
          :to='nav.link'
          exact>
          {{nav.text}}
        </nuxt-link>

      </nav>
    </div>
    <div class="header-right">
      搜索
    </div>
  </header>
</template>

<script>
export default {
  name: 'my-header',

  data(context) {
    return {
      navs: process.env.navs
    };
  }
};
</script>


<style lang="scss">
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  height: $header-height;
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $grey;

  nav {
    a {
      margin-left: 2rem;
      color: $grey;

      transition: color 0.3s;
    }
  }
}
</style>
