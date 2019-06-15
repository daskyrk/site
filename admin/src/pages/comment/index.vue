<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
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
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  unarchive
                </v-icon>
                未归档
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">
                  archive
                </v-icon>
                已归档
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
              >
                <template
                  slot="items"
                  slot-scope="{ item }"
                >
                  <td>{{ stateMap[item.state] }}</td>
                  <td>{{ item.content }}</td>
                  <td>
                    <v-tooltip v-if="item.author.site" top>
                      <template v-slot:activator="{ on }">
                        <a
                          :href="item.author.site | dealSite"
                          class="site-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          v-on="on"
                        >
                          {{ item.author.name }}
                        </a>
                      </template>
                      <span>{{ item.author.site }}</span>
                    </v-tooltip>
                    <span v-else>
                      {{ item.author.name }}
                    </span>
                  </td>
                  <td>{{ item.author.email }}</td>
                  <td>
                    {{ item.createdAt | dateFormat('YYYY.MM.DD - HH:mm:ss') }}
                  </td>
                  <td>
                    {{ item.ip }}
                  </td>
                  <td v-if="item.state !== 3" class="text-xs-right">
                    <v-btn
                      v-if="item.state === 1"
                      fab
                      small
                      color="danger"
                      class="mr-2"
                      @click="updateComment(item, 2)"
                    >
                      <v-icon> mdi-cancel </v-icon>
                    </v-btn>
                    <v-btn
                      v-if="item.state === 2"
                      fab
                      small
                      color="success"
                      class="mr-2"
                      @click="updateComment(item, 1)"
                    >
                      <v-icon> check </v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      small
                      color="info"
                      @click="updateComment(item, 3)"
                    >
                      <v-icon> mdi-archive </v-icon>
                    </v-btn>
                  </td>
                  <td v-else class="text-xs-right">
                    <v-btn
                      fab
                      small
                      color="info"
                      class="mr-2"
                      @click="updateComment(item, 1)"
                    >
                      <v-icon> mdi-undo-variant </v-icon>
                    </v-btn>
                    <confirm tip="确定要删除吗？" :ok="() => delComment(item)">
                      <v-btn
                        fab
                        small
                        color="danger"
                      >
                        <v-icon> close </v-icon>
                      </v-btn>
                    </confirm>
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  meta: {
    breadcrumb: '留言列表',
  },

  filters: {
    stateIcon: function (state) {
      const iconMap = {
        0: 'shenhe',
        1: 'circle-check',
        2: 'circle-cross',
        3: 'guidang',
      }
      return 'iconfont icon-' + iconMap[state]
    },
    dealSite: function (site) {
      return site.startsWith('http') ? site : `//${site}`
    },
  },

  data() {
    const getDateRange = this.getDateRange()
    return {
      tabs: 0,
      filterForm: {
        keyword: '',
        state: -1,
        timeRange: [],
      },
      types: ['normal', 'archived'],
      stateMap: {
        0: '待审核',
        1: '通过',
        2: '不通过',
        3: '已归档',
      },
      headers: [
        {
          sortable: true,
          text: '状态',
          value: 'state',
        },
        {
          sortable: false,
          text: '内容',
          value: 'content',
        },
        {
          sortable: false,
          text: '留言人',
          value: 'author.name',
        },
        {
          sortable: false,
          text: '邮箱',
          value: 'author.email',
        },
        {
          sortable: false,
          text: '时间',
          value: 'createdAt',
        },
        {
          sortable: false,
          text: 'IP',
          value: 'ip',
        },
        {
          sortable: false,
          text: '操作',
          value: 'updatedAt',
          align: 'right',
        },
      ],
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
      fetch: state => state.fetch['comment#get'],
    }),
    ...mapState('comment', ['list', 'total', 'query']),
    listTypeMap() {
      const map = {}
      this.list.forEach((p) => {
        const type = p.state === 3 ? 'archived' : 'normal'
        map[type] = (map[type] || []).concat(p)
      })
      return map
    },
  },

  async fetch({ store }) {
    await store.dispatch('comment/getComments')
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
      this.$store.dispatch('comment/getComments', {
        pageNo,
        type: 1,
      })
    },
    pageSizeChange(pageSize) {
      this.$store.dispatch('comment/getComments', {
        pageNo: 1,
        pageSize,
        type: 1,
      })
    },
    updateComment(row, state) {
      this.$store.dispatch('comment/updateComment', {
        id: row.id,
        state,
      })
    },
    delComment(row) {
      this.$store.dispatch('comment/delComment', row.id)
    },
    onSubmit() {
      this.$refs.filterForm.validate((valid) => {
        if (valid) {
          const { timeRange, ...rest } = this.filterForm
          const [startAt, endAt] = timeRange
          const data = { pageNo: 1, startAt, endAt, ...rest }
          this.$store.dispatch('comment/getComments', data)
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
</style>
