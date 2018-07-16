import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

export default () => {
  Vue.use(VueLazyload, {
    // preLoad: 1.3,
    // error: 'dist/error.png',
    loading: '~/static/images/loading.gif',
    // attempt: 1,
    lazyComponent: true,
    // observer: true,
  });
};
