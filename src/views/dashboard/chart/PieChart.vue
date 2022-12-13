<template>
  <div v-if="series1.length" class="pie-chart">
    <h3 align="left" style="padding-left: 20px">{{ $t('chart_pie') }} <span>{{ screenName || '' }}</span></h3>
    <apexchart type="pie" width="70%" :options="chartOptions" :series="series1" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'PieChart',
  components: { apexchart: VueApexCharts },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    chart_data: {
      type: Array,
      default() {
        return []
      }
    },
    screenName: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      series1: [],
      chartOptions: {
        chart: {
          width: '80%',
          type: 'pie'
        },
        labels: [],
        // theme: {
        //   monochrome: {
        //     enabled: true
        //   }
        // },
        // title: {
        //   text: `Biểu đồ lưu lượng truy cập (tính theo %) ${this.NameScreen}`,
        //   style: {
        //     fontFamily: 'Roboto'
        //   }
        // },
        legend: {
          position: 'right',
          horizontalAlign: 'right',
          textAnchor: 'right',
          floating: false,
          inverseOrder: false,
          offsetX: 0,
          offsetY: 0,
          align: 'start',
          labels: {
            align: 'start'
          }
          // show: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }]
      }
    }
  },
  watch: {
    // NameScreen(value) {
    //   console.log('------------------------------------------------name', JSON.stringify(value))
    //   this.fillDataBarChart(value)
    // },
    chart_data(value) {
      this.fillDataBarChart(value)
    }
  },
  methods: {
    fillDataBarChart(data) {
      this.chartOptions = { ...this.chartOptions, ...{ labels: data.map(d => d.user_name) }}
      this.series1 = data.map(d => parseInt(d.percent))
    }
  }
}
</script>

<style scoped>
.apexcharts-legend{
  display: none;
}
</style>
