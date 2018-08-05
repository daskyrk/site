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

      <div class="search-result">
        <div class="book-info-wrap" :key="book.isbn13" v-for="book in searchList">
          <div class="img-wrap">
            <img :src="book.images.small | dealImg({w:80})" alt="book-image">
          </div>
          <div class="book-info">
            <p v-if="book.ebook_url" class="title">
              <a :href="book.ebook_url">{{book.title}}
                <span v-if="book.subtitle" class="subtitle">({{book.subtitle}})</span>
              </a>
            </p>
            <p v-else class="title">{{book.title}}
              <span v-if="book.subtitle" class="subtitle">({{book.subtitle}})</span>
            </p>
            <p>{{book.author.join(' ')}}</p>
            <p>{{book.publisher}} - {{book.pubdate}}</p>

            <el-tooltip>
              <div slot="content">
                <div class="summary">{{book.summary | textClip(300)}}</div>
              </div>
              <p>{{book.summary | textClip(30)}}</p>
            </el-tooltip>

          </div>
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

  filters: {
    cacheImage(url) {
      if (url !== undefined) {
        let _u = url.substring('https://'.length);
        return 'https://images.weserv.nl/?url=' + _u;
      }
    },
  },

  methods: {
    search() {
      const q = this.q;
      if (q !== '') {
        this.loading = true;
        this.$store.dispatch('read/search', { q, count: 36 }).then(() => {
          this.loading = false;
        });
      } else {
        this.searchList = [];
      }
    },
  },

  mounted() {
    console.log('placeholder:', placeholder);
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
  margin-top: 3rem;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.book-info-wrap {
  display: flex;
  height: 150px;
  width: 32%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: $white;
  border-radius: $radius;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  }

  .img-wrap {
    width: 80px;
  }
}

.book-info {
  margin-left: 1rem;
  font-size: 0.8rem;
  line-height: 1.5rem;
  overflow: hidden;
  flex: 1;

  p {
    @include text-overflow;
  }

  .title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    a {
      color: $green;
    }
    .subtitle {
      font-size: 0.8rem;
    }
  }
}

.summary {
  width: 400px;
}
</style>
