<template>
  <post-form :on-submit="onSubmit" />
</template>

<script>
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
