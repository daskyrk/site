<template>
  <div
    class="app-layout"
    :class="[_cls, size, sideopen && 'side-open']"
  >
    <my-header />

    <div
      class="app-container"
      @click="closeSide"
    >
      <nuxt />
    </div>

    <aside class="app-aside">
      <nav class="mobile-nav">
        <nuxt-link
          v-for="(nav, index) in navs"
          :key="index"
          :to="nav.link"
          exact
        >
          {{ nav.text }}
        </nuxt-link>
      </nav>
    </aside>

    <my-footer v-if="!sideopen" />
  </div>
</template>

<script>
import myHeader from '~/components/layouts/header'
import myFooter from '~/components/layouts/footer'
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  components: {
    myHeader,
    myFooter,
  },

  props: {
    cls: String,
  },

  data() {
    return {
      navs: this.$getConfig('navs'),
    }
  },

  computed: {
    ...mapState({
      sideopen: state => state.layout.sideOpen,
    }),
    _cls() {
      return this.cls
    },
    size() {
      return this.$store.state.layout.size
    },
  },

  mounted() {
    this.setSize()
    // window.onresize = _.throttle(this.setSize, 100)
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  },

  methods: {
    setSize() {
      // 定义窗口大小变更通知事件
      const screenWidth = document.documentElement.clientWidth //窗口宽度
      const screenHeight = document.documentElement.clientHeight //窗口高度
      this.$store.commit('layout/resize', {
        screenWidth,
        screenHeight,
      })
    },
    closeSide() {
      if (this.sideopen) {
        this.$store.commit('layout/toggleAppSide', false)
      }
    },
    onKeyDown(e) {
      console.log('this.pressKey:', this.pressKey.key);
      if (e.repeat) { return }
      this.$store.commit('layout/pressKey', e);
    },
    onKeyUp() {
      this.$store.commit('layout/pressKey', null);
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
  transition: transform .5s;

  &.gray-bg {
    background-color: $whitesmoke;
  }

  &.side-open {
    transform: translateX(-$app-side-width);

    .app-container {
      position: fixed;
      top: $header-height;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 0;
      overflow: hidden;

      &:after {
        background-color: $color-dark-4;
      }
    }
  }

  .app-container {
    position: relative;
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
    margin: $header-height auto 5rem;
    padding-top: 2rem;

    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 2;
      width: 100%;
      background-color: transparent;
      transition: background-color .5s;
      pointer-events: none;
      content: "";
    }
  }

  .app-aside {
    position: fixed;
    left: 100%;
    width: $app-side-width;
    height: 100%;
    background-color: #eef1f2;
  }
}
</style>
