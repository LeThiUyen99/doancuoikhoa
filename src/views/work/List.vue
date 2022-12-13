<template>
  <el-row class="app-container list-work">
    <el-row class="list-work__header">
      <el-col :sm="5">
        <h3>{{ $t('manage_work') }}</h3>
      </el-col>
      <el-col :sm="3" style="float:right;">
        <el-select v-model="telesale_id" :placeholder="$t('fillter_handler')" @change="changeTelesale">
          <el-option v-for="sale in listTelesalesFilter" :key="sale.id" :label="sale.name" :value="sale.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="list-work__data">
      <el-row class="list-work__data-list">
        <table-work :table-data="tableData" :telesales="Telesales" :loading-table="loadingTable" @onClickButtonReload="handleClickButtonReload" />
      </el-row>
      <el-row class="list-work__data-list">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListWork" />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import TableWork from '@/views/work/components/TableWork'
import DeliveryResource from '@/api/delivery'
import AccountResource from '@/api/account'
import i18n from '@/lang/i18n'
const deliveryResource = new DeliveryResource()
const accountResource = new AccountResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination, TableWork },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false,
      tableData: [],
      Telesales: [],
      listTelesalesFilter: [],
      telesale_id: null,
      total: 0
    }
  },
  watch: {
    activeName(value) {
      const state = { state: parseInt(value) }
      this.listQuery = Object.assign(this.listQuery, state)
      this.onGetListWork()
    }
  },
  created() {
    this.onGetListWork()
    this.requestListTelesales()
  },
  methods: {
    changeTelesale(id) {
      this.listQuery.sale_man_id = id
      this.listQuery.page = 1
      this.total = 0
      this.onGetListWork()
    },
    requestListTelesales() {
      accountResource.accountTelesale().then(response => {
        // console.log('------------------------------------account tel', response)
        const { error, data } = response
        if (error === 0) {
          this.Telesales = [...data]
          this.listTelesalesFilter = [{ id: -1, name: i18n.t('all') }, { id: 0, name: i18n.t('no_telesale') }, ...data]
          console.log('----------------------------------telesale', JSON.stringify(data))
        }
      })
    },
    onGetListWork() {
      this.loadingTable = true
      deliveryResource.listDeliverySale(this.listQuery).then(response => {
        // console.log('-------------------------------------------work', JSON.stringify(response))
        this.loadingTable = false
        const { error, data, total } = response
        if (error === 0) {
          this.tableData = data
          this.total = this.listQuery.page === 1 ? total : this.total
        } else {
          this.tableData = []
          this.total = 0
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${i18n.t('error_')}, ${error}`)
      })
    },
    handleClickButtonReload() {
      this.onGetListWork()
    }
  }
}
</script>

<style scoped>

</style>
