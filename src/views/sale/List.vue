<template>
  <el-row class="app-container list-sale">
    <el-row class="list-product__header mb-10">
      <el-row class="list-product__header-title">
        <el-col :sm="12">
          <h3>{{ $t('sale_list') }}</h3>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" v-loading="loadingTable">
        <el-tab-pane name="SALE" :label="$t('manage_sale')">
          <table-sale
            ref="refTableSale"
            :table-data="tableData"
            :request-list-sale="requestListSale"
            :loading-table="loadingTable"
            :request-option-sale="requestOptionSale"
            request-options
            @onClickButtonReload="handleClickButtonReload"
          />
        </el-tab-pane>
        <el-tab-pane name="PRIORITY" :label="$t('manage_priority')">
          <priority
            ref="refTableSale"
            :table-data="tableData"
            :request-list-sale="requestListSale"
            :loading-table="loadingTable"
            :request-option-sale="requestOptionSale"
            request-options
            @onClickButtonReload="handleClickButtonReload"
          />
        </el-tab-pane>
        <el-tab-pane name="COMBO" :label="$t('combo')">
          <combo :table-data="tableData" :loading-table="loadingTable" :request-list-combo="requestListCombo" />
        </el-tab-pane>
        <el-tab-pane name="ADS" :label="$t('ads_banner')">
          <ads :table-data="tableData" :loading-table="loadingTable" :request-list-ads="requestListAds" :filter-ads="requestFilterAds" />
        </el-tab-pane>
      </el-tabs>
      <!-- <table-sale :state="parseInt(activeName)" @onClickButtonReload="handleClickButtonReload" /> -->
      <el-row class="list-delivery__data-list">
        <pagination
          v-show="total> listQuery.limit"
          :total="total"
          :limit.sync="listQuery.limit"
          :page.sync="listQuery.page"
          @pagination="requestListData"
        />
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
import SaleResource from '@/api/sale'
import TableSale from '@/views/sale/components/TableSale'
import Priority from '@/views/sale/components/Priority'
import Combo from '@/views/sale/components/Combo'
import Ads from '@/views/sale/components/Ads.vue'
import Pagination from '@/components/Pagination'
import CategoryResource from '@/api/category'
import TrademarkResource from '@/api/trademark'
import TagResource from '@/api/tag'
import ShopResource from '@/api/shop'
import i18n from '@/lang/i18n'

const shopResource = new ShopResource()
const tagResource = new TagResource()
const categoryResource = new CategoryResource()
const trademarkResource = new TrademarkResource()
const TAB_PAGE_NAME = {
  SALE: 'SALE',
  PRIORITY: 'PRIORITY',
  COMBO: 'COMBO',
  ADS: 'ADS'
}

const OPTION_SALE_TYPE = {
  SHOP: 1,
  CATEGORY: 2,
  TRADER_MARK: 3,
  TAG: 4
}

