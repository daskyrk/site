<template>
  <section class="manage-content-card">
    <div class="header">
      {{title}}
      <div class="op">
        <slot name="op"></slot>
      </div>
    </div>

    <slot></slot>

    <div class="footer" v-if="!hideFooter">
      <slot name="footer"></slot>
    </div>

  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    hideFooter: Boolean,
  },
}
</script>


<style lang="scss" scoped>
.manage-content-card {
  margin: $content-padding;
  overflow: hidden;
  background-color: $white;
  box-shadow: 0 0 6px $lightgray;
  border-radius: $radius;
}

.header,.footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  padding: 0 1rem;
}

.header {
  background-color: $ghostwhite;
  border-bottom: 1px solid $platinum;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: $green;
  }
}

</style>
