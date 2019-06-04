<template>
  <no-ssr>
    <div
      :class="containerClass"
      @mousewheel.prevent="handleMouseWheel"
    >
      <audio
        ref="audio"
        :src="music.src"
        preload="auto"
        @ended="handleAudioEnd"
        @canplaythrough="handleCanPlayThrough"
        @durationchange="handleDurationChange"
        @timeupdate="handleTimeUpdate"
      />
      <div class="mplayer-info">
        <div class="mplayer-info-cover">
          <img
            v-if="music.src"
            :src="music.cover || 'https://picsum.photos/100/?random'"
            alt="cd-cover"
          >
        </div>
        <div class="mplayer-meta">
          <div class="mplayer-meta-title">
            {{ music.title }}
          </div>
          <div class="mplayer-meta-author">
            {{ music.author }}
          </div>
          <div class="mplayer-meta-time-tick">
            <span class="mplayer-meta-time-tick-text">
              {{ curTime }}
            </span>
          </div>
        </div>
      </div>
      <canvas
        ref="canvas"
        class="mplayer-spectrum"
      />
      <div class="mplayer-lyric">
        <div
          class="mplayer-lyric-area"
          :style="{transform: `translateY(${-20 * currentLrcIndex}px)`}"
        >
          <p
            v-for="(lyric, i) in lyrics"
            :key="i"
            :class="{
              'mplayer-lyric-pre': currentLrcIndex === i -1,
              'mplayer-lyric-current': currentLrcIndex === i,
              'mplayer-lyric-next': currentLrcIndex === i+1,
            }"
          >
            {{ lyric.text }}
          </p>
        </div>
      </div>
      <div class="mplayer-control">
        <div
          class="mplayer-control-play"
          @click="handlePlayToggle"
        >
          <i class="icon-music-play" />
          <i class="icon-music-pause" />
        </div>
      </div>
      <div class="mplayer-volume-bg">
        <div class="mplayer-volume">
          <i
            class="icon-music-volume"
            :style="{opacity: volume}"
          />
          <div
            class="mplayer-volume-progress"
            :style="{width: volume * 100 + '%'}"
          />
        </div>
      </div>
      <div class="mplayer-duration">
        <i class="icon-music-clock" />
        <span class="mplayer-duration-text">
          {{ durationText }}
        </span>
      </div>
      <div class="mplayer-loadingsign">
        <i class="icon-music-spin animate-spin" />loading
      </div>
      <div class="mplayer-timeline-bg">
        <div
          class="mplayer-timeline"
          @click="handleTimeLineClick($event)"
        >
          <div
            class="mplayer-timeline-passed"
            :style="{width: playPercent}"
          />
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import spectrum from '~/utils/spectrum.js'

