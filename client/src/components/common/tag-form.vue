<template>
  <el-form-renderer :content="content" ref='form'></el-form-renderer>
</template>

<script>
import ElFormRenderer from 'el-form-renderer';

export default {
  components: {
    ElFormRenderer,
  },

  data() {
    return {
      content: [
        {
          $id: 'name',
          $type: 'input',
          label: '标签名',
          rules: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
          ],
          prop: 'name',
        },
        {
          $id: 'descript',
          $type: 'input',
          label: '标签描述',
          prop: 'descript',
          rules: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
            { max: 10, message: '长度不超过10个字符', trigger: 'blur' },
          ],
        },
      ],
    };
  },
  methods: {
    callFormFn(fn, ...args) {
      return this.$refs['form'][fn](...args);
    },
  },
};
</script>

