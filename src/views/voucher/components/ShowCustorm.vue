<template>
  <el-row class="app-container">
    <el-row class="list-custom-header">
      <el-col :sm="24">
        <el-col :sm="12">
          <el-col :sm="1">
            <el-button style="border: none; padding:5px 0;" icon="el-icon-back" @click="goBack" />
          </el-col>
          <h2 style="margin-top: 0">{{ $t('list-custom') }}</h2>
        </el-col>
        <el-col :sm="12" align="right">
          <el-button v-if="is_write" type="primary" @click="onCreateCustom">{{ $t('add') }}</el-button>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="list-custom-data">
      <el-table :data="listCustom" border>
        <el-table-column label="ID" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.golfer ? scope.row.golfer.id : '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('name')" align="center">
          <template slot-scope="scope">{{ scope.row.golfer ? scope.row.golfer.name : '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('logo')" prop="name" align="center">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image
              v-if="scope.row.golfer ? scope.row.golfer.avatar: ''"
              :src="scope.row.golfer ? scope.row.golfer.avatar: ''"
              :fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('number_uses')" align="center" width="150">
          <template slot-scope="scope">{{ scope.row.max_count_use }}</template>
        </el-table-column>
        <el-table-column :label="$t('active')" header-align="center" width="170">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state_switch"
              style="margin-left: 20px"
              :active-text="getTitleState(scope.row)"
              @change="onActiveGolfer(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="is_delete || is_edit" :label="$t('active1')" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onEditCustom(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteCustom(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > listQuery.number" :total="total" :limit.sync="listQuery.number" :page.sync="listQuery.page" @pagination="requestListCustom" />
    </el-row>
    <dialog-custom :show-dialog="onShowDialog" :is-add="isAdd" :id-voucher="idVoucher" :object-data="objectCustom" @onClickButtonDialog="handleClickButtonDialog" />
  </el-row>
</template>

<script>
import { getAcountInfo } from '@/utils/auth'
import VoucherResource from '@/api/voucher'
import Pagination from '@/components/Pagination'
import DialogCustom from '@/views/voucher/components/DialogCustom'
import i18n from '@/lang/i18n'
const voucherResource = new VoucherResource()
const defaultQuery = {
  page: 1,
  number: 10
}
export default {
  name: 'ShowCustorm',
  components: { DialogCustom, Pagination },
  props: {
    voucherId: {
      type: Number,
      default() { return 0 }
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    goBack: {
      type: Function,
      default() {
        return null
      }
    }
  },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      listQuery: Object.assign({}, defaultQuery),
      listCustom: [],
      contain: 'contain',
      total: 0,
      objectCustom: {},
      onShowDialog: false,
      isAdd: true,
      idVoucher: 0
    }
  },
  created() {
    this.requestListCustom()
  },
  methods: {
    getTitleState(row) {
      return parseInt(row.state) ? i18n.t('active1') : i18n.t('hide')
    },
    onActiveGolfer(row) {
      console.log('gggg', row.state_switch)
      let state = 0
      if (row.state) {
        state = 0
      } else {
        state = 1
      }
      const body = {
        state: state,
        id: row.id
      }
      this.$confirm(i18n.t('active_custom')).then(_ => {
        voucherResource.activeGolfer(body).then(res => {
          const { error, msg } = res
          if (error === 0) {
            row.state = state
            row.state_switch = !!state
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        })
      }).catch(_ => {})
    },
    onEditCustom(row) {
      this.idVoucher = this.voucherId
      this.onShowDialog = true
      this.isAdd = false
      this.objectCustom = Object.assign({}, row)
    },
    onCreateCustom() {
      this.idVoucher = this.voucherId
      this.onShowDialog = true
      this.objectCustom = {}
      this.isAdd = true
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.requestListCustom()
      }
    },
    onDeleteCustom(row) {
      const body = {
        id: row.id
      }
      this.$confirm(i18n.t('delete_confirm').format(row.code)).then(_ => {
        voucherResource.deleteCustom(body).then(res => {
          const { error, msg } = res
          if (error === 0) {
            this.$message.success(msg)
            this.requestListCustom()
          } else {
            this.$message.error(msg)
          }
        })
      }).catch(_ => {})
    },
    requestListCustom() {
      this.listQuery.id = this.voucherId
      voucherResource.CustomList(this.listQuery).then(res => {
        const { error, data, total } = res
        if (error === 0) {
          this.listCustom = data
          for (const item of this.listCustom) {
            item.state_switch = parseInt(item.state) > 0
          }
          this.total = total || 0
        }
      })
    }
  }
}
</script>

<style scoped>
.el-col-sm-1{
  padding-top: 2px;
}
</style>
