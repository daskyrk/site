<template>
  <article-form :detail="detail" :onSubmit="onSubmit"></article-form>
</template>

<script>
import { mapState } from 'vuex';
import ArticleForm from '~/components/article/article-form';

export default {
  meta: {
    breadcrumb: '编辑文章',
  },

  components: {
    ArticleForm,
  },

  async fetch({ store, params }) {
    await store.dispatch('admin/article/getArt', params.id);
  },

  computed: mapState('admin/article', ['detail']),

  methods: {
    onSubmit(data) {
      this.$store.dispatch('admin/article/updateArt', data);
    },
  },
};
</script>
