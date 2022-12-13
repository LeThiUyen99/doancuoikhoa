<template>
  <el-row class="body-data">
    <el-row v-if="!isShowUser">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          :label="$t('id')"
          align="center"
        >
          <template slot-scope="props">
            <el-link type="primary" @click="onShowDialogOrderDetail(props.row)">{{ `#${props.row.name_delivery}` }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('user')"
          align="center"
        >
          <template slot-scope="props">
            <template v-if="props.row.golfer"><el-link @click="onUserDelivery(props.row.golfer)">{{ `${props.row.golfer.name} ${props.row.golfer.id? `- VGA${props.row.golfer.id}`: ''}` }}</el-link></template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('gross_product')"
          align="center"
        >
          <template slot-scope="props">{{ props.row.orders.length }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('total_money')"
          align="center"
        >
          <template slot-scope="props">{{ $t('price_vnd').format(formatNumber(props.row.total_price)) }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('payment')"
          align="center"
        >
          <template slot-scope="props">
            <el-tag :type="(props.row.paid === 1) ? 'success' : 'warning'">{{ (props.row.paid === 1) ? $t('paid'): $t('wait') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('date_create')"
          align="center"
        >
          <template slot-scope="props">{{ convertDateTime(props.row.date_customer_confirm ? props.row.date_customer_confirm : props.row.updatedAt) }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('note')"
          align="center"
        >
          <template slot-scope="props">
            <template v-if="props.row.state === 5">{{ props.row.customer_reject_content }}</template>
            <template v-if="props.row.state === 4">{{ props.row.reject_content }}</template>
            <template v-if="props.row.state <= 3">{{ props.row.shop_noted }}</template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('action')"
          width="140"
          align="center"
        >
          <template slot-scope="props">
            <template v-if="props.row.sale_man === accountID">
              <template v-if="props.row.state < 4">
                <el-button v-if="is_edit" size="small" :title="(props.row.paid === 0) ? $t('payment') : $t('cancel_pay')" :type="(props.row.paid === 0) ? 'success' : 'danger'" circle @click="onSubmitPayment(props.row)">
                  <svg-icon :icon-class="(props.row.paid === 0) ? 'payment' : 'payment-cancel'" />
                </el-button>
              </template>
              <template v-if="props.row.state < 3">
                <el-button v-if="is_edit" size="small" :title="$t('order_comfirm')" type="primary" icon="el-icon-check" circle @click="onClickConfirm(props.row)" />
                <el-button v-if="is_edit" size="small" :title="$t('cancel_order')" type="danger" icon="el-icon-close" circle @click="showDialogCancelOrder(props.row)" />
              </template>
            </template>
            <template v-if="props.row.sale_man !== accountID">
              <template>{{ props.row.sale ? $t('process').format(props.row.sale.name) : '' }}</template>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-if="isShowUser">
      <user-v-g-a ref="refTableUser" :table-data-user="tableData" />
    </el-row>
    <dialog-cancel-order :show-dialog="onShowDialogCancelOrder" :object-data="objectDelivery" :content-note="listContent" @onClickButtonDialog="handleClickDialogButton" />
    <dialog-delivery-detail :dialog-visible="showDialogOrderDetail" :delivery-id="orderID" @onClickButtonDialogDetail="handleClickButtonDialogDetail" />
  </el-row>
</template>
<script>

import DeliveryResource from '@/api/delivery'
import { formatNumber, convertDateTime } from '@/utils/convert'
import { mapGetters } from 'vuex'
import DialogCancelOrder from '@/views/delivery/components/DialogCancelOrder'
import DialogDeliveryDetail from '@/views/delivery/components/DialogDeliveryDetail'
import { getAcountInfo, parseJson } from '@/utils/auth'
import UserVGA from '@/views/delivery/components/UserVGA'
import i18n from '@/lang/i18n'
const deliveryResource = new DeliveryResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'TableDelivery',
  components: { DialogDeliveryDetail, DialogCancelOrder, UserVGA },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableSearch: {
      type: Array,
      default() {
        return []
      }
    },
    state: {
      type: Number,
      default() {
        return 0
      }
    },
    loadingTable: {
      type: Boolean,
      default: false
    },
    isShowStatistical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const account = getAcountInfo()
    return {
      isShowUser: this.isShowStatistical,
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      onShowDialogCancelOrder: false,
      objectDelivery: {},
      listContent: [],
      showDialogOrderDetail: false,
      orderID: 0,
      tableDataUser: [],
      stateUser: 0,
      total: 0,
      type: 0,
      page: 0,
      loadingTableUser: false,
      listQuery: Object.assign({}, defaultQuery),
      is_manager_sale: account.permission_id === 'sale_manager' || account.prefix_domain === 'super_admin'
    }
  },
  computed: {
    ...mapGetters([
      'accountID'
    ])
  },
  created() {
    this.onGetNoteContents()
  },
  methods: {
    updateLoadingUser(is_loading) {
      if (this.$refs.refTableUser) {
        this.$refs.refTableUser.updateLoading(is_loading)
      }
    },
    onUserDelivery(row) {
      // this.isShowUser = true
      // this.listQuery.page = 1
      // this.listQuery.golfer_id = row.golfer_id
      // this.loadingTableUser = true
      // deliveryResource.userDelivery(this.listQuery).then(response => {
      //   this.loadingTableUser = false
      //   const { error, data, total } = response
      //   if (error === 0) {
      //     this.tableDataUser = data
      //     this.total = this.listQuery.page === 1 ? total : this.total
      //     console.log('-------------------------------------------------------search', JSON.stringify(this.tableDataUser))
      //   }
      // })
      this.$emit('onGolferClick', row)
    },
    onSubmitPayment(row) {
      let data = { account_id: this.accountID, delivery_id: row.id }
      let message = ''
      if (row.paid === 0) {
        data = Object.assign(data, { paid: 1 })
        message = i18n.t('comfirm_payment_delivery').format(row.name_delivery)
      } else {
        data = Object.assign(data, { paid: 0 })
        message = i18n.t('comfirm_cancel_payment_delivery').format(row.name_delivery)
      }
      this.$confirm(message).then(_ => {
        deliveryResource.updateConfirmPaid(data).then(response => {
          if (response.error === 0) {
            this.$message.success(response.msg)
            this.$emit('onClickButtonReload')
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    onClickConfirm(row) {
      const state = row.state
      let message = ''
      switch (state) {
        case 1:
          message = i18n.t('comfirm_delivery').format(row.name_delivery)
          break
        case 2:
          message = i18n.t('comfirm_delivered').format(row.name_delivery)
          break
        default:
          message = i18n.t('comfirm_sure_delivery').format(row.name_delivery)
          break
      }
      this.$confirm(message).then(_ => {
        const data = { id: row.id, state: this.state + 1, code: 10 }
        deliveryResource.updateDelivery(data).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('comfirm_delivery_success'))
            this.$emit('onClickButtonReload')
          } else {
            this.$message.error(i18n.t('error_confirm'))
          }
        })
      }).catch(_ => {})
    },
    handleClickDialogButton(object) {
      this.onShowDialogCancelOrder = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    showDialogCancelOrder(row) {
      this.objectDelivery = Object.assign({}, row)
      this.onShowDialogCancelOrder = true
    },
    onShowDialogOrderDetail(row) {
      this.orderID = row.id
      this.showDialogOrderDetail = true
    },
    handleClickButtonDialogDetail(object) {
      this.showDialogOrderDetail = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    onGetNoteContents() {
      const array = localStorage.getItem('contents')
      if (array) {
        const cont = parseJson(array)
        this.listContent = cont ? [...cont] : []
      }
    },
    formatNumber,
    convertDateTime,
    updateShowUser(is_show_user) {
      this.isShowUser = is_show_user
    }
  }
}
</script>

<style scoped>

</style>
