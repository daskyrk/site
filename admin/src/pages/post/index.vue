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
          color="green"
          title="Simple Table"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">
                {{ item.salary }}
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        md12
      />
    </v-layout>
  </v-container>
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
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'name',
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right',
        },
      ],
      items: [
        {
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738',
        },
        {
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738',
        }, {
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142',
        }, {
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735',
        }, {
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542',
        }, {
          name: 'Mason Porter',
          country: 'Chile',
          city: 'Gloucester',
          salary: '$78,615',
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
