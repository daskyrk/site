<template>
  <v-tooltip
    v-if="tip"
    top
    content-class="top"
  >
    <v-btn
      slot="activator"
      class="v-btn--simple"
      :color="color || 'success'"
      icon
      v-bind="btnProps"
      v-on="$listeners"
    >
      <slot />
    </v-btn>
    <span>{{ tip }}</span>
  </v-tooltip>
  <v-btn
    v-else
    class="v-btn--simple"
    :color="color || 'success'"
    icon
    v-bind="btnProps"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  data() {
    const { tip, color, ...btnProps } = this.$attrs
    return {
      tip,
      color,
      btnProps,
    }
  },
}
</script>
