<template>
  <v-container fluid fill-height class="login-page">
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

<style lang="scss">
.login-page {
  // background-image: url(https://img.xjh.me/random_img.php?return=302);
  background-image: url(https://picsum.photos/1280/760);
  background-size: cover;
  // overflow: hidden;
}

</style>
