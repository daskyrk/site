<template>

  <div class="read-manage">

    <div class="search-wrap">
      <!-- <el-select v-model="q" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="searchBook" :loading="loading">
        <el-option v-for="item in searchList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select> -->
      <div data-v-7fdf388c="" class="search-input el-input el-input--prefix">
        <input type="text" autocomplete="off" placeholder="请输入关键字" class="el-input__inner" v-model="q" @keyup.enter="search">
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>

        </span>
      </div>

      <img src="https://img1.doubanio.com/view/subject/m/public/s1237549.jpg" alt="book-image">
      <div class="search-result">
        <div class="book-info" :key="book.isbn13" v-for="book in searchList">
          {{book.title}}
          <!-- <img :src="book.image" alt="book-image"> -->
        </div>
      </div>

      <!-- <div class="book-detail">
        {{bookDetail}}
      </div> -->
    </div>

  </div>

</template>

<script>
// import DialogForm from '~/components/common/dialog-form';
import { mapState } from 'vuex';

export default {
  meta: {
    breadcrumb: '读书管理',
  },

  // async fetch({ store }) {
  //   await store.dispatch('read/getBooks');
  // },

  data() {
    return {
      q: '',
      bookDetail: {},
    };
  },

  computed: {
    ...mapState('read', ['searchList']),
  },

  methods: {
    search() {
      const q = this.q;
      if (q !== '') {
        this.loading = true;
        this.$store.dispatch('read/search', { q }).then(() => {
          this.loading = false;
        });
      } else {
        this.searchList = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .read-manage {
// }

.search-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input {
  width: 60%;
  margin-top: 5rem;
}

.search-result {
  display: flex;
  flex-wrap: wrap;
}
</style>
