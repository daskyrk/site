<template>
  <el-dialog :title="title" :visible.sync="visible" @open="handleOpen" @close="handleClose">
    <el-form-renderer :content="fields" label-width="120px" class="dialog-form" v-bind="formProps" ref='form'>
      <slot />
    </el-form-renderer>
    <div slot="footer" class="dialog-footer">
      <el-button @click="this.handleCancel">{{cancelText || '取 消'}}</el-button>
      <el-button type="primary" @click="this.handleOk">{{okText || '确 定'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ElFormRenderer from 'el-form-renderer';

function noop() {}

export default {
  components: {
    ElFormRenderer,
  },

  props: {
    dialogVisible: Boolean,
    title: String,
    okText: String,
    cancelText: String,
    fields: Array,
    fieldsValue: Object,
    formProps: Object,

    onOk: Function,
    onCancel: Function,
    onOpen: Function,
    onClose: Function,
  },

  data() {
    return {
      visible: this.dialogVisible,
    };
  },


  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible;
    },
  },

  methods: {
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = this.$refs.form.getFormValue();
          (this.onOk || noop)(data);
        }
      });
    },

    handleCancel() {
      this.$refs.form.resetFields();
      (this.onCancel || noop)();
    },

    handleOpen() {
      this.$nextTick(() => {
        const form = this.$refs.form;
        if (this.fieldsValue === null) {
          this.fields.map(field =>
            form.updateValue({ id: field.$id, value: '' }),
          );
        } else {
          Object.entries(this.fieldsValue).map(([k, v]) =>
            form.updateValue({ id: [k], value: v }),
          );
        }
      });
      (this.onOpen || noop)();
    },

    handleClose() {
      this.$refs.form.resetFields();
      (this.onClose || noop)();
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-form {
  width: 80%;
  margin: 0 auto;
}
</style>

