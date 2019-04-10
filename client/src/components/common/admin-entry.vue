<template>
  <div
    class="admin-entry"
    @dblclick="toLogin"
  />
</template>

<script>
export default {
  methods: {
    toLogin() {
      this.$router.push('/admin')
    },
  },
}
</script>


<style lang="scss">
$trigger-size: 10px;

.admin-entry {
  position: absolute;
  bottom: -$trigger-size / 2;
  left: -$trigger-size / 2;
  width: $trigger-size;
  height: $trigger-size;
  background-color: rgba(255, 255, 255, .1);
  border-radius: 100%;

  &:hover {
    transform: scale(3);
  }
}
</style>
