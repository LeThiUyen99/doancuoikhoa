<template>
  <el-row class="app-container list-delivery">
    <el-row v-if="!isShowCreateOrder">
      <el-row class="list-delivery__header">
        <el-col :sm="24" style="display:flex;">
          <el-button style="border: none; padding: 0; padding-right: 10px" icon="el-icon-back" @click="backDelivery" />
          <h3 style="margin: 0; width: 100%; padding: 10px">{{ title }}</h3>
          <div style="display: flex">
            <el-button v-if="allow_create_bill" type="primary" @click="handleCreateOrder">{{ $t('create_order') }}</el-button>
            <el-button :loading="loadingFresh" icon="el-icon-refresh" @click="onRefresh">{{ $t('refresh') }}</el-button>
          </div>
        </el-col>
        <el-col v-if="!is_show_delivery_for_vga" style="margin-top: 20px" :sm="9">
          <el-col style="display: flex">
            <el-input v-model="keyword" style="margin-right: 10px; width: 65%;" :placeholder="$t('search')" />
            <el-select v-model="filter_id" style="margin-right: 10px" :placeholder="$t('search')">
              <el-option v-for="type in filters" :key="`type_${type.key}`" :label="type.name" :value="type.key" />
            </el-select>
            <el-button style="float:right;" type="primary" icon="el-icon-search" @click="onSearchDelivery">{{ $t('search') }}</el-button>
          </el-col>
        </el-col>
        <el-col v-if="!is_show_delivery_for_vga" :sm="15" style="margin-top: 20px; float:right;">
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
            />
            <el-select v-model="filter" style="margin-left: 10px" :placeholder="$t('search')">
              <el-option v-for="filter in filterDays" :key="`filter_${filter.key}`" :label="filter.name" :value="filter.key" />
            </el-select>
            <el-button v-if="isShowBtnFinishDelivery" style="margin-left: 10px; padding-top: 11px" type="primary" @click="onExportDelivery">{{ $t('export') }}</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="list-delivery__data">
        <el-row v-if="!is_show_delivery_for_vga" class="list-delivery__data-tab">
          <el-tabs v-model="activeName">
            <el-tab-pane name="0" :label="$t('confirm_wait')" />
            <el-tab-pane name="1" :label="$t('cho_dong_hang')" />
            <el-tab-pane name="2" :label="$t('wait_delivery')" />
            <el-tab-pane name="6" :label="$t('delivery')" />
            <el-tab-pane name="3" :label="$t('delivered')" />
            <el-tab-pane name="4" :label="$t('canceled')" />
            <el-tab-pane name="5" :label="$t('return_order')" />
          </el-tabs>
        </el-row>
        <el-row class="list-delivery__data-list">
          <table-delivery ref="refTable" :element-loading-text="loading_text" :is-show-statistical="is_show_delivery_for_vga" :table-data="tableData" :state="parseInt(activeName)" :loading-table="loadingTable" @onClickButtonReload="handleClickButtonReload" @onGolferClick="onGolferClick" />
        </el-row>
        <el-row class="list-delivery__data-list">
          <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onLoadMore" />
        </el-row>
      </el-row>
    </el-row>
    <el-row v-if="isShowCreateOrder" class="list-create-order">
      <create-order :go-back="goBack" />
    </el-row>
  </el-row>
</template>
<script>

import Pagination from '@/components/Pagination'
import { getAcountInfo } from '@/utils/auth'
import DeliveryResource from '@/api/delivery'
const deliveryResource = new DeliveryResource()
import ShopResource from '@/api/shop'
import TableDelivery from '@/views/delivery/components/TableDelivery'
import CreateOrder from '@/views/delivery/components/CreateOrder'
import i18n from '@/lang/i18n'
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
  let end_date = end.getTime() - timestamp + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000
  end_date = new Date(end_date)
  return end_date
}

const LOADING_TEXT = {
  LOADING: i18n.t('loading'),
  EXPORT: i18n.t('loading_wait')
}

