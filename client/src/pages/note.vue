<template>
  <div class="article">
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
import articleView from '~/components/common/article';

export default {
  data() {
    return {
      currentPage: this.$store.state.article.pagination.pageNo,
    };
  },

  fetch({ store }) {
    return store.dispatch('article/getArtList');
  },

  computed: {
    list() {
      return this.$store.state.article.list;
    },
    total() {
      return this.$store.state.article.total;
    },
  },

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
.article {
}
</style>
