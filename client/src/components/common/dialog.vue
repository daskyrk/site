<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
  >
    <slot />
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleCancel">
        {{ cancelText || '取 消' }}
      </el-button>
      <el-button
        type="primary"
        @click="handleOk"
      >
        {{ okText || '确 定' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    okText: {
      type: String,
    },
    cancelText: {
      type: String,
    },
    onOk: {
      type: Function,
    },
    onCancel: {
      type: Function,
    },
  },
  data() {
    return {
      dialogVisible: true,
    }
  },

  methods: {
    toggleDialog() {
      this.dialogVisible = !this.dialogVisible
    },

    handleOk() {
      if (typeof this.onOk === 'function') {
        this.onOk(this.toggleDialog)
      }
    },

    handleCancel() {
      if (typeof this.onCancel === 'function') {
        this.onCancel(this.toggleDialog)
      }
    },
  },
}
</script>
