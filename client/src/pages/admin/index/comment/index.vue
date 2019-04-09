<template>
  <div class="comment-manage">
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
              label="状态"
              prop="state"
            >
              <el-radio-group v-model="filterForm.state">
                <el-radio-button label="-1">
                  全部
                </el-radio-button>
                <el-radio-button label="0">
                  待审核
                </el-radio-button>
                <el-radio-button label="1">
                  通过
                </el-radio-button>
                <el-radio-button label="2">
                  不通过
                </el-radio-button>
                <el-radio-button label="3">
                  已归档
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="时间"
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
                type="datetimerange"
                range-separator="到"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="timestamp"
              />
            </el-form-item>
          </div>
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

    <ccard title="留言列表">
      <el-table
        v-if="list.length"
        v-loading="fetch"
        :data="list"
        style="width: 100%"
      >
        <el-table-column label="内容">
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column
          label="留言人"
          width="200"
        >
          <template slot-scope="scope">
            <el-tooltip
              :disabled="!scope.row.author.site"
              :content="scope.row.author.site"
              effect="dark"
              placement="top"
            >
              <a
                v-if="!!scope.row.author.site"
                :href="scope.row.author.site | dealSite"
                class="site-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ scope.row.author.name }}
              </a>
              <span v-else>
                {{ scope.row.author.name }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          width="200"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-riqi" />
            {{ scope.row.createdAt | dateFormat('YYYY.MM.DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.author.email }}
          </template>
        </el-table-column>
        <el-table-column
          label="ip"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.ip }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="终端">
          <template slot-scope="scope">
            {{ scope.row.agent }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="状态"
          width="120"
        >
          <template slot-scope="scope">
            <i :class="scope.row.state | stateIcon" />
            {{ stateMap[scope.row.state] }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state === 0 || scope.row.state === 2"
              type="primary"
              size="small"
              @click="updateComment(scope.row, 1)"
            >
              通过
            </el-button>
            <el-button
              v-if="scope.row.state === 0 || scope.row.state === 1"
              type="danger"
              size="small"
              @click="updateComment(scope.row, 2)"
            >
              不通过
            </el-button>
            <el-button
              v-if="scope.row.state !== 3"
              size="small"
              @click="updateComment(scope.row, 3)"
            >
              归档
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
    breadcrumb: '留言列表',
  },

  filters: {
    stateIcon: function(state) {
      const iconMap = {
        0: 'shenhe',
        1: 'circle-check',
        2: 'circle-cross',
        3: 'guidang',
      }
      return 'iconfont icon-' + iconMap[state]
    },
    dealSite: function(site) {
      return site.includes('http') ? site : `http://${site}`
    },
  },

  data() {
    const getDateRange = this.getDateRange()
    return {
      filterForm: {
        keyword: '',
        state: -1,
        timeRange: [],
      },
      stateMap: {
        0: '待审核',
        1: '通过',
        2: '不通过',
        3: '已归档',
      },
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
      fetch: state => state.fetch['admin/comment#get'],
    }),
    ...mapState('admin/comment', ['list', 'total', 'query']),
  },

  async fetch({ store }) {
    await store.dispatch('admin/comment/getComments')
  },

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
      this.$store.dispatch('admin/comment/getComments', {
        pageNo,
        type: 1,
      })
    },
    pageSizeChange(pageSize) {
      this.$store.dispatch('admin/comment/getComments', {
        pageNo: 1,
        pageSize,
        type: 1,
      })
    },
    updateComment(row, state) {
      this.$store.dispatch('admin/comment/updateComment', {
        id: row.id,
        state,
      })
    },
    delComment(row) {
      this.$store.dispatch('admin/comment/delComment', row.id)
    },
    onSubmit() {
      this.$refs.filterForm.validate(valid => {
        if (valid) {
          const { timeRange, ...rest } = this.filterForm
          const [startAt, endAt] = timeRange
          const data = { pageNo: 1, startAt, endAt, ...rest }
          this.$store.dispatch('admin/comment/getComments', data)
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
      float: left;
      display: inline-flex;
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

.site-link {
  color: $color-primary;
  font-weight: bold;
}
</style>
