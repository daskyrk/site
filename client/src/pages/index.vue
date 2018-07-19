<template>
  <div class="welcome" :class="mode" :style="style">
    <div class="slogan-wrap">
      <img class="slogan" :src="'/images/slogan.png'" alt="slogan">
      <div class="blur" :style="style"></div>
    </div>
    <div class="story-desc" v-if="story.title">
      <p class="title">{{story.title}}</p>
      <p class="position" v-if="story.Country">
        <i class="iconfont icon-zuobiao"></i> {{story.Country}} · {{story.City}}</p>
      <p class="detail">{{story.story}}</p>
    </div>
    <h4 class="nav">
      <template v-for="(nav, index) in navs">
        <nuxt-link class="link" :key='index' :to='nav.link' exact>
          <span :key="t" v-for="t in nav.text.split('')">{{t}}</span>
        </nuxt-link>
        <span v-if="index < navs.length-1" :key='`split-${index}`'>/</span>
      </template>
      <div class="blur" :style="style"></div>
    </h4>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'welcome',

  layout: 'empty',

  async fetch({ app, store }) {
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
        };
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
.welcome {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(~/static/images/main_bg.jpg);
  background-size: cover;

  &.static {
    background-position-x: 20%;
    background-position-y: 20%;
    background-repeat: no-repeat;
  }

  .slogan-wrap {
    position: absolute;
    right: 10%;
    top: 0;
    height: 170px;
    overflow: hidden;
    padding: 1rem 0.5rem;

    img {
      height: 100%;
    }
  }

  .nav {
    position: absolute;
    right: 10%;
    top: 30%;
    color: $white;
    padding: 2rem;
    overflow: hidden;
    border-radius: $radius;
    background-color: rgba(181, 181, 181, 0.3);

    &:hover {
      background-color: rgba(181, 181, 181, 0.5);
    }

    a:hover {
      transition: color 0.3s;
      color: $color-primary;
    }
    span {
      padding: 0.35rem;
    }
  }

  .blur {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(3px);
    margin: -20px;
    background-attachment: fixed;
    background-size: cover;
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
    overflow: hidden;

    > p {
      margin-bottom: 10px;
    }

    .title {
      font-weight: bold;
    }
  }
}

.link {
  position: relative;
  color: $white;
  text-transform: uppercase;
  font-weight: 400;
  overflow: hidden;
  display: inline-flex;
  overflow: hidden;
  padding: 2px;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    border-bottom: 2px solid $black;
    transform: translate3d(-101%, 0, 0);
    transition: transform 0.5s;
  }

  &:hover::before {
    transform: translate3d(0, 0, 0);
  }

  span {
    display: inline-block;
    position: relative;
    transform: perspective(1000px) rotate3d(0, 1, 0, 0deg);
    transition: transform 0.5s, color 0.5s;
  }

  &:hover span {
    color: #1e1a1b;
    transform: perspective(1000px) rotate3d(0, 1, 0, 360deg);
  }

  span:nth-child(4),
  &:hover span:first-child {
    transition-delay: 0s;
  }

  span:nth-child(3),
  &:hover span:nth-child(2) {
    transition-delay: 0.1s;
  }

  span:nth-child(2),
  &:hover span:nth-child(3) {
    transition-delay: 0.2s;
  }

  span:first-child,
  &:hover span:nth-child(4) {
    transition-delay: 0.3s;
  }
}
</style>

