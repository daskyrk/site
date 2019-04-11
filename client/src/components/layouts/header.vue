<template>
  <header
    class="default-header"
    :class="{ hide }"
  >
    <div class="header-left">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="f1" x="0" y="0" width="100%" height="100%">
          <feGaussianBlur in="BackgroundImage" stdDeviation="15" />
        </filter>
      </svg> -->
      <nav>
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link
          v-for="(nav, index) in navs"
          :key="index"
          :to="nav.link"
          exact
        >
          {{ nav.text }}
        </nuxt-link>
      </nav>
    </div>
    <div class="header-right">
      <input
        ref="searchInput"
        v-model="keyword"
        :class="{hide: !searchVisible}"
        type="text"
        class="header-search-input"
        maxlength="10"
        @keyup.enter="search"
        @blur="hideSearch"
      >
      <i
        :class="{hide: searchVisible}"
        class="iconfont icon-search header-search-icon"
        @click="showSearch"
      />
      <!-- <music-player v-bind="musicConf" /> -->
    </div>
  </header>
</template>

<script>
import _ from 'lodash'
import MusicPlayer from '~/components/common/music-player'

export default {
  components: {
    // MusicPlayer,
  },

  data() {
    return {
      keyword: '',
      navs: this.$getConfig('navs'),
      hide: false,
      searchVisible: false,
      musicConf: {
        // theme: '可选，不指定时为默认主题，值为"mini"时为迷你版主题',
        music: {
          src: 'http://sc1.111ttt.cn/2017/1/11/11/304112002347.mp3',
          title: '晚风',
          author: '好妹妹乐队',
          cover:
            'https://p3.music.126.net/Jkr2d7T0r51pVA9utSRiig==/109951163096071991.jpg?param=300y300',
          lrc:
            '[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n[00:36.690]温柔的晚风\n[00:39.129]轻轻吹过 故乡的天空\n[00:47.690]温柔的晚风\n[00:50.749]轻轻吹过 城市的灯火\n[00:59.119]今夜的晚风\n[01:02.439]你去哪里 请告诉我\n[01:08.249]\n[01:10.879]温柔的晚风\n[01:14.590]轻轻吹过 爱人的梦中\n[01:22.179]温柔的晚风\n[01:25.549]轻轻吹过 故乡的天空\n[01:33.809]温柔的晚风\n[01:37.539]轻轻地吹过 城市的灯火\n[01:46.509]今夜的晚风\n[01:49.919]你要去哪里 请告诉我\n[01:56.419]\n[02:37.140]温柔的晚风\n[02:40.740]轻轻吹过 爱人的梦中\n[02:49.060]温柔的晚风\n[02:52.370]轻轻吹过 故乡的天空\n[03:00.680]温柔的晚风\n[03:03.860]轻轻吹过 城市的灯火\n[03:12.190]今夜的晚风\n[03:15.440]你要去哪里 请告诉我\n[03:21.370]\n[03:23.620]温柔的晚风\n[03:27.090]轻轻吹过 爱人的梦中\n[03:35.280]温柔的晚风\n[03:39.570]轻轻吹过 故乡的天空\n[03:47.620]温柔的晚风\n[03:50.880]轻轻地吹过 城市的灯火\n[03:59.180]今夜的晚风\n[04:02.680]你要去哪里 请告诉我\n[04:08.800]\n[04:33.830]温柔的晚风\n[04:37.350]请你带走 我昨天的梦\n[04:45.350]今夜的晚风\n[04:48.960]我要去哪里 请告诉我\n[04:59.690]\n',
        },
        // target: '.player-container',
        autoplay: false, // 是否自动播放
      },
    }
  },

  mounted() {
    let scrollTop = this.getScrollTop()
    this.onScroll = _.throttle(() => {
      const t = this.getScrollTop()
      this.hide = t > scrollTop
      scrollTop = t
    }, 200)
    window.addEventListener('scroll', this.onScroll)
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
        this.$router.push(`/search?keyword=${e.target.value.trim()}`)
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
  },
}
</script>


<style lang="scss">
.default-header {
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: $header-height;
  padding: 0 2rem;
  background-color: rgba(255, 255, 255, .4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
  transition: transform .3s;
  // &:before {
  //   position: absolute;
  //   left: 0;
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   filter: url(#f1);
  // }
  &.hide {
    transform: translateY(-105%);
  }

  nav {
    a {
      margin-right: 2rem;
      color: $dimgray;
      transition: color .3s;
    }
  }

  .header-right {
    position: relative;
  }

  .header-search-icon {
    position: absolute;
    right: 0;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    &.hide {
      opacity: 0;
    }
  }

  .header-search-input {
    width: 160px;
    padding-left: .5rem;
    color: $dimgray;
    border: none;
    border-bottom: 1px solid $dimgray;
    outline: none;
    transition: all .25s;

    &.hide {
      width: 0;
      opacity: 0;
    }
  }
}
</style>
