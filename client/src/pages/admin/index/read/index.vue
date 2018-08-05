<template>

  <div class="read-manage">
    <div class="search-panel" :class="searchVisible && 'visible'">
      <SearchBook :onSelect="selectBook" :selected="basket" />
      <el-button type="info" icon="el-icon-close" circle @click="toggleSearch"></el-button>
    </div>

    <ccard title="读书列表">
      <el-table v-if="list.length" :data="list" v-loading="fetch" style="width: 100%">
        <el-table-column label="封面" width="180">
          <template v-if="scope.row.extra.book" slot-scope="scope">
            <img :src="scope.row.extra.book.image | dealImg({h:80})" alt="book-image">
          </template>
        </el-table-column>
        <el-table-column label="书名" width="180">
          <template v-if="scope.row.extra.book" slot-scope="scope">
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
        <el-table-column label="创建日期" width="180">
          <template slot-scope="scope">
            <i class="iconfont icon-riqi"></i>
            {{ scope.row.createdAt | dateFormat('YYYY.MM.DD') }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <i class="iconfont icon-fabu" v-if="scope.row.state === 1"></i>
            <i class="iconfont icon-caogao" v-if="scope.row.state !== 1"></i>
            {{ scope.row.state === 1 ? '发布' : '草稿' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="attachBook(scope.row)">选书</el-button>
          </template>
        </el-table-column>
      </el-table>
      <empty-holder v-else></empty-holder>

      <el-pagination slot="footer" background @current-change="pageNoChange" @size-change="pageSizeChange" :current-page="query.pageNo" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </ccard>
  </div>

</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import SearchBook from '~/components/read/search';

export default {
  meta: {
    breadcrumb: '读书管理',
  },

  components: {
    SearchBook,
  },

  async fetch({ store }) {
    await store.dispatch('admin/article/getArtList', { type: 2 });
  },

  data() {
    return {
      type: 2,
      basket: {},
      selectSingleMode: true,
      searchVisible: false,
    };
  },

  computed: {
    ...mapState({
      fetch: state => state.fetch['admin/article#get'],
    }),
    ...mapState('admin/article', ['list', 'total', 'query']),
    ...mapState('read', ['searchList']),
  },

  methods: {
    toggleSearch() {
      this.searchVisible = !this.searchVisible;
    },
    selectBook(book) {
      if (this.selectSingleMode && book) {
        this.toggleSearch();
        this.updateArt(book);
      } else {
        if (this.basket[book.isbn13]) {
          this.$set(this.basket, book.isbn13, undefined);
        } else {
          this.$set(this.basket, book.isbn13, book);
        }
      }
    },
    attachBook(row) {
      this.toggleSearch();
      this.currentRow = row;
    },
    updateArt(book) {
      const data = {
        ...this.currentRow,
        extra: {
          book: {
            isbn13: book.isbn13,
            title: book.title,
            author: book.author,
            image: book.image,
            url: book.url,
          },
        },
      };
      this.$store.dispatch('admin/article/updateArt', data);
      this.currentRow = null;
    },
    pageNoChange(pageNo) {
      this.$store.dispatch('admin/article/getArtList', {
        pageNo,
        type: this.type,
      });
    },
    pageSizeChange(pageSize) {
      this.$store.dispatch('admin/article/getArtList', {
        pageNo: 1,
        pageSize,
        type: this.type,
      });
    },
  },

  mounted() {
    console.log('placeholder:', placeholder);
  },
};
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
