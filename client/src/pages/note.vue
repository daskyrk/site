<template>
  <div class="note">
    <articleView :list="blogs" @loadMore='loadMore'/>
  </div>
</template>

<script>
const data = [
  {
    id: 1,
    title: 'note 1',
    content: `this is the first note`,
    time: 1527074928000,
    meta: {
      read: 35,
      comments: 60,
      like: 23
    }
  },
  {
    id: 2,
    title: 'note 2',
    content: 'this is a short content',
    time: 1527074928000,
    meta: {
      read: 35,
      comments: 60,
      like: 23
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