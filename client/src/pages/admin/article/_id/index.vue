<template>
  <div>
    <div class="article-detail">
      <p>{{detail.title}}</p>
      <p>{{detail.content}}</p>
    </div>
    <hr>
    <nuxt-link to='edit' append>
      <el-button type="primary">编辑</el-button>
    </nuxt-link>

    <nuxt-link to='/note'>
      <el-button>返回</el-button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    detail() {
      return this.$store.state.article.detail;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-detail {
  // text-align: center;
}
</style>