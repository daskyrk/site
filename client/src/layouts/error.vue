<template>
  <component v-bind:is="comp"></component>
</template>

<script>
import Default from '~/components/error-page/default';
import Page404 from '~/components/error-page/404';
import Page502 from '~/components/error-page/502';

export default {
  props: ['error'],

  layout: 'empty',

  computed: {
    comp() {
      return {
        404: Page404,
        502: Page502,
      }[this.error.statusCode] || Default;
    },
  },
};
</script>
