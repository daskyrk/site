<script>
export default {
  props: {
    disabled: Boolean,
  },
  render(createElement) {
    const vnodes = this.$slots.default
    if (vnodes.length === 1) {
      const node = vnodes[0]
      if (node.tag === 'div' || node.tag === 'span') {
        node.data.class = node.data.class || {}
        node.data.class['m-tooltip'] = !this.disabled
        node.data.attrs = Object.assign(node.data.attrs || {}, this.$attrs)
      } else {
        return createElement(
          'div',
          {
            class: !this.disabled ? 'm-tooltip' : '',
            ...this.$attrs,
          },
          [this.$slots.default[0]],
        )
      }
    } else {
      console.warn('Tooltip只接受一个子节点')
    }
    return this.$slots.default[0]
  },
}
</script>


<style lang="scss">
.m-tooltip {
  position: relative;
  $y-space: 2px;
  $bg-color: rgba(70, 76, 91, 0.9);
  $shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

  @mixin position() {
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
    [show] {
      opacity: 100;
    }
  }

  &::before {
    content: attr(content);
    @include position();
    line-height: 1.5;
    font-size: 12px;
    max-width: 250px;
    margin-bottom: 8px + $y-space;
    padding: 8px 12px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    background-color: $bg-color;
    border-radius: 4px;
    box-shadow: $shadow;
    white-space: nowrap;
  }

  &::after {
    content: '';
    @include position();
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-bottom: $y-space;
    border-color: transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    border-top-color: $bg-color;
  }

  &[right] {
    &::before {
      transform: translateX(-70%);
    }
  }

  &[left] {
    &::before {
      transform: translateX(-30%);
    }
  }

  &[show],
  &:hover {
    &::before,
    &::after {
      opacity: 100;
      pointer-events: unset;
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>

