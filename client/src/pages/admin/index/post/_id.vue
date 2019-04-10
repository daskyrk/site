<template>
  <div class="form-wrap">
    <post-form
      :detail="detail"
      :on-submit="onSubmit"
    />
  </div>
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

  computed: mapState('admin/post', ['detail']),

  async fetch({ store, params }) {
    await store.dispatch('admin/post/getPost', params.id)
  },

  methods: {
    onSubmit(data) {
      this.$store.dispatch('admin/post/updatePost', data)
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
