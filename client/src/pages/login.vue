<template>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-form">
    <el-form-item label="你是？" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="口令？" prop="password">
      <el-input type="password" v-model="form.password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="logining" @click="submitForm('form')">开门</el-button>
      <el-button>入伙</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      logining: this.$store.state.user.logining,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '你到底是谁啊？', trigger: 'blur' },
          { min: 3, message: '太短了', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '没口令可不行哦', trigger: 'blur' },
          { min: 3, message: '太短了', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.form).then(res => {
            this.$message({
              message: res.msg,
              type: res.code === 1 ? 'success' : 'warning',
            });
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 400px;

  button {
    width: 48%;
  }
}
</style>