export default {
  props: {
    music: {
      type: Object,
      required: true,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    onPlay: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      loading: true,
      playing: false,
      adjustingVolume: false,
      audioEnd: false,
      durationText: 'loading',
      duration: 0,
      currentLrcIndex: 0,
      currentTime: 0,
      volume: 0.8,
      volumeStep: 0.05,
    }
  },

  computed: {
    containerClass() {
      return {
        'mplayer-container': !this.mini,
        'mplayer-container-mini': this.mini,
        'mplayer-haslrc': !!this.music.lrc,
        'mplayer-isloading': this.loading,
        'mplayer-isplaying': this.playing,
        'mplayer-adjusting-volume': this.adjustingVolume,
      }
    },
    lyrics() {
      return this.music.lrc ? this.parseLyric(this.music.lrc) : []
    },
    hasLrc() {
      return !!this.music.lrc
    },
    curTime() {
      return this.parseSec(this.currentTime)
    },
    playPercent() {
      const percent = 100 * (this.currentTime / this.duration)
      return percent.toFixed(2) + '%'
    },
  },

  mounted() {
    if (this.$refs.canvas !== undefined) {
      spectrum.init(this.$refs.canvas)
    }
  },

  methods: {
    // 歌词解析脚本
    // 修改自：https://github.com/DIYgod/APlayer
    parseLyric(text) {
      var lyric = text.split('\n')
      var lrc = []
      var len = lyric.length
      var reg1 = /\[(\d{2}):(\d{2})\.(\d{2,3})]/g
      var reg2 = /\[(\d{2}):(\d{2})\.(\d{2,3})]/
      for (var i = 0; i < len; i++) {
        var time = lyric[i].match(reg1)
        var lrcText = lyric[i].replace(reg1, '').replace(/^\s+|\s+$/g, '')
        // 排除空行
        if (!lrcText) {
          continue
        }
        if (time != null) {
          var timeLen = time.length
          for (var j = 0; j < timeLen; j++) {
            var oneTime = reg2.exec(time[j])
            var lrcTime =
              oneTime[1] * 60 +
              parseInt(oneTime[2]) +
              parseInt(oneTime[3]) /
                ((oneTime[3] + '').length === 2 ? 100 : 1000)
            lrc.push({
              time: lrcTime,
              text: lrcText,
            })
          }
        }
      }
      lrc.sort(function(a, b) {
        return a.time - b.time
      })
      return lrc
    },
    parseSec(sec) {
      const tempMin = (sec / 60) | 0
      const tempSec = sec % 60 | 0
      const curMin = tempMin < 10 ? '0' + tempMin : tempMin
      const curSec = tempSec < 10 ? '0' + tempSec : tempSec
      return curMin + ':' + curSec
    },
    currentIndex(time) {
      const lyrics = this.lyrics
      if (time < lyrics[0].time) return 0
      let i = 0
      const length = lyrics.length
      for (i = 0; i < length; i++) {
        if (
          time >= lyrics[i].time &&
          (!lyrics[i + 1] || time <= lyrics[i + 1].time)
        ) {
          break
        }
      }
      return i
    },
    handleAudioEnd() {
      if (this.loop) {
        this.$refs.audio.play()
      } else {
        this.audioEnd = true
        this.playing = false
      }
    },
    handleCanPlayThrough(e) {
      const duration = e.target.duration
      this.loading = false
      this.durationText = this.parseSec(duration.toFixed(0))
      if (this.autoplay && !this.playing) {
        this.handlePlayToggle();
      }
    },
    handleDurationChange(e) {
      this.duration = e.target.duration
    },
    handleTimeUpdate() {
      const audio = this.$refs.audio
      if (audio) {
        this.currentTime = audio.currentTime
        const curTimeForLrc = audio.currentTime.toFixed(3)
        if (this.hasLrc && !this.mini) {
          this.currentLrcIndex = this.currentIndex(curTimeForLrc)
        }
      }
    },
    handlePlayToggle() {
      const audio = this.$refs.audio

      if (audio.paused) {
        audio.play()
        if (!this.mini && !this.hasLrc) {
          if (this.$refs.canvas !== undefined) {
            spectrum.init(this.$refs.canvas)
          }
          spectrum.draw()
        }
      } else {
        audio.pause()
        spectrum.stop()
      }
      this.playing = !audio.paused
      this.onPlay(this.playing);
    },
    handleMouseWheel(e) {
      if (!this.playing) {
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      const step = this.volumeStep;
      const audio = this.$refs.audio;
      this.adjustingVolume = true
      if (e.wheelDeltaY < 0 && audio.volume > step) {
        audio.volume -= step
      }
      if (e.wheelDeltaY > 0 && audio.volume < 1 - step) {
        audio.volume += step
      }
      this.volume = audio.volume;

      this.timer = setTimeout(()=> {
        this.adjustingVolume = false
      }, 1000)
    },
    handleTimeLineClick(e) {
      const clickPercent = e.offsetX / e.currentTarget.offsetWidth
      this.currentTime = (clickPercent * this.duration).toFixed(0)
      this.$refs.audio.currentTime = this.currentTime
    },
    toggleTheme() {
      let step = 0.03
      let count = 0
      const maxCount = 200

      utils.addClass(mplayerContainer, 'mplayer-changing-theme')

      // theme = mini ? normal : mini

      loop()

      function loop() {
        count++
        mplayerContainer.style.opacity -= step
        if (mplayerContainer.style.opacity <= 0) {
          step *= -1
          mplayerContainer.style.opacity = 0
          utils.toggleClass(mplayerContainer, 'mplayer-container-mini')
          utils.toggleClass(mplayerContainer, 'mplayer-container')
        }
        if (mplayerContainer.style.opacity < 1 && count < maxCount) {
          requestAnimationFrame(loop)
        } else {
          setTimeout(function() {
            utils.removeClass(mplayerContainer, 'mplayer-changing-theme')
          }, 500)
        }
      }
    },

    // search(kw) {
    //   this.$store.dispatch('music/search', { q, count: 36 }).then(() => {
    //     this.loading = false
    //   })
    // },
  },
}
</script>

<style lang="scss" scoped>
$h: 90px;
$transition: all .6s cubic-bezier(0, .36, .51, 1.39);
$right: 30px;

.mplayer-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 360px;
  height: $h;
  font-family: Helvetica, Tahoma, Arial, STXihei, "华文细黑", "Microsoft YaHei",
    "微软雅黑", SimSun, "宋体", Heiti, "黑体", sans-serif;
  background: #ffffff;
  box-shadow: 0 0 20px rgba(59, 59, 177, .18);

  &.mplayer-isplaying {
    .mplayer-info-cover {
      transform: translateX(-100%);
      opacity: 0;
      pointer-events: none;
    }

    .mplayer-meta {
      transform: scale(.85, .85) translateX(-110px);

      .mplayer-meta-title {
        margin-top: 4px;
      }

      .mplayer-meta-time-tick {
        transform: translateY(0);
        opacity: 1;
        transition: all .6s cubic-bezier(0, .36, .51, 1.39) .65s;
      }
    }

    .mplayer-spectrum {
      width: 220px;
      transform: translateX(0);
      opacity: 1;
    }

    .mplayer-lyric {
      z-index: 0;
      transform: translateY(0);
      opacity: 1;
    }

    .mplayer-lyric-area {
      opacity: 1;

      p {
        line-height: 20px;
      }
    }

    .mplayer-control-play {
      top: -70px;
      opacity: .6;
      animation: breath 2s infinite alternate;

      &:hover {
        opacity: .9;
      }

      .icon-music-play {
        transform: translateX(8px);
        opacity: 0;
      }

      .icon-music-pause {
        transform: translateX(-1px);
        opacity: 1;
      }
    }

    .mplayer-duration {
      i {
        transform: rotateZ(360deg);
      }
    }

    .mplayer-timeline {
      transform: translateY(0);
      cursor: pointer;
      opacity: 1;
    }

    .mplayer-timeline-bg {
      &:hover {
        .mplayer-timeline {
          height: 8px;
        }
      }
    }
  }

  &.mplayer-haslrc {
    .mplayer-spectrum {
      display: none;
    }
  }

  &.mplayer-adjusting-volume {
    .mplayer-volume-bg {
      z-index: 20;
      opacity: 1;
    }
  }

  &.mplayer-isloading {
    .mplayer-duration {
      opacity: 0;
    }

    .mplayer-loadingsign {
      opacity: 1;
    }
  }

  &.mplayer-changing-theme {
    .mplayer-volume-bg {
      display: none;
    }
  }
}

