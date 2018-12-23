<template>
  <section class="page-filter">
    <slot />
  </section>
</template>

<style lang="scss">
.page-filter {
  background: $white;
  box-shadow: 0 1px 6px $lightgray;

  .filter-content {
    padding: $content-padding;
    .el-form-item:last-child {
      margin-bottom: 0;
    }

    .el-form-item__label {
      width: 6.25rem;
    }
  }

  .filter-footer {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $ghostwhite;
    padding: 0 $content-padding;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
