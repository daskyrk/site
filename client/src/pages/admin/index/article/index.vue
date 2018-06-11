<template>
  <div class="article-manage">
    <nuxt-link to='add' append>
      <el-button type="primary">添加文章</el-button>
    </nuxt-link>

    <el-table :data="list" v-loading="fetch" style="width: 100%">

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
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="180">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat('YYYY.MM.DD') }}
        </template>
      </el-table-column>
      <el-table-column label="分类" width="180">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="公开" width="180">
        <template slot-scope="scope">
          {{ scope.row.publish ? '公开' : '私密' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
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
      <el-pagination @current-change="pageChange" :current-page="query.pageNo" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  meta: {
    breadcrumb: '文章管理',
  },

  async fetch({ store }) {
    await store.dispatch('article/getArtList');
  },

  data() {
    return {
      deletingId: null,
    };
  },

  computed: mapState('article', ['fetch', 'list', 'total', 'query']),

  methods: {
    pageChange(pageNo) {
      this.$store.dispatch('article/getArtList', {
        pageNo,
        type: 1,
      });
    },
    editArt(row) {
      this.$router.push(`/admin/article/${row._id}`);
    },
    deleteArt(row) {
      this.$store.dispatch('article/delArt', row._id);
    },
    isDeleting(row) {
      return row._id === this.deletingId;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
