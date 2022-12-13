<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
    <div v-if="isShow" class="table-data">
      <el-row class="list-filter">
        <el-col :sm="24" align="right">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            popper-class="custom-date-picker"
            align="right"
            unlink-panels
            :range-separator="$t('to')"
            :start-placeholder="start"
            :end-placeholder="end"
            format="dd-MM-yyyy HH:mm:ss"
            :default-time="defaultTime"
            :picker-options="pickerOptions"
          />
        </el-col>
      </el-row>
      <el-row v-if="isShow" class="list-title">
        <h3 align="left">{{ $t('traffic_shop') }} <span>{{ timeName || $t('time_name') }}</span></h3>
      </el-row>
      <el-row v-loading="loadingTable">
        <el-row class="list__data">
          <el-table v-if="isShow" :data="tableData" border style="width: 100%">
            <el-table-column :label="$t('id')" width="100" align="center">
              <template slot-scope="scope">
                <el-link @click="selectedItem(scope.row)">{{ `#${scope.row.id}` }}</el-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('taxonomy_name')" prop="screen_name" align="center">
              <template slot-scope="scope">
                <el-link @click="selectedItem(scope.row)">{{ `${scope.row.screen_name}` }}</el-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('user_traffic')" prop="number_user_access" align="center">
              <template slot-scope="scope">
                <el-link @click="selectedItem(scope.row)">{{ `${scope.row.number_user_access}` }}</el-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('traffic')" prop="traffic" align="center">
              <template slot-scope="scope">
                <el-link @click="selectedItem(scope.row)">{{ `${scope.row.traffic}` }}</el-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('traffic_type')" prop="traffic_type" align="center">
              <template slot-scope="scope">
                <el-link @click="selectedItem(scope.row)">{{ `${scope.row.traffic_type}` }}</el-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('note')" prop="note" align="center">
              <template slot-scope="scope">
                <el-link @click="selectedItem(scope.row)">{{ `${scope.row.note}` }}</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row v-if="seen" class="list-detail">
          <el-col :sm="24">
            <el-col :sm="12">
              <h3 align="left">{{ $t('traffic_detail') }} <span>{{ screenName || '' }}</span></h3>
            </el-col>
            <el-col align="right" :sm="12">
              <el-button type="primary" @click="exportTraffic">Export</el-button>
            </el-col>
          </el-col>
          <!--        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="onGetDetailDashboard" />-->
          <el-table
            border
            :data="tableChoosen"
            style="width: 100%"
          >
            <el-table-column prop="user_id" :label="$t('VGA')" align="center" />
            <el-table-column prop="user_name" :label="$t('name')" align="center" />
            <el-table-column v-if="trafficID === 4" prop="shop_name" :label="$t('shop')" align="center" />
            <el-table-column v-if="trafficID === 4" prop="category_name" :label="$t('category')" align="center" />
            <el-table-column v-if="trafficID === 4" prop="trademark_name" :label="$t('trademark')" align="center" />
            <el-table-column v-if="trafficID === 4" prop="tag_name" :label="$t('tag')" align="center" />
            <!-- <el-table-column prop="traffic" label="Lượt truy cập" align="center" /> -->
            <el-table-column prop="createdAt" :label="$t('time')" align="center" />
            <el-table-column prop="params" :label="$t('params')" align="center" />
          </el-table>
          <index
            v-show="total > listQuery.limit"
            :total="total"
            :limit.sync="listQuery.limit"
            :page.sync="listQuery.page"
            @pagination="onGetDetailDashboard"
          />
        <!--        <div class="card-footer-page pb-0 pt-3">-->
        <!--          <jw-pagination :items="tableChoosen" @changePage="onChangePage" />-->
        <!--        </div>-->
        </el-row>
      </el-row>
      <!--      <pagination-->
      <!--        v-show="total > listQuery.limit"-->
      <!--        :total="total"-->
      <!--        :limit.sync="listQuery.limit"-->
      <!--        :page.sync="listQuery.page"-->
      <!--        @pagination="onGetListDashboard"-->
      <!--      />-->
    </div>
    <div class="chart-container">
      <pie-chart :chart_data="chart_data" :screen-name="screenName" />
      <chart :chart_data="chart_data" :screen-name="screenName" />
      <!--      <div class="dashboard-editor-container" style="margin: 50px">-->
      <!--        <line-chart :chart-data="datacollection" :options="chartOptions" />-->
      <!--      </div>-->
      <!--      <div class="pie-chart">-->
      <!--        <apexchart type="pie" width="400" :options="chartOptions2" :series="series1" />-->
      <!--      </div>-->
      <!--      <div class="column-chart" v-if="series.length">-->
      <!--        <apexchart type="bar" height="350" :options="chartOptions1" :series="series" />-->
      <!--      </div>-->
      <!--      <div class="area-chart">-->
      <!--        <apexchart type="area" height="350" :options="chartOptions3" :series="series3" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
