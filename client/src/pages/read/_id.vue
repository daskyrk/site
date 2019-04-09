<template>
  <div class="read-thought">
    <div class="side">
      <div class="title">
        <nuxt-link
          to="../"
          append
        >
          <i class="back iconfont icon-fanhui" />
        </nuxt-link>
        {{ bookInfo.title }}
      </div>
      <div class="author">
        {{ bookInfo.author.join(' ') }}
      </div>
      <div class="img-wrap">
        <img
          :src="bookInfo.image | dealImg({h: 300})"
          alt="book-image"
        >
      </div>
      <div
        v-if="bookInfo.saying"
        class="saying"
      >
        <i class="iconfont icon-quotation" />
        <p>
          {{ bookInfo.saying }}
        </p>
      </div>
    </div>
    <div class="post-wrap">
      <Post :detail="detail" />
    </div>
  </div>
</template>

<script>
import Post from '~/components/post/post-page'
import { mapState } from 'vuex'

export default {
  components: {
    Post,
  },

  layout: 'empty',

  computed: {
    ...mapState('post', ['detail']),
    bookInfo() {
      return this.detail.extra ? this.detail.extra.book : {}
    },
  },

  async fetch({ store, params }) {
    await store.dispatch('post/getPost', params.id)
    await store.dispatch('tag/getTags', { pageSize: 100 })
  },
}
</script>

<style lang="scss">
.read-thought {
  display: flex;
}

.side {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: antiquewhite;
  padding: 2rem;

  &:hover {
    .back {
      color: $color-text;
    }
  }

  .back {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 1.8rem;
    font-size: 1.8rem;
    color: $color-text-desc;
  }

  .title {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .author {
    font-size: 0.875rem;
    color: $color-text-desc;
    margin-bottom: 2rem;
  }

  .img-wrap {
    height: 300px;
  }

  .saying {
    margin-top: 3rem;
    position: relative;

    i {
      font-size: 1.5rem;
      color: $color-text-sub;
    }

    p {
      text-indent: 1rem;
      padding: 1rem;
      border-top: 1px solid $color-text-sub;
      border-bottom: 1px solid $color-text-sub;
    }
  }
}

.post-wrap {
  flex: 3;
  display: flex;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
  overflow: auto;
}
</style>
