<template>
  <transition-group tag="div" name="slide-down" class="article-box" >
    <div
      class="article-item"
      v-for="article in list"
      :key='article.id'
      >
      <div class="content">
        <p class='title'><nuxt-link :to="`/article/${article.id}`">{{article.title}}</nuxt-link></p>
        {{article.content}}
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: ['list']
};
</script>

<style lang='scss' scoped>
.article-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 1rem;
  margin-bottom: 3rem;
  color: #24292e;

  .title {
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>