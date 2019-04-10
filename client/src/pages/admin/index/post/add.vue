<template>
  <div class="form-wrap">
    <post-form :on-submit="onSubmit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageUploader from '~/components/common/image-uploader'
import PostForm from '~/components/post/post-form'

export default {
  meta: {
    breadcrumb: '添加文章',
  },

  components: {
    PostForm,
  },

  methods: {
    onSubmit(data) {
      this.$store.dispatch('admin/post/addPost', data).then(res => {
        if (res.success) {
          this.$router.push('/admin/post')
        }
      })
    },
  },
}
</script>

<style lang="scss">
.form-wrap {
  padding: 2rem 0;
  background-color: $white;
}
</style>
