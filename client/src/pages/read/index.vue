<template>
  <div class="read-list">
    <div class="stage">
      <ul class="books-list">
        <li>
          <div class="img-wrap">
            <img src="http://p9uqlanms.bkt.clouddn.com/our%20young.jpg?imageMogr2/thumbnail/200x268/format/webp/blur/1x0/quality/75|imageslim">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
      </ul>
      <div class="desk"></div>
      <div class="desk-shadow"></div>
    </div>
    <div class="stage">
      <ul class="books-list">
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
        <li>
          <div class="img-wrap">
            <img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg">
          </div>
        </li>
      </ul>
      <div class="desk"></div>
      <div class="desk-shadow"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import ArticleCard from '~/components/common/article-card';
import LoadMore from '~/components/common/load-more';

export default {
  components: {
    // ArticleCard,
    LoadMore,
  },

  async fetch({ store }) {
    // await store.dispatch('article/getArtList');
  },

  // computed: {
  //   ...mapState('article', ['list', 'total', 'query']),
  //   hasMore() {
  //     return this.total > this.query.pageNo * this.query.pageSize;
  //   },
  // },

  // beforeDestroy() {
  //   this.$store.commit('article/RESET_LIST');
  // },

  // methods: {
  //   loadMore() {
  //     return this.$store.dispatch('article/getArtList', {
  //       pageNo: this.query.pageNo + 1,
  //       type: 1,
  //     });
  //   },
  // },
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
    }
  }
}
</style>
