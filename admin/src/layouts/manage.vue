<template>
  <div class="manage-layout">
    <!-- <manageSidebar /> -->

    <div class="manage-main">
      <!-- <manageHeader /> -->
      <div class="manage-content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
// import manageHeader from '~/components/layouts/manage/header'
// import manageSidebar from '~/components/layouts/manage/sidebar'

export default {
  // components: {
  //   manageHeader,
  //   manageSidebar
  // }
}
</script>

<style lang="scss" scoped>
.manage-layout {
  display: flex;
  height: 100vh;
}

.manage-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-x: hidden;
  background-color: $c-whitesmoke;
}

.manage-content {
  position: relative;
  flex: 1;
  overflow: auto;
}
</style>
