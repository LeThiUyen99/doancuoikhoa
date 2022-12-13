<template>
  <el-row class="app-container list-customer">
    <el-row class="list-customer__header">
      <el-col :sm="5">
        <h3 style="margin:0">{{ $t("manage_customer") }}</h3>
      </el-col>
      <el-col :sm="19" align="right" style="margin-bottom:20px">
        <el-input v-model="listQuery.golfer_id" :placeholder="$t('find_vga')" style="width:40%; padding-right:10px" />
        <el-button v-if="listQuery.golfer_id" type="error" icon="el-icon-clear" @click="onClear">Clear</el-button>
        <el-button type="primary" @click="requestCustomerList">{{ $t('search') }}</el-button>
        <el-button :loading="loadingFresh" icon="el-icon-refresh" @click="onRefresh">{{ $t("refresh") }}</el-button>
        <el-button v-if="isShowBtnCustorm" type="primary" @click="onCreateCustomer">{{ $t("create_info") }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-customer__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column :label="$t('id')" align="center" width="100">
          <template slot-scope="scope">#{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('VGA')" align="center">
          <template slot-scope="scope">{{ `VGA${scope.row.golfer? scope.row.golfer.id: ''}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('full_name')" align="center">
          <template slot-scope="scope">{{ scope.row.golfer? scope.row.golfer.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('avatar')" align="center">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image v-if="scope.row.golfer?scope.row.golfer.avatar: ''" :src="scope.row.golfer?scope.row.golfer.avatar: ''" :fit="contain" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('height')" align="center" prop="height">
          <template slot-scope="scope">{{ `${scope.row.height} (cm)` }}</template>
        </el-table-column>
        <el-table-column :label="$t('weight_customer')" align="center" prop="weight">
          <template slot-scope="scope">{{ `${scope.row.weight} (kg)` }}</template>
        </el-table-column>
        <el-table-column :label="$t('hobbies')" align="center" prop="interests" />
        <el-table-column :label="$t('note')" align="center" prop="noted" />
        <el-table-column :label="$t('update_date')" align="center" prop="update_at" />
        <el-table-column :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button circle type="primary" icon="el-icon-edit" @click="onEditCustomer(scope.row)" />
            <el-button circle type="danger" icon="el-icon-delete" @click="onDeleteCustomer(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.number" :total="total" :limit.sync="listQuery.number" :page.sync="listQuery.page" @pagination="requestCustomerList" />
      </el-row>
      <dialog-customer :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectCustomer" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import i18n from '@/lang/i18n'
import Pagination from '@/components/Pagination'
import { getAcountInfo } from '@/utils/auth'
import DialogCustomer from '@/views/customer/components/DialogCustomer'
import DeliveryResource from '@/api/delivery'
const deliveryResource = new DeliveryResource()
const defaultQuery = {
  page: 1,
  number: 10
}
export default {
  name: 'List',
  components: { Pagination, DialogCustomer },

  data() {
    const account = getAcountInfo()
    return {
      listQuery: Object.assign({}, defaultQuery),
      isShowBtnCustorm: !!(account.prefix_domain === 'admin'),
      tableData: [],
      contain: 'contain',
      loadingTable: false,
      total: 0,
      loadingFresh: false,
      objectCustomer: {},
      isAdd: false,
      golfer_id: '',
      onShowDialog: false
    }
  },

  created() {
    this.requestCustomerList()
  },

  methods: {
    onClear() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.requestCustomerList()
    },
    onRefresh() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.requestCustomerList()
    },
    onCreateCustomer() {
      this.onShowDialog = true
      this.objectCustomer = {}
      this.isAdd = true
    },
    onEditCustomer(row) {
      this.objectCustomer = Object.assign({}, row)
      this.isAdd = false
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      const { reload_data, dialog, reload } = object
      this.onShowDialog = dialog
      if (reload) {
        // this.height = reload_data.height
        // this.weight = reload_data.weight
        // this.interests = reload_data.interests
        // this.noted = reload_data.noted
        this.requestCustomerList()
      }
      if (reload_data) {
        // this.onGetListReturnPolicy();
        const obj = this.tableData.find(d => d.id === reload_data.id)
        console.log('...................tim thay object : ', JSON.stringify(obj))
        if (obj) {
          obj.height = reload_data.height
          obj.golfer.id = reload_data.golfer_id
          obj.weight = reload_data.weight
          obj.interests = reload_data.interests
          obj.noted = reload_data.noted
          // this.switchData[row.id] = status === 1 ? true : false
        }
      }
    },
    onDeleteCustomer(row) {
      this.$confirm(i18n.t('delete_info').format(row.golfer.name)).then(_ => {
        deliveryResource.deleteInfoBuyer(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('delete_success'))
            this.requestCustomerList()
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    requestCustomerList() {
      this.loadingTable = true
      deliveryResource.listInfoBuyer(this.listQuery).then(res => {
        this.loadingTable = false
        const { error, data, total } = res
        if (error === 0) {
          this.tableData = data
          this.total = total
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
