<template>
  <div class="setting">
    <p class="title">个人信息</p>
    <el-form :model="userForm" :rules="userRules" ref="userForm" class="user-setting-form" label-width="100px" label-position="right">
      <el-row>
        <el-col :span="16">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nick">
            <el-input v-model="userForm.nick" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="slogan">
            <el-input v-model="userForm.slogan" :maxlength="60"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item class="img-item" prop="avatar">
            <image-uploader :onSuccess="onSuccess" :src="userForm.avatar" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="userForm.oldPassword" auto-complete="off" :maxlength="20" placeholder="原密码" @keyup.enter.native="submit('userForm')"></el-input>
      </el-form-item> -->
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="userForm.newPassword" auto-complete="off" :maxlength="20" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="userForm.checkPass" auto-complete="off" :maxlength="20" placeholder="确认密码" @keyup.enter.native="submit('userForm')"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button @click="submit('userForm')" :disabled="savingUser">{{ savingUser ? '更改中' : '更改' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUploader from '~/components/common/image-uploader';
import { mapState } from 'vuex';

export default {
  meta: {
    breadcrumb: '系统设置',
  },

  components: {
    ImageUploader,
  },

  async fetch({ store }) {
    await store.dispatch('user/getUserInfo');
  },

  data() {
    const checkPassComfirm = (rule, value, callback) => {
      let msg = null;
      if (value !== this.userForm.newPassword) {
        msg = '两次输入密码不一致!';
      }
      if (msg) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    return {
      savingUser: false,
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        newPassword: [{ min: 6, message: '密码至少6位', trigger: 'blur' }],
        checkPass: [{ validator: checkPassComfirm, trigger: 'blur' }],
      },
    };
  },

  computed: {
    userForm() {
      return {
        username: '',
        nick: '',
        slogan: '',
        avatar: '',
        email: '',
        newPassword: '',
        checkPass: '',
        ...this.$store.state.user.userInfo,
      };
    },
  },

  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { checkPass, ...rest } = this.userForm;
          this.$store.dispatch('user/updateConfig', rest);
        }
      });
    },
    onSuccess(url) {
      this.userForm.avatar = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-setting-form {
  width: 80%;
  margin: 0 auto;
}
.img-item {
  margin-bottom: 0;
}
</style>

