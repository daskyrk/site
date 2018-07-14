<template>
  <ccard title="文章统计">
    <div class="chart-wrap">
      <chart type="bar" width="50%" :data="chartData" :options="chartOptions"></chart>
      <chart type="bar" width="50%" :data="chartData" :options="chartOptions"></chart>
    </div>
  </ccard>
</template>

<script>
export default {
  meta: {
    breadcrumb: '总览',
  },

  async fetch({ store }) {
    await store.dispatch('admin/article/summary');
    // await store.dispatch('admin/tag/summary');
  },

  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
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
    };
  },
};
</script>

<style lang="scss" scoped>
.chart-wrap {
  display: flex;
}
</style>
