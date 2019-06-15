<template>
  <div
    ref="post"
    class="post"
  >
    <h2 class="title">
      {{ detail.title }}
    </h2>
    <div class="meta">
      <span class="time">
        {{ detail.createdAt | dateFormat('YYYY.MM.DD HH:MM') }}
      </span>
      <span>字数 {{ detail.content.length }}</span>
      <span>阅读 {{ detail.meta.views }}</span>
      <span>喜欢 {{ detail.meta.likes }}</span>
      <span>评论 {{ detail.meta.comments }}</span>
    </div>
    <!-- eslint-disable -->
    <div class="content markdown-content" v-html="marked(detail.content)" />
    <!-- eslint-enable -->
    <div class="post-info">
      <span>
        <a
          href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
          target="_blank"
        >
          非商用-署名-自由转载
        </a>
      </span>
      <TagList
        :tags="detail.tags"
        :on-click="searchByTag"
      />
    </div>
    <aside class="side">
      <Tooltip
        :disabled="!isLiked"
        right
        content="您已喜欢过该文章啦~"
      >
        <div
          :class="{ 'c-red': true, active: isLiked }"
          @click="like(detail.id)"
        >
          <i class="iconfont icon-xin" />
        </div>
      </Tooltip>
      <div
        v-if="mounted.comment"
        class="c-green"
        @click="scrollToComment"
      >
        <i class="iconfont icon-liuyan" />
      </div>
      <back-top
        :distance="260"
        cls="c-blue"
      />
    </aside>
    <lazy-component>
      <Share :detail="detail.content" />
    </lazy-component>
    <lazy-component @show="markMounted('comment')">
      <comment
        ref="comment"
        :post-id="detail.id"
      />
    </lazy-component>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import markdown from '~/utils/marked'
import { setLS, getLS } from '~/utils'
import BackTop from '~/components/common/back-top'
import Share from '~/components/common/share'
import Comment from '~/components/common/comment'
import TagList from '~/components/common/tag-list'

export default {
  components: {
    BackTop,
    Share,
    Comment,
    TagList,
  },

  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      likes: [],
      mounted: {
        comment: false,
      },
    }
  },

  computed: {
    // ...mapState('post', ['detail']),
    isLiked: function() {
      return this.likes.includes(this.detail.id)
    },
  },

  beforeMount() {
    this.likes = getLS('post-like') || []
  },

  methods: {
    marked(content) {
      return markdown(content)
    },
    like(id) {
      if (this.isLiked) {
        return
      }
      this.$store.dispatch('post/likePost', id).then(res => {
        if (res.success) {
          this.likes.push(id)
          setLS('post-like', this.likes)
        }
      })
    },
    scrollToComment() {
      if (this.$refs.comment) {
        this.$refs.comment.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        })
      }
    },
    markMounted(key) {
      this.mounted[key] = true
    },
    searchByTag(item) {
      this.$router.push(`/search?tag=${item.name}`)
    },
  },
}
</script>

<style lang="scss">
.post {
  max-width: 732px;
  padding: 1rem;
  background: $c-white;

  .meta {
    margin-top: 1rem;
    color: $color-text-desc;
    font-size: .75rem;

    span {
      margin-right: .5rem;
    }
  }

  .content {
    margin-top: 1rem;
    overflow: auto;
  }

  .post-info {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    color: $color-text-sub;
    font-size: .75rem;

    a {
      color: $color-text-sub;
    }
  }

  .share-box {
    margin: 2rem 0;
    padding: 1rem 0;
  }

  aside {
    position: fixed;
    top: 18.75rem;
    right: 2rem;
    user-select: none;

    > div {
      width: 3rem;
      height: 3rem;
      margin-top: .5rem;
      line-height: 3rem;
      text-align: center;
      background: rgba(255, 255, 255, .8);
      border: 1px solid $c-platinum;
      border-radius: 100%;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .14);
      cursor: pointer;

      &.active,
      &:hover {
        &.c-red {
          color: $c-red;
          border-color: $c-red;
        }

        &.c-blue {
          color: $c-blue;
          border-color: $c-blue;
        }

        &.c-green {
          color: $c-green;
          border-color: $c-green;
        }
      }

      i {
        font-size: 1.2rem;
      }
    }
  }
}

@include sm-width() {
  .post {
    // width: 100%;
    aside {
      display: none;
    }
  }
}

@include md-width() {
  .post {
    // width: 70%;
  }
}
</style>
