<template>
  <transition tag="div" name="slide-left">
    <div v-if="visible" :class="_cls" @click="scrollToTop">
      <i key="1" class="iconfont icon-shang"></i>
    </div>
  </transition>
</template>

<script>
import raf from 'raf';

function noop() {}

const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}

export default {
  props: {
    distance: Number,
    cls: String,
    getTarget: Function,
  },

  data() {
    return {
      visible: false,
      targetNode: null,
    };
  },

  computed: {
    _cls() {
      return ['back-top', this.cls];
    },
    _distance() {
      return this.distance || 300;
    },
  },

  mounted: function() {
    this.targetNode = (this.getTarget || noop)() || window;
    this.targetNode.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },

  beforeDestroy: function() {
    this.targetNode.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    getCurrentScrollTop() {
      if (this.targetNode === window) {
        return (
          window.pageYOffset ||
          document.body.scrollTop ||
          document.documentElement.scrollTop
        );
      }
      return this.targetNode.scrollTop;
    },

    scrollToTop(e) {
      const scrollTop = this.getCurrentScrollTop();
      const startTime = Date.now();
      const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
        if (time < 450) {
          raf(frameFunc);
        }
      };
      raf(frameFunc);
    },

    setScrollTop(value) {
      if (this.targetNode === window) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
      } else {
        this.targetNode.scrollTop = value;
      }
    },

    handleScroll() {
      const scrollTop = getScroll(this.targetNode, true);
      this.visible = scrollTop > this._distance;
    },
  },
};
</script>

<style lang="scss">
.back-top {
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  border-radius: 100%;
  border: 1px solid $platinum;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  cursor: pointer;
}
</style>

