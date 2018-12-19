<template>
  <div 
    class="admin-entry" 
    @dblclick="toLogin"/>
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


<style lang="scss" scoped>
$trigger-size: 10px;

.admin-entry {
  position: absolute;
  left: -$trigger-size/2;
  bottom: -$trigger-size/2;
  width: $trigger-size;
  height: $trigger-size;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.1);

  &:hover {
    transform: scale(3);
  }
}
</style>
