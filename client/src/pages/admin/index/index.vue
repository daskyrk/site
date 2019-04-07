<template>
  <ccard title="文章统计">
    <div
      v-if="summary"
      class="chart-wrap"
    >
      <chart
        :data="postChartData"
        :options="chartOptions"
        type="bar"
        width="50%"
      />
      <chart
        :data="postChartData"
        :options="chartOptions"
        type="bar"
        width="50%"
      />
    </div>
  </ccard>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

const bgColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
]
const bdColors = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]
export default {
  meta: {
    breadcrumb: '总览',
  },

  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    }
  },

  computed: {
    ...mapState('admin/post', ['summary']),

    postChartData() {
      const typeMap = {
        1: '文章',
        2: '读书',
        3: '音乐',
      }
      const labels = []
      const data = []
      if (this.summary) {
        this.summary.forEach(a => {
          labels.push(typeMap[a._id.type])
          data.push(a.count)
        })
      }
      return {
        labels,
        datasets: [
          {
            label: '类型统计',
            data,
            backgroundColor: bgColors,
            borderColor: bdColors,
            borderWidth: 1,
          },
        ],
      }
    },
  },

  async fetch({ store }) {
    await store.dispatch('admin/post/summary')
    // await store.dispatch('admin/tag/summary');
  },
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  display: flex;
}
</style>
