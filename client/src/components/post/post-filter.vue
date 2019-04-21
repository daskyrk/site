<template>
  <v-form ref="filterForm">
    <v-container fluid>
      <v-layout wrap>
        <v-flex
          xs12
          sm6
          md4
        >
          <v-text-field
            v-model="filterForm.keyword"
            :counter="10"
            :error-messages="validation.firstError('filterForm.keyword')"
            label="关键字"
          />
        </v-flex>

        <v-flex
          xs12
          sm6
          md4
        >
          <v-select
            v-model="filterForm.tag"
            :items="tagList.map(t => ({text: t.name, value: t.id}))"
            label="标签"
          />
        </v-flex>

        <v-flex
          xs12
          sm6
          md4
        >
          <v-select
            v-model="filterForm.type"
            :items="['全部', '文章']"
            label="类型"
          />
        </v-flex>

        <v-flex
          xs12
          sm6
          md4
        >
          <v-radio-group
            v-model="filterForm.state"
            row
          >
            <v-radio
              label="全部"
              value="-1"
            />
            <v-radio
              label="草稿"
              value="1"
            />
            <v-radio
              label="发布"
              value="2"
            />
          </v-radio-group>
        </v-flex>

        <v-flex
          xs12
          sm6
          md4
        >
          <v-radio-group
            v-model="filterForm.public"
            row
          >
            <v-radio
              label="全部"
              value="-1"
            />
            <v-radio
              label="公开"
              value="true"
            />
            <v-radio
              label="私密"
              value="false"
            />
          </v-radio-group>
        </v-flex>

        <v-flex>
          <date-range-picker v-model="filterForm.timeRange" />
        </v-flex>

        <!-- <v-flex
          xs12
          sm6
          md4
        >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="event"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer />
              <v-btn
                flat
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex> -->

        <v-flex xs12>
          <v-btn
            color="primary"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn
            color="grey"
            @click="reset"
          >
            reset
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'
import dateRangePicker from "@/components/common/date-range-picker";

export default {
  components: {
    dateRangePicker,
  },

  data() {
    const getDateRange = this.getDateRange()
    const cleanForm = {
      keyword: '',
      state: '-1',
      public: '-1',
      type: '-1',
      tag: '',
      timeRange: [],
    }
    return {
      deletingId: null,
      filterForm: { ...cleanForm },
      cleanForm,
      menu:false,
      date: '',
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
    ...mapState('tag', {
      tagList: 'list',
    }),
  },

  // async fetch({ store }) {
  //   await store.dispatch('admin/post/getPostList')
  //   await store.dispatch('tag/getTags', { pageSize: 100 })
  // },

  // beforeDestroy() {
  //   this.$store.commit('admin/post/RESET_LIST');
  // },

  validators: {
    ['filterForm.keyword'](value) {
      return this.$validator
        .value(value)
        .required()
        .email()
    },
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
    submit() {
      this.$validate().then(function(success) {
        console.log('this.filterForm:', this.filterForm);
        if (success) {
          alert('Validation succeeded!')
        }
      })
    },
    reset() {
      this.filterForm = { ...this.cleanForm }
      this.validation.reset()
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
