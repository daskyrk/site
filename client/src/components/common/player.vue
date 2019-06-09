<template>
  <div
    id="listen"
    style="display: block;"
  >
    <div class="player">
      <div class="box">
        <img
          src="https://p3.music.126.net/Jkr2d7T0r51pVA9utSRiig==/109951163096071991.jpg?param=300y300"
          width="80"
          height="80"
          class="cover pull-left"
        >
        <div class="info pull-left">
          <h4
            class="title nowrap"
            title="Wild - Monogem"
          >
            Wild - Monogem
          </h4>
          <ul class="items control icon">
            <li class="item">
              <span class="rewind">
                &#xe67b;
              </span>
            </li>
            <li class="item">
              <span class="play">
                &#xe66e;
              </span>
            </li>
            <li class="item">
              <span class="fastforward">
                &#xe63a;
              </span>
            </li>
            <li class="item">
              <span class="onlist">
                &#xe61b;
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list">
        <form
          method="get"
          class="music-search"
          action=""
          role="search"
        >
          <span class="icon search-icon">
            
          </span> <input
            id="song-msg"
            type="text"
            name="song"
            class="textinput"
            placeholder="回车搜索..."
            required="required"
          > <input
            id="list-page"
            type="hidden"
            name="page"
            value="1"
          >
          <div class="search-source">
            <span
              id="onsource"
              class="icon"
            >
              
            </span>
          </div>
          <div class="source-items">
            <label>
              <input
                type="radio"
                name="source"
                class="source checkbox-radio"
                value="netease"
                checked="checked"
              >
              <span class="radioinput" />网易
            </label>
            <label>
              <input
                type="radio"
                name="source"
                class="source checkbox-radio"
                value="tencent"
              >
              <span class="radioinput" />QQ
            </label>
            <label>
              <input
                type="radio"
                name="source"
                class="source checkbox-radio"
                value="xiami"
              >
              <span class="radioinput" />虾米
            </label>
            <label>
              <input
                type="radio"
                name="source"
                class="source checkbox-radio"
                value="kugou"
              >
              <span class="radioinput" />酷狗
            </label>
            <label>
              <input
                type="radio"
                name="source"
                class="source checkbox-radio"
                value="baidu"
              >
              <span class="radioinput" />百度
            </label>
          </div>
        </form>
        <ul
          id="playlist"
          class="items"
        >
          <li class="nowrap playing">
            1. Wild - Monogem
          </li>
          <li class="nowrap">
            2. Crush - Yuna
          </li>
          <li class="nowrap">
            3. Edge Of The Night - Sheppard
          </li>
          <li class="nowrap">
            4. Be Here Now - Brennan Heart
          </li>
          <li class="nowrap">
            5. Parallel Lines - Jewelz &amp; Sparks
          </li>
          <li class="nowrap">
            6. Stan - Dido
          </li>
          <li class="nowrap">
            7. Adventures - Alex Skrindo
          </li>
          <li class="nowrap">
            8. Home - Vexento
          </li>
          <li class="nowrap">
            9. Somebody To Love - Leighton Meester
          </li>
          <li class="nowrap">
            10. Waterfalls (Extended Mix) - LVNDSCAPE
          </li>
          <li class="nowrap">
            11. Journey (Full Version) - Andreas B.
          </li>
          <li class="nowrap">
            12. On The Top - LIZOT
          </li>
          <li class="nowrap">
            13. Everyday &amp; Everynight (KANT Remix) - Nolan
          </li>
          <li class="nowrap">
            14. Save Me - DEAMN
          </li>
          <li class="nowrap">
            15. Home Again - Darone
          </li>
          <li class="nowrap">
            16. Sweet Escape - Alesso
          </li>
          <li class="nowrap">
            17. Your Love Shot Me Down (Radio Edit) - Pawl
          </li>
          <li class="nowrap">
            18. Empty House - LU2VYK
          </li>
          <li class="nowrap">
            19. U - Gareth Emery
          </li>
          <li class="nowrap">
            20. The Boy Who Murdered Love - Diana Vickers
          </li>
          <li class="nowrap">
            21. Where I Begin (Club Mix) - Dennis Sheperd
          </li>
          <li class="nowrap">
            22. Hero - Charlotte Perrelli
          </li>
          <li class="nowrap">
            23. Cry for You - September
          </li>
          <li class="nowrap">
            24. Do It Again - River Valley Worship
          </li>
          <li class="nowrap">
            25. Here For You Love - LIZOT
          </li>
          <li class="nowrap">
            26. Kaleidoscope - Vicetone
          </li>
          <li class="nowrap">
            27. The Last Saint - Mario M
          </li>
          <li class="nowrap">
            28. Take Me To Infinity - Consoul Trainin
          </li>
          <li class="nowrap">
            29. Something Just Like This - The Chainsmokers
          </li>
          <li class="nowrap">
            30. The Greatest Thing - Cher
          </li>
        </ul>
        <div class="list-page-btn">
          <a
            id="list-previous"
            href="javascript:;"
          >
            上一页
          </a>
          <a
            id="list-next"
            href="javascript:;"
          >
            下一页
          </a>
        </div>
      </div>
      <audio
        id="audio"
        class="bgm"
        type="audio/ogg"
        src="https://m10.music.126.net/20180806223625/9ce043c3fd42b2ed0f70ecd21cb152d2/ymusic/2b2e/a4ce/fb9f/0a8326bac44c452fd8dc3731cf4680f1.mp3"
      />
    </div>
    <div id="temp" />
  </div>
</template>

<script>
import pl from '~/plugins/player.js'

export default {
  mounted() {
    console.log('pl:', pl)
    pl()
  },
}
</script>