.mplayer-info {
  position: relative;
  display: flex;
  font-weight: 300;
}

.mplayer-info-cover {
  width: $h;
  height: $h;
  margin-right: 10px;
  overflow: hidden;
  transition: $transition;

  img {
    width: $h;
    height: 100%;
    border: 6px solid #ffffff;
    box-shadow: 0 0 20px rgba(59, 59, 177, .35);
  }
}

.mplayer-meta {
  display: inline-flex;
  flex-direction: column;
  line-height: initial;
  transition: $transition;

  .mplayer-meta-time-tick {
    color: rgba(0, 0, 0, .6);
    font-size: 13px;
    letter-spacing: 1px;
    transform: translateY(10px);
    opacity: 0;
  }
}

.mplayer-meta-title {
  margin-top: 27px;
  margin-bottom: 2px;
  color: #464649;
  font-size: 14px;
  letter-spacing: 1px;
  transition: $transition;
}

.mplayer-meta-author {
  flex-grow: 1;
  color: #95959b;
  font-size: 12px;
}

.mplayer-spectrum {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 30px;
  margin-top: -15px;
  margin-left: -120px;
  transform: translateX(110px);
  opacity: 0;
  transition: all .7s cubic-bezier(.17, .67, .45, 1.26) .1s;
}

.mplayer-lyric {
  position: absolute;
  top: 0;
  left: $h;
  z-index: -2;
  height: 100%;
  overflow: hidden;
  opacity: 0;
  transition: all 1s;
}

.mplayer-lyric-area {
  margin-top: 35px;
  color: rgba(0, 0, 0, .7);
  font-size: 12px;
  text-align: center;
  opacity: 0;
  transition: transform .7s;

  p {
    width: 100%;
    margin: 0;
    padding: 0;
    line-height: 0;
    opacity: 0;
    transition: all .6s;
  }

  .mplayer-lyric-current {
    color: #d94240;
    font-size: 1.1em;
    opacity: 1;
  }
}

.mplayer-haslrc {
  .mplayer-lyric-area {
    display: block;
  }
}

.mplayer-lyric-area .mplayer-lyric-pre,
.mplayer-lyric-area .mplayer-lyric-next {
  opacity: .35;
}

.mplayer-control {
  position: relative;
  z-index: 2;
  margin-right: $right;
}

.mplayer-volume-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .8);
  opacity: 0;
  transition: all .8s;
}

.mplayer-volume {
  width: 60px;
  margin: 13px auto 0;
  color: rgba(150, 150, 150, .75);
  font-size: 50px;
  text-align: center;
  transition: all .9s;
}

.mplayer-volume-progress {
  height: 4px;
  background: rgba(150, 150, 150, .75);
  border-radius: 1px;
  transition: width .2s;
}

