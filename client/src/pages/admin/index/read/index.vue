<template>
  <div class="read-manage">
    <div
      :class="searchVisible && 'visible'"
      class="search-panel"
    >
      <SearchBook
        :on-select="selectBook"
        :selected="basket"
      />
      <el-button
        type="info"
        icon="el-icon-close"
        circle
        @click="toggleSearch"
      />
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="书籍信息"
      width="30%"
    >
      <div>
        <p style="margin-bottom: 1rem;">
          {{ selectedBook.title }}
        </p>
        <el-input
          v-model="saying"
          placeholder="请输入书内名言"
        />
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="updatePost"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>

    <ccard title="读书列表">
      <el-table
        v-if="list.length"
        v-loading="fetch"
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          label="封面"
          width="180"
        >
          <template
            v-if="scope.row.extra && scope.row.extra.book"
            slot-scope="scope"
          >
            <img
              :src="scope.row.extra.book.image | dealImg({h:80})"
              alt="book-image"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="书名"
          width="180"
        >
          <template
            v-if="scope.row.extra && scope.row.extra.book"
            slot-scope="scope"
          >
            {{ scope.row.extra.book.title }}
          </template>
        </el-table-column>
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="文章描述">
          <template slot-scope="scope">
            {{ scope.row.descript }}
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
            {{ scope.row.state === 1 ? '发布' : '草稿' }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="attachBook(scope.row)"
            >
              选书
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
import { mapState } from 'vuex'
import SearchBook from '~/components/read/search'

export default {
  meta: {
    breadcrumb: '读书管理',
  },

  components: {
    SearchBook,
  },

  data() {
    return {
      type: 'READ',
      basket: {},
      selectedBook: {},
      saying: '',
      selectSingleMode: true,
      searchVisible: false,
      dialogVisible: false,
    }
  },

  computed: {
    ...mapState({
      fetch: state => state.fetch['admin/post#get'],
    }),
    ...mapState('admin/post', ['list', 'total', 'query']),
    ...mapState('read', ['searchList']),
  },

  async fetch({ store }) {
    await store.dispatch('admin/post/getPostList', { type: 'READ' })
  },

  methods: {
    toggleSearch() {
      this.searchVisible = !this.searchVisible
    },
    selectBook(book) {
      if (this.selectSingleMode && book) {
        this.dialogVisible = true
        this.selectedBook = book
      } else {
        if (this.basket[book.isbn13]) {
          this.$set(this.basket, book.isbn13, undefined)
        } else {
          this.$set(this.basket, book.isbn13, book)
        }
      }
    },
    attachBook(row) {
      this.toggleSearch()
      this.currentRow = row
    },
    updatePost() {
      this.toggleSearch()
      this.dialogVisible = false
      const book = this.selectedBook
      console.log('this.saying:', this.saying)
      const data = {
        ...this.currentRow,
        extra: {
          book: {
            isbn13: book.isbn13,
            title: book.title,
            author: book.author,
            image: book.image,
            saying: this.saying,
            url: book.url,
          },
        },
      }
      this.$store.dispatch('admin/post/updatePost', data)
      this.currentRow = {}
      this.selectedBook = {}
    },
    pageNoChange(pageNo) {
      this.$store.dispatch('admin/post/getPostList', {
        pageNo,
        type: this.type,
      })
    },
    pageSizeChange(pageSize) {
      this.$store.dispatch('admin/post/getPostList', {
        pageNo: 1,
        pageSize,
        type: this.type,
      })
    },
  },

  // mounted() {
  //   console.log('placeholder:', placeholder);
  // },
}
</script>

<style lang="scss" scoped>
.read-manage {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.search-panel {
  position: absolute;
  width: 100%;
  height: 60%;
  bottom: 0;
  background-color: $white;
  transition: transform 0.3s;
  transform: translateY(100%);

  &.visible {
    transform: translateY(0);
  }

  button {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