<style lang="css">

#listen {
  position: absolute;
  right: 0;
  z-index: 999;
  display: none;
  margin-top: 12px;
  animation: top20 400ms;
}

#listen:before {
  position: absolute;
  top: -12px;
  right: 13px;
  z-index: 1000;
  background: transparent;
  border: 6px solid transparent;
  border-bottom-color: rgba(255, 255, 255, .7);
  content: "";
}

.player {
  width: 280px;
}

.player .box {
  height: 80px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, .7);
  border-radius: 6px;
  box-shadow: 3px 6px 12px rgba(0, 0, 0, .5);
}

.player .cover {
  width: 80px;
  height: 80px;
  margin-right: .8em;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, .3);
}

.player .info {
  width: 62%;
  line-height: 2.5em;
}

.player .title {
  font-weight: 600;
  font-size: 13px;
}

.player .control.icon {
  margin: 0;
}

.player .control .item {
  display: inline-block;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.player .control .item:hover {
  color: #5b5d4f;
}

.player .control .item + .item {
  margin-left: 20px;
}

.player .list {
  width: 280px;
  height: 0;
  margin-top: 2px;
  overflow: hidden;
  font-size: 12px;
  background-color: rgba(255, 255, 255, .7);
  border-radius: 6px;
  box-shadow: 3px 6px 12px rgba(0, 0, 0, .5);
  transition: all .2s cubic-bezier(.39, .58, .57, 1);
}

.player .list.show {
  padding: .5em 0;
}

.player .list .items {
  max-height: 210px;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all .2s ease-in-out;
}

.player .list li {
  padding: 0 1em;
  line-height: 2.2em;
  cursor: pointer;
  transition: all .15s ease-out;
}

.player .list li:hover {
  color: #5a5f41;
}

.player .list p {
  margin: 6px 0;
  text-align: center;
}

.playing {
  color: #e91e63;
  font-size: 13px;
}

.player .items::-webkit-scrollbar,
.player .items::-webkit-scrollbar-track {
  background: transparent;
}

.music-search {
  position: relative;
  top: -6px;
  width: 100%;
}

.music-search .textinput {
  width: 100%;
  padding: 10px 34px;
  color: #555555;
  font-size: 13px;
  vertical-align: top;
  background: transparent;
  border: none;
  border-color: #bebebe;
  border-bottom: 1px solid;
  border-radius: 0;
}

.music-search .search-icon {
  top: -6px;
  left: 10px;
  width: 20px;
  color: #777777;
}

.music-search input::-webkit-input-placeholder {
  color: #777777;
}

.list-page-btn {
  position: relative;
  bottom: -6px;
  display: none;
  line-height: 1;
  text-align: center;
}

.list-page-btn a {
  float: left;
  width: 50%;
  padding: 8px 18px;
  font-size: 13px;
  border-radius: 0;
}

.list-page-btn #list-previous {
  border-radius: 0 0 0 6px;
}

.list-page-btn #list-next {
  border-radius: 0 0 6px 0;
}

.list-page-btn a + a {
  border-left: 1px solid #dde5e3;
}

.source-items {
  box-sizing: border-box;
  width: 100%;
  height: 0;
  margin-top: -10px;
  padding: 0 12px;
  overflow: hidden;
  line-height: 39px;
  background: rgba(255, 255, 255, .4);
  transition: all .2s ease-in-out;
}

.source-items label {
  padding: 0 4px;
  cursor: pointer;
}

.search-source {
  position: absolute;
  top: -4px;
  right: 0;
  padding: 0 8px;
}

.search-source span {
  margin: 0;
  color: #777777;
  cursor: pointer;
  -webkit-transition: -webkit-transform .15s ease-out;
  -moz-transition: -moz-transform .15s ease-out;
  -o-transition: -o-transform .15s ease-out;
  -ms-transition: -ms-transform .15s ease-out;
}

.search-source span.deg {
  position: absolute;
  right: 8px;
  -ms-transform: rotateZ(180deg);     /* IE 9 */
  -moz-transform: rotateZ(180deg);
  -webkit-transform: rotate(Z180deg);
  -o-transform: rotateZ(180deg);
  transform: rotateZ(180deg);    /* Firefox */ /* Safari å’Œ Chrome */  /* Opera */
}

#playlist .loader {
  position: relative;
  margin: 1em auto;
}

.music-list-content {
  position: relative;
  height: 135px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-left: 172px;
  font-family: "Exo 2", "Trebuchet MS",Helvetica,Arial,"PingFang SC","Hiragino Sans GB","STHeiti Light","Microsoft YaHei",SimHei,"WenQuanYi Micro Hei",sans-serif;
}

.music-data .cover-photo {
  width: 136px;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.cover-photo {
  position: absolute;
  top: 0;
  left: 0;
}

.cover-photo-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 153px;
  height: 100%;
  /* background: url(../../images/cover.png) 0 0 no-repeat; */
  background-size: contain;
  pointer-events: none;
}

.data-info {
  padding-top: 2px;
  padding-bottom: 1em;
  font-size: 13px;
}

.data-info-title {
  padding: 0 10px 1px 0;
  font-size: 17px;
}

.data-info-meta span + span {
  margin-left: 20px;
}

.addplay #button {
  padding: 10px 20px;
  font-size: 12px;
}

.addplay #button + #button {
  margin-left: 10px;
}

.lyric-text {
  position: fixed;
  bottom: 5px;
  left: 0;
  transition: all .3s;
}

.lyric-text .lrc-box {
  color: transparent;
  font-size: 16px;
}

.lyric-text .geci_attention {
  color: #333333;

}

</style>
