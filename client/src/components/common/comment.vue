<template>
  <div class="comment-box">
    <div class="summary">
      <strong class="total">{{total}} 条评论</strong>
      <span class="line"></span>
    </div>
    <form class="comment-form" id="comment-form">
      <div class="comment-editor-box">
        <div class="avatar">
          <img v-if="author.gravatar" :alt="author.name || '匿名用户'" :src="author.gravatar">
          <i v-else class="iconfont icon-niming"></i>
        </div>
        <comment-editor :onSubmit="addComment" :onFocus="hideReply" />
      </div>
      <div class="author-info">

        <el-tooltip :value="nameHasError" manual effect="dark" content="名字忘了写吧~" placement="bottom">
          <input type="input" name="name" :class="{error: nameHasError}" required maxlength="20" placeholder="尊姓大名" v-model="author.name" @blur="checkName" />
        </el-tooltip>

        <el-tooltip :value="emailHasError" manual effect="dark" content="格式不对哦~" placement="bottom">
          <input type="email" name="email" :class="{error: emailHasError}" required maxlength="40" placeholder="接收回复用" v-model="author.email" @blur="checkEmail" />
        </el-tooltip>
        <!-- <input type="input" name="site" maxlength="20" placeholder="您的网站？" v-model="author.site" /> -->
      </div>
    </form>

    <ul class="comment-list">
      <li class="comment-item" :key="comment._id" v-for="comment in list">
        <img :alt="comment.author.name" :src="gravatar(comment.author.email)">
        <div class="comment-body">
          <div class="comment-header">
            <strong>{{comment.author.name}}</strong>
            <span>{{comment.createdAt | dateFormat('YYYY.MM.DD HH:mm')}}</span>
          </div>
          <div class="comment-content">
            {{comment.content}}
          </div>
          <div class="comment-footer">
            <span :class="{ like: true, active: isLiked(comment._id) }" @click="likeComment(comment._id)">
              <i class="iconfont icon-ding"></i> 顶({{comment.likes}})
            </span>
            <span v-if="!reply.pid" class="reply" @click="showReply(comment._id)">
              <i class="iconfont icon-reply"></i> 回复(0)
            </span>
            <span v-if="reply.pid" class="reply" @click="hideReply()">
              <i class="iconfont icon-quxiao"></i> 取消回复
            </span>
          </div>
          <div class="comment-reply" v-if="reply.pid === comment._id">
            <comment-editor :onSubmit="addComment" :placeholder="'回复: '+comment.author.name" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import gravatar from 'gravatar';
import marked from '~/utils/marked';
import { setLS, getLS } from '~/utils';
import EmojiBox from '~/components/common/emoji-box';
import CommentEditor from '~/components/common/comment-editor';

export default {
  components: {
    EmojiBox,
    CommentEditor,
  },

  props: {
    articleId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      comment: {
        content: '',
        pid: 0,
      },
      author: {
        name: '',
        email: '',
        site: '',
        gravatar: null,
      },
      likeComments: [],
      reply: {
        content: '',
        pid: '',
      },
      nameHasError: false,
      emailHasError: false,
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        // url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
      },
    };
  },

  computed: {
    ...mapState('comment', ['list', 'total']),
  },

  beforeMount() {
    this.likeComments = getLS('comment-like') || [];
  },

  mounted() {
    this.getComments();
  },

  methods: {
    async getComments(params = {}) {
      // params.sort = this.sortMode;
      const res = await this.$store.dispatch('comment/getComments', {
        ...params,
        articleId: this.articleId,
      });
    },
    marked(content) {
      return marked(content, null, false);
    },
    gravatar(email) {
      if (!this.regexs.email.test(email)) return null;
      let gravatar_url = gravatar.url(email);
      return gravatar_url;
    },
    insert(type) {
      const insertMap = {
        img: '\n![alt](src)',
        link: '[title](url)',
        code: '\n```\n\n```',
      };
      this.comment.content += insertMap[type];
    },
    insertEmoji(emj) {
      this.comment.content += emj;
    },
    checkName() {
      this.nameHasError = !this.author.name.length;
    },
    checkEmail() {
      this.emailHasError = !this.regexs.email.test(this.author.email);
      this.updateGravatar();
    },
    // 更新头像
    updateGravatar() {
      this.author.gravatar = this.emailHasError
        ? null
        : this.gravatar(this.author.email);
    },
    addComment(e) {
      // e.preventDefault();
      console.log('e:', e);
      if (this.nameHasError || this.emailHasError) {
        return this.$message.error('是不是写错了什么？');
      }
      // this.$store
      //   .dispatch('comment/addComment', {
      //     articleId: this.articleId,
      //     ...this.comment,
      //     pageUrl: location.href,
      //     author: this.author,
      //   })
      //   .then(res => {
      //     if (res.code === 1) {
      //       this.getComments({ pageNo: 1 });
      //     }
      //   });
    },
    isLiked(id) {
      return this.likeComments.includes(id);
    },
    likeComment(id) {
      if (this.isLiked(id)) {
        return;
      }
      this.$store.dispatch('comment/likeComment', id).then(res => {
        if (res.code === 1) {
          this.likeComments.push(id);
          setLS('comment-like', this.likeComments);
        }
      });
    },
    showReply(commentId) {
      this.reply.pid = commentId;
    },
    hideReply() {
      this.reply.pid = null;
    },
    replyComment(id) {
      this.$store.dispatch('comment/replyComment', id).then(res => {
        if (res.code === 1) {
          this.likeComments.push(id);
          setLS('comment-like', this.likeComments);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.comment-box {
  .summary {
    position: relative;
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
    .line {
      height: 1px;
      flex-grow: 1;
      background-color: $color-split;
      margin-left: 1.25rem;
    }
  }

  .comment-editor-box {
    width: 100%;
    display: flex;
    .avatar {
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

  .author-info {
    margin-left: 4rem;
    margin-top: 0.4rem;
    display: flex;

    input {
      width: 100%;
      height: 2em;
      padding: 0.5rem;
      background: transparent;
      border: 1px solid $platinum;
      border-radius: 4px;
      margin-right: 1rem;
      outline: none;
      &:hover {
        border-color: $lightblack;
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

  .comment-list {
    margin-top: 1rem;

    .comment-item {
      position: relative;
      padding: 0.375rem 0 0.375rem 4rem;
      img {
        position: absolute;
        left: 0;
        top: 0.875rem;
        width: 3rem;
        border-radius: $radius;
      }
    }

    .comment-body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 0.5rem;

      &:hover {
        .comment-footer .reply {
          opacity: 0.9;
        }
      }

      .comment-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: $color-text-sub;
      }

      .comment-content {
        line-height: 2em;
        margin: 0.8em 0;
        word-wrap: break-word;
      }

      .comment-footer {
        font-size: 12px;
        color: $color-text-sub;
        opacity: 0.9;

        i {
          margin-right: 0.1875rem;
        }

        span {
          display: inline-flex;
          align-items: center;
          margin-right: 1rem;
          cursor: pointer;
          &.active,
          &:hover {
            &.like {
              color: $red;
            }

            &.reply {
              color: $green;
            }
          }
        }

        .reply {
          opacity: 0;
        }
      }
    }

    .comment-reply {
      padding-top: 0.5rem;
    }
  }
}
</style>

