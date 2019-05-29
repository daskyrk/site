<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    class="post-manage"
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          class="card-tabs"
        >
          <v-flex slot="header">
            <v-tabs
              v-model="tabs"
              color="transparent"
              slider-color="white"
            >
              <span
                class="subheading font-weight-light mr-3"
                style="align-self: center"
              >类别:
              </span>
              <v-tab
                v-for="type in types"
                :key="type"
                class="mr-3"
              >
                <v-icon v-if="type.icon" class="mr-2">
                  mdi-bug
                </v-icon>
                {{ type }}
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-book
                </v-icon>
                读书
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">
                  mdi-music
                </v-icon>
                音乐
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-tabs-items v-model="tabs">
            <v-tab-item
              v-for="type in types"
              :key="type"
            >
              <v-data-table
                :headers="headers"
                :items="listTypeMap[type]"
                hide-actions
              >
                <template
                  slot="items"
                  slot-scope="{ item }"
                >
                  <td>{{ item.title }}</td>
                  <td :class="{'green--text':item.isPublic}">
                    <span class="pointer" @click="updatePost(item, 'isPublic')">
                      <i
                        class="iconfont"
                        :class="item.isPublic ? 'icon-unlocked' : 'icon-locked'"
                      />
                      {{ item.isPublic ? '公开' : '私密' }}
                    </span>
                  </td>
                  <td :class="{'green--text':item.isPublish}">
                    <span class="pointer" @click="updatePost(item, 'isPublish')">
                      <i
                        class="iconfont"
                        :class="item.isPublish ? 'icon-fabu' : 'icon-caogao'"
                      />
                      {{ item.isPublish ? '发布' : '草稿' }}
                    </span>
                  </td>
                  <td>
                    {{ item.createdAt | dateFormat('YYYY.MM.DD') }}
                  </td>
                  <td>
                    {{ item.updatedAt | dateFormat('YYYY.MM.DD HH:mm:ss') }}
                  </td>
                  <td class="text-xs-right">
                    <v-btn
                      fab
                      small
                      color="green"
                      class="mr-2"
                      @click="editPost(item)"
                    >
                      <v-icon> edit </v-icon>
                    </v-btn>
                    <confirm tip="确定要删除吗？" :ok="() => deletePost(item)">
                      <v-btn
                        fab
                        small
                        color="red"
                      >
                        <v-icon> delete </v-icon>
                      </v-btn>
                    </confirm>
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-flex>
      <v-flex
        md12
      />
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  meta: {
    breadcrumb: '文章列表',
  },

  data() {
    const getDateRange = this.getDateRange()
    return {
      deletingId: null,
      tabs: 0,
      filterForm: {
        keyword: '',
        state: -1,
        public: -1,
        type: -1,
        tag: '',
        timeRange: [],
      },
      type: '',
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
      headers: [
        {
          sortable: false,
          text: '标题',
          value: 'name',
        },
        {
          sortable: false,
          text: '公开',
          value: 'isPublic',
        },
        {
          sortable: false,
          text: '发布',
          value: 'isPublish',
        },
        {
          sortable: false,
          text: '创建时间',
          value: 'createdAt',
        },
        {
          sortable: false,
          text: '更新时间',
          value: 'updatedAt',
        },
        {
          sortable: false,
          text: '操作',
          value: 'updatedAt',
          align: 'right',
        },
      ],
    }
  },

  computed: {
    ...mapState({
      fetch: state => state.fetch['post#get'],
    }),
    ...mapState('post', ['list', 'total', 'query']),
    ...mapState('tag', {
      tagList: 'list',
    }),
    types() {
      return this.list.map(p => p.type)
    },
    listTypeMap() {
      const map = {}
      this.list.forEach((p) => { map[p.type] = (map[p.type] || []).concat(p) })
      return map
    },
  },

  async fetch({ store }) {
    await store.dispatch('post/getPostList')
    await store.dispatch('tag/getTags', { pageSize: 100 })
  },

  // beforeDestroy() {
  //   this.$store.commit('post/RESET_LIST');
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
      this.$store.dispatch('post/getPostList', {
        pageNo,
      })
    },
    pageSizeChange(pageSize) {
      this.$store.dispatch('post/getPostList', {
        pageNo: 1,
        pageSize,
      })
    },
    updatePost(row, key) {
      this.$store.dispatch('post/updatePost', { ...row, [key]: !row[key] })
    },
    editPost(row) {
      this.$router.push(`/post/${row.id}`)
    },
    deletePost(row) {
      this.$store.dispatch('post/delPost', row.id)
    },
    isDeleting(row) {
      return row.id === this.deletingId
    },
    onSubmit() {
      this.$refs.filterForm.validate((valid) => {
        if (valid) {
          const { timeRange, ...rest } = this.filterForm
          const [startAt, endAt] = timeRange
          const data = { pageNo: 1, startAt, endAt, ...rest }
          this.$store.dispatch('post/getPostList', data)
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
