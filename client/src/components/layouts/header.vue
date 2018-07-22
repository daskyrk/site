<template>
  <header :class="{ hide }">
    <div class="header-left">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="f1" x="0" y="0" width="100%" height="100%">
          <feGaussianBlur in="BackgroundImage" stdDeviation="15" />
        </filter>
      </svg> -->
      <nav>
        <nuxt-link to='/'>
          首页
        </nuxt-link>
        <nuxt-link v-for="(nav, index) in navs" :key='index' :to='nav.link' exact>
          {{nav.text}}
        </nuxt-link>

      </nav>
    </div>
    <div class="header-right">
      <input ref="searchInput" type="text" class="header-search-input" :class="{hide: !searchVisible}" maxlength="10" v-model='keyword' @keyup.enter='search' @blur="hideSearch">
      <i class="iconfont icon-search header-search-icon" :class="{hide: searchVisible}" @click="showSearch"></i>
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
      searchVisible: false,
    };
  },

  methods: {
    showSearch() {
      this.searchVisible = true;
      this.$refs.searchInput.focus();
    },
    hideSearch() {
      this.searchVisible = false;
    },
    search(e) {
      const value = e.target.value.trim();
      if (value.length) {
        this.$router.push(`/search?keyword=${e.target.value.trim()}`)
      }
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

  .header-right {
    position: relative;
  }

  .header-search-icon {
    position: absolute;
    right: 0;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }

    &.hide {
      opacity: 0;
    }
  }

  .header-search-input {
    width: 160px;
    padding-left: 0.5rem;
    border: none;
    border-bottom: 1px solid $dimgray;
    transition: all 0.25s;
    color: $dimgray;
    outline: none;

    &.hide {
      opacity: 0;
      width: 0;
    }
  }
}
</style>
