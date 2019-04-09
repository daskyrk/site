<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    status-icon
    label-width="120px"
    class="post-form"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="题目"
          prop="title"
        >
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item
          label="关键字"
          prop="keyword"
        >
          <el-input
            v-model="form.keyword"
            placeholder="请输入关键字"
          />
        </el-form-item>
        <!-- <el-form-item label="标签" prop="descript">
          <el-select v-model="form.tags" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.name">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item
          label="标签"
          prop="tags"
        >
          <el-checkbox-group
            v-model="form.tags"
            size="small"
          >
            <el-checkbox-button
              v-for="tag in tags"
              :key="tag.id"
              :label="tag.id"
            >
              {{ tag.name }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分类">
          <el-radio-group
            v-model="form.type"
            size="small"
          >
            <el-radio-button label="ARTICLE">
              文章
            </el-radio-button>
            <el-radio-button label="READ">
              读书
            </el-radio-button>
            <el-radio-button label="THINK">
              感悟
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group
            v-model="form.state"
            size="small"
          >
            <el-radio-button :label="1">
              草稿
            </el-radio-button>
            <el-radio-button :label="2">
              发布
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公开">
          <el-radio-group
            v-model="form.public"
            size="small"
          >
            <el-radio-button :label="true">
              公开
            </el-radio-button>
            <el-radio-button :label="false">
              私密
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="缩略图">
          <el-form-item
            class="img-item"
            prop="avatar"
          >
            <image-uploader
              :on-success="onSuccess"
              :src="form.thumb"
            />
          </el-form-item>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form-item
          label="描述"
          prop="descript"
        >
          <el-input
            v-model="form.descript"
            type="textarea"
            rows="4"
            maxlength="200"
            placeholder="请输入描述"
          />
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <no-ssr>
            <mavon-editor
              ref="md"
              v-model="form.content"
              class="markdown-editor markdown-content"
              @imgAdd="imgAdd"
              @imgDel="imgDel"
            />
          </no-ssr>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('form')"
      >
        提交
      </el-button>
      <el-button @click="resetForm('form')">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ImageUploader from '~/components/common/image-uploader'

function noop() {}

export default {
  components: {
    ImageUploader,
  },

  props: {
    detail: {
      type: Object,
      default: () => {},
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      form: {
        title: '',
        keyword: '',
        tags: [],
        content: '',
        public: true,
        type: 'ARTICLE',
        state: 1,
        thumb: '',
        ...this.detail,
      },
      rules: {
        title: [{ required: true, trigger: 'blur' }],
        content: [{ required: true, trigger: 'blur' }],
      },
      images: [],
    }
  },

  computed: {
    ...mapState({
      tags: state => state.tag.list,
    }),
  },

  watch: {
    detail(val, oldVal) {
      this.form = { ...this.form, ...val }
    },
  },

  async created() {
    await this.$store.dispatch('tag/getTags')
  },

  methods: {
    onSuccess(url) {
      this.form.thumb = url
    },

    imgAdd(pos, $file) {
      const $md = this.$refs.md
      const formdata = new FormData()
      formdata.append('smfile', $file)
      axios({
        url: 'https://sm.ms/api/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(res => {
        const { code, data } = res.data
        if (code === 'success') {
          $md.$img2Url(pos, data.url)
          this.images[pos] = data
        } else {
          this.$message('上传图片失败')
        }
      })
    },

    imgDel(pos) {
      const target = this.images[pos]
      axios.get(target.delete)
      // this.$refs.md.$refs.toolbar_left.$imgDelByFilename(target.filename);
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ;(this.onSubmit || noop)(this.form)
        } else {
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss">
.markdown-editor {
  height: 500px;
}
</style>
