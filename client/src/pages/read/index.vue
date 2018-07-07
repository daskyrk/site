<template>
  <div class="read-list">
    <div class="stage">
      <ul class="books-list">
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
      </ul>
      <div class="desk"></div>
      <div class="desk-shadow"></div>
    </div>
    <div class="stage">
      <ul class="books-list">
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
        <li><img src="http://jjckb.xinhuanet.com/2016-05/20/135374404_14637120163591n.jpg"></li>
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

  li {
    position: relative;
    display: inline-block;
    margin-left: 12px;
    width: 130px;
    height: 134px;
    z-index: 2;
    overflow-y: hidden;
    overflow-x: visible;

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

    img {
      width: 100px;
      height: 134px;
    }
  }
}
</style>
