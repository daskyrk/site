<template>
  <div class="about-me">
    <!-- <div class="book">
      <div class="left">
      </div>
      <div class="middle"></div>
      <div class="right">

      </div>
    </div> -->
    <div class="card">
      <div class="info">
        <img
          src="~assets/images/avatar.jpg"
          alt="avatar"
          class="avatar"
        >
        <div class="nick">
          daskyrk
        </div>
        <div class="hobby">
          看书、旅游、摄影（学习ing）
        </div>
      </div>
      <div class="other">
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
  layout: 'empty',
}
</script>

<style lang="scss">
.about-me {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(~assets/images/desk.jpg) no-repeat;
  background-size: cover;

  .card {
    position: absolute;
    top: 34%;
    left: 130px;
    display: flex;
    width: 50%;
    min-width: 600px;
    height: 30%;
    min-height: 300px;
    padding: 3rem 2rem;
    background-color: $whitesmoke;
    border-radius: $radius;

    $card-border: .6rem;
    $line-width: .6rem;

    &::after {
      position: absolute;
      top: -$card-border;
      right: -$card-border;
      bottom: -$card-border;
      left: -$card-border;
      z-index: -1;
      padding: 20px;
      background: repeating-linear-gradient(
        45deg, #114abc, #114abc $line-width, #ffffff $line-width, #ffffff 2 * $line-width, #bf2010 2 * $line-width, #bf2010 3 * $line-width, #ffffff 3 * $line-width, #ffffff 4 * $line-width
      );
      border-radius: 6px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .5);
      content: "";
    }
  }

  .info {
    flex: 4;
    height: 100%;
    overflow: hidden;
    text-align: center;
    // border-right: 1px solid $color-border;
    > div {
      margin-top: .5rem;
    }
  }

  .other {
    flex: 6;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

  // .book {
  //   height: 500px;
  //   width: 800px;
  //   display: flex;
  //   position: relative;

  //   .left {
  //     flex: 1px;
  //     position: relative;
  //     padding: 1rem;
  //     background-color: #fee86b;
  //     box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
  //       0 0 40px rgba(0, 0, 0, 0.1) inset;
  //     &::before {
  //       content: '';
  //       position: absolute;
  //       height: 30px;
  //       bottom: 3px;
  //       width: 60%;
  //       left: 17px;
  //       transform: rotateZ(4deg);
  //       z-index: -1;
  //       box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.7);
  //       border-radius: 50%/50%;
  //       border-bottom-left-radius: 0%;
  //       border-bottom-right-radius: 40%;
  //     }
  //     &::after {
  //       content: '';
  //       position: absolute;
  //       height: 30px;
  //       bottom: 1px;
  //       width: 46%;
  //       right: -5px;
  //       transform: rotateZ(-4deg);
  //       z-index: -1;
  //       box-shadow: 0 0 60px 6px rgba(0, 0, 0, 0.88);
  //       border-radius: 50%/50%;
  //     }
  //   }
  //   .middle {
  //     width: 3px;
  //     margin-left: 1px;
  //     background-image: linear-gradient(
  //       to bottom,
  //       #ffffff 0%,
  //       #ffffff 50%,
  //       #28ebff 51%,
  //       #28ebff 100%
  //     );
  //     background-size: 100% 19px;
  //     background-repeat: repeat-y;
  //   }
  //   .right {
  //     flex: 1px;
  //     padding: 1rem;
  //     background-color: #298f62;
  //     box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
  //       0 0 40px rgba(0, 0, 0, 0.1) inset;
  //   }
  // }
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
