<template>
  <el-row class="app-container list-delivery">
    <el-row v-if="!isShowCreateOrder && !isShowOrderOffline">
      <el-row class="list-delivery__header">
        <el-col :sm="24" style="display:flex;">
          <el-button
            v-if="is_show_delivery_for_vga"
            style="border: none; padding: 0; padding-right: 10px"
            icon="el-icon-back"
            @click="backDelivery"
          />
          <el-col :sm="12">
            <h3 style="margin:0">{{ title }}</h3>
          </el-col>
          <el-col :sm="12" align="right">
            <el-button
              v-if="is_show_delivery_for_vga"
              :loading="loadingFresh"
              icon="el-icon-refresh"
              @click="onRefresh"
            >{{ $t("refresh") }}</el-button>
          </el-col>
          <!--          <div style="width: 100%;">-->
          <!--            <el-button v-if="allow_create_bill" style="float:right; padding-top: 11px" type="primary" @click="handleCreateOrder">{{ $t('create_order') }}</el-button>-->
          <!--          </div>-->
        </el-col>
        <el-row v-if="!is_show_delivery_for_vga" style="padding-bottom:20px; margin-top:30px">
          <el-col :span="24" align="right">
            <div class="grid-content bg-purple" style="padding-bottom: 10px">
              <label style="font-weight:unset">{{ $t('filter_date_create') }}: </label>
              <el-date-picker
                v-model="value1"
                style="margin: 0 5px"
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
            </div>
            <div v-if="activeName === '3' || activeName === '5' || activeName === '7'" class="grid-content bg-purple-light">
              <label style="font-weight:unset">{{ $t('filter_date_comfirm') }}: </label>
              <el-date-picker
                v-model="value2"
                style="margin: 0 5px"
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
            </div>
          </el-col>
        </el-row>
        <el-row v-if="!is_show_delivery_for_vga">
          <el-col :sm="24" align="right">
            <el-input
              v-model="keyword"
              style="padding-right: 5px; margin-bottom:10px; width:25%"
              :placeholder="$t('search')"
            />
            <el-select v-model="filter_id" :placeholder="$t('search')">
              <el-option
                v-for="type in filters"
                :key="`type_${type.key}`"
                :label="type.name"
                :value="type.key"
              />
            </el-select>
            <el-select
              v-if="!is_show_delivery_for_vga"
              v-model="telesale_id"
              :placeholder="$t('fillter_handler')"
              style="padding: 0 5px; "
              @change="changeTelesale"
            >
              <el-option
                v-for="sale in listTelesalesFilter"
                :key="sale.id"
                :label="sale.name"
                :value="sale.id"
              />
            </el-select>
            <el-select
              v-model="shopId"
              style="padding: 0 5px 0 0;"
              filterable
              remote
              :multiple-limit="1"
              :placeholder="$t('filter_shop')"
            >
              <el-option
                v-for="shop in optionShops"
                :key="shop.id"
                :label="shop.name"
                :value="shop.id"
              />
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onSearchDelivery"
            >{{ $t("search") }}</el-button>
            <el-button
              :loading="loadingFresh"
              icon="el-icon-refresh"
              @click="onRefresh"
            >{{ $t("refresh") }}</el-button>
          </el-col>
        </el-row>
        <!-- <el-col
          v-if="!is_show_delivery_for_vga"
          style="margin-bottom: 15px; margin-top: 30px"
          :sm="24"
          align="right"
        >
          <el-input
            v-model="keyword"
            style="margin-right: 5px; width:17%; margin-bottom:10px"
            :placeholder="$t('search')"
          />
          <el-select v-model="filter_id" :placeholder="$t('search')" style="width:170px">
            <el-option
              v-for="type in filters"
              :key="`type_${type.key}`"
              :label="type.name"
              :value="type.key"
            />
          </el-select>
          <el-date-picker
            v-model="value1"
            style="margin: 0 5px"
            type="datetimerange"
            align="right"
            unlink-panels
            :range-separator="$t('to')"
            :start-placeholder="$t('date_start_create')"
            :end-placeholder="$t('date_end_create')"
            format="dd-MM-yyyy HH:mm:ss"
            :default-time="defaultTime"
            :picker-options="pickerOptions"
          />
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            align="right"
            unlink-panels
            :range-separator="$t('to')"
            :start-placeholder="$t('finish_day_start')"
            :end-placeholder="$t('finish_day_end')"
            format="dd-MM-yyyy HH:mm:ss"
            :default-time="defaultTime"
            :picker-options="pickerOptions"
          />
          <el-select
            v-if="!is_show_delivery_for_vga"
            v-model="telesale_id"
            :placeholder="$t('fillter_handler')"
            style="padding: 0 5px; width:175px"
            @change="changeTelesale"
          >
            <el-option
              v-for="sale in listTelesalesFilter"
              :key="sale.id"
              :label="sale.name"
              :value="sale.id"
            />
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="onSearchDelivery"
          >{{ $t("search") }}</el-button>
          <el-button
            :loading="loadingFresh"
            icon="el-icon-refresh"
            @click="onRefresh"
          >{{ $t("refresh") }}</el-button> -->
        <!-- <el-button type="primary" :loading="loadingFresh" @click="createOrderOff">{{ $t('create-order-off') }}</el-button> -->
        <!-- </el-col>
        <el-col v-if="!is_show_delivery_for_vga" :sm="24" align="right">
          <div class="text-right delivery-right">
            <el-date-picker
              v-if="isShowBtnFinishDelivery"
              v-model="value2"
              style="width: 100%; margin-left: 10px"
              type="datetimerange"
              popper-class="custom-date-picker"
              align="right"
              unlink-panels
              :range-separator="$t('to')"
              format="dd-MM-yyyy HH:mm:ss"
              :default-time="defaultTime"
              :picker-options="pickerOptions"
            /> -->
        <!-- <el-button v-if="isShowBtnFinishDelivery" style="margin-left: 10px; padding-top: 11px" type="primary" @click="onExportDelivery">{{ $t('export') }}</el-button> -->
        <!-- </div> -->
        <!-- </el-col> -->

        <el-col
          v-if="is_show_delivery_for_vga"
          :sm="2"
          style="margin-top: 20px;float:right;margin-right: 30px;"
        >
          <div class="text-right delivery-right">
            <!-- <el-date-picker
              v-if="isShowBtnFinishDelivery"
              v-model="value2"
              style="width: 100%; margin-left: 10px"
              type="datetimerange"
              popper-class="custom-date-picker"
              align="right"
              unlink-panels
              :range-separator="$t('to')"
              format="dd-MM-yyyy HH:mm:ss"
              :default-time="defaultTime"
              :picker-options="pickerOptions"
            /> -->
            <!-- <el-button v-if="isShowBtnFinishDelivery" style="margin-left: 10px; padding-top: 11px" type="primary" @click="onExportDelivery">{{ $t('export') }}</el-button> -->
            <!--                        <el-button style="margin-left: 10px; " :loading="loadingFresh" icon="el-icon-refresh" @click="onRefresh">{{ $t('refresh') }}</el-button>-->
          </div>
        </el-col>
      </el-row>
      <el-row class="list-delivery__data">
        <el-row
          v-if="!is_show_delivery_for_vga"
          class="list-delivery__data-tab"
        >
          <el-tabs v-model="activeName">
            <el-tab-pane name="0" :label="$t('confirm_wait')" />
            <el-tab-pane name="1" :label="$t('cho_dong_hang')" />
            <el-tab-pane name="2" :label="$t('wait_delivery')" />
            <el-tab-pane name="6" :label="$t('delivery')" />
            <el-tab-pane name="3" :label="$t('delivered')" />
            <el-tab-pane name="4" :label="$t('canceled')" />
            <el-tab-pane name="5" :label="$t('return_order')" />
            <el-tab-pane name="7" :label="$t('all')" />
          </el-tabs>
        </el-row>
        <el-row class="list-delivery__data-list">
          <table-delivery
            ref="refTable"
            :element-loading-text="loading_text"
            :is-show-statistical="is_show_delivery_for_vga"
            :table-data="tableData"
            :telesales="Telesales"
            :state="parseInt(activeName)"
            :loading-table="loadingTable"
            @onClickButtonReload="handleClickButtonReload"
            @onGolferClick="onGolferClick"
          />
        </el-row>
        <el-row class="list-delivery__data-list">
          <pagination
            v-show="total > listQuery.limit"
            :total="total"
            :limit.sync="listQuery.limit"
            :page.sync="listQuery.page"
            @pagination="onLoadMore"
          />
        </el-row>
      </el-row>
    </el-row>
    <el-row v-if="isShowCreateOrder" class="list-create-order">
      <create-order :go-back="goBack" />
    </el-row>
    <el-row v-if="isShowOrderOffline" class="list-create-order">
      <order-offline :go-back="goBack" />
    </el-row>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getAcountInfo } from '@/utils/auth'
