<template>
  <header :class="{ hide }">
    <div class="header-left">
      <nav>
        <nuxt-link v-for="(nav, index) in navs" :key='index' :to='nav.link' exact>
          {{nav.text}}
        </nuxt-link>

      </nav>
    </div>
    <div class="header-right">
      <input type="text" class="header-search" maxlength="10" v-model='keyword' @keyup.enter='search'>
    </div>
  </header>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      keyword: '',
      navs: process.env.navs,
      hide: true,
    };
  },

  methods: {
    search(e) {
      console.log('search:', e.target.value);
    },
    getScrollTop() {
      return (
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        window.scrollY ||
        document.body.scrollTop
      );
    },
  },

  mounted() {
    let scrollTop = this.getScrollTop();
    this.onScroll = _.throttle(() => {
      const t = this.getScrollTop();
      this.hide = t > scrollTop;
      setTimeout(() => {
        scrollTop = t;
      }, 0);
    }, 300);
    window.addEventListener('scroll', this.onScroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
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
  transition: transform 0.2s;

  &.hide {
    transform: translateY(-100%);
  }

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
