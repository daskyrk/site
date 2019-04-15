<template>
  <div
    class="page-404"
    @click="toHome"
    @mousemove="moveLight($event)"
    @mouseout="mouseOut"
  >
    <div
      ref="tip"
      class="tip"
    >
      emmm 这里什么都没有.... <br>点击一下，立马回家
    </div>
    <span
      ref="light"
      class="light"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    const lightWidth = 20
    const lightHeight = 20
    this.tip = this.$refs.tip
    this.light = this.$refs.light
    const tipRect = this.tip.getClientRects()[0]
    this.tipCenter = [
      Math.floor(tipRect.left + tipRect.width / 2),
      Math.floor(tipRect.top + tipRect.height / 2),
    ]
    this.pageWidth = document.body.clientWidth
    this.pageHeight = document.body.clientHeight
    // light可以移动的范围, 不让其太靠边
    this.rangeLeft = lightWidth / 2
    this.rangeRight = this.pageWidth - lightWidth / 2
    this.rangeTop = lightHeight / 2
    this.rangeBottom = this.pageHeight - lightHeight / 2
  },

  methods: {
    toHome() {
      this.$router.replace('/')
    },
    moveLight(e) {
      const x = e.clientX
      const y = e.clientY
      this.light.style.willChange = 'left, top, transform'
      if (x > this.rangeLeft && x < this.rangeRight) {
        this.light.style.left = x + 'px'
      }
      if (y > this.rangeTop && y < this.rangeBottom) {
        this.light.style.top = y + 'px'
      }
      // 根据距离调整文字透明度
      const xDistance = Math.abs(this.tipCenter[0] - x)
      const yDistance = Math.abs(this.tipCenter[1] - y)
      const distance = xDistance / this.pageWidth + yDistance / this.pageHeight
      // 距离的反比
      const rate = 1 - distance.toFixed(2)
      // 控制在0.7范围内才开始显示, 最大0.8的透明度
      this.tip.style.opacity = Math.max(rate - 0.2, 0) * 0.8
      this.light.style.transform = 'scale(' + 3 * (0.3 + rate) + ')'
    },
    mouseOut() {
      this.light.style.transform = ''
      this.light.style.willChange = 'auto'
    },
  },
}
</script>


<style lang="scss" scoped>
.page-404 {
  display: flex;
  height: 100vh;
  background-color: $c-black;
  cursor: none;

  .tip {
    margin: 30vh auto;
    padding: 50px;
    color: white;
    font-size: 2rem;
    opacity: .01;
  }

  .light {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    box-shadow: 0 0 40px 15px white;
    opacity: .8;
  }
}
</style>
