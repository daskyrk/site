<template>
  <div class="article-list">
    <articleView :list="list" @loadMore='loadMore'/>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import articleView from '~/components/common/article';

export default {
  data() {
    return {
      currentPage: this.$store.state.article.query.pageNo,
    };
  },

  async fetch({ store }) {
    await store.dispatch('article/getArtList');
  },

  computed: mapState('article',['list', 'total']),

  methods: {
    loadMore() {
      console.log('call loadMore');
    },
    handleCurrentChange(pageNo) {
      this.$store.dispatch('article/getArtList', {
        pageNo,
        type: 1,
      });
    },
  },

  components: {
    articleView,
  },
};
</script>

<style lang='scss' scoped>
.article-list {
  min-width: 38rem;
  width: 60%;
}
</style>
