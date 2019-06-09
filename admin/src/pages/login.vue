<template>
  <v-container fluid fill-height class="login-page">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card v-if="!logined" class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>后台</v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <v-btn slot="activator" icon large :href="frontPage" target="_blank">
                <v-icon large>
                  home
                </v-icon>
              </v-btn>
              <span>前台</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text class="px-4">
            <v-form v-model="valid">
              <v-text-field
                v-model="form.email"
                prepend-icon="person"
                label="邮箱"
                type="text"
                :rules="rules.email"
                :counter="40"
                clearable
                required
              />
              <v-text-field
                id="password"
                v-model="form.password"
                prepend-icon="lock"
                label="密码"
                type="password"
                :rules="rules.password"
                :counter="30"
                clearable
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="px-4 py-3">
            <v-spacer />
            <v-btn color="primary" @click="submit('login')">
              登录
            </v-btn>
            <v-btn v-if="registerable" @click="submit('regist')">
              注册
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>后台</v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <v-btn slot="activator" icon large :href="frontPage" target="_blank">
                <v-icon large>
                  home
                </v-icon>
              </v-btn>
              <span>前台</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            你已经登录啦~
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <nuxt-link to="/">
              <v-btn color="primary">
                去首页
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { regexp } from '~/utils'

export default {
  layout: 'empty',

  data() {
    return {
      frontPage: this.$getConfig('frontPage'),
      valid: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          v => !!v || '必填',
          v => regexp.email.test(v) || '格式不正确',
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
      if (this.valid) {
        const action = type === 'login' ? 'user/login' : 'user/add'
        this.$store.dispatch(action, this.form).then((res) => {
          console.log('res:', res)
          // this.$router.push(this.$route.query.redirectTo || '/')
        })
      }
    },
  },
}
</script>

<style lang="scss">
.login-page {
  // background-image: url(https://img.xjh.me/random_img.php?return=302);
  // background-image: url(https://picsum.photos/1280/760);
  background-size: cover;
}

</style>
