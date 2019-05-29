<template>
  <popover v-bind="paasProps">
    <div class="confirm-content">
      {{ tip }}
    </div>
    <div>
      <v-btn
        v-close-popover
        flat
        small
        color="primary"
        class="confirm-btn"
        @click="cancel"
      >
        取消
      </v-btn>

      <v-btn
        v-close-popover
        depressed
        small
        color="primary"
        class="confirm-btn"
        @click="ok"
      >
        确定
      </v-btn>
    </div>
    <template slot="trigger">
      <slot />
    </template>
  </popover>
</template>

<script>
const noop = () => {}
export default {
  props: {
    tip: {
      type: String,
      default: '确认此操作？',
    },
    cancel: {
      type: Function,
      default: noop,
    },
    ok: {
      type: Function,
      default: noop,
    },
  },

  data() {
    return {
      paasProps: {
        ...this.$attrs,
      },
    }
  },
}
</script>

<style lang="scss">
.confirm-content {
  padding: 16px;
}

.confirm-btn {
  min-width: 60px;
}

.v-popover {
  display: inline-block;
}
</style>
