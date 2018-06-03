<template>
  <div class="manage-layout">

    <manageSidebar />

    <div class="manage-main">
      <manageHeader />
      <div class="manage-content">
        <nuxt />
      </div>
    </div>

  </div>
</template>

<script>
import manageHeader from '~/components/layouts/manage/header';
import manageSidebar from '~/components/layouts/manage/sidebar';

export default {
  components: {
    manageHeader,
    manageSidebar,
  },
};
</script>

<style lang="scss" scoped>
.manage-layout {
  height: 100vh;
  display: flex;
}

.manage-main {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.manage-content {
  flex: 1;
}
</style>

