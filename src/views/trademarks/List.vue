<template>
  <el-row class="app-container list-categories">
    <el-row class="list-categories__header">
      <el-col :sm="12">
        <h3>{{ $t('tradermark_manage_title') }}</h3>
      </el-col>
      <el-col :sm="12">
        <div class="text-right">
          <el-button v-if="is_write" type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-categories__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="ID"
          width="100"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('logo')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar :size="60" :src="scope.row.image">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('tradermark_name')"
        />
        <el-table-column
          prop="size_chart"
          :label="$t('size_chart')"
          width="200"
          align="center"
        />
        <el-table-column
          prop="total_product"
          :label="$t('row_number')"
          width="200"
          align="center"
        />
        <!-- <el-table-column
          prop="total_order"
          label="Số đơn"
        /> -->
        <el-table-column v-if="is_delete || is_edit" :label="$t('action')" align="center" width="200">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteTrademark(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="list-categories__footer">
      <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListTrademark" />
    </el-row>
    <dialog-form-trademark :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectTrademark" @onClickButtonDialog="handleClickButtonDialog" />
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import TrademarkResource from '@/api/trademark'
import DialogFormTrademark from '@/views/trademarks/components/DialogFormTrademark'
import { getAcountInfo } from '@/utils/auth'
import I18n from '../../lang/i18n'
const trademarkResource = new TrademarkResource()

const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormTrademark, Pagination },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      tableData: [],
      loadingTable: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      onShowDialog: false,
      objectTrademark: {},
      isAdd: true
    }
  },
  created() {
    this.onGetListTrademark()
  },
  methods: {
    onShowDialogCreate() {
      this.onShowDialog = true
      this.objectTrademark = {}
      this.isAdd = true
    },
    onShowDialogEdit(row) {
      this.onShowDialog = true
      this.objectTrademark = Object.assign({}, row)
      this.isAdd = false
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.onGetListTrademark()
      }
    },
    onDeleteTrademark(row) {
      this.$confirm(`${I18n.t('delete_tradermark_confirm')} ${row.name}?`).then(_ => {
        trademarkResource.deleteTrademark(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(I18n.t('delete_success'))
            this.onGetListTrademark()
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    onGetListTrademark() {
      this.loadingTable = true
      trademarkResource.listTrademark(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = [...response.list]
          this.total = response.total || 0
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${I18n.t('error')}, ${error}`)
      })
    }
  }
}
</script>

<style scoped>

</style>
