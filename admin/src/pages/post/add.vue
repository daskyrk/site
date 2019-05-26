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
      this.$store.dispatch('post/addPost', data).then((res) => {
        if (res.success) {
          this.$router.push('/post')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-wrap {
  padding: 2rem 0;
  background-color: $c-white;
}
</style>
