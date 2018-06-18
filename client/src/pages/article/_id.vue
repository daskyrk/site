<template>
  <div class="article">
    <h3 class="title">{{detail.title}}</h3>
    <div class="meta">
      <span class="time">{{ detail.createdAt | dateFormat('YYYY.MM.DD HH:MM') }}</span>
      <span>字数 {{detail.content.length}}</span>
      <span>阅读 {{detail.meta.views}}</span>
      <span>喜欢 {{detail.meta.likes}}</span>
      <span>评论 {{detail.meta.comments}}</span>
    </div>
    <div class="content markdown-content" v-html="marked(detail.content)">

    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import markdown from '~/plugins/marked';

export default {
  computed: mapState('article', ['detail']),

  async fetch({ store, params }) {
    await store.dispatch('article/getArt', params.id);
  },
  methods: {
    marked(content) {
      return markdown(content);
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  width: 40%;
  min-width: 41.25rem;
}

.meta {
  margin-top: 1rem;
  font-size: .75rem;
  color: $color-text-sub;
  span {
    margin-right: 0.5rem;
  }
}
</style>