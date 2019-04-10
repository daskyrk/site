<template>
  <div class="read-list">
    <div
      v-for="(row, i) in recent"
      :key="i"
      class="stage"
    >
      <template v-if="row.length">
        <ul class="books-list">
          <li
            v-for="item in row"
            :key="item.id"
          >
            <div class="img-wrap">
              <nuxt-link
                :to="item.id"
                append
              >
                <img :src="item.extra.book.image | dealImg({w:100})">
              </nuxt-link>
            </div>
          </li>
        </ul>
        <div class="desk" />
        <div class="desk-shadow" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('post', ['list', 'total', 'query']),
    hasMore() {
      return this.total > this.query.pageNo * this.query.pageSize
    },
    recent() {
      return [this.list.slice(0, 6), this.list.slice(6, 12)]
    },
  },

  async fetch({ store }) {
    await store.dispatch('post/getPostList', { type: 'READ' })
  },

  beforeDestroy() {
    this.$store.commit('post/RESET_LIST')
  },
}
</script>

<style lang='scss'>
.stage {
  position: relative;
  margin: 100px;
}

.desk {
  position: absolute;
  bottom: -35px;
  z-index: -1;
  width: 100%;
  height: 20px;
  background: #eae1dc;
  border-bottom: 1px solid #f5ebe9;
  transform-style: preserve-3d;

  &::after {
    position: absolute;
    width: calc(100% + 13%);
    height: 65px;
    background: #f2edea;
    transform: perspective(340px) rotateX(50deg) translateX(-6.6%)
      translateY(-90px);
    content: "";
  }
}

.desk-shadow {
  position: absolute;
  bottom: -100px;
  z-index: -2;
  width: 100%;
  height: 65px;
  background: none;
  box-shadow: 0 36px 63px rgba(0, 0, 0, .3);
  transform: perspective(300px) rotateX(33deg) translateX(3px) translateY(-90px);
}

.books-list {
  min-width: 1000px;
  padding: 0 80px;

  $book-width: 100px;
  $book-height: $book-width * 1.45;

  li {
    position: relative;
    z-index: 2;
    display: inline-block;
    width: $book-width + 30;
    height: $book-height;
    margin-left: 12px;
    overflow: hidden;

    &::after {
      position: absolute;
      right: 28px;
      bottom: 0;
      z-index: -1;
      width: 25px;
      height: 129px;
      overflow: hidden;
      background: rgba(0, 0, 0, .4);
      box-shadow: 0 0 5px rgba(0, 0, 0, .4);
      transform: perspective(300px) rotateX(29deg) rotateY(-61deg)
        rotateZ(-11deg) translateX(8px) translateY(8px);
      content: "";
    }

    .img-wrap {
      width: $book-width;

      &::before {
        position: absolute;
        top: 0;
        left: -211px;
        width: 180px;
        height: 100%;
        background-image: linear-gradient(
          0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .5), rgba(255, 255, 255, 0)
        );
        transform: skewx(-25deg);
        cursor: pointer;
        content: "";
      }

      &:hover::before {
        left: 140px;
        transition: .5s;
      }
    }

    img {
      width: $book-width;
      height: $book-height;
      background-color: $white;
      cursor: pointer;
    }
  }
}
</style>