export default {
  name: 'List',
  components: { TableDelivery, Pagination, CreateOrder },
  data() {
    const account = getAcountInfo()
    return {
      filters: [{ key: 0, name: i18n.t('Search_by_id') }, { key: 1, name: i18n.t('Search_by_VGA_code') }, { key: 2, name: i18n.t('Search_by_bill_code') }, { key: 3, name: i18n.t('Search_by_phone_number') }],
      filterDays: [{ key: 0, name: i18n.t('default') }, { key: 1, name: i18n.t('filter_by_creation_date') }, { key: 2, name: i18n.t('filter_by_completion_date') }, { key: 3, name: i18n.t('filter_by_cancellation_date') }, { key: 4, name: i18n.t('filter_by_return_date') }],
      isShowCreateOrder: false,
      isShowBtnFinishDelivery: !!(account.prefix_domain === 'super_admin' || account.prefix_domain === 'account'),
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
      filter: 0,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      defaultTime: ['00:00:00', '23:59:00'],
      value2: [getStartDate(new Date()), new Date()],
      from_date: 0,
      to_date: 0,
      loading_text: LOADING_TEXT.LOADING,
      is_show_delivery_for_vga: false,
      tableStatisticalDelivery: [],
      title: i18n.t('manage_delivery'),
      golfer: null,
      pickerOptions: {
        shortcuts: [{
          text: i18n.t('last_week'),
          onClick(picker) {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: i18n.t('last_month'),
          onClick(picker) {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: i18n.t('last_3_month'),
          onClick(picker) {
            const end = getEndDate(new Date())
            let start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            start = getStartDate(start)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    activeName(value) {
      const state = { state: parseInt(value) }
      this.listQuery = Object.assign(this.listQuery, state)
      this.listQuery.page = 1
      this.onGetListDelivery()
    },
    value2(value) {
      let start = value[0]
      let end = value[1]
      start = (new Date(start)).getTime()
      end = (new Date(end)).getTime()
      this.from_date = start
      this.to_date = end
    }
  },
  created() {
    this.onGetListDelivery()
    this.onGetShopList()
  },
  methods: {
    updateLoadingUser(is_loading) {
      if (this.$refs.refTable) {
        this.$refs.refTable.updateLoadingUser(is_loading)
      }
    },
    onLoadMore() {
      if (this.is_show_delivery_for_vga) {
        this.requestListDeliveryForGolfer()
      } else {
        this.onGetListDelivery()
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
      deliveryResource.userDelivery(this.listQuery).then(response => {
        this.loadingTable = false
        this.updateLoadingUser(false)
        const { error, data, total } = response
        if (error === 0) {
          this.is_show_delivery_for_vga = true
          this.title = i18n.t('user_statistics').format(`${this.golfer.name}-VGA${this.golfer.id}`)
          this.tableData = [...data]
          this.total = this.listQuery.page === 1 ? total : this.total
          this.updateShowUser()
        }
      }).then(_ => {
        this.loadingTable = false
        this.updateLoadingUser(false)
      })
    },
    backDelivery() {
      if (this.is_show_delivery_for_vga) {
        this.is_show_delivery_for_vga = false
        this.listQuery.page = this.page_old
        this.tableData = [...this.tableDataOld]
        this.title = i18n.t('manage_delivery')
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
      if (success && this.activeName === '0') {
        this.onRefresh()
      }
    },
    handleCreateOrder() {
      this.isShowCreateOrder = true
    },
    onRefresh() {
      this.listQuery.page = 1
      this.onGetListDelivery()
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
        to_date: this.to_date,
        filter: this.filter
      }
      this.$confirm(i18n.t('export_confirm')).then(_ => {
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
      }).catch(_ => {
        this.loadingTable = false
      })
    },
    onGetListDelivery() {
      this.loading_text = LOADING_TEXT.LOADING
      this.loadingTable = true
      this.loadingFresh = true
      this.page_old = this.listQuery.page
      deliveryResource.DeliveryList(this.listQuery).then(response => {
        this.loadingTable = false
        this.loadingFresh = false
        const { error, list } = response
        if (error === 0) {
          this.tableData = list
          this.tableDataOld = [...list]
          this.total = this.listQuery.page === 1 ? response.total : this.total
        }
      }).catch(error => {
        this.loadingTable = false
        this.loadingFresh = false
        this.$message.error(`${i18n.t('error_')}, ${error}`)
      })
    },
    handleClickButtonReload() {
      this.onGetListDelivery()
    },
    onGetShopList() {
      shopResource.shopList().then(response => {
        if (response.error === 0) {
          const result = response.list
          this.shops = [...result]
        }
      })
    }
  }
}
</script>
<style>
.delivery-right{
  display: flex;
}
</style>
