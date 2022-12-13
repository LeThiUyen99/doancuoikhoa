<template>
  <el-row class="app-container list-account">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_account') }}</h3>
      </el-col>
    </el-row>
    <el-row class="list-account__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="ID"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('account')"
          align="center"
        />
        <el-table-column
          prop="email"
          :label="$t('mail')"
          align="center"
        />
        <el-table-column
          prop="phone"
          :label="$t('phone')"
          align="center"
        />
        <el-table-column
          prop="shop.name"
          :label="$t('manage_shop')"
          align="center"
        />
        <el-table-column
          prop="duyet"
          :label="$t('browser_account')"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('browse'): $t('not_browse') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="is_delete || is_edit" :label="$t('active')" align="center">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteAccount(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListAccount" />
      </el-row>
      <dialog-form-account :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectAccount" :shops="shops" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import AccountResource from '@/api/account'
import ShopResource from '@/api/shop'
const shopResource = new ShopResource()
import DialogFormAccount from '@/views/account/components/DialogFormAccount'
import { getAcountInfo } from '@/utils/auth'
import i18n from '@/lang/i18n'
const accountResource = new AccountResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormAccount, Pagination },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      tableData: [],
      shops: [],
      loadingTable: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      isAdd: true,
      onShowDialog: false,
      objectAccount: {}
    }
  },
  created() {
    this.onGetListAccount()
    this.onGetShopList()
  },
  methods: {
    onShowDialogCreate() {
      this.onShowDialog = true
      this.objectAccount = {}
      this.isAdd = true
    },
    onShowDialogEdit(row) {
      this.objectAccount = Object.assign({}, row)
      this.isAdd = false
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.onGetListAccount()
      }
    },
    onDeleteAccount(row) {
      this.$confirm(i18n.t('delete_category_confirm').format(row.name)).then(_ => {
        accountResource.deleteAccount(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('delete_success.'))
            this.onGetListAccount()
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    onGetShopList() {
      shopResource.shopList().then(response => {
        if (response.error === 0) {
          const result = response.list
          this.shops = [...result]
        }
      })
    },
    onGetListAccount() {
      this.loadingTable = true
      accountResource.AccountList(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = response.accounts
          this.total = response.total
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`Có lỗi, ${error}`)
      })
    }
  }
}
</script>
<style scoped>

</style>
