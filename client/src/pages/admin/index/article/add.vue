<template>
  <article-form :onSubmit="onSubmit"/>
</template>

<script>
import { mapState } from 'vuex';
import ImageUploader from '~/components/common/image-uploader';
import ArticleForm from '~/components/common/article-form';

export default {
  meta: {
    breadcrumb: '添加文章',
  },

  components: {
    ArticleForm,
  },

  methods: {
    onSubmit(data) {
      this.$store.dispatch('article/addArt', data);
    },
  },
};
</script>
