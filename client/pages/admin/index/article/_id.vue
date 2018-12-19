<template>
  <div class="form-wrap">
    <article-form 
      :detail="detail" 
      :on-submit="onSubmit"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleForm from '~/components/article/article-form'

export default {
  meta: {
    breadcrumb: '编辑文章',
  },

  components: {
    ArticleForm,
  },

  async fetch({ store, params }) {
    await store.dispatch('admin/article/getArt', params.id)
  },

  computed: mapState('admin/article', ['detail']),

  methods: {
    onSubmit(data) {
      this.$store.dispatch('admin/article/updateArt', data)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-wrap {
  background-color: $white;
  padding: 2rem 0;
}
</style>
