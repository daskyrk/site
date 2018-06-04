<template>
  <div class="article-manage">
    <nuxt-link to='add' append>
      <el-button type="primary">添加文章</el-button>
    </nuxt-link>

    <el-table :data="list" style="width: 100%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="标签">
              <span v-for="item in props.row.tag" :key="item._id" style="margin-right: 10px;">{{ item.name }}</span>
            </el-form-item>
            <el-form-item label="关键字">
              <span>{{ props.row.keyword }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.descript }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180">
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
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="公开">
        <template slot-scope="scope">
          {{ scope.row.publish ? '公开' : '私密' }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.state === 1 ? '发布' : '草稿' }}
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
    handleCurrentChange(pageNo) {
      this.$store.dispatch('article/getArtList', {
        pageNo,
        type: 1,
      });
    },
    handleEdit(row) {
      this.$route.push(`/admin/article/${row._id}`);
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
