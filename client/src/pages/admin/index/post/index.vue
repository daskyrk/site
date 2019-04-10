<template>
  <div class="post-manage">
    <pg-filter>
      <el-form
        ref="filterForm"
        :model="filterForm"
        class="filter-form"
        size="medium"
      >
        <div class="filter-content">
          <div class="flow-item">
            <el-form-item
              label="关键字"
              prop="keyword"
              class="kword"
            >
              <el-input v-model="filterForm.keyword" />
            </el-form-item>
            <el-form-item
              label="标签"
              prop="tag"
            >
              <el-select
                v-model="filterForm.tag"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="tag in tagList"
                  :key="tag.id"
                  :label="tag.name"
                  :value="tag.id"
                />
              </el-select>
            </el-form-item>
          </div>

          <div class="flow-item">
            <el-form-item
              label="分类"
              prop="type"
            >
              <el-radio-group v-model="filterForm.type">
                <el-radio-button label="-1">
                  全部
                </el-radio-button>
                <el-radio-button label="1">
                  文章
                </el-radio-button>
                <el-radio-button label="2">
                  读书
                </el-radio-button>
                <el-radio-button label="3">
                  音乐
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="状态"
              prop="state"
            >
              <el-radio-group v-model="filterForm.state">
                <el-radio-button label="-1">
                  全部
                </el-radio-button>
                <el-radio-button label="1">
                  草稿
                </el-radio-button>
                <el-radio-button label="2">
                  发布
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="公开"
              prop="public"
            >
              <el-radio-group v-model="filterForm.public">
                <el-radio-button label="-1">
                  全部
                </el-radio-button>
                <el-radio-button label="true">
                  公开
                </el-radio-button>
                <el-radio-button label="false">
                  私密
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>

          <el-form-item
            label="创建时间"
            prop="timeRange"
          >
            <!-- <el-radio-group v-model="timeRangeDay" @change="this.pickDayRange" class="pick-day-range">
              <el-radio-button label="1">今天</el-radio-button>
              <el-radio-button label="2">三天</el-radio-button>
              <el-radio-button label="3">一周</el-radio-button>
            </el-radio-group> -->
            <el-date-picker
              v-model="filterForm.timeRange"
              :picker-options="pickerOptions"
              type="daterange"
              range-separator="到"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            />
          </el-form-item>
        </div>

        <div class="filter-footer">
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >
              查询
            </el-button>
            <el-button @click="reset">
              重置
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </pg-filter>

    <ccard title="文章列表">
      <nuxt-link
        slot="op"
        to="add"
        append
      >
        <el-button
          type="primary"
          size="small"
        >
          添加
        </el-button>
      </nuxt-link>
      <el-table
        v-if="list.length"
        v-loading="fetch"
        :data="list"
        style="width: 100%;"
      >
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
            <el-tag
              v-for="tag in scope.row.tags"
              :key="tag"
              class="post-tag"
            >
              {{ nameMap[tag] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="180"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-riqi" />
            {{ scope.row.createdAt | dateFormat('YYYY.MM.DD') }}
          </template>
        </el-table-column>
        <el-table-column
          label="私密"
          width="120"
        >
          <template slot-scope="scope">
            <i
              v-if="!scope.row.public"
              class="iconfont icon-lock"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
        >
          <template slot-scope="scope">
            <i
              v-if="scope.row.state === 1"
              class="iconfont icon-fabu"
            />
            <i
              v-if="scope.row.state !== 1"
              class="iconfont icon-caogao"
            />
            {{ scope.row.state === 1 ? '草稿' : '发布' }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              type="info"
              size="small"
              @click="editPost(scope.row)"
            >
              修改
            </el-button>
            <el-button
              :loading="isDeleting(scope.row)"
              type="danger"
              size="small"
              @click="deletePost(scope.row)"
            >
              {{ isDeleting(scope.row) ? '删除中' : '删 除' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <empty-holder v-else />

      <el-pagination
        slot="footer"
        :current-page="query.pageNo"
        :page-size="query.pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="pageNoChange"
        @size-change="pageSizeChange"
      />
    </ccard>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'

export default {
  meta: {
    breadcrumb: '文章列表',
  },

  data() {
    const getDateRange = this.getDateRange()
    return {
      deletingId: null,
      filterForm: {
        keyword: '',
        state: -1,
        public: -1,
        type: -1,
        tag: '',
        timeRange: [],
      },
      // timeRangeDay: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近三天',
            onClick(picker) {
              picker.$emit('pick', getDateRange(3))
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              picker.$emit('pick', getDateRange(7))
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              picker.$emit('pick', getDateRange(30))
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              picker.$emit('pick', getDateRange(90))
            },
          },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      fetch: state => state.fetch['admin/post#get'],
    }),
    ...mapState('admin/post', ['list', 'total', 'query']),
    ...mapGetters('tag', ['nameMap']),
    ...mapState('tag', {
      tagList: 'list',
    }),
  },

  async fetch({ store }) {
    await store.dispatch('admin/post/getPostList')
    await store.dispatch('tag/getTags', { pageSize: 100 })
  },

  // beforeDestroy() {
  //   this.$store.commit('admin/post/RESET_LIST');
  // },

  methods: {
    pickDayRange(e) {
      console.log('e:', e)
    },
    getDateRange(days) {
      const oneDayMs = 1000 * 3600 * 24
      const end = Date.now()
      const start = end - oneDayMs * days
      return [start, end]
    },
    pageNoChange(pageNo) {
      this.$store.dispatch('admin/post/getPostList', {
        pageNo,
      })
    },
    pageSizeChange(pageSize) {
      this.$store.dispatch('admin/post/getPostList', {
        pageNo: 1,
        pageSize,
      })
    },
    editPost(row) {
      this.$router.push(`/admin/post/${row.id}`)
    },
    deletePost(row) {
      this.$store.dispatch('admin/post/delPost', row.id)
    },
    isDeleting(row) {
      return row.id === this.deletingId
    },
    onSubmit() {
      this.$refs.filterForm.validate(valid => {
        if (valid) {
          const { timeRange, ...rest } = this.filterForm
          const [startAt, endAt] = timeRange
          const data = { pageNo: 1, startAt, endAt, ...rest }
          this.$store.dispatch('admin/post/getPostList', data)
        } else {
          return false
        }
      })
    },
    reset() {
      this.$refs.filterForm.resetFields()
      // this.timeRangeDay = 0;
    },
  },
}
</script>

<style lang='scss'>
.filter-form {
  .flow-item {
    overflow: hidden;

    .el-form-item {
      display: inline-flex;
      float: left;
    }
  }
}

.kword {
  width: 380px;

  /deep/ .el-form-item__content {
    flex: 1;
  }
}

.pick-day-range {
  margin-right: 6.25rem;
}

.pagination {
  float: right;
  margin-top: 1rem;
}

.post-tag {
  margin-right: .5rem;
}
</style>
