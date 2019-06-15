<template>
  <ul class="tag-list">
    <li
      v-for="tag in (useDefault ? list : tags)"
      :key="tag.id"
      class="tag-item ml8"
      :class="{active: tag.name === activeName}"
      @click="onClick && onClick(tag)"
    >
      <i class="iconfont icon-biaoqian" />
      {{ tag.name }}
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    onClick: Function,
    tags: {
      type: Array,
      required: true,
    },
    activeName: String,
    useDefault: Boolean,
  },

  computed: {
    ...mapState({
      list: state => state.tag.list,
    }),
  },
}
</script>

<style lang="scss" scoped>
.tag-list {
  margin-bottom: 0;

  .tag-item {
    display: inline-block;
    padding: .25rem .5rem;
    background-color: $c-white;
    border: 1px solid $color-border;
    border-radius: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
    cursor: pointer;
    transition: all .2s;

    i {
      font-size: inherit;
    }

    &.active,
    &:hover {
      color: $color-active-red;
      border-color: $color-active-red;
    }

  }
}
</style>
