<template>
  <div class="article" ref="article">
    <h3 class="title">{{detail.title}}</h3>
    <div class="meta">
      <span class="time">{{ detail.createdAt | dateFormat('YYYY.MM.DD HH:MM') }}</span>
      <span>字数 {{detail.content.length}}</span>
      <span>阅读 {{detail.meta.views}}</span>
      <span>喜欢 {{detail.meta.likes}}</span>
      <span>评论 {{detail.meta.comments}}</span>
    </div>
    <div class="content markdown-content" v-html="marked(detail.content)">
    </div>
    <aside class="side">
      <el-tooltip :disabled="!isLiked" effect="dark" content="您已喜欢过该文章啦~" placement="top">
        <div :class="{ red: true, active: isLiked }" @click="like(detail._id)">
          <i class="iconfont icon-xin"></i>
        </div>
      </el-tooltip>
      <div class="green">
        <i class="iconfont icon-liuyan "></i>
      </div>
      <back-top cls="blue" :distance="260" />
    </aside>
    <div class="share">

    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import markdown from '~/plugins/marked';
import { setLS, getLS } from '~/utils';
import BackTop from '~/components/common/back-top';

export default {
  components: {
    BackTop,
  },

  data() {
    return {
      likes: [],
    };
  },

  computed: {
    ...mapState('article', ['detail']),
    isLiked: function() {
      return this.likes.includes(this.detail._id);
    },
  },

  async fetch({ store, params }) {
    await store.dispatch('article/getArt', params.id);
  },

  methods: {
    marked(content) {
      return markdown(content);
    },
    like(id) {
      if (this.isLiked) {
        return;
      }
      this.$store.dispatch('article/likeArt', id).then(res => {
        if (res.code === 1) {
          this.likes.push(id);
          setLS('article-like', this.likes);
        }
      });
    },
  },

  beforeMount() {
    this.likes = getLS('article-like') || [];
  },
};
</script>

<style lang="scss" scoped>
.article {
  width: 40%;
  min-width: 41.25rem;
}

.meta {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: $color-text-sub;
  span {
    margin-right: 0.5rem;
  }
}

aside {
  position: fixed;
  top: 18.75rem;
  right: calc((100% - 40%) / 2 - 4rem);
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