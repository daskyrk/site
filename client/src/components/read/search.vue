<template>
  <div class="search-wrap">
    <div class="search-input el-input el-input--prefix">
      <input
        v-model="q"
        type="text"
        autocomplete="off"
        placeholder="请输入关键字"
        class="el-input__inner"
        @keyup.enter="search"
      >
      <span class="el-input__prefix">
        <i class="el-input__icon el-icon-search" />
      </span>
    </div>

    <div class="search-result">
      <div
        v-for="book in searchList"
        :key="book.isbn13"
        :class="isSelected(book.isbn13)"
        class="book-info-wrap"
        @click="onSelect(book)"
      >
        <div class="img-wrap">
          <img
            :src="book.images.small | dealImg({w:80})"
            alt="book-image"
          >
        </div>
        <div class="book-info">
          <p
            v-if="book.ebook_url"
            class="title"
          >
            <a :href="book.ebook_url">
              {{ book.title }}
              <span
                v-if="book.subtitle"
                class="subtitle"
              >
                ({{ book.subtitle }})
              </span>
            </a>
          </p>
          <p
            v-else
            class="title"
          >
            {{ book.title }}
            <span
              v-if="book.subtitle"
              class="subtitle"
            >
              ({{ book.subtitle }})
            </span>
          </p>
          <p>{{ book.author.join(' ') }}</p>
          <p>
            <span v-if="book.publisher">
              {{ book.publisher }} ·
            </span>
            <span v-if="book.pubdate">
              {{ book.pubdate }}
            </span>
          </p>

          <el-tooltip>
            <div slot="content">
              <div class="summary">
                {{ book.summary | textClip(300) }}
              </div>
            </div>
            <p>{{ book.summary | textClip(30) }}</p>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    onSelect: Function,
    selected: Object,
  },

  data() {
    return {
      q: '',
    }
  },

  computed: {
    ...mapState('read', ['searchList']),
  },

  methods: {
    search() {
      const q = this.q
      if (q !== '') {
        this.loading = true
        this.$store.dispatch('read/search', { q, count: 36 }).then(() => {
          this.loading = false
        })
      } else {
        this.searchList = []
      }
    },
    isSelected(isbn13) {
      return this.selected[isbn13] ? 'selected' : ''
    },
  },
}
</script>

<style lang="scss">
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
  justify-content: space-between;
  width: 90%;
  margin-top: 3rem;
}

.book-info-wrap {
  display: flex;
  width: 32%;
  height: 150px;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: $white;
  border: 2px solid transparent;
  border-radius: $radius;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1);

  &:hover {
    box-shadow: 0 2px 16px rgba(0, 0, 0, .3);
    transform: translateY(-2px);
  }

  &.selected {
    border: 2px solid $green;
  }

  .img-wrap {
    width: 80px;
  }
}

.book-info {
  flex: 1;
  margin-left: 1rem;
  overflow: hidden;
  font-size: .8rem;
  line-height: 1.5rem;

  p {
    @include nowrap ();
  }

  .title {
    margin-bottom: .5rem;
    font-weight: bold;
    font-size: 1rem;

    a {
      color: $green;
    }

    .subtitle {
      font-size: .8rem;
    }
  }
}

.summary {
  width: 400px;
}
</style>
