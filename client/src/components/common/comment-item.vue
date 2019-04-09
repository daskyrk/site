<template>
  <li
    :class="itemClass"
    class="comment-item"
  >
    <div class="comment-avatar">
      <a
        v-if="comment.author.site"
        :href="dealSite(comment.author.site)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :src="gravatar(comment.author.email)"
          alt="comment-avatar"
        >
      </a>
      <img
        v-else
        :src="gravatar(comment.author.email)"
        alt="comment-avatar"
      >
    </div>
    <div class="comment-body">
      <div class="comment-header">
        <strong>{{ comment.author.name }}</strong>
        <span>{{ comment.createdAt | dateFormat('YYYY.MM.DD HH:mm') }}</span>
      </div>
      <div class="comment-content">
        <span
          v-if="comment.pName"
          class="reply-author"
        >
          @{{ comment.pName }}:
        </span> {{ comment.content }}
      </div>
      <div class="comment-footer">
        <span
          :class="{ like: true, active: comment.isLiked }"
          @click="likeComment(comment.id)"
        >
          <i class="iconfont icon-ding" /> 赞({{ comment.likes }})
        </span>
        <span
          v-if="!targetId || targetId !== comment.id"
          class="reply"
          @click="showReply(comment.id)"
        >
          <i class="iconfont icon-reply" /> 回复({{ comment.children.length }})
        </span>
        <span
          v-if="targetId === comment.id"
          class="reply"
          @click="showReply()"
        >
          <i class="iconfont icon-quxiao" /> 取消回复
        </span>
      </div>
      <div
        v-if="targetId === comment.id"
        class="comment-reply"
      >
        <component
          :is="comment.form.comp"
          :on-submit="comment.form.addComment"
        />
      </div>
    </div>
    <ol
      v-if="comment.children.length"
      class="comment-list"
    >
      <comment-item
        v-for="child in comment.children"
        :key="child.id"
        v-bind="$props"
        :comment="child"
      />
    </ol>
  </li>
</template>

<script>
import gravatar from 'gravatar'
import { regexp } from '~/utils'
import CommentItem from '~/components/common/comment-item'

export default {
  name: 'CommentItem',

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
      const cls = {}
      if (this.comment.depth === 1) {
        cls['depth-1'] = true
      }
      return cls
    },
  },

  methods: {
    gravatar(email) {
      if (!regexp.email.test(email)) return null
      let gravatar_url = gravatar.url(email)
      return gravatar_url
    },
    dealSite(site) {
      return site.includes('http') ? site : `http://${site}`
    },
  },
}
</script>


<style lang="scss">
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
    color: $color-text-desc;
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
    color: $color-text-desc;
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
