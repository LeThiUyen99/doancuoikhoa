<template>
  <el-row class="app-container list-revenue">
    <el-row class="list-revenue__header">
      <el-col :sm="12">
        <h3>{{ $t('revenue_list') }}</h3>
      </el-col>
      <el-col :sm="12">
        <div class="text-right">
          <el-button type="primary" @click="onResetSearch">Reload</el-button>
          <el-button type="primary" @click="onExportInsurance">{{ $t('export') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="search-wrapper" :gutter="10">
      <el-col :sm="3">
        <el-select v-model="listQuery.filter" :placeholder="$t('search_by')">
          <el-option v-for="filter in filters" :key="`filter_${filter.key}`" :label="filter.name" :value="filter.key" />
        </el-select>
      </el-col>
      <el-col :sm="5">
        <el-input v-model="listQuery.q" :placeholder="$t('search_key')" icon="search" />
      </el-col>
      <el-col :sm="3">
        <el-select v-model="shopID" :placeholder="$t('filter_shop')">
          <el-option v-for="shop in shops" :key="shop.id" :label="shop.name" :value="shop.id" />
        </el-select>
      </el-col>

      <el-col :sm="9">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          align="right"
          unlink-panels
          :range-separator="$t('to')"
          :start-placeholder="$t('start_time')"
          :end-placeholder="$t('finish_time')"
          format="dd-MM-yyyy HH:mm:ss"
          :default-time="defaultTime"
          :picker-options="pickerOptions"
        />
      </el-col>
      <el-col :sm="4">
        <div class="text-right">
          <el-button type="primary" @click="onSearchPress">{{ $t('search') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-revenue__data">
      <el-table
        v-loading="loadingTable"
        :element-loading-text="loading_text"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('product_code')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ `#${scope.row.name_delivery}` }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('bill_code')"
          align="center"
        >
          <template slot-scope="scope">{{ (scope.row.ghn_post_bill && scope.row.ghn_post_bill.order_code) ? scope.row.ghn_post_bill.order_code: (scope.row.viettel_post_bill && scope.row.viettel_post_bill.order_number ? scope.row.viettel_post_bill.order_number : '') }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('order_name')"
          align="center"
        />
        <el-table-column
          prop="method_payment.name"
          :label="$t('method_payment')"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.method_payment? scope.row.method_payment.name: '' }}</template>
        </el-table-column>
        <!-- <el-table-column
          prop="ship_name"
          :label="$t('shipping_type')"
          align="center"
        /> -->
        <el-table-column
          prop="date_complete"
          :label="$t('finish_day')"
          align="center"
        />
        <el-table-column
          :label="$t('transport_title')"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.cod? scope.row.cod.name: '' }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('price')"
          align="center"
        >
          <template slot-scope="scope">{{ `${formatNumber(scope.row.total_price)} VNĐ` }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('price_ship')"
          align="center"
        >
          <template slot-scope="scope">{{ `${formatNumber(scope.row.cod_price)} VNĐ` }}</template>
        </el-table-column>
        <el-table-column
          prop="shop.name"
          :label="$t('shop')"
          align="center"
        />
        <el-table-column
          :label="$t('create_date')"
          align="center"
        >
          <template slot-scope="props">{{ props.row.date_confirm ? props.row.date_confirm : props.row.updatedAt }}</template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="list-shop__footer">
      <pagination
        v-show="total > listQuery.limit"
        :total="total"
        :limit.sync="listQuery.limit"
        :page.sync="listQuery.page"
        @pagination="onGetListRevenue"
      />
    </el-row>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import RevenueResource from '@/api/revenue'
import ShopResource from '@/api/shop'

const revenueResource = new RevenueResource()
const shopResource = new ShopResource()
import { formatNumber } from '@/utils/convert'
import i18n from '@/lang/i18n'

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
  LOADING: i18n.t('loading'),
  EXPORT: i18n.t('loading_wait')
}

export default {
  name: 'List',
  components: { Pagination },
  data() {
    return {
      loading_text: LOADING_TEXT.LOADING,
      tableData: [],
      filters: [{ key: 1, name: i18n.t('find_by_code') }, { key: 2, name: i18n.t('find_by_name') }],
      shopID: null,
      loadingTable: false,
      shops: [],
      listQuery: Object.assign({}, defaultQuery),
      from_date: 0,
      to_date: 0,
      total: 0,
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      defaultTime: ['00:00:00', '23:59:00'],
      value2: '',
      loadingExportExcel: false
    }
  },
  watch: {
    value2(value) {
      let start = value[0]
      let end = value[1]
      start = (new Date(start)).getTime()
      end = (new Date(end)).getTime()
      console.log('....................thoi gian', start, end)
      this.from_date = start
      this.to_date = end
      this.listQuery.page = 1
      this.listQuery.from_date = this.from_date
      this.listQuery.to_date = this.to_date
      this.onGetListRevenue()
    },
    shopID(shop_id) {
      this.listQuery.page = 1
      this.listQuery.shop_id = shop_id
      this.onGetListRevenue()
    }
  },
  created() {
    this.onGetListRevenue()
    this.onGetShop()
  },
  methods: {
    onExportInsurance() {
      this.$confirm(i18n.t('export_confirm')).then(_ => {
        this.loading_text = LOADING_TEXT.EXPORT
        this.loadingTable = true
        revenueResource.getExportList(this.listQuery).then(response => {
          setTimeout(() => {
            this.loadingTable = false
            if (response.error === 0) {
              this.confirmDowload(response.link)
            } else {
              this.$message.error(response.msg)
            }
          }, 2000)
        })
      }).catch(_ => {
        this.loadingTable = false
      })
    },
    // handleDownloadExport(urlFile) {
    //   revenueResource.getExportList().then(response => {
    //     this.loadingExportExcel = false
    //     const url = window.URL.createObjectURL(new Blob([response.data]))
    //     const link = document.createElement('a')
    //     link.href = url
    //     const date = new Date()
    //     const fileName = `${date.getUTCFullYear()}_${date.getUTCMonth() + 1}_${date.getUTCDate()}_${date.getTime()}_doanh_thu`
    //     link.setAttribute('download', fileName)
    //     document.body.appendChild(link)
    //     link.click()
    //   })
    // },
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
          this.$message.success(i18n.t('export_success'))
        }, 250)
      }
    },
    onResetSearch() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.onGetListRevenue()
    },
    onSearchPress() {
      this.listQuery.page = 1
      this.onGetListRevenue()
    },
    onGetListRevenue() {
      this.loading_text = LOADING_TEXT.LOADING
      this.loadingTable = true
      revenueResource.revenueList(this.listQuery).then(response => {
        console.log('............doanh thu ne : ', JSON.stringify(response))
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = response.list
          this.total = response.total > -1 ? response.total : this.total
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${i18n.t('error_')} : ${error}`)
      })
    },
    onGetShop() {
      shopResource.listShopOption().then(response => {
        if (response.error === 0) {
          const result = response.list
          this.shops = [...result]
        }
      })
    },
    formatNumber
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 10px;
}

.el-range-editor--medium.el-input__inner {
  width: 100%;
}
</style>
