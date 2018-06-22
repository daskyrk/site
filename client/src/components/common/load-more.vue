<template>
  <div class="load-more">
    <!-- <div class="has-more" v-if="hasMore"></div>
    <div class="load-more-btn" v-else>加载更多</div> -->
    <div v-if="isLoading" class="loading">加载更多...</div>
  </div>
</template>

<script>
import _ from 'lodash';

const isPromise = (obj) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

export default {
  props: {
    hasMore: Boolean,
    isLoading: Boolean,
    initialLoad: Boolean,
    // scrollDom: Object,
    threshold: Number,
    load: Function,
  },

  mounted() {
    // 一开始就加载完了，就不用再初始化了
    if (!this.hasMore) {
      this.notInit = true;
      return;
    }
    window.addEventListener('mousewheel', this.fkChrome);

    this.init();
    if (this.initialLoad) {
      return this._load(this.checkHeight);
    }
    this.attachEvent();
  },

  beforeDestroy() {
    if (this.notInit) {
      return;
    }
    this.detachEvent();
    window.removeEventListener('mousewheel', this.fkChrome);
  },

  methods: {
    // 滚动加载时chrome下Content Download时间会有2-3s的延长
    // see https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome
    fkChrome(e) {
      if (e.deltaY === 1) {
        e.preventDefault();
      }
    },

    // 初始化配置
    init() {
      this.eventType = 'scroll';
      this.target = document.querySelectorAll(this.domSelector)[0];
      this.targetDom = this.target || document.documentElement || document.body;
      this.eventTarget = this.target || window;
      this._threshold = this.threshold || 300;
      this.onScroll = _.throttle(() => {
        if (!this.isLoading) {
          const { scrollHeight, scrollTop, clientHeight } = this.targetDom;
          if (scrollHeight - scrollTop - clientHeight < this._threshold) {
            this._load(this.checkHeight);
          }
        }
      }, 100);
    },

    // if not has scrollBar then load more
    checkHeight() {
      const { scrollHeight, clientHeight } = this.targetDom;
      const hasScrollbar = scrollHeight > clientHeight;
      if (!hasScrollbar && this.hasMore && !this.isLoading) {
        this._load(this.checkHeight);
      }
    },

    lazyCheck() {
      return _.debounce(this.checkHeight, 100);
    },

    // detachEvent before load and reAttach after get data
    _load(cb) {
      this.detachEvent();
      const res = this.load();
      if (isPromise(res)) {
        res.then(() => {
          if (this.hasMore) {
            this.attachEvent();
          }
          cb();
        });
      } else {
        console.warn('[load-more] prop `load` should return a promise');
      }
    },

    attachEvent() {
      this.eventTarget.addEventListener(this.eventType, this.onScroll);
      window.addEventListener('resize', this.lazyCheck);
    },

    detachEvent() {
      this.eventTarget.removeEventListener(this.eventType, this.onScroll);
      window.removeEventListener('resize', this.lazyCheck);
    },

  },
};
</script>

<style lang="scss" scoped>
.load-more {
  font-size: 2rem;
}
</style>
