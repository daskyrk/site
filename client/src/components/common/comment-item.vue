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


<style lang="scss" scoped>
.comment-item {
  position: relative;

  .comment-avatar {
    position: relative;
    z-index: 1;
    float: left;
    width: 3.2rem;
    padding: .5rem 0;
    background-color: $c-white;

    img {
      width: 100%;
      border-radius: $radius;
    }
  }

  &::before {
    position: absolute;
    top: -500%;
    left: 1.5rem;
    width: 1px;
    height: 500%;
    background: $c-lightgray;
    content: "";
  }

  &.depth-1 {
    margin-bottom: .75rem;
    overflow: hidden;

    &:last-child {
      border-bottom: none;
    }
  }
}

.comment-body {
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
  padding: .5rem;

  &:hover {
    .comment-footer .reply {
      opacity: .9;
    }
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    color: $color-text-desc;
    font-size: .8rem;
  }

  .comment-content {
    margin: .7rem 0 .5rem;
    line-height: 2rem;
    word-wrap: break-word;
  }

  .reply-author {
    color: $c-red;
    font-weight: bold;
  }

  .comment-footer {
    color: $color-text-desc;
    font-size: 12px;
    opacity: .9;

    i {
      margin-right: .1875rem;
    }

    span {
      display: inline-flex;
      align-items: center;
      margin-right: 1rem;
      cursor: pointer;

      &.active,
      &:hover {
        &.like {
          color: $c-red;
        }

        &.reply {
          color: $c-green;
        }
      }
    }

    .reply {
      opacity: 0;
    }
  }
}

.comment-reply {
  margin-bottom: 100px;
  padding-top: .5rem;
}
</style>
