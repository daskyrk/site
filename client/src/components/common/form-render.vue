<template>
  <el-form-renderer :content="fields" ref='form'><slot /></el-form-renderer>
</template>

<script>
import ElFormRenderer from 'el-form-renderer';

export default {
  components: {
    ElFormRenderer,
  },

  props: {
    fields: Array,
  },

  methods: {
    callFormFn(fn, ...args) {
      return this.$refs['form'][fn](...args);
    },
  },
};
</script>

