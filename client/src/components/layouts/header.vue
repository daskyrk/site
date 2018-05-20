<template>
  <header>
    <div class="header-left">
      目录
    </div>
    <div class="header-right">
      搜索
    </div>
  </header>
</template>

<script>
export default {
  name: "header",

  data() {
    return { name: 123 };
  }
};
</script>


<style lang="scss">

header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  height: $header-height;
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $grey;
}

</style>