import DeliveryResource from '@/api/delivery'
const deliveryResource = new DeliveryResource()
import ShopResource from '@/api/shop'
import TableDelivery from '@/views/delivery_admin/components/TableDelivery'
import CreateOrder from '@/views/delivery_admin/components/CreateOrder'
import i18n from '@/lang/i18n'
import AccountResource from '@/api/account'
import OrderOffline from '@/views/delivery_admin/components/OrderOffline'
const accountResource = new AccountResource()
// import TableStatisticalDelivery from '@/views/delivery/components/TableStatisticalDelivery'

const shopResource = new ShopResource()
const defaultQuery = {
  page: 1,
  limit: 10,
  state: 0
}

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
  let end_date =
    end.getTime() -
    timestamp +
    23 * 60 * 60 * 1000 +
    59 * 60 * 1000 +
    59 * 1000
  end_date = new Date(end_date)
  return end_date
}

const LOADING_TEXT = {
  LOADING: i18n.t('loading'),
  EXPORT: i18n.t('loading_wait')
}

export default {
  name: 'List',
  components: { OrderOffline, TableDelivery, Pagination, CreateOrder },
  data() {
    const account = getAcountInfo()
    return {
      value1: '',
      stateId: '',
      filters: [
        { key: 0, name: 'Tìm theo Id' },
        { key: 1, name: 'Tìm theo mã VGA' },
        { key: 2, name: 'Tìm theo mã vận đơn' },
        { key: 3, name: 'Tìm theo số điện thoại' }
      ],
      status: [
        { state: 0, name: 'Chờ xác nhận' },
        { state: 1, name: 'Chờ đóng hàng' },
        { state: 2, name: 'Chờ giao hàng' },
        { state: 3, name: 'Đang giao hàng' },
        { state: 4, name: 'Đã giao' },
        { state: 5, name: 'Đã hủy' },
        { state: 6, name: 'Trả hàng' },
        { state: 7, name: 'Tất cả' }
      ],
      isShowCreateOrder: false,
      isShowBtnFinishDelivery: !!(account.prefix_domain === 'super_admin'),
      prefix_domain: account.prefix_domain,
      allow_create_bill: account.allow_create_bill,
      activeName: '0',
      tableData: [],
      tableDataOld: [],
      shops: [],
      loadingTable: false,
      loadingFresh: false,
      keyword: '',
      page_old: 1, // page khi lay du lieu
      filter_id: 0,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      defaultTime: ['00:00:00', '23:59:00'],
      value2: '',
      from_date: 0,
      to_date: 0,
      shopId: null,
      loading_text: LOADING_TEXT.LOADING,
      is_show_delivery_for_vga: false,
      tableStatisticalDelivery: [],
      title: i18n.t('manage_work'),
      golfer: null,
      pickerOptions: {
        shortcuts: [
          {
            text: i18n.t('last_week'),
            onClick(picker) {
              const end = getEndDate(new Date())
              let start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              start = getStartDate(start)
              console.log(start, end)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: i18n.t('last_month'),
            onClick(picker) {
              const end = getEndDate(new Date())
              let start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              start = getStartDate(start)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: i18n.t('last_3_month'),
            onClick(picker) {
              const end = getEndDate(new Date())
              let start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              start = getStartDate(start)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      listTelesalesFilter: [],
      telesale_id: null,
      Telesales: [],
      isShowOrderOffline: false,
      optionShops: []
    }
  },
  watch: {
    shopId(shop_id) {
      this.listQuery.shop_id = shop_id
      this.onGetListDeliveryWork()
    },
    activeName(value) {
      const state = { state: parseInt(value) }
      this.listQuery = Object.assign(this.listQuery, state)
      this.listQuery.page = 1
      this.onGetListDeliveryWork()
    },
    value1(value) {
      let start = value[0]
      let end = value[1]
      start = new Date(start).getTime()
      end = new Date(end).getTime()
      this.listQuery.date_create_from = start
      this.listQuery.date_create_to = end
      this.onGetListDeliveryWork()
    },
    value2(value) {
      let start = value[0]
      let end = value[1]
      start = new Date(start).getTime()
      end = new Date(end).getTime()
      this.listQuery.date_complete_from = start
      this.listQuery.date_complete_to = end
      this.onGetListDeliveryWork()
    },
    stateId(state) {
      this.listQuery.state = state
      this.onGetListDeliveryWork()
    }
  },
  created() {
    this.onGetListDeliveryWork()
    this.onGetShopList()
    this.requestListShop()
    this.requestListTelesales()
  },
  methods: {
    createOrderOff() {
      this.isShowOrderOffline = true
    },
    updateLoadingUser(is_loading) {
      if (this.$refs.refTable) {
        this.$refs.refTable.updateLoadingUser(is_loading)
      }
    },
    onLoadMore() {
      if (this.is_show_delivery_for_vga) {
        this.requestListDeliveryForGolfer()
      } else {
        this.onGetListDeliveryWork()
      }
    },
    onGolferClick(golfer) {
      this.golfer = golfer
      this.listQuery.page = 1
      this.requestListDeliveryForGolfer()
    },
    requestListDeliveryForGolfer() {
      this.loading_text = LOADING_TEXT.LOADING
      this.loadingTable = true
      this.loadingFresh = true
      this.updateLoadingUser(true)
      this.listQuery.golfer_id = this.golfer.id
      deliveryResource
        .userDelivery(this.listQuery)
        .then(response => {
          this.loadingTable = false
          this.updateLoadingUser(false)
          this.loadingFresh = false
          const { error, data, total } = response
          if (error === 0) {
            this.is_show_delivery_for_vga = true
            this.title = i18n
              .t('user_statistics')
              .format(`${this.golfer.name}-VGA${this.golfer.id}`)
            this.tableData = [...data]
            this.total = this.listQuery.page === 1 ? total : this.total
            this.updateShowUser()
          }
        })
        .then(_ => {
          this.loadingTable = false
          this.loadingFresh = false
          this.updateLoadingUser(false)
        })
    },
    backDelivery() {
      if (this.is_show_delivery_for_vga) {
        this.is_show_delivery_for_vga = false
        this.listQuery.page = this.page_old
        this.tableData = [...this.tableDataOld]
        this.title = i18n.t('manage_work')
        this.updateShowUser()
      } else {
        this.keyword = ''
        this.filter_id = null
        this.tableData = [...this.tableDataOld]
      }
    },
    updateShowUser() {
      if (this.$refs.refTable) {
        this.$refs.refTable.updateShowUser(this.is_show_delivery_for_vga)
      }
    },
    onSearchDelivery() {
      if (this.listQuery.keyword !== this.keyword) {
        this.listQuery.page = 1
        this.listQuery.keyword = this.keyword
        this.listQuery.type = this.filter_id
        this.listQuery.is_super_admin = true
      }
      deliveryResource.searchDelivery(this.listQuery).then(response => {
        const { error, data, total } = response
        if (error === 0) {
          this.tableData = [...data]
          this.total = this.listQuery.page === 1 ? total : this.total
        }
      })
    },
    goBack(success = false) {
      this.isShowCreateOrder = false
      this.isShowOrderOffline = false
      if (success && this.activeName === '0') {
        this.onRefresh()
      }
    },
    handleCreateOrder() {
      this.isShowCreateOrder = true
    },
    onRefresh() {
      this.listQuery.page = 1
      this.onGetListDeliveryWork()
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
          this.$message.success(i18n.t('export_success'))
        }, 250)
      }
    },
    onExportDelivery() {
      const body = {
        from_date: this.from_date,
        to_date: this.to_date
      }
      this.$confirm(i18n.t('export_confirm'))
        .then(_ => {
          this.loading_text = LOADING_TEXT.EXPORT
          this.loadingTable = true
          deliveryResource.exportDelivery(body).then(response => {
            setTimeout(() => {
              this.loadingTable = false
              if (response.error === 0) {
                this.confirmDowload(response.link)
              } else {
                this.$message.error(response.msg)
              }
            }, 2000)
          })
        })
        .catch(_ => {
          this.loadingTable = false
        })
    },
    onGetListDeliveryWork() {
      this.loading_text = LOADING_TEXT.LOADING
      this.loadingTable = true
      this.loadingFresh = true
      this.page_old = this.listQuery.page
      deliveryResource
        .DeliveryAdminList(this.listQuery)
        .then(response => {
          this.loadingTable = false
          this.loadingFresh = false
          const { error, data } = response
          if (error === 0) {
            this.tableData = data
            this.tableDataOld = [...data]
            this.total =
              this.listQuery.page === 1 ? response.total : this.total
          }
        })
        .catch(error => {
          this.loadingTable = false
          this.loadingFresh = false
          this.$message.error(`${i18n.t('error_')}, ${error}`)
        })
    },
    handleClickButtonReload() {
      this.onGetListDeliveryWork()
    },
    onGetShopList() {
      shopResource.shopList().then(response => {
        if (response.error === 0) {
          const result = response.list
          this.shops = [...result]
        }
      })
    },
    requestListShop() {
      shopResource.listShopOption().then(response => {
        if (response.error === 0) {
          this.optionShops = [{ id: 0, name: i18n.t('default') }, ...response.list]
          console.log(this.optionShops)
        }
      })
    },
    changeTelesale(id) {
      this.listQuery.sale_man_id = id
      this.listQuery.page = 1
      this.total = 0
      this.onGetListDeliveryWork()
    },
    requestListTelesales() {
      accountResource.accountTelesale().then(response => {
        const { error, data } = response
        if (error === 0) {
          this.Telesales = [...data]
          this.listTelesalesFilter = [
            { id: -1, name: i18n.t('all') },
            { id: 0, name: i18n.t('no_telesale') },
            ...data
          ]
        }
      })
    }
  }
}
</script>
<style>
.delivery-right {
  display: flex;
}
.mb-10 {
  padding-right: 5px;
  margin-top: 5px;
}
.el-button--medium {
  padding: 10px;
}
</style>
