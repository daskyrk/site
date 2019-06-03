<template>
  <div
    :style="style"
    class="chart-container"
  >
    <canvas ref="chart" />
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'VueChart',
  props: {
    type: {
      required: true,
      type: String,
    },
    data: {
      required: true,
      type: [Object, Array],
    },
    options: Object,
    width: String,
    height: String,
    padding: String,
  },

  data() {
    return {
      style: {
        position: 'relative',
        width: this.width
          ? Object.is(+this.width, NaN)
            ? this.width
            : this.width + 'px'
          : '100%',
        height: (this.height || 400) + 'px',
        padding: (this.padding || 2) + 'rem',
      },
    }
  },

  watch: {
    'data.labels'() {
      this.chart.update()
    },
    'data.datasets'() {
      this.chart.update()
    },
  },

  mounted() {
    this.createChart()
  },

  beforeDestroy() {
    this.chart.destroy()
  },

  methods: {
    createChart() {
      this.chart = new Chart(this.$refs.chart, {
        type: this.type,
        data: this.data,
        options: {
          maintainAspectRatio: false,
          ...this.options,
        },
      })
    },
  },
}
</script>