.mplayer-control-play {
  position: absolute;
  top: -25px;
  right: 0;
  width: 50px;
  height: 50px;
  color: #d94240;
  text-align: center;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(59, 59, 177, .22);
  cursor: pointer;
  transition: top .6s cubic-bezier(0, .74, .61, 1.35);

  &:hover {
    animation: breath 2s infinite alternate;
  }

  i {
    position: absolute;
    left: 50%;
    margin-left: -7px;
    line-height: 50px;
    transition: all .5s;
  }

  .icon-music-play {
    transform: translateX(2px);
    opacity: 1;
  }

  .icon-music-pause {
    transform: translateX(-8px);
    opacity: 0;
  }
}

.mplayer-duration,
.mplayer-loadingsign {
  position: absolute;
  right: $right;
  bottom: 24px;
  color: rgba(0, 0, 0, .6);
  font-size: 12px;
  letter-spacing: 1px;
  transition: all .6s cubic-bezier(0, .74, .61, 1.35);
}

.mplayer-container.mplayer-isplaying .mplayer-duration,
.mplayer-container.mplayer-isplaying .mplayer-loadingsign {
  bottom: 44px;
  z-index: -1;
  transform: scale(.5, .5);
  opacity: 0;
}

.mplayer-loadingsign {
  opacity: 0;
}

.mplayer-duration i,
.mplayer-loadingsign i {
  margin-right: 3px;
  color: rgba(217, 66, 64, .5);
  transform: scale(.9, .9);
  transition: all .7s;
}

.mplayer-timeline-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8px;
}

.mplayer-timeline {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  overflow: hidden;
  background: rgba(231, 231, 239, .8);
  transform: translateY(2px);
  opacity: 0;
  transition: all .5s;

  .mplayer-timeline-passed {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 100%;
    background: #d94240;
  }
}

.mplayer-container-mini {
  position: relative;
  width: $h;
  height: $h;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(59, 59, 177, .18);

  .mplayer-control {
    margin-right: 0;
  }

  .mplayer-control-play {
    position: absolute;
    top: 0;
    width: $h;
    height: $h;
    color: #d94240;
    font-size: 26px;
    line-height: $h;

    [class^="icon-"] {
      position: absolute;
      left: 50%;
      margin-left: -11px;
      line-height: $h;
      cursor: pointer;
      transition: all .5s;
    }

    .icon-music-play {
      transform: translateX(4px);
      opacity: 1;
    }

    .icon-music-pause {
      transform: translateX(-16px);
      opacity: 0;
    }
  }

  &.mplayer-isplaying {
    .mplayer-control-play {
      .icon-music-play {
        transform: translateX(16px);
        opacity: 0;
      }

      .icon-music-pause {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .mplayer-volume {
    margin: 0 auto;
  }

  .mplayer-volume-progress {
    display: none;
  }

  .mplayer-volume-bg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, .9);
    font-size: 30px;
    line-height: $h;
    text-align: center;
    background: rgba(255, 255, 255, .98);
    border-radius: 50%;
    transition: all .8s;

    i {
      transform: translateX(-20px);
      opacity: 0;
      transition: all .7s;
    }
  }

  &.mplayer-adjusting-volume {
    .mplayer-volume-bg {
      z-index: 0;
      opacity: 1;

      i {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  &.mplayer-changing-theme {
    .mplayer-volume-bg {
      display: none;
    }
  }
}

.mplayer-isplaying {
  &.mplayer-container-mini {
    animation: breath 2s infinite alternate;
  }
}

.mplayer-container-mini .mplayer-info,
.mplayer-container-mini .mplayer-spectrum,
.mplayer-container-mini .mplayer-lyric,
.mplayer-container-mini .mplayer-duration,
.mplayer-container-mini .mplayer-loadingsign,
.mplayer-container-mini .mplayer-timeline-bg {
  display: none;
}

@keyframes breath {
  0% {
    box-shadow: 0 0 35px rgba(59, 59, 177, .22);
  }

  100% {
    box-shadow: 0 0 10px rgba(59, 59, 177, .33);
  }
}

@font-face {
  font-weight: normal;
  font-family: fontello;
  font-style: normal;
  src: url(~assets/fonts/fontello.eot);
  src: url(~assets/fonts/fontello.eot#iefix) format("embedded-opentype"),
    url(~assets/fonts/fontello.woff) format("woff"),
    url(~assets/fonts/fontello.ttf) format("truetype"),
    url(~assets/fonts/fontello.svg#fontello) format("svg");
}

[class^="icon-music-"]:before,
[class*=" icon-music"]:before {
  display: inline-block;
  font-weight: normal;
  font-family: "fontello";
  font-style: normal;
  font-variant: normal;
  text-align: center;
  text-transform: none;
  text-decoration: inherit;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-music-play:before {
  content: "\e801";
} /* '' */

.icon-music-pause:before {
  content: "\e802";
} /* '' */

.icon-music-clock:before {
  content: "\e803";
} /* '' */

.icon-music-volume:before {
  content: "\e804";
} /* '' */

.icon-music-spin:before {
  content: "\e800";
} /* '' */
</style>
