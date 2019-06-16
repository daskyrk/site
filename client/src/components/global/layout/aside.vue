<template>
  <aside class="app-aside">
    <nav class="mobile-nav">
      <div class="owner-info">
        <img
          src="/icon.jpg"
          alt="owner-avatar"
        >
        <div class="owner-name">
          {{ owner }}
        </div>
        <div class="owner-slogan">
          {{ slogan }}
        </div>
      </div>
      <div class="nav-links">
        <nuxt-link
          v-for="(nav, index) in navs"
          :key="index"
          :to="nav.link"
        >
          {{ nav.text }}
        </nuxt-link>
      </div>
    </nav>
  </aside>
</template>

<script>

export default {
  data() {
    return {
      navs: this.$getConfig('navs'),
      owner: this.$getConfig('owner'),
      slogan: this.$getConfig('slogan'),
    }
  },
}
</script>

<style lang="scss">
@keyframes swing{
  0% {
    transform: rotate(-20deg);
  }
  15% {
    transform: rotate(14deg);
  }
  30% {
    transform: rotate(-9deg);
  }
  45% {
    transform: rotate(5deg);
  }
  60% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(2deg);
  }
  90% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

$open-time: 0.1s;

.app-aside {
  position: fixed;
  left: 100%;
  width: $app-side-width;
  height: 100%;
  overflow: hidden;
  transition: box-shadow 0.4s $open-time;

  .owner-info {
    // transform: translateY(-100%);
    // transition: transform 0.2s ease-out;
    text-align: center;
    padding-bottom: 24px;
    // box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
    //     0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);

    img {
      width: 80px;
      border-radius: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
        0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
    }

    .owner-name {
      font-weight: bold;
      margin-bottom: 12px;
    }

    .owner-slogan {
      padding: 0 12px;
      font-size: 12px;
      color: $color-text-sub;
    }
  }

  .nav-links {
    text-align: center;
    font-size: 16px;
    margin-top: 12px;

    a {
      display: block;
      padding: 12px 0;
      border-top: 1px solid $color-border;

      &:last-child {
        border-bottom: 1px solid $color-border;
      }

      &.active-link {
        background-color: rgba(69, 160, 255, 0.15);
      }
    }
  }
}

.side-open {
  .owner-info {
    img {
      transform-origin: top;
      animation-delay: $open-time;
      animation: swing 2.5s ease-out forwards;
    }
  }
}
</style>
