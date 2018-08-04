<template>
  <li class="comment-item" :class="itemClass">
    <div class="comment-avatar">
      <a :href="comment.author.site" v-if="comment.author.site">
        <img alt="comment-avatar" :src="gravatar(comment.author.email)">
      </a>
      <img v-else alt="comment-avatar" :src="gravatar(comment.author.email)">
    </div>
    <div class="comment-body">
      <div class="comment-header">
        <strong>{{comment.author.name}}</strong>
        <span>{{comment.createdAt | dateFormat('YYYY.MM.DD HH:mm')}}</span>
      </div>
      <div class="comment-content">
        <span class="reply-author" v-if="comment.pName">@{{comment.pName}}:</span> {{comment.content}}
      </div>
      <div class="comment-footer">
        <span :class="{ like: true, active: comment.isLiked }" @click="likeComment(comment._id)">
          <i class="iconfont icon-ding"></i> 赞({{comment.likes}})
        </span>
        <span v-if="!targetId || targetId !== comment._id" class="reply" @click="showReply(comment._id)">
          <i class="iconfont icon-reply"></i> 回复({{comment.children.length}})
        </span>
        <span v-if="targetId === comment._id" class="reply" @click="showReply()">
          <i class="iconfont icon-quxiao"></i> 取消回复
        </span>
      </div>
      <div class="comment-reply" v-if="targetId === comment._id">
        <component :is="comment.form.comp" :onSubmit="comment.form.addComment"></component>
      </div>
    </div>
    <ol class="comment-list" v-if="comment.children.length">
      <comment-item :key="child._id" v-for="child in comment.children" v-bind="$props" :comment="child" />
    </ol>
  </li>
</template>

<script>
import gravatar from 'gravatar';
import { regexp } from '~/utils';
import CommentItem from '~/components/common/comment-item';

export default {
  name: 'comment-item',

  components: {
    CommentItem,
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },
    likeComment: {
      type: Function,
      required: true,
    },
    showReply: {
      type: Function,
      required: true,
    },
    targetId: String,
  },

  computed: {
    itemClass() {
      const cls = {};
      if (this.comment.depth === 1) {
        cls['depth-1'] = true;
      }
      return cls;
    },
  },

  methods: {
    gravatar(email) {
      if (!regexp.email.test(email)) return null;
      let gravatar_url = gravatar.url(email);
      return gravatar_url;
    },
  },
};
</script>


<style lang="scss" scoped>
.comment-item {
  position: relative;
  .comment-avatar {
    position: relative;
    float: left;
    z-index: 1;
    width: 3.2rem;
    padding: 0.5rem 0;
    background-color: $white;
    img {
      border-radius: $radius;
      width: 100%;
    }
  }

  &::before {
    content: '';
    width: 1px;
    height: 500%;
    background: $lightgray;
    left: 1.5rem;
    top: -500%;
    position: absolute;
  }

  &.depth-1 {
    overflow: hidden;
    border-bottom: 1px solid $color-border;
    margin-bottom: 0.75rem;

    &:last-child {
      border-bottom: none;
    }
  }
}

.comment-body {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-left: 4rem;

  &:hover {
    .comment-footer .reply {
      opacity: 0.9;
    }
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: $color-text-sub;
  }

  .comment-content {
    line-height: 2rem;
    margin: 0.7rem 0 0.5rem;
    word-wrap: break-word;
  }

  .reply-author {
    color: $red;
    font-weight: bold;
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
  margin-bottom: 100px;
}
</style>
