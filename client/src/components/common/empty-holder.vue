<template>
  <div 
    :class="{ large }" 
    :style="{ minHeight }" 
    class="empty-holder"
  >
    <i class="iconfont icon-empty" />
    <div class="tip">
      <slot>
        这里空空如也
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    large: Boolean,
    height: String,
  },

  computed: {
    minHeight() {
      return (this.height || 300) + 'px'
    },
  },

  methods: {
    goback() {
      return this.$router.back()
    },
  },
}
</script>

<style lang='scss' scoped>
.empty-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $color-text-sub-assist;

  .icon-empty {
    font-size: 4rem;
  }

  .tip {
    font-size: 1.3rem;
  }

  &.large {
    color: $color-text-assist;
    .icon-empty {
      font-size: 10rem;
    }
    .tip {
      font-size: 1.6rem;
    }
  }
}
</style>