const saleResource = new SaleResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { TableSale, Priority, Combo, Ads, Pagination },
  data() {
    return {
      activeName: 'SALE',
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      tableData: [],
      loadingTable: false,
      option_sale_type: OPTION_SALE_TYPE.SHOP
    }
  },
  watch: {
    activeName(value) {
      if (value === TAB_PAGE_NAME.SALE) {
        this.requestListSale()
      } else if (value === TAB_PAGE_NAME.ADS) {
        this.requestListAds()
      } else if (value === TAB_PAGE_NAME.COMBO) {
        this.requestListCombo()
      } else if (value === TAB_PAGE_NAME.PRIORITY) {
        this.requestListSale()
      }
    }
  },
  created() {
    // this.reuqestListShop()
  },
  mounted() {
    this.requestListSale()
  },
  methods: {
    requestOptionSale(type, query = {}, callback = null) {
      this.option_sale_type = type
      if (type === OPTION_SALE_TYPE.SHOP) {
        this.requestListShop(callback)
      } else if (type === OPTION_SALE_TYPE.CATEGORY) {
        this.requestOptionCategory(callback)
      } else if (type === OPTION_SALE_TYPE.TRADER_MARK) {
        this.requestOptionTrademark(callback)
      } else if (type === OPTION_SALE_TYPE.TAG) {
        this.requestOptionTag(query, callback)
      }
    },
    requestListShop(callback = null) {
      // this.loadingTable = true
      shopResource.listShopOption().then(response => {
        // this.loadingTable = false
        // console.log('GET DU LIEU THANH CONG', response, '\n')
        const { error, list } = response
        if (error === 0) {
          const data = [{ id: 0, name: i18n.t('default') }, ...list]
          // console.log('.....................shops ', JSON.stringify(data))
          // this.$refs.refTableSale.setOption(data)
          if (callback) {
            callback(data)
          }
        }
      }).catch(_err => {
        // this.loadingTable = false
      })
    },
    requestOptionCategory(callback) {
      // this.loadingTable = true
      categoryResource.listCategory().then(response => {
        // this.loadingTable = false
        // console.log('GET DU LIEU THANH CONG', response, '\n')
        const { error, list } = response
        if (error === 0) {
          const data = [{ id: 0, name: i18n.t('default') }, ...list]
          // console.log('.....................shops ', JSON.stringify(data))
          // this.$refs.refTableSale.setOption(data, OPTION_SALE_TYPE.CATEGORY)
          if (callback) {
            callback(data)
          }
        }
      }).catch(_err => {
        // this.loadingTable = false
      })
    },
    requestOptionTrademark(callback) {
      // this.loadingTable = true
      trademarkResource.listTrademarkOption().then(response => {
        // this.loadingTable = false
        // console.log('GET DU LIEU THANH CONG', response, '\n')
        const { error, list } = response
        if (error === 0) {
          const data = [{ id: 0, name: i18n.t('default') }, ...list]
          // console.log('.....................shops ', JSON.stringify(data))
          // this.$refs.refTableSale.setOption(data, OPTION_SALE_TYPE.TRADER_MARK)
          if (callback) {
            callback(data)
          }
        }
      }).catch(_err => {
        // this.loadingTable = false
      })
    },
    requestOptionTag(query = {}, callback) {
      // this.loadingTable = true
      // console.log('...............option tags : ', JSON.stringify(query))
      tagResource.tagListOption(query).then(response => {
        // this.loadingTable = false
        // console.log('GET DU LIEU THANH CONG', response, '\n')
        const { error, list } = response
        if (error === 0) {
          const data = [{ id: 0, name: i18n.t('default') }, ...list]
          // console.log('.....................shops ', JSON.stringify(data))
          // this.$refs.refTableSale.setOption(data, OPTION_SALE_TYPE.TAG)
          if (callback) {
            callback(data)
          }
        }
      }).catch(_err => {
        // this.loadingTable = false
      })
    },
    requestListData(query = {}) {
      if (this.activeName === TAB_PAGE_NAME.SALE) {
        this.requestListSale(query)
      } else if (this.activeName === TAB_PAGE_NAME.ADS) {
        console.log('.................active', this.active)
        if (this.active && this.active !== 3) {
          this.requestFilterAds(this.active)
          return
        }
        this.requestListAds()
      } else if (this.activeName === TAB_PAGE_NAME.COMBO) {
        this.requestListCombo()
      } else if (this.activeName === TAB_PAGE_NAME.PRIORITY) {
        this.requestListSale()
      }
    },
    requestListSale(query = {}) {
      this.loadingTable = true
      this.listQuery = { ...this.listQuery, ...query }
      // console.log('................list sale', JSON.stringify(this.listQuery))
      saleResource.saleList(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          // const newArray = []
          // const page = query.page ? parseInt(query.page) : 1;
          // console.log(query.page)
          // response.list.map((item, index) => {
          //   newArray.push({
          //     ...item,
          //     ...{ id_fix: (index + 1) * page }
          //   })
          // })
          // this.tableData = newArray
          this.tableData = response.list
          this.total = response.total
        } else {
          this.tableData = []
          this.total = 0
        }
      }).catch((_err) => {
        this.loadingTable = false
      })
    },
    requestListCombo(filter = 0) {
      this.loadingTable = true
      this.listQuery.filter = filter
      saleResource.comboList(this.listQuery).then(response => {
        this.loadingTable = false
        const { error, data, total } = response
        if (error === 0) {
          this.tableData = data
          this.total = total || data.length
        } else {
          this.tableData = []
          // this.total = 0
        }
      }).catch((_err) => {
        this.loadingTable = false
      })
    },
    requestListAds() {
      this.loadingTable = true
      saleResource.adsList(this.listQuery).then(response => {
        this.loadingTable = false
        const { error, data, total } = response
        console.log('...................total banner : ', total)
        if (error === 0) {
          data.forEach(d => {
            d.loadingSubmit = false
          })
          this.tableData = [...data]
          // this.total = total || data.length
          this.total = this.listQuery.page === 1 ? total : this.total
        } else {
          this.tableData = []
          // this.total = 0
        }
      }).catch((_err) => {
        this.loadingTable = false
      })
    },
    requestFilterAds(filter) {
      this.loadingTable = true
      this.active = filter
      saleResource.filterAds(this.active, this.listQuery.page, this.listQuery.limit).then(response => {
        console.log('------------------------------------', this.active)
        this.loadingTable = false
        const { error, data, total } = response
        if (error === 0) {
          data.forEach(d => {
            d.loadingSubmit = false
          })
          this.tableData = data
          this.total = total // this.listQuery.page === 1 ? total : this.total
        } else {
          this.tableData = []
        }
      })
    },
    handleClickButtonReload() {
      this.requestListSale()
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination-container{
  display: block!important;
}
</style>
