<template>
  <div
    class="app-layout"
    :class="[_cls, size]"
  >
    <my-header />

    <div class="container">
      <nuxt />
    </div>

    <my-footer />
  </div>
</template>

<script>
import myHeader from '~/components/layouts/header'
import myFooter from '~/components/layouts/footer'
import _ from 'lodash'

export default {
  components: {
    myHeader,
    myFooter,
  },

  props: {
    cls: String,
  },

  computed: {
    _cls() {
      return this.cls
    },
    size() {
      return this.$store.state.layout.size
    }
  },

  mounted() {
    this.setSize()
    // window.onresize = _.throttle(this.setSize, 100)
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
  },
}
</script>

<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  &.gray-bg {
    background-color: $whitesmoke;
  }

  .container {
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
    margin: 6rem auto 1rem;
  }
}
</style>
