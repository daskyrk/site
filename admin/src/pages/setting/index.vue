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
      <v-flex
        xs12
        md8
      >
        <material-card
          color="green"
          title="编辑个人信息"
          text="介绍下自己吧~"
        >
          <v-form ref="form" v-model="valid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="userForm.email"
                    prepend-icon="email"
                    label="邮箱"
                    disabled
                    required
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="userForm.nick"
                    prepend-icon="sentiment_satisfied_alt"
                    label="昵称"
                    :counter="20"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="userForm.password"
                    hint="至少6位字符以上"
                    prepend-icon="mdi-key"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :rules="[rules.min, rules.password]"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="confirm"
                    prepend-icon="mdi-key-change"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :rules="[rules.min, rules.confirm]"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="userForm.slogan"
                    class="purple-input"
                    prepend-icon="iconfont icon-qianming"
                    label="个性签名"
                    :rules="rules.slogan"
                    :counter="200"
                    clearable
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    :loading="savingUser"
                    :disabled="savingUser"
                    type="primary"
                    @click.prevent="submit"
                  >
                    更新
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <image-uploader
              :on-success="onSuccess"
              :src="userForm.avatar"
            />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray mb-3">
              看书 | 旅游 | 摄影
            </h6>
            <h4 class="card-title font-weight-light">
              {{ userForm.nick }}
            </h4>
            <p class="card-description font-weight-light">
              每一处都是未曾遇见的风景<br>
              发生的事永远不会忘记，只不过想不起来了而已...╮(╯▽╰)╭
            </p>
            <!-- <v-btn
              color="success"
              round
              class="font-weight-light"
            >
              Follow
            </v-btn> -->
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageUploader from '~/components/common/image-uploader'

export default {
  meta: {
    breadcrumb: '系统设置',
  },

  components: {
    ImageUploader,
  },

  data() {
    // 不用回填加密后的密码
    const { password, ...rest } = this.$store.state.user.userInfo
    return {
      valid: false,
      showPassword: false,
      savingUser: false,
      confirm: '',
      userForm: {
        nick: '',
        slogan: '',
        avatar: '',
        email: '',
        password: '',
        ...rest,
      },
      rules: {
        required: v => !!v || '必填',
        min: v => !v || v.length > 6 || '少于6位',
        password: v => !this.confirm || v === this.confirm || '密码不一致',
        confirm: v => v === this.userForm.password || '密码不一致',
      },
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate(true)
      if (this.valid) {
        const { password, ...rest } = this.userForm
        const data = password === ''
          ? { ...rest, password: this.$store.state.user.userInfo.password }
          : this.userForm
        this.$store.dispatch('user/update', data)
      }
    },
    onSuccess(url) {
      this.$msg.info('记得点击更新保存哦~')
      this.userForm.avatar = url
    },
  },
}
</script>

<style lang="scss" scoped>
.image-uploader {
  border: none;
  overflow: unset;
}
</style>
