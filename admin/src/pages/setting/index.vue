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
          text="Complete your profile"
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
                    clearable
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
                    :rules="[rules.required, rules.min, rules.password]"
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
                    :rules="[rules.required, rules.min, rules.confirm]"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="userForm.slogan"
                    class="purple-input"
                    prepend-icon="sentiment_satisfied_alt"
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
                    :disabled="savingUser"
                    type="primary"
                    @click.prevent="submit"
                  >
                    {{ savingUser ? '更新中' : '更新' }}
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
            <!-- <img
              src="/img/avatar.jpg"
            > -->
            <image-uploader
              :on-success="onSuccess"
              :src="userForm.avatar"
            />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">
              CEO / CO-FOUNDER
            </h6>
            <h4 class="card-title font-weight-light">
              李 骏
            </h4>
            <p class="card-description font-weight-light">
              每一处都是未曾遇见的风景...
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatem repellendus illo possimus, consequatur repudiandae officiis aliquam, suscipit facilis debitis nesciunt consequuntur! Aspernatur, sit earum molestias perferendis maiores libero voluptate!
            </p>
            <v-btn
              color="success"
              round
              class="font-weight-light"
            >
              Follow
            </v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageUploader from '~/components/common/image-uploader'
import { regexp } from '~/utils'

export default {
  meta: {
    breadcrumb: '系统设置',
  },

  components: {
    ImageUploader,
  },

  data() {
    return {
      valid: false,
      showPassword: false,
      savingUser: false,
      confirm: '',
      rules: {
        required: v => !!v || '必填',
        min: v => v.length > 6 || '少于6位',
        password: v => !this.confirm || v === this.confirm || '密码不一致',
        confirm: v => v === this.userForm.password || '密码不一致',
      },
    }
  },

  computed: {
    userForm() {
      // 不用回填加密后的密码
      const { password, ...rest } = this.$store.state.user.userInfo
      return {
        nick: '',
        slogan: '',
        avatar: '',
        email: '',
        password: '',
        ...rest,
      }
    },
  },

  methods: {
    submit() {
      this.$refs.form.validate(true)
      if (this.valid) {
        this.$store.dispatch('user/update', this.userForm)
      }
    },
    onSuccess(url) {
      this.userForm.avatar = url
    },
  },
}
</script>
