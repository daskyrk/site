<template>
  <post-form
    :detail="detail"
    :on-submit="onSubmit"
  />
</template>

<script>
import { mapState } from 'vuex'
import PostForm from '~/components/post/post-form'

export default {
  meta: {
    breadcrumb: '编辑文章',
  },

  components: {
    PostForm,
  },

  computed: mapState('post', ['detail']),

  async fetch({ store, params }) {
    await store.dispatch('post/getPost', params)
  },

  methods: {
    onSubmit(data) {
      this.$store.dispatch('post/updatePost', data)
    },
  },
}
</script>
