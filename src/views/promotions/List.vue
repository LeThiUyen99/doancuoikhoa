<template>
  <el-row class="app-container list-promotions">
    <el-row class="list-promotions__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_promotion') }}</h3>
      </el-col>
      <el-col :sm="12">
        <div class="text-right">
          <el-button v-if="is_write" type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-promotions__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('id')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('logo')"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar :size="60" :src="scope.row.logo">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="shop.name"
          :label="$t('shop_name')"
          align="center"
        />
        <el-table-column
          prop="name"
          :label="$t('name')"
          align="center"
        />
        <el-table-column
          prop="start_time"
          :label="$t('start_time')"
          align="center"
        />
        <el-table-column
          prop="end_time"
          :label="$t('finish_time')"
          align="center"
        />
        <el-table-column
          :label="$t('active')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('active1') : $t('stop') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="is_delete || is_edit" :label="$t('active')" align="center">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeletePromotions(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="list-shop__footer">
      <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListPromotions" />
    </el-row>
    <dialog-form-promotions :is-add="isAdd" :object-data="objectPromotions" :show-dialog="onShowDialog" @onClickButtonDialog="handleClickButtonDialog" />
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import PromotionsResource from '@/api/promotions'
import DialogFormPromotions from '@/views/promotions/components/DialogFormPromotions'
import { getAcountInfo } from '@/utils/auth'
const promotionsResource = new PromotionsResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormPromotions, Pagination },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      listQuery: Object.assign({}, defaultQuery),
      tableData: [],
      total: 0,
      loadingTable: false,
      objectPromotions: {},
      isAdd: true,
      onShowDialog: false
    }
  },
  created() {
    this.onGetListPromotions()
  },
  methods: {
    onShowDialogCreate() {
      this.isAdd = true
      this.onShowDialog = true
      this.objectPromotions = {}
    },
    onShowDialogEdit(row) {
      this.isAdd = false
      this.onShowDialog = true
      this.objectPromotions = Object.assign({}, row)
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.onGetListPromotions()
      }
    },
    onDeletePromotions(row) {
      this.$confirm(`Bạn có chắc chắn muốn xóa shop ${row.name}?`).then(_ => {
        promotionsResource.deletePromotions(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(`Xóa shop ${row.name} thành công.`)
            this.onGetListPromotions()
          } else {
            this.$message.error(response.mgs)
          }
        })
      }).catch(_ => {})
    },
    onGetListPromotions() {
      this.loadingTable = true
      promotionsResource.PromotionsList(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = response.list
          this.total = response.total
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(` Có lỗi, ${error}`)
      })
    }
  }
}
</script>
<style></style>
