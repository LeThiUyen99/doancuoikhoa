<template>
  <el-row class="body-data">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
      :empty-text="$t('no_job')"
    >
      <el-table-column prop="date" :label="$t('id')" align="center" width="110">
        <template slot-scope="props">
          <el-link type="primary" @click="onShowDialogOrderDetail(props.row)">{{
            `#${props.row.name_delivery}`
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('user')" align="center">
        <template slot-scope="props">
          <template v-if="props.row.golfer">{{
            `${props.row.golfer.name} ${
              props.row.golfer.id ? `- VGA${props.row.golfer.id}` : ""
            }`
          }}</template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('supplier')" align="center" width="130">
        <template slot-scope="props">
          {{ props.row.shop ? props.row.shop.name : "" }}
          <el-tooltip
            class="item"
            effect="dark"
            :content="props.row.shop ? props.row.shop.address : ''"
            placement="top"
          >
            <svg-icon icon-class="address" /> </el-tooltip><br>
          <div
            v-if="props.row.isShow"
            style="font-size:11px; color:#006885; font-style: italic; line-height: 15px"
          >
            {{ showProps(props.row.shop) }}<br>
          </div>
          <el-button
            v-if="state === 0 || state === 1"
            class="change-address"
            @click="onChangeAddress(props.row)"
          >{{ $t("change_address") }}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('gross_product')" align="center" width="100">
        <template slot-scope="props">{{ props.row.orders.length }}</template>
      </el-table-column>
      <el-table-column :label="$t('total_money')" align="center">
        <template slot-scope="props">{{
          $t("price_vnd").format(formatNumber(props.row.total_price))
        }}</template>
      </el-table-column>
      <el-table-column :label="$t('payment')" align="center">
        <template slot-scope="props">
          <el-tag :type="props.row.paid === 1 ? 'success' : 'warning'">{{
            props.row.paid === 1 ? $t("paid") : $t("wait")
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('date_create')" align="center">
        <template slot-scope="props">{{
          convertDateTime(
            props.row.date_customer_confirm
              ? props.row.date_customer_confirm
              : props.row.updatedAt
          )
        }}</template>
      </el-table-column>
      <el-table-column :label="$t('calling')" align="center">
        <template slot-scope="props">
          <el-button
            :loading="props.row.loading"
            @click="onCalledClick(props.row)"
          >{{ $t("update_called") }}</el-button>
          <el-link type="primary" @click="onShowDialogHistoryCall(props.row)">{{
            props.row.called ? $t("called") : $t("no_call")
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('note')" align="center">
        <template slot-scope="props">
          <template v-if="props.row.state === 5">{{
            props.row.customer_reject_content
              ? props.row.customer_reject_content
              : ""
          }}</template>
          <template v-if="props.row.state === 4">{{
            props.row.reject_content ? props.row.reject_content : ""
          }}</template>
          <template v-if="props.row.state <= 3 || props.row.state > 5">{{
            props.row.shop_noted ? props.row.shop_noted : ""
          }}</template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('action')" width="140" align="center">
        <!-- <template slot-scope="props">
          <el-button size="small" :title="(props.row.paid === 0) ? $t('payment') : $t('cancel_pay')" :type="(props.row.paid === 0) ? 'success' : 'danger'" circle @click="onSubmitPayment(props.row)">
            <svg-icon :icon-class="(props.row.paid === 0) ? 'payment' : 'payment-cancel'" />
          </el-button>
          <el-button size="small" :title="$t('order_comfirm')" type="primary" icon="el-icon-check" circle @click="onClickConfirm(props.row)" />
          <el-button size="small" :title="$t('cancel_order')" type="danger" icon="el-icon-close" circle @click="showDialogCancelOrder(props.row)" />
        </template> -->
        <template slot-scope="props">
          <template v-if="props.row.sale_man === account_id">
            <template v-if="props.row.state < 4">
              <el-button
                v-if="is_edit"
                size="small"
                :title="props.row.paid === 0 ? $t('payment') : $t('cancel_pay')"
                :type="props.row.paid === 0 ? 'success' : 'danger'"
                circle
                @click="onSubmitPayment(props.row)"
              >
                <svg-icon
                  :icon-class="
                    props.row.paid === 0 ? 'payment' : 'payment-cancel'
                  "
                />
              </el-button>
            </template>
            <template v-if="props.row.state < 3 || props.row.state > 5">
              <el-button
                v-if="is_edit"
                size="small"
                :title="$t('order_comfirm')"
                type="primary"
                icon="el-icon-check"
                circle
                @click="onClickConfirm(props.row)"
              />
              <el-button
                v-if="is_edit"
                size="small"
                :title="$t('cancel_order')"
                type="danger"
                icon="el-icon-close"
                circle
                @click="showDialogCancelOrder(props.row)"
              />
            </template>
            <template v-if="props.row.state === 3">
              <el-button
                v-if="is_edit"
                size="small"
                :title="$t('return_order')"
                circle
                @click="onClickReturn(props.row)"
              >
                <svg-icon icon-class="return-svg-or" />
              </el-button>
            </template>
          </template>
          <template v-if="props.row.sale_man !== account_id">
            <template>{{
              props.row.sale ? $t("process").format(props.row.sale.name) : ""
            }}</template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <dialog-cancel-order
      :show-dialog="onShowDialogCancelOrder"
      :object-data="objectJobDaily"
      :content-note="listContent"
      @onClickButtonDialog="handleClickDialogButton"
    />
    <dialog-delivery-detail
      :dialog-visible="showDialogOrderDetail"
      :delivery-id="orderID"
      :show-job="showJobDaily"
      @onClickButtonDialogDetail="handleClickButtonDialogDetail"
    />
    <dialog-history-call
      :dialog-visible="showDialogHistory"
      :delivery-id="orderID"
      @onClickButtonDialogDetail="handleClickButtonDialogHistory"
    />
    <dialog-note-call
      :show-dialog="onShowDialog"
      :noted-shop="note"
      :id-delivery="orderID"
      @onClickButtonDialog="handleClickButtonDialog"
    />
    <change-address
      :show-dialog="onShowDialogAddress"
      :object-data="objectJobDaily"
      :delivery-id="deliveryId"
      :shop-id="shopId"
      @onClickButtonDialogAddress="handleClickButtonDialogAddress"
    />
  </el-row>
</template>
<script>
import { formatNumber, convertDateTime } from '@/utils/convert'
import DialogCancelOrder from '@/views/delivery/components/DialogCancelOrder'
import DialogDeliveryDetail from '@/views/delivery/components/DialogDeliveryDetail'
import DialogHistoryCall from '@/views/delivery/components/DialogHistoryCall'
import DialogNoteCall from '@/views/delivery/components/DialogNoteCall'
import i18n from '@/lang/i18n'
import { getAcountInfo, parseJson } from '@/utils/auth'
// import { mapGetters } from 'vuex'
import DeliveryResource from '@/api/delivery'
import ChangeAddress from './changeAddress.vue'
const deliveryResource = new DeliveryResource()

export default {
  name: 'TableWork',
  components: {
    DialogCancelOrder,
    DialogDeliveryDetail,
    DialogHistoryCall,
    DialogNoteCall,
    ChangeAddress
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    // eslint-disable-next-line vue/prop-name-casing
    Telesales: {
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
    }
  },
  data() {
    const account = getAcountInfo()
    return {
      onShowDialogCancelOrder: false,
      showDialogOrderDetail: false,
      showDialogHistory: false,
      onShowDialog: false,
      listContent: [],
      telesale_id: null,
      objectJobDaily: {},
      orderID: 0,
      account_id: account.id,
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      row: null,
      note: '',
      // objectJobDaily: {},
      onShowDialogAddress: false,
      showJobDaily: false,
      shopId: 0,
      deliveryId: 0
      // isShow: false
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'accountID'
  //   ])
  // },
  created() {
    this.onGetNoteContents()
  },
  methods: {
    onChangeAddress(row) {
      console.log()
      this.onShowDialogAddress = true
      this.objectJobDaily = Object.assign({}, row)
      this.shopId = row.shop_id
      this.deliveryId = row.id
      console.log(this.shopId)
    },
    handleClickButtonDialogAddress(object) {
      const { dialog, data_reload } = object
      this.onShowDialogAddress = dialog
      // const data_reload = object.data_reload;
      const item = this.tableData.find(d => d.id === this.deliveryId)
      console.log('....................doi dia chi : ', data_reload)
      if (item) {
        const { address, township, district, city } = data_reload
        item.shop.address = `${address}, ${township}, ${district}, ${city}`
        item.isShow = true
        if (item.shop.address) {
          item.isShow = true
        } else if (!item.shop.address) {
          item.isShow = false
        }
        console.log('----------show', item.isShow)
      }
    },
    onClickReturn(row) {
      this.$confirm(i18n.t('confirm_return_order').format(row.name))
        .then(_ => {
          deliveryResource.returnDelivery(row.id).then(response => {
            if (response.error === 0) {
              this.$message.success(i18n.t('return_order_success'))
              this.$emit('onClickButtonReload')
            } else {
              this.$message.error(response.msg)
            }
          })
        })
        .catch(_ => {})
    },
    formatNumber,
    convertDateTime,
    onSubmitPayment(row) {
      let data = { account_id: this.accountID, delivery_id: row.id }
      let message = ''
      console.log('........... check thong tin don hang : ', row)
      if (row.paid === 0) {
        data = Object.assign(data, { paid: 1 })
        message = i18n.t('comfirm_payment_delivery').format(row.name_delivery)
      } else {
        data = Object.assign(data, { paid: 0 })
        message = i18n
          .t('comfirm_cancel_payment_delivery')
          .format(row.name_delivery)
      }
      this.$confirm(message)
        .then(_ => {
          deliveryResource.updateConfirmPaid(data).then(response => {
            if (response.error === 0) {
              this.$message.success(response.msg)
              this.$emit('onClickButtonReload')
            } else {
              this.$message.error(response.msg)
            }
          })
        })
        .catch(_ => {})
    },
    onClickConfirm(row) {
      const state = row.state
      let message = ''
      switch (state) {
        case 1:
          message = i18n.t('comfirm_delivery').format(row.name_delivery)
          break
        case 6:
          message = i18n.t('comfirm_delivered').format(row.name_delivery)
          break
        default:
          message = i18n.t('comfirm_sure_delivery').format(row.name_delivery)
          break
      }
      let _state = this.state
      if (state === 6) {
        _state = 3
      } else if (state === 2) {
        _state = 6
      } else {
        _state = _state + 1
      }
      console.log('.......check state: ', state, _state)
      this.$confirm(message)
        .then(_ => {
          const data = { id: row.id, state: _state, code: 10 }
          deliveryResource.updateDelivery(data).then(response => {
            if (response.error === 0) {
              this.$message.success(i18n.t('comfirm_delivery_success'))
              this.$emit('onClickButtonReload')
            } else {
              this.$message.success(response.msg)
            }
          })
        })
        .catch(_ => {})
    },
    onGetNoteContents() {
      const array = localStorage.getItem('contents')
      if (array) {
        this.listContent = [...parseJson(array)]
      }
    },
    handleClickDialogButton(object) {
      this.onShowDialogCancelOrder = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    showDialogCancelOrder(row) {
      this.objectJobDaily = Object.assign({}, row)
      this.onShowDialogCancelOrder = true
    },
    onShowDialogOrderDetail(row) {
      this.orderID = row.id
      this.showJobDaily = true
      this.showDialogOrderDetail = true
    },
    onShowDialogHistoryCall(row) {
      this.orderID = row.id
      this.showDialogHistory = true
    },
    handleClickButtonDialogDetail(object) {
      this.showDialogOrderDetail = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    handleClickButtonDialogHistory(object) {
      this.showDialogHistory = object.dialog
      // if (object.reload) {
      //   this.$emit('onClickButtonReload')
      // }
    },
    showProps(value) {
      if (value?.address) { return !value.address.includes('undefined') ? `(${value.address})` : '' }
      return ''
    },
    onCalledClick(row) {
      console.log('......... .row update ', JSON.stringify(row))
      this.onShowDialog = true
      this.row = row
      this.orderID = row.id
      // this.$msgbox(i18n.t('called_confirm')).then(() => {
      //   row.loading = true
      //   deliveryResource.updateCalled(row.id, this.account_id).then(response => {
      //     setTimeout(() => {
      //       row.loading = false
      //       const { error, msg } = response
      //       if (error === 0) {
      //         this.$message.success(msg)
      //         row.called = 1
      //       } else {
      //         this.$message.success(msg)
      //       }
      //     }, 2000)
      //   })
      // }).catch(_ => {
      //   row.loading = false
      // })
    },
    handleClickButtonDialog(object) {
      const { noted, reload, dialog } = object
      this.onShowDialog = dialog
      if (!reload) return
      const body = {
        delivery_id: this.row.id,
        account_id: this.account_id,
        noted: noted
      }
      this.row.loading = true
      deliveryResource
        .updateCalled(body)
        .then(response => {
          setTimeout(() => {
            this.row.loading = false
            const { error, msg } = response
            if (error === 0) {
              this.$message.success(msg)
              this.row.called = 1
            } else {
              this.$message.success(msg)
            }
          }, 2000)
        })
        .catch(_ => {
          this.row.loading = false
        })
    }
  }
}
</script>

<style scoped>
/* .el-button--small.return {
    font-size: 30px;
    padding: 0;
  } */
.change-address {
  padding: 5px 20px;
  background-color: #e8f4ff;
  border-color: #d1e9ff;
  color: #1890ff;
}
.el-table .cell {
  line-height: 15px;
}
</style>
