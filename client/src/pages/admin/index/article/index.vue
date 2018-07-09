<template>
  <div class="article-manage">
    <nuxt-link to='add' append>
      <el-button type="primary">添加文章</el-button>
    </nuxt-link>

    <el-table :data="list" v-loading="fetch" style="width: 100%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <p>关键字: {{ props.row.keyword }}</p>
          <p>描述: {{ props.row.descript }}</p>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <el-tag class="article-tag" :key="tag" v-for="tag in scope.row.tags">
            {{nameMap[tag]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="180">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat('YYYY.MM.DD') }}
        </template>
      </el-table-column>
      <el-table-column label="公开" width="120">
        <template slot-scope="scope">
          {{ scope.row.public ? '公开' : '私密' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.state === 1 ? '发布' : '草稿' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="info" size="small" @click="editArt(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteArt(scope.row)" :loading="isDeleting(scope.row)">{{ isDeleting(scope.row) ? '删除中' : '删 除' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background @current-change="pageNoChange" @size-change="pageSizeChange" :current-page="query.pageNo" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  meta: {
    breadcrumb: '文章列表',
  },

  async fetch({ store }) {
    await store.dispatch('admin/article/getArtList');
    await store.dispatch('tag/getTags', { pageSize: 100 });
  },

  data() {
    return {
      deletingId: null,
    };
  },

  computed: {
    ...mapState('admin/article', ['fetch', 'list', 'total', 'query']),
    ...mapGetters('tag', ['nameMap']),
  },

  // beforeDestroy() {
  //   this.$store.commit('admin/article/RESET_LIST');
  // },

  methods: {
    pageNoChange(pageNo) {
      this.$store.dispatch('admin/article/getArtList', {
        pageNo,
        type: 1,
      });
    },
    pageSizeChange(pageSize) {
      this.$store.dispatch('admin/article/getArtList', {
        pageNo: 1,
        pageSize,
        type: 1,
      });
    },
    editArt(row) {
      this.$router.push(`/admin/article/${row._id}`);
    },
    deleteArt(row) {
      this.$store.dispatch('admin/article/delArt', row._id);
    },
    isDeleting(row) {
      return row._id === this.deletingId;
    },
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  float: right;
  margin-top: 1rem;
}

.article-tag {
  margin-right: 0.5rem;
}
</style>
