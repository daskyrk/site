<template>
  <div class="about-me">
    <div class="header" />
    <div class="info-container">
      <!-- TODO: 使用userInfo里的信息 -->
      <img
        src="~assets/images/avatar.jpg"
        alt="avatar"
        class="avatar"
      >
      <div class="base-info">
        <h4 class="nick">
          daskyrk
        </h4>
        <div class="job">
          前端工程师
        </div>
        <div class="site">
          github, weixin
        </div>
        <div class="hobby">
          看书、旅游、摄影（学习ing）
        </div>
        <div class="wish">
          <p>这里加个心愿便利贴</p>
          <p>去日本旅游</p>
        </div>
        <div class="intro">
          <p>世界这么大，我想去看看 (=・ω・=)</p>
          <p>时间这么少，哪都去不了 _(:з」∠)_</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // layout: 'empty',
}
</script>

<style lang="scss" scoped>
.about-me {
  width: 96vw;
  // TODO: 搞点视差滚动？
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, .32), rgba(0, 0, 0, 0)), url(~assets/images/about-bg.webp);
    background-position: center;
    background-size: cover;
  }

  .info-container {
    position: relative;
    max-width: 95%;
    margin: 0 auto;
    margin-top: 22vh;
    text-align: center;
    background-color: $c-white;
    border-color: $c-white;
    border-radius: $radius-lg;
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2),0 24px 38px 3px rgba(0, 0, 0, .14),0 9px 46px 8px rgba(0, 0, 0, .12);
  }

  .base-info {
    flex: 4;
    height: 100%;
    padding: 2rem;
    overflow: hidden;
    text-align: center;

    > * {
      margin: 12px 0;
    }

    .nick {
      font-weight: bold;
      font-size: 18px;
    }

    .job {
      color: $color-text-desc;
    }

  }

  .avatar {
    max-width: 130px;
    max-height: 130px;
    margin: -50px auto 0;
    border-radius: 100%;
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, .56), 0 4px 25px 0 rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);
  }

}

// @media screen and (min-width: 1200px) {
//   .about-me {
//     .card {
//       // left: 15%;
//       // width: 70%;
//     }
//   }
// }

@media screen and (min-width: 1600px) {
  .about-me {
    .card {
      top: 48%;
      // left: 20%;
      // width: 60%;
    }
  }
}
</style>
