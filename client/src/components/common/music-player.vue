<template>
  <div class="player-container">
    <div
      ref="container"
      :class="containerClass"
    >
      <audio
        ref="audio"
        :src="music.src"
        preload="auto"
        @ended="handleAudioEnd"
        @canplaythrough="handleCanPlayThrough($event)"
        @durationchange="handleDurationChange($event)"
        @timeupdate="handleTimeUpdate"
      />
      <div class="uplayer-info">
        <div class="uplayer-info-cover">
          <img
            :src="music.coverSrc || 'https://picsum.photos/100/?random'"
            alt="cd-cover"
          >
        </div>
        <div class="uplayer-meta">
          <div class="uplayer-meta-title">
            {{ music.title }}
          </div>
          <div class="uplayer-meta-author">
            {{ music.author }}
          </div>
          <div class="uplayer-meta-time-tick">
            <span
              ref="timeTick"
              class="uplayer-meta-time-tick-text"
            />
          </div>
        </div>
      </div>
      <canvas
        ref="canvas"
        class="uplayer-spectrum"
      />
      <div
        ref="lyricArea"
        class="uplayer-lyric"
      >
        <div class="uplayer-lyric-area" />
      </div>
      <div class="uplayer-control">
        <div
          ref="playBtn"
          class="uplayer-control-play"
          @click="handlePlayClick"
        >
          <i class="icon-music-play" />
          <i class="icon-music-pause" />
        </div>
      </div>
      <div class="uplayer-volume-bg">
        <div
          ref="volumeArea"
          class="uplayer-volume"
        >
          <i class="icon-music-volume" />
          <div
            ref="volumeProgress"
            class="uplayer-volume-progress"
          />
        </div>
      </div>
      <div
        ref="duration"
        class="uplayer-duration"
      >
        <i class="icon-music-clock" />
        <span class="uplayer-duration-text">
          {{ durationText }}
        </span>
      </div>
      <div class="uplayer-loadingsign">
        <i class="icon-music-spin animate-spin" />loading
      </div>
      <div class="uplayer-timeline-bg">
        <div
          ref="timeline"
          class="uplayer-timeline"
          @click="handleTimeLineClick($event)"
        >
          <div
            ref="timePassed"
            class="uplayer-timeline-passed"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import test from 'meplayer';
import spectrum from '~/utils/spectrum.js'
// import 'meplayer/dist/meplayer.min.css';

const THEME_DEFAULT = 'default'
const THEME_MINI = 'mini'
const LYRIC_CURRENT_CLASS = 'uplayer-lyric-current'
const LYRIC_NEXT_CLASS = 'uplayer-lyric-next'

function parseSec(sec) {
  const tempMin = (sec / 60) | 0
  const tempSec = sec % 60 | 0
  const curMin = tempMin < 10 ? '0' + tempMin : tempMin
  const curSec = tempSec < 10 ? '0' + tempSec : tempSec
  return curMin + ':' + curSec
}

function getAbsLeft(el) {
  let left = el.offsetLeft
  while (el.offsetParent) {
    el = el.offsetParent
    left += el.offsetLeft
  }
  return left
}

function currentIndex(time) {
  if (time < lyrics[0].time) return 0
  for (let i = 0, l = lyrics.length; i < l; i++) {
    if (
      time >= lyrics[i].time &&
      (!lyrics[i + 1] || time <= lyrics[i + 1].time)
    ) {
      break
    }
  }
  return i
}

var lyrics

// 歌词解析脚本
// 修改自：https://github.com/DIYgod/APlayer
function parse(text) {
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
          parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000)
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

  lyrics = lrc
  return this
}

