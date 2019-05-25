<template>
  <div ref="page" class="login-page">
    <div class="title">
      Welcome
    </div>
    <v-form v-model="validate">
      <v-container>
        <v-layout wrap justify-space-between default>
          <v-flex xs12>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="15"
              clearable
              label="Email"
              required
            />
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="15"
              clearable
              label="Password"
              required
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <form class="login-form" @submit.prevent>
      <v-btn color="blue" dark @click="submitForm('form', 'login')">
        登录
      </v-btn>
      <v-btn color="green" dark @click="submitForm('form', 'add')">
        注册
      </v-btn>
      <button v-if="registerable" class="regist-btn" @click="submitForm('form', 'add')">
        注册
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',

  layout: 'empty',

  data() {
    return {
      validate: false,
      form: {
        email: '',
        password: '',
      },
      email: '',
      emailRules: [],
      password: '',
      passwordRules: [],
      rules: {
        email: [{ required: true, message: '邮箱？', trigger: 'blur' }],
        password: [
          { required: true, message: '密码？', trigger: 'blur' },
          { min: 6, message: '密码太短了', trigger: 'blur' },
        ],
      },
    }
  },

  computed: {
    ...mapState('user', ['logined', 'registerable']),
  },

  // async fetch({ store }) {
  //   await store.dispatch('user/checkRegisterable')
  // },

  // mounted() {
  //   // this.detachEvents = this.startBg()
  // },

  // beforeDestroy() {
  //   this.detachEvents()
  // },

  methods: {
    toggleFocus(e, isFocus) {
      const parentNode = e.target.parentNode
      const cls = parentNode.className.split(' ')
      parentNode.className = isFocus
        ? cls.concat(['focus']).join(' ')
        : cls.filter(a => a !== 'focus').join(' ')
    },
    submitForm(formName, type) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     const action = type === 'login' ? 'user/login' : 'user/add';
      //     this.$store.dispatch(action, this.form).then(res => {
      //       this.$router.push(this.$route.query.redirectTo || '/');
      //     });
      //   } else {
      //     return false;
      //   }
      const { email, password } = this.form
      // TODO: add error tip
      if (password.length < 6) {
        return
      }
      const action = type === 'login' ? 'user/login' : 'user/add'
      this.$store.dispatch(action, this.form).then((res) => {
        if (res.success) {
          this.$router.push(this.$route.query.redirectTo || '/')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$line-color: rgba(255, 255, 255, 0.1);
$bg-color: rgba(255, 255, 255, 0.3);
$text-color: rgba(255, 255, 255, 0.5);
$text-color-active: rgba(255, 255, 255, 0.8);
$input-height: 3rem;

.login-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  // background-image: url(https://api.lylares.com/bing/image/random/?w=640&h=480);
  // background-size: cover;
  overflow: hidden;
  background-color: $c-black;
}

.title {
  z-index: 0;
  font-size: 3rem;
  text-align: center;
}

.login-form {
  position: absolute;
  top: 60%;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 400px;
  transform: translate(-50%, -50%);

  .input-wrap {
    position: relative;
    margin-bottom: 2rem;

    i {
      position: absolute;
      left: 0.7rem;
      color: $text-color;
      font-size: 2rem;
      line-height: $input-height;
      transition: color 0.25s;
    }

    input {
      background-color: hsla(0, 0%, 100%, 0.1);
    }

    &.focus {
      i {
        color: $c-white;
      }

      input {
        background-color: hsla(0, 0%, 100%, 0.2);
      }
    }
  }

  input,
  button {
    width: 100%;
    height: $input-height;
    font-size: 18px;
    border-radius: $input-height;
    transition: all 0.3s ease-in-out;

    &:active,
    &:focus {
      color: $text-color-active;
      // border: 1px solid $c-orange;
      outline: none;
    }
  }

  input {
    padding: 0 $input-height + 0.5rem;
    color: $text-color;
    background: $bg-color;
    border: 1px solid $line-color;

    &::-webkit-input-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }

    &::-moz-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }

    &:-moz-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }

    &:-ms-input-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }
  }

  button {
    color: $text-color-active;
    border: none;
    cursor: pointer;

    &[type='submit'] {
      background-color: #3ca271;

      &:hover {
        background-color: $c-green;
      }
    }
  }

  .regist-btn {
    margin-top: 1rem;
    background-color: $c-darkgray;
  }
}
</style>
