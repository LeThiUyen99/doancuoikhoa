<template>
  <el-row class="app-container list-revenue">
    <el-row class="list-revenue__header">
      <el-col :sm="12">
        <h3>{{ $t('upload_error_title') }}</h3>
      </el-col>
      <el-col :sm="12" style="text-align: right">
        <el-button v-if="is_delete" style="background: #1890ff; color:#fff;" @click="onDeleteUploadError">{{ $t('delete_history') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-revenue__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="ID"
          width="80"
          align="center"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          prop="vgs_code"
          :label="$t('vgs_code')"
          width="100"
          align="center"
        />
        <el-table-column
          prop="name"
          :label="$t('product_name')"
          align="center"
        />
        <el-table-column
          prop="category"
          :label="$t('category')"
          align="center"
        />
        <el-table-column
          prop="createdAt"
          :label="$t('date_create')"
          align="center"
        />
        <el-table-column
          prop="shop_id"
          :label="$t('id_shop')"
          width="100"
          align="center"
        />
        <el-table-column
          prop="description"
          :label="$t('desc')"
          align="center"
        />
        <el-table-column
          prop="user_upload_name"
          :label="$t('user_upload')"
          width="120"
          align="center"
        />
      </el-table>
    </el-row>
    <el-row class="list-shop__footer">
      <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListUploadError" />
    </el-row>
  </el-row>
</template>
<script>

import Pagination from '@/components/Pagination'
import UploadErrorResource from '@/api/uploaderror'
import { getAcountInfo } from '@/utils/auth'
import i18n from '@/lang/i18n'
const uploadErrorResource = new UploadErrorResource()

const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      loadingTable: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      tableData: []
    }
  },
  created() {
    this.onGetListUploadError()
  },
  methods: {
    onGetListUploadError() {
      this.loadingTable = true
      uploadErrorResource.UploadErrorList(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = response.data
          this.total = response.total || 0
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${i18n.t('error')}, ${error}`)
      })
    },
    onDeleteUploadError() {
      this.$confirm(i18n.t('delete_upload_error_confirm')).then(_ => {
        uploadErrorResource.deleteUploadError(this.listQuery).then(response => {
          if (response.error === 0) {
            this.tableData.splice(this.tableData)
          }
        })
      })
    }
  }
}
</script>
<style></style>
