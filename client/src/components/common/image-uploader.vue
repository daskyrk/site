<template>
  <el-upload class="uploader" v-bind="upProps">
    <img v-if="imageSrc" :src="imageSrc">
    <i v-else class="el-icon-plus uploader-icon"></i>
    <el-progress :show-text="false" :percentage="percent" v-if="progressVisible"></el-progress>
  </el-upload>
</template>

<script>
function noop() {}

export default {
  props: {
    uploadProps: Object,
    src: String,

    onSuccess: Function,
    onError: Function,
  },

  data() {
    return {
      qn: {
        token: '',
        key: '',
      },
      bucketUrl: this.bucketUrl || 'http://p9uqlanms.bkt.clouddn.com',
      percent: 0,
      allowTypes: ['image/jpeg', 'image/png', 'image/gif'],
      limit: this.limit || 2,
    };
  },

  computed: {
    upProps() {
      const outerProps = this.uploadProps || {};
      return {
        action: 'https://up.qbox.me/',
        showFileList: false,
        ...outerProps,
        data: this.qn,
        beforeUpload: this.beforeUpload,
        onSuccess: this.handleSuccess,
        onProgress: this.handleProgress,
        onError: this.handleError,
      };
    },
    imageSrc() {
      return this.src || '';
    },
    progressVisible() {
      return this.percent > 0 && this.percent < 100;
    },
  },

  async created() {
    if (!this.$store.state.uploadToken) {
      await this.$store.dispatch('getUploadToken');
    }

    this.qn.token = this.$store.state.uploadToken;
  },

  methods: {
    beforeUpload(file) {
      const typeAllowed = this.allowTypes.find(t => t === file.type);

      const isLt2M = file.size / 1024 / 1024 < this.limit;

      if (!typeAllowed) {
        this.$message.error(`上传图片只能是以下格式：${this.allowTypes}`);
        return false;
      }
      if (!isLt2M) {
        this.$message.error(`上传图片大小不能超过 ${this.limit}MB!`);
        return false;
      }
      const parts = file.name.split('.');
      const ext = parts.pop();
      this.qn.key = `${parts.join('.')}-${Date.now()}.${ext}`;
    },

    handleProgress(e) {
      this.percent = Math.ceil(e.percent);
    },

    handleSuccess() {
      (this.onSuccess || noop)(`${this.bucketUrl}/${this.qn.key}`);
    },

    handleError(res) {
      this.$message.error(res.message);
      (this.onError || noop)(res.message);
    },
  },
};
</script>

<style lang="scss" scoped>
.uploader {
  height: 164px;
  width: 164px;
  /deep/ .el-upload {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: border-color 0.3s;
    border: 1px dashed $dimgray;
    border-radius: 6px;
    i {
      font-size: 28px;
      color: $dimgray;
      transition: color 0.3s;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .el-progress {
      width: 100%;
      bottom: 0;
      left: 0;
      position: absolute;
    }
    &:hover {
      border-color: $color-primary;
      i {
        color: $color-primary;
      }
    }
  }
}
</style>

