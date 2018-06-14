<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px" class="article-form">
    <el-row>
      <el-col :span="12">
        <el-form-item label="题目" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keyword">
          <el-input placeholder="请输入关键字" v-model="form.keyword">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="标签" prop="descript">
          <el-select v-model="form.tags" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
            <el-option v-for="tag in tags" :key="tag._id" :label="tag.name" :value="tag.name">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="标签" prop="tags">
          <el-checkbox-group v-model="form.tags" size="small">
            <el-checkbox-button v-for="tag in tags" :label="tag._id" :key="tag._id">{{tag.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分类">
          <el-radio-group v-model="form.type" size="small">
            <el-radio-button :label="1">文章</el-radio-button>
            <el-radio-button :label="2">读书</el-radio-button>
            <el-radio-button :label="3">音乐</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.state" size="small">
            <el-radio-button :label="1">发布</el-radio-button>
            <el-radio-button :label="2">草稿</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公开">
          <el-radio-group v-model="form.public" size="small">
            <el-radio-button :label="true">公开</el-radio-button>
            <el-radio-button :label="false">私密</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="缩略图">
          <el-form-item class="img-item" prop="avatar">
            <image-uploader :onSuccess="onSuccess" :src="form.thumb" />
          </el-form-item>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item label="描述" prop="descript">
          <el-input type="textarea" rows="4" maxlength="200" placeholder="请输入描述" v-model="form.descript">
          </el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <no-ssr>
            <!-- FIXME: 切换源码后宽度不对  -->
            <mavon-editor class="markdown-editor markdown-content" v-model="form.content" />
          </no-ssr>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import { mapState } from 'vuex';
import ImageUploader from '~/components/common/image-uploader';

function noop() {}

export default {
  components: {
    ImageUploader,
  },

  props: {
    detail: Object,
    onSubmit: Function,
  },

  data() {
    return {
      form: {
        title: '',
        keyword: '',
        tags: [],
        content: '',
        public: true,
        type: 1,
        state: 1,
        thumb: '',
        ...this.detail,
      },
      rules: {
        title: [{ required: true, trigger: 'blur' }],
        content: [{ required: true, trigger: 'blur' }],
      },
    };
  },

  computed: {
    ...mapState({
      tags: state => state.tag.list,
    }),
  },

  watch: {
    detail(val, oldVal) {
      this.form = { ...this.form, ...val };
    },
  },

  async created() {
    await this.$store.dispatch('tag/getTags');
  },

  methods: {
    onSuccess(url) {
      this.form.thumb = url;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          (this.onSubmit || noop)(this.form);
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
.markdown-editor {
  height: 600px;
}
</style>

