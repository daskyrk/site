<template>
  <div class="comment-form">
    <div class="comment-editor-box">
      <div class="avatar">
        <img
          v-if="author.gravatar"
          :alt="author.name || '匿名用户'"
          :src="author.gravatar"
        >
        <i
          v-else
          class="iconfont icon-niming"
        />
      </div>
      <comment-editor
        :on-submit="submit"
        :on-focus="onFocus"
        :placeholder="placeholder"
      />
    </div>
    <div class="author-info">
      <el-tooltip
        :value="nameHasError"
        manual
        effect="dark"
        content="名字忘了写吧~"
        placement="bottom"
      >
        <input
          v-model="author.name"
          :class="{error: nameHasError}"
          type="input"
          name="name"
          required
          maxlength="20"
          placeholder="您的名称"
          @blur="checkName"
        >
      </el-tooltip>

      <el-tooltip
        :value="emailHasError"
        manual
        effect="dark"
        content="格式不对哦~"
        placement="bottom"
      >
        <input
          v-model="author.email"
          :class="{error: emailHasError}"
          type="email"
          name="email"
          required
          maxlength="40"
          placeholder="接收回复的邮箱"
          @blur="checkEmail"
        >
      </el-tooltip>
      <input
        v-model="author.site"
        type="input"
        name="site"
        maxlength="20"
        placeholder="您的网站"
      >
    </div>
  </div>
</template>


<script>
import gravatar from 'gravatar'
import { regexp } from '~/utils'
import marked from '~/utils/marked'
import CommentEditor from '~/components/common/comment-editor'

export default {
  components: {
    CommentEditor,
  },

  props: {
    onSubmit: {
      required: true,
      type: Function,
    },
    onFocus: Function,
    placeholder: String,
  },

  data() {
    return {
      author: {
        name: '',
        email: '',
        site: '',
        gravatar: null,
      },
      nameHasError: false,
      emailHasError: false,
    }
  },

  methods: {
    // marked(content) {
    //   return marked(content, null, false);
    // },
    checkName() {
      this.nameHasError = !this.author.name.length
    },
    checkEmail() {
      this.emailHasError = !regexp.email.test(this.author.email)
      this.updateGravatar()
    },
    // 更新头像
    updateGravatar() {
      this.author.gravatar = this.emailHasError
        ? null
        : this.gravatar(this.author.email)
    },
    gravatar(email) {
      if (!regexp.email.test(email)) return null
      let gravatar_url = gravatar.url(email)
      return gravatar_url
    },
    submit(content) {
      if (this.nameHasError || this.emailHasError) {
        return this.$message.error('是不是写错了什么？')
      }
      this.onSubmit({ content, author: this.author })
    },
  },
}
</script>

.<style lang="scss" scoped>
.comment-form {
  .author-info {
    display: flex;
    margin-left: 4rem;

    input {
      width: 100%;
      height: 2em;
      margin-top: .5rem;
      margin-right: 1rem;
      padding: 0 .5rem;
      background: transparent;
      border: 1px solid $c-platinum;
      border-radius: 4px;
      outline: none;
      transition: border-color .3s ease-in-out;

      &:hover {
        border-color: $c-lightblack;
      }

      &:focus {
        border-color: $color-primary;
      }

      &:last-child {
        margin-right: 0;
      }

      &.error {
        border-color: $color-danger;
      }
    }
  }

  .comment-editor-box {
    display: flex;
    width: 100%;

    .avatar {
      position: relative;
      width: 3rem;
      margin-right: 1rem;

      img {
        width: 100%;
        border-radius: $radius;
      }

      i {
        font-size: 3rem;
      }
    }
  }
}

@include sm-width () {
  .comment-form {
    .author-info {
      display: block;

      input {
        margin-right: 0;
      }
    }
  }
}
</style>
