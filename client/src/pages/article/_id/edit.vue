<template>
  <el-form :model="detail" status-icon :rules="rules" ref="form" label-width="100px" class="add-article-form">
    <el-input v-model="detail._id" type='hidden'></el-input>
    <el-form-item label="题目" prop="title">
      <el-input v-model="detail.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="detail.content">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
      <nuxt-link to='..' append>
        <el-button>返回</el-button>
      </nuxt-link>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        title: [{ required: true, trigger: 'blur' }],
      },
      detail: { ...this.$store.state.article.detail },// TODO: 这里有点hack了吧，有没有其他方式？
    };
  },
  computed: {
    // detail() {
    //   return this.$store.state.article.detail;
    // },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { _id, title, content } = this.detail;
          this.$store
            .dispatch('article/updateArt', { _id, title, content })
            .then(res => {
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

  // fetch({ store, params }) {
  //   return store.dispatch('article/updateArt', params.id);
  // },
};
</script>

<style lang="scss" scoped>
</style>