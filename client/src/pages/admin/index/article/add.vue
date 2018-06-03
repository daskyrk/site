<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="add-article-form">
    <el-form-item label="题目" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="form.content">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  // middleware: 'auth',
  data() {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('题目不能为空'));
      }
      callback();
    };
    return {
      form: {
        title: '',
        content: '',
      },
      rules: {
        title: [{ validator: checkTitle, trigger: 'blur' }],
      },
    };
  },
  methods: {
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
