<template>
  <div class="note">
    <articleView :list="blogs" @loadMore='loadMore'/>
  </div>
</template>

<script>
const data = [
  {
    id: 1,
    title: '第一篇blog',
    content: `this is the first blog`,
    meta: {
      like: 35,
      view: 60,
      collect: 23
    }
  },
  {
    id: 2,
    title: 'second blog',
    content: 'this is a short content',
    meta: {
      like: 35,
      view: 60,
      collect: 23
    }
  }
];

import articleView from '~/components/common/article';

export default {
  data() {
    return {
      blogs: data
    };
  },

  methods: {
    loadMore() {
      console.log('call loadMore', );
    }
  },

  components: {
    articleView
  }
};
</script>

<style lang='scss' scoped>
.note {
}
</style>