export default {
  props: {
    music: {
      type: Object,
      required: true,
    },
    theme: {
      type: String,
      default: THEME_DEFAULT,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: true,
      loop: false,
      hasLrc: false,
      playing: false,
      durationText: 'loading',
      duration: 0,
    }
  },

  computed: {
    containerClass() {
      return {
        'uplayer-container': true,
        'uplayer-haslrc': !!this.music.lrc,
        'uplayer-isloading': this.loading,
        'uplayer-isplaying': this.playing,
      }
    },
    lyrics() {
      return this.music.lrc ? parse(this.music.lrc) : []
    },
  },

  mounted() {
    spectrum.init(this.$refs.canvas)
  },

  methods: {
    handleAudioEnd() {
      if (this.loop) {
        this.$refs.audio.play()
      } else {
        this.audioEnd = true
      }
    },
    handleCanPlayThrough(e) {
      const duration = e.target.duration
      this.loading = false
      this.durationText = parseSec(duration.toFixed(0))
    },
    handleDurationChange(e) {
      this.duration = e.target.duration
    },
    handleTimeUpdate() {
      const audio = this.$refs.audio
      const curTime = audio.currentTime
      const curTimeForLrc = audio.currentTime.toFixed(3)
      const playPercent = 100 * (curTime / this.duration)

      this.$refs.timePassed.style.width = playPercent.toFixed(2) + '%'
      this.$refs.timeTick.innerText = parseSec(curTime)

      if (this.hasLrc && this.theme === THEME_DEFAULT) {
        const tempLrcIndex = currentIndex(curTimeForLrc)
        const tempLrcLines = lyricArea.querySelectorAll('p')
        const tempLrcLinePre = tempLrcLines[tempLrcIndex - 1]
        const tempLrcLine = tempLrcLines[tempLrcIndex]
        const tempLrcLineNext = tempLrcLines[tempLrcIndex + 1]

        if (!tempLrcLine.className.includes('uplayer-lyric-current')) {
          utils.removeClass(
            lyricArea.querySelector('.uplayer-lyric-current'),
            'uplayer-lyric-current',
          )
          if (lyricArea.querySelector('.uplayer-lyric-pre')) {
            utils.removeClass(
              lyricArea.querySelector('.uplayer-lyric-pre'),
              'uplayer-lyric-pre',
            )
          }
          if (lyricArea.querySelector('.uplayer-lyric-next')) {
            utils.removeClass(
              lyricArea.querySelector('.uplayer-lyric-next'),
              'uplayer-lyric-next',
            )
          }
          utils.addClass(tempLrcLine, 'uplayer-lyric-current')
          if (tempLrcLinePre) {
            utils.addClass(tempLrcLinePre, 'uplayer-lyric-pre')
          }
          if (tempLrcLineNext) {
            utils.addClass(tempLrcLineNext, 'uplayer-lyric-next')
          }
        }

        this.$refs.lyricArea.style.webkitTransform =
          'translateY(-' + 20 * tempLrcIndex + 'px)'
        this.$refs.lyricArea.style.transform =
          'translateY(-' + 20 * tempLrcIndex + 'px)'
      }
    },
    handlePlayClick() {
      const audio = this.$refs.audio

      if (audio.paused) {
        audio.play()
        if (this.theme === THEME_DEFAULT && !this.hasLrc) {
          spectrum.draw()
        }
        // 播放状态中可以用滑轮调节音量
        // meplayerContainer.addEventListener(
        //   'mousewheel',
        //   (function handleMouseWheel() {
        //     const timer = null;
        //     const step = 0.05;
        //     _handleMouseWheel = function(event) {
        //       if (timer) {
        //         clearTimeout(timer);
        //       }
        //       if (
        //         !meplayerContainer.className.includes('uplayer-adjusting-volume')
        //       ) {
        //         utils.addClass(meplayerContainer, 'uplayer-adjusting-volume');
        //       }
        //       if (event.wheelDeltaY < 0 && audio.volume > step) {
        //         audio.volume -= step;
        //       }
        //       if (event.wheelDeltaY > 0 && audio.volume < 1 - step) {
        //         audio.volume += step;
        //       }
        //       if (theme === THEME_DEFAULT) {
        //         volumeProgress.style.width = audio.volume * 100 + '%';
        //       } else {
        //         volumeArea.querySelector('i').style.opacity = audio.volume;
        //       }
        //       event.preventDefault();

        //       timer = setTimeout(function() {
        //         utils.removeClass(meplayerContainer, 'uplayer-adjusting-volume');
        //       }, 1000);
        //     };
        //     return _handleMouseWheel;
        //   })(),
        // );
      } else {
        audio.pause()
        spectrum.stop()
        // meplayerContainer.removeEventListener('mousewheel', _handleMouseWheel);
      }
      // utils.toggleClass(meplayerContainer, 'uplayer-isplaying');
      this.playing = !audio.paused
    },
    handleMouseWheel() {
      let timer = null
      let step = 0.05
      _handleMouseWheel = function(event) {
        if (timer) {
          clearTimeout(timer)
        }
        if (!meplayerContainer.className.includes('uplayer-adjusting-volume')) {
          utils.addClass(meplayerContainer, 'uplayer-adjusting-volume')
        }
        if (event.wheelDeltaY < 0 && audio.volume > step) {
          audio.volume -= step
        }
        if (event.wheelDeltaY > 0 && audio.volume < 1 - step) {
          audio.volume += step
        }
        if (theme === THEME_DEFAULT) {
          volumeProgress.style.width = audio.volume * 100 + '%'
        } else {
          volumeArea.querySelector('i').style.opacity = audio.volume
        }
        event.preventDefault()

        timer = setTimeout(function() {
          utils.removeClass(meplayerContainer, 'uplayer-adjusting-volume')
        }, 1000)
      }
      return _handleMouseWheel
    },
    handleTimeLineClick(e) {
      const target = e.target
      const clickPercent = (e.pageX - getAbsLeft(target)) / target.offsetWidth
      this.$refs.timePassed.style.width = clickPercent * 100 + '%'
      console.log('to :', clickPercent * this.duration)
      this.$refs.audio.currentTime = (clickPercent * this.duration).toFixed(0)
    },
    play() {
      if (audio.paused) {
        this.playing = true
        audio.play()
      }
    },
    pause() {
      if (!audio.paused) {
        this.playing = false
        audio.pause()
      }
    },
    toggleTheme() {
      let step = 0.03
      let count = 0
      const maxCount = 200

      utils.addClass(meplayerContainer, 'uplayer-changing-theme')

      theme = theme === THEME_DEFAULT ? THEME_MINI : THEME_DEFAULT

      loop()

      function loop() {
        count++
        meplayerContainer.style.opacity -= step
        if (meplayerContainer.style.opacity <= 0) {
          step *= -1
          meplayerContainer.style.opacity = 0
          utils.toggleClass(meplayerContainer, 'uplayer-container-mini')
          utils.toggleClass(meplayerContainer, 'uplayer-container')
        }
        if (meplayerContainer.style.opacity < 1 && count < maxCount) {
          requestAnimationFrame(loop)
        } else {
          setTimeout(function() {
            utils.removeClass(meplayerContainer, 'uplayer-changing-theme')
          }, 500)
        }
      }
    },

    search(kw) {
      this.$store.dispatch('music/search', { q, count: 36 }).then(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="css">
.player-container {
  width: 360px;
  position: fixed;
  right: 30px;
}

.uplayer-container {
  font-family: Helvetica, Tahoma, Arial, STXihei, '华文细黑', 'Microsoft YaHei',
    '微软雅黑', SimSun, '宋体', Heiti, '黑体', sans-serif;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 90px;
  background: #fff;
  box-shadow: 0 0 20px rgba(59, 59, 177, 0.18);
}

.uplayer-info {
  font-weight: 300;
  position: relative;
  left: 0;
  opacity: 1;
}

.uplayer-info-cover {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 90px;
  padding-right: 20px;
  -webkit-transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39);
  transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39);
}

.uplayer-container.uplayer-isplaying .uplayer-info-cover {
  left: -90px;
  opacity: 0;
}

.uplayer-info-cover img {
  width: 90px;
  height: 100%;
  border: 6px solid #fff;
  box-shadow: 0 0 20px rgba(59, 59, 177, 0.35);
}

.uplayer-meta {
  float: left;
  margin-left: 110px;
  -webkit-transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39);
  transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39);
}

