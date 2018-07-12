<template>
  <div class="article-manage">
    <div class="page-filter">
      <el-form :model="filterForm" ref="filterForm" class="filter-form" size="medium">
        <div class="form-content">
          <el-form-item label="关键字">
            <el-col :span="6">
              <el-input v-model="filterForm.keyword"></el-input>
            </el-col>
          </el-form-item>
          <el-row>
            <el-col :span="5">
              <el-form-item label="状态">
                <el-radio-group v-model="filterForm.state">
                  <el-radio-button label="发布"></el-radio-button>
                  <el-radio-button label="草稿"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="公开">
                <el-radio-group v-model="filterForm.public">
                  <el-radio-button label="公开"></el-radio-button>
                  <el-radio-button label="私密"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="分类">
                <el-radio-group v-model="filterForm.type">
                  <el-radio-button label="文章"></el-radio-button>
                  <el-radio-button label="读书"></el-radio-button>
                  <el-radio-button label="音乐"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item label="创建时间" prop="startAt" >
            <el-date-picker v-model="filterForm.startAt" type="daterange" range-separator="到" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="filterForm.tag">
              <el-option :key="tag._id" v-for="tag in tagList" :label="tag.name" :value="tag._id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-footer">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <nuxt-link class="add-btn" to='add' append>
      <i class="el-icon-circle-plus"></i>
    </nuxt-link>

    <div class="content-wrap">

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
      filterForm: {
        keyword: '',
        tag: '',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近三天',
            onClick(picker) {
              picker.$emit('pick', this.getDateRange(3));
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              picker.$emit('pick', this.getDateRange(7));
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              picker.$emit('pick', this.getDateRange(30));
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              picker.$emit('pick', this.getDateRange(90));
            },
          },
        ],
      },
    };
  },

  computed: {
    ...mapState('admin/article', ['fetch', 'list', 'total', 'query']),
    ...mapGetters('tag', ['nameMap']),
    ...mapState('tag', {
      tagList: 'list',
    }),
  },

  // beforeDestroy() {
  //   this.$store.commit('admin/article/RESET_LIST');
  // },

  methods: {
    getDateRange(days) {
      const oneDayMs = 1000 * 3600 * 24;
      const end = Date.now();
      const start = end - oneDayMs * days;
      return [start, end];
    },
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
    onSubmit() {
      console.log('this.tagList:', this.tagList);
      this.$refs.filterForm.validate(valid => {
        if (valid) {
          // (this.onSubmit || noop)(this.filterForm);
          console.log('this.filterForm:', this.filterForm);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.page-filter {
  background: $white;
  box-shadow: 0 1px 6px $lightgray;
}
.filter-form {

  .form-content {
    padding: $layout-padding;
  }

  .el-form-item__label {
    width: 100px;
  }

  .form-footer {
    padding: 1rem;
    background-color: $ghostwhite;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.content-wrap {
  margin-top: 1rem;
}
</style>


<style lang='scss' scoped>
.add-btn {
  position: absolute;
  right: 3rem;
  top: 2rem;
  font-size: 2.25rem;
  color: $green;
}

.pagination {
  float: right;
  margin-top: 1rem;
}

.article-tag {
  margin-right: 0.5rem;
}
</style>
