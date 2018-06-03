<template>
  <div class="article-manage">
    <nuxt-link to='add' append>
      <el-button type="primary">添加文章</el-button>
    </nuxt-link>

    <el-table :data="list" style="width: 100%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="180">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="180">
        <template slot-scope="scope">
          {{ scope.row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">
          {{ scope.row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column label="公开">
        <template slot-scope="scope">
          {{ scope.row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import articleView from '~/components/common/article';

export default {
  // layout: 'manage',
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
.article-list {
  min-width: 38rem;
  width: 60%;
}
</style>
