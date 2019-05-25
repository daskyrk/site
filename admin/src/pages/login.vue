<template>
  <div ref="page" class="login-page">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>后台</v-toolbar-title>
              <v-spacer />
              <v-tooltip bottom>
                <v-btn slot="activator" icon large href="http://baidu.com" target="_blank">
                  <v-icon large>
                    home
                  </v-icon>
                </v-btn>
                <span>前台</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model="form.email"
                  prepend-icon="person"
                  name="login"
                  label="邮箱"
                  type="text"
                  :rules="rules.email"
                  :counter="15"
                  clearable
                  required
                />
                <v-text-field
                  id="password"
                  v-model="form.password"
                  prepend-icon="lock"
                  name="password"
                  label="密码"
                  type="password"
                  :rules="rules.password"
                  :counter="15"
                  clearable
                  required
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="submit('login')">
                登录
              </v-btn>
              <v-btn v-if="registerable" @click="submit('add')">
                注册
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',

  layout: 'empty',

  data() {
    return {
      valid: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          v => !!v || '必填',
          v => /.+@.+/.test(v) || '格式不正确',
        ],
        password: [
          v => !!v || '必填',
          v => v.length > 6 || '少于6位',
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

  methods: {
    submit(type) {
      console.log('this.valid:', this.valid)
      if (this.valid) {
        const action = type === 'login' ? 'user/login' : 'user/add'
        this.$store.dispatch(action, this.form).then((res) => {
          this.$router.push(this.$route.query.redirectTo || '/')
        })
      }
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
  // background-color: $c-black;
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
