<template>
  <article-form :onSubmit="onSubmit" />
</template>

<script>
import { mapState } from 'vuex';
import ImageUploader from '~/components/common/image-uploader';
import ArticleForm from '~/components/article/article-form';

export default {
  meta: {
    breadcrumb: '添加文章',
  },

  components: {
    ArticleForm,
  },

  methods: {
    onSubmit(data) {
      this.$store.dispatch('admin/article/addArt', data).then(res => {
        if (res.code === 1) {
          this.$router.push('/admin/article');
        }
      });
    },
  },
};
</script>
