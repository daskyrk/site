<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex xs12>
        <material-card
          color="green"
          title="编辑文章"
          offset="8"
          :text="metaInfo"
        >
          <template slot="operation">
            <v-switch
              v-model="form.isPublish"
              label="发布"
              color="white"
              hide-details
              dark
            />
            <v-switch
              v-model="form.isPublic"
              label="公开"
              color="white"
              hide-details
              dark
            />
          </template>
          <v-form ref="form" v-model="valid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs6 md4>
                  <v-text-field
                    v-model="form.title"
                    prepend-icon="iconfont icon-biaoti"
                    label="标题"
                    required
                  />
                </v-flex>
                <v-flex xs6 md4>
                  <v-text-field
                    v-model="form.keyword"
                    prepend-icon="iconfont icon-keyword"
                    label="关键字"
                    :counter="20"
                  />
                </v-flex>
                <v-flex xs6 md4>
                  <v-combobox
                    v-model="form.type"
                    :items="types"
                    prepend-icon="iconfont icon-xuanzefenzu"
                    label="类别"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-combobox
                    v-model="form.tags"
                    :items="tags"
                    item-text="name"
                    item-value="id"
                    prepend-icon="iconfont icon-tag"
                    small-chips
                    label="标签"
                    multiple
                    return-object
                  />
                </v-flex>
                <v-flex xs8 md10>
                  <v-textarea
                    v-model="form.description"
                    prepend-icon="iconfont icon-description"
                    label="描述"
                    :counter="200"
                    clearable
                  />
                </v-flex>
                <v-flex xs4 md2>
                  <image-uploader
                    :on-success="onSuccess"
                    :src="form.thumb"
                  />
                </v-flex>
                <v-flex xs12>
                  <no-ssr>
                    <mavon-editor
                      ref="md"
                      v-model="form.content"
                      class="markdown-editor markdown-content"
                      @imgAdd="imgAdd"
                      @imgDel="imgDel"
                    />
                  </no-ssr>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    type="primary"
                    :loading="saving"
                    :disabled="saving"
                    @click.prevent="submit"
                  >
                    {{ form.id ? '更新' : '保存' }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ImageUploader from '~/components/common/image-uploader'

export default {
  components: {
    ImageUploader,
  },

  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    let metaInfo = null
    if (this.detail.id) {
      const { views, comments, likes } = this.detail.meta
      metaInfo = `${views} 浏览, ${comments} 评论, ${likes} 喜欢`
    }
    return {
      valid: false,
      saving: false,
      form: {
        title: '',
        keyword: '',
        tags: [],
        content: '',
        public: true,
        type: this.types ? this.types[0] : '',
        state: 1,
        thumb: '',
        ...this.detail,
      },
      metaInfo,
      rules: {
      },
      images: [],
    }
  },

  computed: {
    ...mapState({
      tags: state => state.tag.list,
    }),
    ...mapState('post', ['types']),
  },

  watch: {
    detail(val, oldVal) {
      this.form = { ...this.form, ...val }
    },
  },

  async created() {
    await this.$store.dispatch('tag/getTags')
    await this.$store.dispatch('post/getPostTypes')
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
      }).then((res) => {
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

    submit() {
      if (this.valid && this.onSubmit) {
        this.onSubmit(this.form)
      }
    },

    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
.markdown-editor {
  height: 600px;
  z-index: 6;
}
</style>
