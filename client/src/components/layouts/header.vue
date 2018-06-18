<template>
  <header :class="{ hide }">
    <div class="header-left">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="f1" x="0" y="0" width="100%" height="100%">
          <feGaussianBlur in="BackgroundImage" stdDeviation="15" />
        </filter>
      </svg> -->
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
      hide: false,
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
      scrollTop = t;
    }, 200);
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
  z-index: 999;
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  // &:before {
  //   position: absolute;
  //   left: 0;
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   filter: url(#f1);
  // }

  &.hide {
    transform: translateY(-105%);
  }

  nav {
    a {
      margin-right: 2rem;
      color: $dimgray;
      transition: color 0.3s;
    }
  }

  .header-search {
    border-radius: 30px;
    width: 80px;
    padding: 0 0.7rem;
    border: 1px solid $dimgray;
    transition: all 0.2s;
    color: $dimgray;

    &:focus {
      width: 160px;
      border: 1px solid $blue;
      outline: none;
    }
  }
}
</style>
