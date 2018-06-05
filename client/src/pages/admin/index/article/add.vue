<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="160px" class="add-article-form">
    <el-col :span="16">
      <el-form-item label="题目" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input placeholder="请输入关键字" v-model="form.keyword">
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="descript">
        <el-input type="textarea" maxlength="200" placeholder="请输入描述" v-model="form.descript">
        </el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <no-ssr>
          <markdown-editor v-model="form.content" :configs="configs" :highlight="true"></markdown-editor>
        </no-ssr>
      </el-form-item>
    </el-col>
    <el-col :span="7" :offset='1'>
      <el-form-item label="标签" label-width="90px" style="margin-bottom: 22px;" prop="tag">
        <el-checkbox-group v-model="form.tag" size="small">
          <el-checkbox-button v-for="tag in tags" :label="tag._id" :key="tag._id">{{tag.name}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="分类" label-width="90px" style="margin-bottom: 22px;">
        <el-radio-group v-model="form.type" size="small">
          <el-radio-button :label="1">读书</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" label-width="90px" style="margin-bottom: 22px;">
        <el-radio-group v-model="form.state" size="small">
          <el-radio-button :label="1">发布</el-radio-button>
          <el-radio-button :label="2">草稿</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公开" label-width="90px" style="margin-bottom: 22px;">
        <el-radio-group v-model="form.publish" size="small">
          <el-radio-button :label="1">公开</el-radio-button>
          <el-radio-button :label="2">私密</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="缩略图" label-width="90px" style="margin-bottom: 22px;">
        <el-input type='hidden' v-model="form.thumb" />
        <!-- <el-input v-model="form.thumb" size="small" class="link"></el-input> -->
        <el-upload class="avatar-uploader" action="https://up.qbox.me/" :data='qn' :show-file-list="false" :before-upload="beforeThumbUpload" :on-success="handleUploadSuccess" :on-progress="handleUploadPro" :on-error="handleUploadError">
          <img v-if="form.thumb" :src="form.thumb" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-progress :percentage="percent" v-if="percent > 0 && percent < 100"></el-progress>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-col>
  </el-form>
</template>

<script>
export default {
  meta: {
    breadcrumb: '添加文章',
  },

  data() {
    return {
      percent: 0,
      configs: {
        status: false,
        indentWithTabs: false,
        spellChecker: false,
      },
      qn: {
        token: '',
        key: '',
      },
      tags: this.$store.state.tag.tags,
      form: {
        title: '',
        keyword: '',
        content: '',
        publish: true,
        type: 1,
        state: 1,
        publish: 1,
        thumb: '',
      },
      rules: {
        title: [{ required: true, trigger: 'blur' }],
        keyword: [{ required: true, trigger: 'blur' }],
        content: [{ required: true, trigger: 'blur' }],
        publish: [{ required: true, trigger: 'blur' }],
      },
    };
  },
  // TODO: 这里为何不能用asyncData ？
  async created() {
    await Promise.all([
      this.$store.dispatch('tag/getTags'),
      this.$store.dispatch('getUploadToken'),
    ]);

    this.qn.token = this.$store.state.uploadToken;

  },
  // fetch({ store }) {
  //   return store.dispatch('tag/getTags');
  // },
  methods: {
    handleUploadSuccess() {
      this.form.thumb = `http://p9uqlanms.bkt.clouddn.com/${this.qn.key}`;
    },

    // 进度条
    handleUploadPro(e) {
      this.percent = Math.ceil(e.percent);
    },

    // 出错
    handleUploadError(res) {
      // error(res.message);
    },

    beforeThumbUpload(file) {
      const typeMisMatch =
        file.type === 'image/jpeg' || file.type === 'image/png';

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!typeMisMatch) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      this.qn.key = file.name;
      return typeMisMatch && isLt2M;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('article/addArt', this.form).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
            });
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