.uplayer-container.uplayer-isplaying .uplayer-meta {
  margin-left: 10px;
  -webkit-transform: scale(0.85, 0.85);
  transform: scale(0.85, 0.85);
}

.uplayer-container.uplayer-isplaying .uplayer-meta .uplayer-meta-title {
  margin-top: 4px;
}

.uplayer-container.uplayer-isplaying .uplayer-meta .uplayer-meta-time-tick {
  -webkit-transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39) 0.65s;
  transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39) 0.65s;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

.uplayer-meta .uplayer-meta-time-tick {
  font-size: 13px;
  margin-top: 30px;
  -webkit-transform: translateY(10px);
  transform: translateY(10px);
  letter-spacing: 1px;
  opacity: 0;
  color: rgba(0, 0, 0, 0.6);
}

.uplayer-meta-title {
  font-size: 14px;
  margin-top: 27px;
  margin-bottom: 2px;
  -webkit-transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39);
  transition: all 0.6s cubic-bezier(0, 0.36, 0.51, 1.39);
  letter-spacing: 1px;
  color: #6a6b6f;
}

.uplayer-meta-author {
  font-size: 12px;
  color: #ceced6;
}

.uplayer-spectrum {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 30px;
  margin-top: -15px;
  margin-left: -120px;
  -webkit-transition: all 0.7s cubic-bezier(0.17, 0.67, 0.45, 1.26) 0.1s;
  transition: all 0.7s cubic-bezier(0.17, 0.67, 0.45, 1.26) 0.1s;
  -webkit-transform: translateX(110px);
  transform: translateX(110px);
  opacity: 0;
}

