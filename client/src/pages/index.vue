<template>
  <div
    :class="mode"
    :style="style"
    class="welcome"
  >
    <div class="slogan-wrap">
      <img
        src="~/assets/images/slogan.png"
        class="slogan"
        alt="slogan"
      >
      <div
        :style="style"
        class="blur"
      />
    </div>
    <h4 class="nav">
      <template v-for="(nav, index) in navs">
        <nuxt-link
          :key="index"
          :to="nav.link"
          class="link"
          exact
        >
          <span
            v-for="t in nav.text.split('')"
            :key="t"
          >
            {{ t }}
          </span>
        </nuxt-link>
        <span
          v-if="index < navs.length-1"
          :key="`split-${index}`"
        >
          /
        </span>
      </template>
      <div
        :style="style"
        class="blur"
      />
    </h4>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Welcome',

  layout: 'empty',

  data() {
    return {
      navs: this.$getConfig('navs'),
      mode: this.$getConfig('bg_mode'),
    }
  },

  computed: {
    ...mapState(['bgImage']),
    style() {
      // if (this.mode === 'random') {
      //   return {
      //     backgroundImage: `url(https://api.lylares.com/bing/image/random/?w=640&h=480)`,
      //   }
      // }
      if (this.bgImage) {
        return {
          backgroundImage: `url(https://api.dujin.org/bing/1366.php)`,
        }
      }
      return {}
    },
  },

}
</script>

<style lang="scss" scoped>
.welcome {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(~assets/images/main_bg.jpg);
  background-size: cover;

  &.static {
    background-repeat: no-repeat;
    background-position-x: 20%;
    background-position-y: 20%;
  }

  .slogan-wrap {
    position: absolute;
    top: 0;
    right: 10%;
    height: 170px;
    padding: 1rem .5rem;
    overflow: hidden;

    img {
      height: 100%;
    }
  }

  .nav {
    position: absolute;
    top: 30%;
    right: 10%;
    padding: 2rem;
    overflow: hidden;
    color: $c-white;
    background-color: rgba(181, 181, 181, .3);
    border-radius: $radius;

    &:hover {
      background-color: rgba(181, 181, 181, .5);
    }

    a:hover {
      color: $color-primary;
      transition: color .3s;
    }

    span {
      padding: .35rem 0.2rem;
    }
  }

  .blur {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -20px;
    background-size: cover;
    background-attachment: fixed;
    filter: blur(3px);
  }

}

.link {
  position: relative;
  display: inline-flex;
  padding: 2px;
  overflow: hidden;
  color: $c-white;
  font-weight: 400;
  text-transform: uppercase;

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 2px solid $c-black;
    transform: translate3d(-101%, 0, 0);
    transition: transform .5s;
    content: "";
  }

  &:hover::before {
    transform: translate3d(0, 0, 0);
  }

  span {
    position: relative;
    display: inline-block;
    transform: perspective(1000px) rotate3d(0, 1, 0, 0deg);
    transition: transform .5s, color .5s;
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
    transition-delay: .1s;
  }

  span:nth-child(2),
  &:hover span:nth-child(3) {
    transition-delay: .2s;
  }

  span:first-child,
  &:hover span:nth-child(4) {
    transition-delay: .3s;
  }
}
</style>
