<template>
  <header class="manage-header">
    <div class="header-left">
      breadcrumb here
    </div>
    <div class="header-right">
      other thing
    </div>
  </header>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.manage-header {
  padding: 0 2rem;
  height: $header-height;
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
</style>
