<template>
  <div class="index-page" :style="style">
    <div class="welcome">
      <h3 class="slogan">你若温柔，当有力量</h3>
      <div class="story-desc" v-if="story.title">
        <p class="title">{{story.title}}</p>
        <p class="position"> <i class="iconfont icon-zuobiao"></i> {{story.Country}} · {{story.City}}</p>
        <p class="detail">{{story.story}}</p>
      </div>
      <h4 class="nav">
        <template v-for="(nav, index) in navs">
          <nuxt-link :key='index' :to='nav.link' exact>
            {{nav.text}}
          </nuxt-link>
          <span v-if="index < navs.length-1" :key='`split-${index}`'>/</span>
        </template>
      </h4>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'index-page',

  layout: 'empty',

  async fetch({ store }) {
    if (process.env.bg_mode === 'story') {
      await store.dispatch('getBingStory');
    }
  },

  data() {
    return {
      navs: process.env.navs,
      mode: process.env.bg_mode,
    };
  },

  computed: {
    ...mapState(['story']),
    style() {
      if (this.mode === 'random') {
        return {
          backgroundImage: `url(https://api.lylares.com/bing/image/random/?w=640&h=480)`,
        }
      }
      if (this.story.image) {
        return {
          backgroundImage: `url(${this.story.image})`,
        };
      }
      return {};
    },
  },
};
</script>

<style lang="scss" scoped>
.index-page {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(~/static/images/main_bg.jpg) no-repeat 20% 20%;
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
    right: 190px;
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

  .story-desc {
    position: absolute;
    bottom: 4rem;
    right: 0;
    font-size: 1rem;
    padding: 1rem 4rem;
    color: $white;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 6px #000;
    // background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));

    > p {
      margin-bottom: 10px;
    }

    .title {
      font-weight: bold;
    }
  }
}
</style>

