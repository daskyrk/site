<template>
  <header
    class="default-header"
    :class="{ hide }"
  >
    <div class="flex-box header-container">
      <div
        class="header-left"
        :class="{'rabbit-hole': pressKey.key === 'Meta'}"
      >
        <nuxt-link :to="pressKey.key === 'Meta' ? '/admin' : '/'">
          <img
            class="logo admin-entry"
            src="~assets/images/logo.png"
            alt="logo"
          >
          <img
            class="logo"
            src="~assets/images/daskyrk.png"
            alt="logo"
          >
        </nuxt-link>
      </div>
      <div class="header-right">
        <nav class="header-nav">
          <nuxt-link
            v-for="(nav, index) in navs"
            :key="index"
            :to="nav.link"
            exact
          >
            {{ nav.text }}
          </nuxt-link>
        </nav>
        <div
          class="header-icon-wrap"
          @click.self="musicVisible = !musicVisible"
        >
          <i
            class="iconfont icon-music"
            :class="{playing: playingMusic}"
          />
          <div
            v-show="musicVisible"
            class="header-music"
          >
            <music-player
              :music="music"
              :on-play="onPlay"
              autoplay
              loop
            />
          </div>
        </div>
        <div
          class="header-icon-wrap"
          :class="{['search-visible']: searchVisible}"
          @click="showSearch"
        >
          <i
            class="iconfont icon-search header-search-icon"
          />
          <input
            ref="searchInput"
            v-model="keyword"
            type="text"
            class="header-search-input"
            maxlength="10"
            placeholder="想找点什么?"
            @keyup.enter="search"
            @blur="hideSearch"
          >
        </div>
        <div class="mobile-menu-container">
          <svg
            class="ham hamRotate"
            viewBox="-18 -24 148 148"
            width="64"
            :class="{active: sideopen}"
            @click="toggleAppSide"
          >
            <path
              class="line top"
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
            />
            <path
              class="line middle"
              d="m 70,50 h -40"
            />
            <path
              class="line bottom"
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
            />
          </svg>
          <!-- <div
            class="mobile-menu"
            :class="{visible:mobileMenuVisible}"
          >
            <nav class="mobile-nav">
              <nuxt-link
                v-for="(nav, index) in navs"
                :key="index"
                :to="nav.link"
                exact
              >
                {{ nav.text }}
              </nuxt-link>
            </nav>
          </div> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import _ from 'lodash'
import MusicPlayer from '~/components/common/music-player'
import { mapState } from 'vuex'

export default {
  components: {
    MusicPlayer,
  },

  data() {
    return {
      keyword: '',
      navs: this.$getConfig('navs'),
      hide: false,
      musicVisible: false,
      playingMusic: false,
      searchVisible: false,
    }
  },

  computed: {
    ...mapState({
      sideopen: state => state.layout.sideOpen,
      pressKey: state => state.layout.pressKey,
    }),
    music() {
      const song = this.$store.state.music.songs[0]
      if (!song) {
        return { }
      }
      return {
        src: song.url,
        title: song.name,
        author: song.artists.join(' '),
        cover: song.album.picture,
        lrc: song.lyric.base,
      }
    }
  },

  mounted() {
    let scrollTop = this.getScrollTop()
    this.onScroll = _.throttle(() => {
      if (this.sideopen) {
        return
      }
      const t = this.getScrollTop()
      this.hide = t > scrollTop
      scrollTop = t
    }, 200)
    window.addEventListener('scroll', this.onScroll, {
      passive: true,
    })
    this.$store.dispatch('music/getSongs', [
      483671599,
      // 28387594,
      // 131726,
      // 29713754,
    ])
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    showSearch() {
      this.searchVisible = true
      this.$refs.searchInput.focus()
    },
    hideSearch() {
      this.searchVisible = false
    },
    search(e) {
      const value = e.target.value.trim()
      if (value.length) {
        this.$router.push(`/search?q=${e.target.value.trim()}`)
      }
    },
    getScrollTop() {
      return (
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        window.scrollY ||
        document.body.scrollTop
      )
    },
    toggleAppSide() {
      this.$store.commit('layout/toggleAppSide', !this.sideopen);
    },
    onPlay(playing) {
      this.playingMusic = playing;
    }
  },
}
</script>


