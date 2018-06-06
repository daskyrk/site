<template>
  <el-dialog :title="title" :visible.sync="dialogVisible">
    <el-form-renderer :content="fields" label-width="120px" class="dialog-form" v-bind="formProps" ref='form'></el-form-renderer>
    <div slot="footer" class="dialog-footer">
      <el-button @click="this.handleCancel">{{cancelText || '取 消'}}</el-button>
      <el-button type="primary" @click="this.handleOk">{{okText || '确 定'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ElFormRenderer from 'el-form-renderer';

export default {
  components: {
    ElFormRenderer,
  },

  data() {
    return {
      dialogVisible: true,
    };
  },

  props: {
    title: String,
    okText: String,
    cancelText: String,
    onOk: Function,
    onCancel: Function,
    fields: Array,
    formProps: Object,
  },

  methods: {
    toggleDialog() {
      this.dialogVisible = !this.dialogVisible;
    },

    handleOk() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (typeof this.onOk === 'function') {
            const data = this.$refs['form'].getFormValue();
            this.onOk(data);
          }
          this.toggleDialog();
        }
      });
    },

    handleCancel() {
      this.$refs['form'].resetFields();
      if (typeof this.onCancel === 'function') {
        this.onCancel(this.toggleDialog);
      } else {
        this.toggleDialog();
      }
    },
  },
};
</script>

<!--> TODO: 这里去掉scope为啥就不起作用了？ <-->
<style lang="scss" scoped>
.dialog-form {
  width: 80%;
  margin: 0 auto;
}
</style>

