<template>
  <el-row class="app-container list-work">
    <el-row v-if="!isShowCreateOrder && !isShowOrderOffline">
      <el-row class="list-work__header">
        <el-col :sm="24">
          <el-col class="mb-10" :sm="22">
            <h3 style="margin: 0">{{ $t("job_daily") }}</h3>
          </el-col>
          <!--          <el-col class="mb-10" :sm="4">-->
          <!--            <el-select style="width: 100%" v-model="telesale_id" :placeholder="$t('fillter_handler')" @change="changeTelesale">-->
          <!--              <el-option v-for="sale in listTelesalesFilter" :key="sale.id" :label="sale.name" :value="sale.id" />-->
          <!--            </el-select>-->
          <!--          </el-col>-->
        </el-col>
        <el-col style="margin-top: 20px" :sm="24" align="right">
          <el-input
            v-model="keyword"
            style="margin-right: 5px; width: 20%"
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
            v-model="telesale_id"
            :placeholder="$t('fillter_handler')"
            style="padding: 0 5px"
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
          >{{ $t("refresh") }}</el-button>
          <el-button type="primary" @click="handleCreateOrder">{{
            $t("create_order")
          }}</el-button>
          <el-button type="warning" :loading="loadingFresh" @click="createOrderOff">{{ $t('create-order-off') }}</el-button>
        </el-col>
      </el-row>
      <el-row class="list-work__data">
        <el-row class="list-delivery__data-tab">
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
        <el-row class="list-work__data-list">
          <table-work
            :table-data="tableData"
            :telesales="Telesales"
            :state="parseInt(activeName)"
            :loading-table="loadingTable"
            @onClickButtonReload="handleClickButtonReload"
          />
        </el-row>
        <el-row class="list-work__data-list">
          <pagination
            v-show="total > listQuery.limit"
            :total="total"
            :limit.sync="listQuery.limit"
            :page.sync="listQuery.page"
            @pagination="onGetListDaily"
          />
        </el-row>
      </el-row>
    </el-row>
    <el-row v-if="isShowCreateOrder">
      <create-order :go-back="goBack" />
    </el-row>
    <el-row v-if="isShowOrderOffline" class="list-create-order">
      <order-offline :go-back="goBack" />
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import TableWork from '@/views/job_daily/components/TableWork'
import DeliveryResource from '@/api/delivery'
import AccountResource from '@/api/account'
import { getAcountInfo } from '@/utils/auth'
import i18n from '@/lang/i18n'
import CreateOrder from '@/views/delivery/components/CreateOrder'
import OrderOffline from '@/views/delivery_admin/components/OrderOffline'
const deliveryResource = new DeliveryResource()
const accountResource = new AccountResource()
const defaultQuery = {
  page: 1,
  limit: 10,
  state: 0
}
export default {
  name: 'List',
  components: { OrderOffline, CreateOrder, Pagination, TableWork },
  data() {
    const account = getAcountInfo()
    return {
      filters: [
        { key: 0, name: 'Tìm theo Id' },
        { key: 1, name: 'Tìm theo mã VGA' },
        { key: 2, name: 'Tìm theo mã vận đơn' },
        { key: 3, name: 'Tìm theo số điện thoại' }
      ],
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false,
      tableData: [],
      Telesales: [],
      keyword: '',
      filter_id: 0,
      listTelesalesFilter: [],
      telesale_id: null,
      isShowCreateOrder: false,
      activeName: '0',
      total: 0,
      loadingFresh: false,
      account_id: account.id,
      isShowOrderOffline: false
    }
  },
  watch: {
    activeName(value) {
      const state = { state: parseInt(value) }
      this.listQuery = Object.assign(this.listQuery, state)
      this.listQuery.page = 1
      this.onGetListDaily()
    }
  },
  created() {
    this.listQuery.sale_man_id = this.account_id
    this.onGetListDaily()
    this.requestListTelesales()
  },
  methods: {
    createOrderOff() {
      this.isShowOrderOffline = true
    },
    onSearchDelivery() {
      if (this.listQuery.keyword !== this.keyword) {
        this.listQuery.page = 1
        this.listQuery.keyword = this.keyword
        this.listQuery.type = this.filter_id
        this.listQuery.is_super_admin = true
      }
      deliveryResource.searchDelivery(this.listQuery).then((response) => {
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
    changeTelesale(id) {
      this.listQuery.sale_man_id = id
      this.listQuery.page = 1
      this.total = 0
      this.onGetListDaily()
    },
    requestListTelesales() {
      accountResource.accountTelesale().then((response) => {
        // console.log('------------------------------------account tel', response)
        const { error, data } = response
        if (error === 0) {
          const me = data.find((d) => d.id === this.account_id)
          if (me) {
            me.name = `${me.name}(${i18n.t('me')})`
            this.telesale_id = me.id
          }
          this.Telesales = [...data]
          this.listTelesalesFilter = [
            { id: 0, name: i18n.t('no_telesale') },
            { id: -1, name: i18n.t('all') },
            ...data
          ]
          console.log(
            '----------------------------------telesale',
            JSON.stringify(data)
          )
        }
      })
    },
    onGetListDaily() {
      this.loadingTable = true
      // this.listQuery.sale_man_id = this.account_id
      deliveryResource
        .listDaily(this.listQuery)
        .then((response) => {
          // console.log('-------------------------------------------work', JSON.stringify(response))
          this.loadingTable = false
          const { error, data, total } = response
          if (error === 0) {
            this.tableData = data
            this.tableData.forEach((d) => {
              d.loading = false
            })
            this.total = this.listQuery.page === 1 ? total : this.total
          } else {
            this.tableData = []
            this.total = 0
          }
        })
        .catch((error) => {
          this.loadingTable = false
          this.$message.error(`${i18n.t('error_')}, ${error}`)
        })
    },
    onRefresh() {
      // this.listQuery = Object.assign({}, defaultQuery)
      this.listQuery.page = 1
      this.onGetListDaily()
    },
    handleClickButtonReload() {
      this.onGetListDaily()
    }
  }
}
</script>

<style scoped>
.mb-10 {
  padding-right: 5px;
}
.el-button--medium {
  padding: 10px;
}
</style>
