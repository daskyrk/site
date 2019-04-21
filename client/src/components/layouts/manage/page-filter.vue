<template>
  <section class="page-filter">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.page-filter {
  background: $c-white;
  box-shadow: 0 1px 6px $c-lightgray;

  .filter-content {
    .el-form-item:last-child {
      margin-bottom: 0;
    }

    .el-form-item__label {
      width: 6.25rem;
    }
  }

  .filter-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    background-color: $c-ghostwhite;

    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
