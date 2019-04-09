<template>
  <div
    ref="post"
    class="post"
  >
    <h3 class="title">
      {{ detail.title }}
    </h3>
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
    <div
      class="content markdown-content"
      v-html="marked(detail.content)"
    />
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
      <div
        v-if="detail.tags.length"
        class="tags"
      >
        <i class="iconfont icon-biaoqian" />
        <nuxt-link
          v-for="tag in detail.tags"
          :key="tag"
          :to="`/search?tag=${tag}`"
        >
          {{ nameMap[tag] }}
        </nuxt-link>
      </div>
    </div>
    <aside class="side">
      <el-tooltip
        :disabled="!isLiked"
        effect="dark"
        content="您已喜欢过该文章啦~"
        placement="top"
      >
        <div
          :class="{ red: true, active: isLiked }"
          @click="like(detail.id)"
        >
          <i class="iconfont icon-xin" />
        </div>
      </el-tooltip>
      <div
        v-if="mounted.comment"
        class="green"
        @click="scrollToComment"
      >
        <i class="iconfont icon-liuyan" />
      </div>
      <back-top
        :distance="260"
        cls="blue"
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

export default {
  components: {
    BackTop,
    Share,
    Comment,
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
    ...mapGetters('tag', ['nameMap']),
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
  },
}
</script>

<style lang="scss" scoped>
.post {
  width: 40%;
  min-width: 41.25rem;
}

.meta {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: $color-text-desc;
  span {
    margin-right: 0.5rem;
  }
}

.content {
  overflow: auto;
  margin-top: 1rem;
}

.post-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  font-size: 0.75rem;
  margin-top: 2rem;
  color: $color-text-sub;

  .tags {
    a {
      margin-left: 0.5rem;
    }
  }

  a:hover {
    text-decoration: underline;
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
    line-height: 3rem;
    text-align: center;
    margin-top: 0.5rem;
    border: 1px solid $platinum;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    cursor: pointer;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.8);

    &.active,
    &:hover {
      &.red {
        border-color: $red;
        color: $red;
      }
      &.blue {
        border-color: $blue;
        color: $blue;
      }
      &.green {
        border-color: $green;
        color: $green;
      }
    }

    i {
      font-size: 1.2rem;
    }
  }
}
</style>