// import JwPagination from 'jw-vue-pagination'
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import LineChart from '@/utils/LineChart'
import VueApexCharts from 'vue-apexcharts'
import DashboardResource from '@/api/dashboard'
import Index from '@/components/Pagination1'
import Chart from '@/views/dashboard/chart/Chart'
import PieChart from '@/views/dashboard/chart/PieChart'
// import Pagination from '@/components/Pagination'

const dashboardResource = new DashboardResource()

function getStartDate(start) {
  const hour = start.getHours()
  const minutes = start.getMinutes()
  const second = start.getSeconds()
  const timestamp = hour * 60 * 60 * 1000 + minutes * 60 * 1000 + second * 1000
  let start_date = start.getTime() - timestamp
  start_date = new Date(start_date)
  return start_date
}

function getEndDate(end) {
  const hour = end.getHours()
  const minutes = end.getMinutes()
  const second = end.getSeconds()
  const timestamp = hour * 60 * 60 * 1000 + minutes * 60 * 1000 + second * 1000
  let end_date = end.getTime() - timestamp + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000
  end_date = new Date(end_date)
  return end_date
}

const defaultQuery = {
  page: 1,
  limit: 10
}
const LOADING_TEXT = {
  LOADING: 'Đang tải dữ liệu...',
  DETAIL: 'Đang tải dữ liệu...',
  EXPORT: 'Đang xuất dữ liệu, vui lòng đợi...'
}
export default {
  name: 'Dashboard',
  components: { PieChart, Chart, apexchart: VueApexCharts, adminDashboard, editorDashboard, LineChart, Index },
  data() {
    return {
      loading_text: LOADING_TEXT.LOADING,
      objectDetail: {},
      chart_data: [],
      value1: '',
      pageOfItems: [],
      total: 0,
      timeName: '',
      screenName: '',
      isShow: false,
      seen: false,
      trafficID: 0,
      tableChoosen: [],
      from_date: 0,
      to_date: 0,
      start: new Date().toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      end: new Date().toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' }),
      pickerOptions: {
        disabledDate: this.disabledDate,
        shortcuts: [{
          text: 'Đầu ngày tới giờ',
          onClick: (picker) => {
            const end = new Date()
            let start = new Date()
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
            this.getTimeName('đầu ngày tới giờ')
          }
        }, {
          text: 'Ngày hôm qua',
          onClick: (picker) => {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
            this.getTimeName('ngày hôm qua')
          }
        }, {
          text: '7 ngày qua',
          onClick: (picker) => {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
            this.getTimeName('7 ngày qua')
          }
        }, {
          text: '1 tháng qua',
          onClick: (picker) => {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
            this.getTimeName('1 tháng qua')
          }
        }]
      },
      defaultTime: ['00:00:00', '23:59:00'],
      value2: [getStartDate(new Date()), new Date()],
      tableData: [],
      loadingTable: false,
      loading: false,
      listQuery: Object.assign({}, defaultQuery),
      currentRole: 'adminDashboard',
      series3: [{
        name: 'Shop',
        data: [50, 100, 50, 100, 50, 100, 50]
      }, {
        name: 'Category',
        data: [40, 90, 40, 90, 40, 90, 40]
      }, {
        name: 'Product',
        data: [35, 80, 35, 80, 35, 80, 35]
      }, {
        name: 'Trademarks',
        data: [30, 70, 30, 70, 30, 70, 30]
      }, {
        name: 'Account',
        data: [25, 60, 25, 60, 25, 62, 25]
      }, {
        name: 'Tag',
        data: [20, 50, 20, 50, 20, 50, 20]
      }, {
        name: 'Revenue',
        data: [15, 40, 15, 40, 15, 40, 15]
      }, {
        name: 'Promotions',
        data: [10, 30, 10, 30, 10, 30, 10]
      }, {
        name: 'Delivery',
        data: [5, 20, 5, 20, 5, 20, 5]
      }, {
        name: 'UploadError',
        data: [1, 10, 1, 10, 1, 10, 1]
      }],
      chartOptions3: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z']
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      }
      // datacollection: {
      //   labels: [
      //     'week 1',
      //     'week 2',
      //     'week 3',
      //     'week 4',
      //     'week 5',
      //     'week 6',
      //     'week 7',
      //     'week 8',
      //     'week 9',
      //     'week 10'
      //   ],
      //   datasets: [
      //     {
      //       data: [1, 500, 1, 500, 1, 500, 1, 500, 1, 500],
      //       label: 'shop',
      //       borderColor: '#ff0000',
      //       fill: false
      //     },
      //     {
      //       data: [500, 1, 500, 1, 500, 1, 500, 1, 500, 1],
      //       label: 'category',
      //       borderColor: '#40ff00',
      //       fill: false
      //     },
      //     {
      //       data: [50, 450, 50, 450, 50, 450, 50, 450, 50, 450],
      //       label: 'product',
      //       borderColor: '#ffbf00',
      //       fill: false
      //     },
      //     {
      //       data: [450, 50, 450, 50, 450, 50, 450, 50, 450, 50],
      //       label: 'trademarks',
      //       borderColor: '#00ffff',
      //       fill: false
      //     },
      //     {
      //       data: [100, 400, 100, 400, 100, 400, 100, 400, 100, 400],
      //       label: 'account',
      //       borderColor: '#0040ff',
      //       fill: false
      //     },
      //     {
      //       data: [400, 100, 400, 100, 400, 100, 400, 100, 400, 100],
      //       label: 'Tag',
      //       borderColor: '#8000ff',
      //       fill: false
      //     },
      //     {
      //       data: [150, 350, 150, 350, 150, 350, 150, 350, 150, 350],
      //       label: 'revenue',
      //       borderColor: '#008000',
      //       fill: false
      //     },
      //     {
      //       data: [350, 150, 350, 150, 350, 150, 350, 150, 350, 150],
      //       label: 'promotions',
      //       borderColor: '#ffd700',
      //       fill: false
      //     },
      //     {
      //       data: [200, 300, 200, 300, 200, 300, 200, 300, 200, 300],
      //       label: 'delivery',
      //       borderColor: '#fa8072',
      //       fill: false
      //     },
      //     {
      //       data: [300, 200, 300, 200, 300, 200, 300, 200, 300, 200],
      //       label: 'uploaderror',
      //       borderColor: '#708090',
      //       fill: false
      //     },
      //     {
      //       data: [250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
      //       label: 'sale',
      //       borderColor: '#c71585',
      //       fill: false
      //     }
      //   ]
      // },
      // chartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   // legend: {
      //   //   display: false
      //   // },
      //   tooltips: {
      //     titleFontSize: 20,
      //     bodyFontSize: 25
      //   },
      //   scales: {
      //     xAxes: [],
      //     yAxes: [
      //       {
      //         ticks: {
      //           beginAtZero: true
      //         }
      //       }
      //     ]
      //   }
      // },
      // tableChart: ''
    }
  },
  watch: {
    value2(value) {
      this.seen = false
      let start = value[0]
      let end = value[1]
      start = (new Date(start)).getTime()
      end = (new Date(end)).getTime()
      // console.log('....................thoi gian', start, end)
      this.from_date = start
      this.to_date = end
      this.listQuery.from_date = this.from_date
      this.listQuery.to_date = this.to_date
      this.onGetListDashboard()
    },
    value1() {
      let start = getStartDate(new Date())
      let end = new Date()
      start = (new Date(start)).getTime()
      end = (new Date(end)).getTime()
      // console.log('....................thoi gian', start, end)
      this.from_date = start
      this.to_date = end
      this.listQuery.from_date = this.from_date
      this.listQuery.to_date = this.to_date
      this.onGetListDashboard()
    }
  },
  created() {
    // this.onGetListDashboard()
    this.getValue1()
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    disabledDate(date) {
      const yesterday = new Date(this.from_date)
      yesterday.setDate(yesterday.getDate() + 31)
      return date.getTime() >= yesterday.getTime()
    },
    exportTraffic() {
      this.$confirm(`Bạn có chắc chắn muốn export dữ liệu`).then(_ => {
        this.listQuery.id = this.trafficID
        this.loading_text = LOADING_TEXT.EXPORT
        this.loadingTable = true
        dashboardResource.getExportList(this.listQuery).then(response => {
          setTimeout(() => {
            this.loadingTable = false
            const { error, msg } = response
            if (error === 0) {
              this.confirmDowload(response.link)
            } else {
              this.$message.error(msg)
            }
          }, 2000)
        }).catch(_ => {
          this.loadingTable = false
        })
      })
    },
    confirmDowload(url) {
      this.getFileFromServer(url)
    },
    async getFileFromServer(url) {
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      const response = await fetch(url)
      const blob = await response.blob()
      const newBlob = new Blob([blob])
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
      } else {
        const objUrl = window.URL.createObjectURL(newBlob)
        const link = document.createElement('a')
        link.href = objUrl
        link.download = fileName
        link.click()
        setTimeout(() => {
          window.URL.revokeObjectURL(objUrl)
          this.$message.success('Đã export thành công, vui lòng vào thư mục download để lấy')
        }, 250)
      }
    },
    getValue1(value1) {
      this.value1 = value1
    },
    // onChangePage(pageOfItems) {
    //   this.pageOfItems = pageOfItems
    // },
    getTimeName(value) {
      this.timeName = value
    },
    selectedItem(row) {
      // console.log('................... chon traffic : ', JSON.stringify(row))
      // this.tableChoosen = [row]
      this.trafficID = row.id
      this.screenName = row.screen_name
      this.from_date = row.from_date
      this.listQuery.page = 1
      this.onGetDetailDashboard()
    },
    onGetListDashboard() {
      this.loading_text = LOADING_TEXT.LOADING
      this.loadingTable = true
      console.log('..........check tracking : ', this.listQuery)
      dashboardResource.dashboardList(this.listQuery).then(response => {
        // console.log('==================================dashboard', JSON.stringify(response))
        this.loadingTable = false
        const { error, data } = response
        if (error === 0) {
          this.tableData = [...data]
          this.isShow = true
        } else {
          this.tableData = []
          this.isShow = false
        }
      }).catch(e => {
        this.tableData = []
        this.isShow = false
        this.loadingTable = false
      })
    },
    onGetDetailDashboard() {
      this.loading_text = LOADING_TEXT.DETAIL
      this.loadingTable = true
      this.listQuery.id = this.trafficID
      dashboardResource.dashboardDetail(this.listQuery).then(response => {
        // console.log('----------------------------------------------detail', JSON.stringify(response))
        this.loadingTable = false
        const { error, data, total } = response
        if (error === 0) {
          this.tableChoosen = [...data]
          this.total = this.listQuery.page === 1 ? total : this.total
          this.objectDetail = {}
          this.seen = true
          // if (this.listQuery.page === 1) {
          //   this.onGetChartDetail()
          // }
        } else {
          this.tableChoosen = []
          this.seen = false
        }
      }).catch(e => {
        this.tableChoosen = []
        this.seen = false
        this.loading = false
      })
    },
    onGetChartDetail() {
      this.listQuery.id = this.trafficID
      this.loaded = false
      dashboardResource.chartDetail(this.listQuery).then(response => {
        this.loaded = true
        if (response.error === 0) {
          // this.tableChart = response.data
          const responseData = response.data
          // this.drawChart(responseData)
          this.NameScreen(responseData)
        } else {
          this.tableChart = []
        }
      })
    },
    NameScreen() {
      this.screen_name = this.screenName
      console.log('--------------------------------------this.screen_name = ', this.screenName)
    },
    drawChart(data) {
      this.chart_data = [...data]
    }
  }
}
</script>
<style scoped>
.dashboard-container{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#line-chart{
  height: 350px;
}
.table-data{
  padding: 30px;
}
.list__data{
  padding-top: 30px;
}
.item:before {
  content: "từ ";
}
.item + .item:before {
  content: " đến ";
}
.list-detail{
  margin-top: 50px;
}
.custom-date-picker.el-date-picker>.el-picker-panel__sidebar{
    width: 200px!important;
  }
.card-footer-page {
  padding-top: 30px;
}
.page-item.active .page-link {
  z-index: 1;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.pagination-container{
  display: block!important;
}
</style>