<style lang="scss" scoped>
.default-header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  background-color: $c-white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
  transition: transform .5s;

  &.hide {
    transform: translateY(-$header-height);
  }

  .header-container {
    position: relative;
    width: $content-width;
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .header-left {
    position: relative;
    display: inline-block;

    .logo {
      height: $header-height;
      margin-left: 1rem;
      transition: transform .3s;
    }

    .admin-entry {
      position: absolute;
      bottom: $header-height;
    }

    &.rabbit-hole {
      .logo {
        transform: translateY(100%);
      }
    }
  }

  .header-right {
    display: flex;
    height: 100%;
  }

  .header-music {
    position: fixed;
    top: 70px;
    right: 20%;
  }

  $transition: color .2s, background-color .2s;

  .header-nav {
    a {
      display: inline-block;
      padding: 0 1rem;
      color: $c-black;
      transition: $transition;

      &:hover {
        color: $color-active-red;
        background-color: $c-ghostwhite;
      }
    }

    .exact-active-link {
      color: $color-active-red;
    }
  }

  .header-icon-wrap {
    position: relative;
    z-index: 3;
    min-width: 4rem;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    transition: $transition;

    > i {
      pointer-events: none;
    }


    &:hover {
      color: $color-active-red;
      background-color: $c-ghostwhite;
    }

    &.search-visible {
      width: 200px;

      .header-search-icon {
        background-color: transparent;
        transform: translateX(-1rem);
      }

      .header-search-input {
        opacity: 1;
        transition: opacity .5s;
      }
    }
  }

  .icon-music {
    display: inline-block;
    width: 18px;
    font-size: 18px;

    &.playing {
      color: $color-active-red;
      animation: playing 2s linear infinite;
    }
  }

  .header-search-icon {
    position: absolute;
    left: 0;
    z-index: 2;
    display: inline-block;
    width: 4rem;
    transition: background-color .25s, transform .25s;
  }

  .header-search-input {
    position: absolute;
    left: 0;
    width: 200px;
    padding-left: 2rem;
    color: $c-dimgray;
    border: none;
    outline: none;
    opacity: 0;
  }

  .ham {
    vertical-align: unset;
    cursor: pointer;
    transition: transform 400ms;
    user-select: none;

    .line {
      transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
      fill: none;
      stroke: $c-black;
      stroke-width: 3;
      stroke-linecap: round;
    }

    &.active {
      transform: rotate(45deg);
    }

    .top {
      stroke-dasharray: 40 121;
    }

    .bottom {
      stroke-dasharray: 40 121;
    }

    &.active .top {
      stroke-dashoffset: -68px;
    }

    &.active .bottom {
      stroke-dashoffset: -68px;
    }
  }

  .mobile-menu-container {
    display: none;
  }

  .mobile-menu {
    position: fixed;
    top: $header-height;
    right: -60%;
    bottom: 0;
    width: 60%;
    background-color: #eef1f2;
    transition: right .5s;

    &.visible {
      right: 0;
    }
  }

  .mobile-nav {
    a {
      display: block;
      height: 3rem;
      padding-left: 12px;
    }
  }

}

@include md-width () {
  .header-music {
    right: 10%;
  }
}

@include sm-width () {
  .default-header {
    .header-nav {
      display: none;
    }

    .mobile-menu-container {
      display: unset;
    }

    .header-search-icon {
      width: 3rem;
      margin-right: 4rem;
      font-size: 18px;
    }

    .header-music {
      right: 6px;
    }
  }
}


@keyframes playing {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
