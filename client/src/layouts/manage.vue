<template>
  <div class="app">

    <manageSidebar />
    <div class="manage-main">
      <manageHeader />

      <div class="container">
        <nuxt/>
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
.app {
  height: 100vh;
  display: flex;
}

.manage-main {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>