.uplayer-container.uplayer-isplaying .uplayer-spectrum {
  width: 220px;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  opacity: 1;
}

.uplayer-container.uplayer-haslrc .uplayer-spectrum {
  display: none;
}

.uplayer-lyric {
  position: absolute;
  z-index: -2;
  top: 50%;
  left: 50%;
  overflow: hidden;
  width: 220px;
  height: 100%;
  margin-top: -45px;
  margin-left: -120px;
  -webkit-transition: all 1s;
  transition: all 1s;
  -webkit-transform: translateY(15px);
  transform: translateY(15px);
  opacity: 0;
}

.uplayer-container.uplayer-isplaying .uplayer-lyric {
  z-index: 0;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

.uplayer-lyric-area {
  font-size: 12px;
  margin-top: 35px;
  -webkit-transition: -webkit-transform 0.7s;
  transition: -webkit-transform 0.7s;
  transition: transform 0.7s;
  text-align: center;
  opacity: 0;
  color: rgba(0, 0, 0, 0.7);
}

.uplayer-lyric-area p {
  line-height: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  -webkit-transition: all 0.6s;
  transition: all 0.6s;
  opacity: 0;
}

.uplayer-container.uplayer-isplaying .uplayer-lyric-area p {
  line-height: 20px;
}

.uplayer-haslrc .uplayer-lyric-area {
  display: block;
}

.uplayer-container.uplayer-isplaying .uplayer-lyric-area {
  opacity: 1;
}

.uplayer-lyric-area .uplayer-lyric-current {
  font-size: 1.1em;
  opacity: 1;
}

.uplayer-lyric-area .uplayer-lyric-pre,
.uplayer-lyric-area .uplayer-lyric-next {
  opacity: 0.35;
}

.uplayer-control {
  position: relative;
  float: right;
  margin-right: 40px;
}

.uplayer-volume-bg {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.8s;
  transition: all 0.8s;
  opacity: 0;
  background: rgba(255, 255, 255, 0.8);
}

.uplayer-container.uplayer-adjusting-volume .uplayer-volume-bg {
  z-index: 20;
}

.uplayer-volume {
  font-size: 50px;
  width: 60px;
  margin: 13px auto 0;
  -webkit-transition: all 0.9s;
  transition: all 0.9s;
  text-align: center;
  color: rgba(150, 150, 150, 0.75);
}

.uplayer-container.uplayer-adjusting-volume .uplayer-volume-bg {
  opacity: 1;
}

.uplayer-volume-progress {
  height: 4px;
  /*margin-top: -1px;*/

  -webkit-transition: width 0.2s;
  transition: width 0.2s;
  border-radius: 1px;
  background: rgba(150, 150, 150, 0.75);
}

.uplayer-control-play {
  position: absolute;
  top: -25px;
  right: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
  -webkit-transition: top 0.6s cubic-bezier(0, 0.74, 0.61, 1.35);
  transition: top 0.6s cubic-bezier(0, 0.74, 0.61, 1.35);
  text-align: center;
  color: #d94240;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px rgba(59, 59, 177, 0.22);
}

.uplayer-control-play:hover {
  -webkit-animation: breath 2s infinite alternate;
  animation: breath 2s infinite alternate;
}

.uplayer-container.uplayer-isplaying .uplayer-control-play {
  top: 20px;
  -webkit-animation: breath 2s infinite alternate;
  animation: breath 2s infinite alternate;
}

.uplayer-control-play i {
  line-height: 50px;
  position: absolute;
  left: 50%;
  margin-left: -7px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.uplayer-control-play .icon-music-play {
  -webkit-transform: translateX(2px);
  transform: translateX(2px);
  opacity: 1;
}

.uplayer-container.uplayer-isplaying .uplayer-control-play .icon-music-play {
  -webkit-transform: translateX(8px);
  transform: translateX(8px);
  opacity: 0;
}

.uplayer-control-play .icon-music-pause {
  -webkit-transform: translateX(-8px);
  transform: translateX(-8px);
  opacity: 0;
}

.uplayer-container.uplayer-isplaying .uplayer-control-play .icon-music-pause {
  -webkit-transform: translateX(-1px);
  transform: translateX(-1px);
  opacity: 1;
}

.uplayer-duration,
.uplayer-loadingsign {
  font-size: 12px;
  position: absolute;
  right: 40px;
  bottom: 24px;
  -webkit-transition: all 0.6s cubic-bezier(0, 0.74, 0.61, 1.35);
  transition: all 0.6s cubic-bezier(0, 0.74, 0.61, 1.35);
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.6);
}

.uplayer-container.uplayer-isplaying .uplayer-duration,
.uplayer-container.uplayer-isplaying .uplayer-loadingsign {
  z-index: -1;
  bottom: 5px;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  opacity: 0;
}

.uplayer-container.uplayer-isloading .uplayer-duration {
  opacity: 0;
}

.uplayer-loadingsign {
  opacity: 0;
}

.uplayer-container.uplayer-isloading .uplayer-loadingsign {
  opacity: 1;
}

.uplayer-duration i,
.uplayer-loadingsign i {
  margin-right: 3px;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
  -webkit-transform: scale(0.9, 0.9);
  transform: scale(0.9, 0.9);
  color: rgba(217, 66, 64, 0.5);
}

.uplayer-container.uplayer-isplaying .uplayer-duration i {
  -webkit-transform: rotateZ(360deg);
  transform: rotateZ(360deg);
}

.uplayer-timeline-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8px;
}

