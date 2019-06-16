<template>
  <div
    class="app-layout"
    :class="[_cls, size, sideopen && 'side-open']"
  >
    <layout-header />

    <div
      class="app-container"
      @click="closeSide"
    >
      <nuxt />
    </div>

    <layout-aside />

    <layout-footer v-if="!sideopen" />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
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
      return 'layout-' + this.$store.state.layout.size
    },
  },

  mounted() {
    // this.getIP()
    this.setSize()
    window.onresize = _.throttle(this.setSize, 100)
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
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
      if (e.repeat) {
        return
      }
      this.$store.commit('layout/pressKey', e)
    },
    onKeyUp() {
      this.$store.commit('layout/pressKey', {})
    },
    getIP() {
      this.$store.dispatch('getIP')
    },
  },
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  transition: transform 0.5s;
  background: url('~assets/bak.svg');

  &.gray-bg {
    background-color: $c-whitesmoke;
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
        background-color: $color-dark-2;
        pointer-events: unset;
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
      z-index: 999;
      width: 100%;
      background-color: transparent;
      transition: background-color 0.5s;
      pointer-events: none;
      content: '';
    }
  }
}
</style>
