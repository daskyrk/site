<template>
  <div class="about-me">
    <div class="book">
      <div class="left">
        <div class="info">
          <img src="http://p9uqlanms.bkt.clouddn.com/无脸男-1528469109147.jpg" alt="avatar" class="avatar">
          <div class="nick">daskyrk</div>
          <div class="hobby">
            看书、旅游、摄影（正在学习）
          </div>

        </div>
      </div>
      <!-- <div class="middle"></div> -->
      <div class="right">

      </div>
    </div>
    <!-- <img :src="'http://p9uqlanms.bkt.clouddn.com/photo.webp' | waterMark" alt="my photo" class="photo"> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.about-me {
  .info {
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

  .book {
    height: 500px;
    width: 800px;
    display: flex;
    position: relative;

    .left {
      flex: 1px;
      position: relative;
      padding: 1rem;
      background-color: #fee86b;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
      &::before {
        content: '';
        position: absolute;
        height: 30px;
        bottom: 3px;
        width: 60%;
        left: 17px;
        transform: rotateZ(4deg);
        z-index: -1;
        box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.7);
        border-radius: 50%/50%;
        border-bottom-left-radius: 0%;
        border-bottom-right-radius: 40%;
      }
      &::after {
        content: '';
        position: absolute;
        height: 30px;
        bottom: 1px;
        width: 46%;
        right: -5px;
        transform: rotateZ(-4deg);
        z-index: -1;
        box-shadow: 0 0 60px 6px rgba(0, 0, 0, 0.88);
        border-radius: 50%/50%;
      }
    }
    .middle {
      width: 3px;
      margin-left: 1px;
      background-image: linear-gradient(
        to bottom,
        #ffffff 0%,
        #ffffff 50%,
        #28ebff 51%,
        #28ebff 100%
      );
      background-size: 100% 19px;
      background-repeat: repeat-y;
    }
    .right {
      flex: 1px;
      padding: 1rem;
      background-color: #298f62;
    }
  }
}
</style>
