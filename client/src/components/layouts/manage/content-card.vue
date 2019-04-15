<template>
  <section class="manage-content-card">
    <div class="header">
      {{ title }}
      <div class="op">
        <slot name="op" />
      </div>
    </div>

    <slot />

    <div
      v-if="!hideFooter"
      class="footer"
    >
      <slot name="footer" />
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
  background-color: $c-white;
  border-radius: $radius;
  box-shadow: 0 0 6px $c-lightgray;
}

.header,
.footer {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
}

.header {
  background-color: $c-ghostwhite;
  border-bottom: 1px solid $c-platinum;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: $c-green;
    content: "";
  }
}
</style>
