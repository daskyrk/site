<template>
  <div :class="$style.manageLayout">
    <manageSidebar />

    <div :class="$style.manageMain">
      <manageHeader />
      <div :class="$style.manageContent">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import manageHeader from '~/components/layouts/manage/header'
import manageSidebar from '~/components/layouts/manage/sidebar'

export default {
  components: {
    manageHeader,
    manageSidebar,
  },
}
</script>

<style lang="scss" module>
.manage-layout {
  display: flex;
  height: 100vh;
}

.manage-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-x: hidden;
  background-color: $whitesmoke;
}

.manage-content {
  position: relative;
  flex: 1;
  overflow: auto;
}
</style>
