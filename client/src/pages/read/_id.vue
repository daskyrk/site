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
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: antiquewhite;

  &:hover {
    .back {
      color: $color-text;
    }
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    color: $color-text-desc;
    font-size: 1.8rem;
    line-height: 1.8rem;
  }

  .title {
    position: relative;
    width: 100%;
    margin-bottom: .5rem;
    font-weight: 500;
    font-size: 1.25rem;
    text-align: center;
  }

  .author {
    margin-bottom: 2rem;
    color: $color-text-desc;
    font-size: .875rem;
  }

  .img-wrap {
    height: 300px;
  }

  .saying {
    position: relative;
    margin-top: 3rem;

    i {
      color: $color-text-sub;
      font-size: 1.5rem;
    }

    p {
      padding: 1rem;
      text-indent: 1rem;
      border-top: 1px solid $color-text-sub;
      border-bottom: 1px solid $color-text-sub;
    }
  }
}

.post-wrap {
  display: flex;
  flex: 3;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  overflow: auto;
}
</style>
