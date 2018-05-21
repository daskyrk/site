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
      <input
        type="text"
        class="header-search"
        maxlength="10"
        v-modal='keyword'
        @keyup.enter='search'>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      navs: process.env.navs
    };
  },

  methods: {
    search(e) {
      console.log('search:', e.target.value);
    }
  }
};
</script>


<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  z-index: 999;
  height: $header-height;
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $grey;

  nav {
    a {
      margin-right: 2rem;
      color: $grey;

      transition: color 0.3s;
    }
  }

  .header-search {
    border-radius: 30px;
    width: 80px;
    padding: 0 0.7rem;
    border: 1px solid $grey;
    transition: all 0.2s;
    color: $darkgrey;

    &:focus {
      width: 160px;
      border: 1px solid $blue;
      outline: none;
    }
  }
}
</style>
