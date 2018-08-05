<template>
  <div class="read-list">

    <div class="stage" :key="i" v-for="(row, i) in recent">
      <template v-if="row.length">
        <ul class="books-list">
          <li :key="item._id" v-for="item in row">
            <div class="img-wrap">
              <nuxt-link :to='item._id' append>
                <img :src="item.extra.book.image | dealImg({w:100})">
              </nuxt-link>
            </div>
          </li>
        </ul>
        <div class="desk"></div>
        <div class="desk-shadow"></div>
      </template>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  async fetch({ store }) {
    await store.dispatch('article/getArtList', { type: 2 });
  },

  computed: {
    ...mapState('article', ['list', 'total', 'query']),
    hasMore() {
      return this.total > this.query.pageNo * this.query.pageSize;
    },
    recent() {
      return [this.list.slice(0, 6), this.list.slice(6, 12)];
    },
  },

  beforeDestroy() {
    this.$store.commit('article/RESET_LIST');
  },
};
</script>

<style lang='scss' scoped>
.stage {
  position: relative;
  margin: 100px;
}

.desk {
  background: #eae1dc;
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: -35px;
  border-bottom: 1px solid #f5ebe9;
  z-index: -1;
  transform-style: preserve-3d;

  &::after {
    content: '';
    background: #f2edea;
    width: calc(100% + 13%);
    position: absolute;
    height: 65px;
    transform: perspective(340px) rotateX(50deg) translateX(-6.6%)
      translateY(-90px);
  }
}

.desk-shadow {
  position: absolute;
  bottom: -100px;
  z-index: -2;
  background: none;
  width: 100%;
  height: 65px;
  box-shadow: 0 36px 63px rgba(0, 0, 0, 0.3);
  transform: perspective(300px) rotateX(33deg) translateX(3px) translateY(-90px);
}

.books-list {
  padding: 0 80px;
  min-width: 1000px;

  $book-width: 100px;
  $book-height: $book-width * 1.45;

  li {
    position: relative;
    display: inline-block;
    margin-left: 12px;
    width: $book-width + 30;
    height: $book-height;
    z-index: 2;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      overflow: hidden;
      right: 28px;
      bottom: 0px;
      width: 25px;
      height: 129px;
      background: rgba(0, 0, 0, 0.4);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
      transform: perspective(300px) rotateX(29deg) rotateY(-61deg)
        rotateZ(-11deg) translateX(8px) translateY(8px);
      z-index: -1;
    }

    .img-wrap {
      width: $book-width;
      &::before {
        content: '';
        cursor: pointer;
        position: absolute;
        left: -211px;
        top: 0;
        width: 180px;
        height: 100%;
        background-image: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0)
        );
        transform: skewx(-25deg);
      }

      &:hover::before {
        transition: 0.5s;
        left: 140px;
      }
    }

    img {
      width: $book-width;
      height: $book-height;
      cursor: pointer;
      background-color: $white;
    }
  }
}
</style>
