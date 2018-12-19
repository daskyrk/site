<template>
  <el-form-renderer 
    ref="form" 
    :content="fields"><slot /></el-form-renderer>
</template>

<script>
import ElFormRenderer from 'el-form-renderer'

export default {
  components: {
    ElFormRenderer,
  },

  props: {
    fields: Array,
  },

  methods: {
    callFormFn(fn, ...args) {
      return this.$refs['form'][fn](...args)
    },
  },
}
</script>
