<template>
  <div class="index-page">
    <div class="welcome">
      <h3 class="slogan">你若温柔，当有力量</h3>
      <h4 class="nav">
        <template v-for="(nav, index) in navs">
          <nuxt-link :key='index'
            :to='nav.link'
            exact>
            {{nav.text}}
          </nuxt-link>
          <span v-if="index < navs.length-1"
            :key='`split-${index}`'>/</span>
        </template>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index-page',

  layout: 'empty',

  data() {
    return {
      navs: process.env.navs
    };
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(~static/images/main_bg.jpg) no-repeat 20% 20%;
  background-size: cover;

  .slogan {
    position: absolute;
    right: 260px;
    top: 160px;
    height: 140px;
    font-size: 16px;
    color: $whitesmoke;
    letter-spacing: 4px;
    writing-mode: vertical-lr;
    font-family: FangSong;
    font-size: 20px;
  }

  .nav {
    position: absolute;
    right: 200px;
    top: 320px;
    color: $lightgray;

    a:hover {
      transition: color 0.3s;
      color: $white;
    }
    span {
      padding: 0.35rem;
    }
  }
}
</style>

