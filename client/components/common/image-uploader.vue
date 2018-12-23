<template>
  <div 
    class="uploader" 
    @click="selectFile"
  >
    <i class="el-icon-plus avatar-uploader-icon" />
    <input 
      ref="input" 
      type="file" 
      accept="image/*" 
      @change="handleUpload($event)"
    >
    <img 
      v-if="imageSrc" 
      :src="imageSrc"
    >
  </div>
</template>

<script>
import axios from 'axios'
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
      upSrc: '',
      imageSrc: this.src || '',
      // fileList: [],
      percent: 0,
      allowTypes: ['image/jpeg', 'image/png', 'image/gif'],
      limit: Math.min(this.limit || 5), // sm.ms限制单文件最大5M
    }
  },

  computed: {
    progressVisible() {
      return this.percent > 0 && this.percent < 100
    },
  },

  watch: {
    upSrc(newV, oldV) {
      this.imageSrc = newV
    },
  },

  methods: {
    selectFile() {
      this.$refs.input.click()
    },
    handleUpload(e) {
      // 删除前一张上传的
      if (this.deleteUrl) {
        axios.get(this.deleteUrl)
      }
      const file = e.target.files[0]
      if (!this.beforeUpload(file)) {
        return
      }
      const formdata = new FormData()
      formdata.append('smfile', file)
      axios({
        url: 'https://sm.ms/api/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(res => {
          const { code, data } = res.data
          if (code === 'success') {
            this.handleSuccess(data)
            this.$store.dispatch('image/addImage', data)
          }
        })
        .catch(this.handleError)
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    beforeUpload(file) {
      const typeAllowed = this.allowTypes.find(t => t === file.type)

      const isLt2M = file.size / 1024 / 1024 < this.limit

      // if (!typeAllowed) {
      //   this.$message.error(`上传图片只能是以下格式：${this.allowTypes}`);
      //   return false;
      // }
      if (!isLt2M) {
        this.$message.error(`上传图片大小不能超过 ${this.limit}MB!`)
        return false
      }
      return true
    },

    handleProgress(e) {
      this.percent = Math.ceil(e.percent)
    },

    handleSuccess(data) {
      this.upSrc = data.url
      this.deleteUrl = data.delete
      ;(this.onSuccess || noop)(this.upSrc)
    },

    handleError(res) {
      this.$message.error(res.message)
      ;(this.onError || noop)(res.message)
    },
  },
}
</script>

<style lang="scss" scoped>
.uploader {
  display: inline-block;
  height: 164px;
  width: 164px;
  position: relative;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: 1px dashed $lightgray;
  border-radius: 6px;
  overflow: hidden;

  i {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: $dimgray;
    transition: color 0.3s;
  }

  input[type='file'] {
    display: none;
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  // /deep/ .el-upload {
  //   position: relative;
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   overflow: hidden;
  //   transition: border-color 0.3s;
  //   border: 1px dashed $dimgray;
  //   border-radius: 6px;

  //   .el-progress {
  //     width: 100%;
  //     bottom: 0;
  //     left: 0;
  //     position: absolute;
  //   }
  // }
  &:hover {
    border-color: $color-primary;
    i {
      color: $color-primary;
    }
  }
}
</style>
