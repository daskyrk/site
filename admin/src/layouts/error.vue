<template>
  <component
    :is="comp"
    v-if="show"
  />
</template>

<script>
import Default from '~/components/error-page/default'
import Page404 from '~/components/error-page/404'
import Page502 from '~/components/error-page/502'

export default {
  props: {
    error: {
      type: Object,
    },
  },

  layout: 'empty',

  computed: {
    show() {
      return this.error.statusCode !== 401
    },
    comp() {
      return (
        {
          404: Page404,
          502: Page502,
        }[this.error.statusCode] || Default
      )
    },
  },

  created() {
    if (!this.show) {
      this.$router.push('/login')
    }
  },
}
</script>
