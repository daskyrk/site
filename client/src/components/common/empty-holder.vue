<template>
  <div class="empty-holder">
    <i class="iconfont icon-empty"></i>
    <div class="tip">
      <slot>
        这里神马都没有 <span class="btn" @click="goback">返回</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    goback() {
      return this.$router.back();
    },
  },
};
</script>

<style lang='scss' scoped>
.empty-holder {
  display: flex;
  flex-direction: column;
  align-items: center;

  i {
    font-size: 10rem;
  }

  .tip {
    font-size: 1.6rem;

    .btn {
      text-decoration: underline;
      color: $color-primary;
      cursor: pointer;
    }
  }
}
</style>
