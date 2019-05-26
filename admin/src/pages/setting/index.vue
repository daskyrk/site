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
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Company (disabled)"
                    disabled
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="City"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Country"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    更新信息
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
            <img
              src="/img/avatar.jpg"
            >
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
import { mapState } from 'vuex'

export default {
  meta: {
    breadcrumb: '系统设置',
  },

  components: {
    // ImageUploader,
  },

  data() {
    const checkPassComfirm = (rule, value, callback) => {
      let msg = null
      if (value !== this.userForm.newPassword) {
        msg = '两次输入密码不一致!'
      }
      if (msg) {
        callback(new Error(msg))
      } else {
        callback()
      }
    }
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
    }
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
      }
    },
  },

  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { checkPass, ...rest } = this.userForm
          this.$store.dispatch('user/updateConfig', rest)
        }
      })
    },
    onSuccess(url) {
      this.userForm.avatar = url
    },
  },
}
</script>

<style lang="scss" scoped>
.user-setting-form {
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
}

.img-item {
  margin-bottom: 0;
}
</style>