.uplayer-timeline {
  position: absolute;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 2px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  opacity: 0;
  background: rgba(231, 231, 239, 0.8);
}

.uplayer-container.uplayer-isplaying .uplayer-timeline {
  cursor: pointer;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

.uplayer-container.uplayer-isplaying
  .uplayer-timeline-bg:hover
  .uplayer-timeline {
  height: 8px;
}

.uplayer-timeline .uplayer-timeline-passed {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 100%;
  background: #d94240;
}

.uplayer-container.uplayer-changing-theme .uplayer-volume-bg {
  display: none;
}

@-webkit-keyframes breath {
  0% {
    box-shadow: 0 0 35px rgba(59, 59, 177, 0.22);
  }

  100% {
    box-shadow: 0 0 10px rgba(59, 59, 177, 0.33);
  }
}

@keyframes breath {
  0% {
    box-shadow: 0 0 35px rgba(59, 59, 177, 0.22);
  }

  100% {
    box-shadow: 0 0 10px rgba(59, 59, 177, 0.33);
  }
}

@font-face {
  font-family: 'fontello';
  src: url('~assets/fonts/fontello.eot');
  src: url('~assets/fonts/fontello.eot#iefix') format('embedded-opentype'),
    url('~assets/fonts/fontello.woff') format('woff'),
    url('~assets/fonts/fontello.ttf') format('truetype'),
    url('~assets/fonts/fontello.svg#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^='icon-music-']:before,
[class*=' icon-music']:before {
  font-family: 'fontello';
  font-style: normal;
  font-weight: normal;
  speak: none;

  display: inline-block;
  text-decoration: inherit;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-music-play:before {
  content: '\e801';
} /* '' */
.icon-music-pause:before {
  content: '\e802';
} /* '' */
.icon-music-clock:before {
  content: '\e803';
} /* '' */
.icon-music-volume:before {
  content: '\e804';
} /* '' */
.icon-music-spin:before {
  content: '\e800';
} /* '' */
</style>
