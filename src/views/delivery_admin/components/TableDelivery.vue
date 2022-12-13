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
          width="100"
        >
          <!-- <template slot="header">
            <label>{{ $t("id") }}</label>
            <el-input
              v-model="codeId"
              size="mini"
              :placeholder="$t('input_id')"
            />
          </template> -->
          <template slot-scope="props">
            <el-link
              type="primary"
              @click="onShowDialogOrderDetail(props.row)"
            >{{ `#${props.row.name_delivery}` }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('user')" align="center">
          <!-- <template slot="header">
            <label>{{ $t("user") }}</label>
            <el-input
              v-model="golferId"
              size="mini"
              :placeholder="$t('input_vga')"
            />
          </template> -->
          <template slot-scope="props">
            <template
              v-if="props.row.golfer"
            ><el-link @click="onUserDelivery(props.row.golfer)">{{
              `${props.row.golfer.name} ${
                props.row.golfer.id ? `- VGA${props.row.golfer.id}` : ""
              }`
            }}</el-link></template>
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
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('gross_product')"
          align="center"
          width="90"
        >
          <template slot-scope="props">{{ props.row.orders.length }}</template>
        </el-table-column>
        <el-table-column :label="$t('total_money')" align="center">
          <template slot-scope="props">{{
            $t("price_vnd").format(formatNumber(props.row.total_price))
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('payment')" align="center" width="120">
          <template slot-scope="props">
            <el-tag :type="props.row.paid === 1 ? 'success' : 'warning'">{{
              props.row.paid === 1 ? $t("paid") : $t("wait")
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="state === 7" :label="$t('active')" align="center" width="120">
          <template slot-scope="props">
            <template>
              <el-tag
                :type="setStateToStringDelivery(props.row.state).typeName"
              >{{ setStateToStringDelivery(props.row.state).textName }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column :label="$t('date_create')" align="center">
          <!-- <template slot="header">
            <label>{{ $t("date_create") }}</label>
            <el-date-picker
              v-model="createDate"
              type="date"
              :placeholder="$t('input_date')"
            />
          </template> -->
          <template slot-scope="props">{{
            convertDateTime(
              props.row.date_customer_confirm
                ? props.row.date_customer_confirm
                : props.row.updatedAt
            )
          }}</template>
        </el-table-column>
        <el-table-column v-if="state === 3 || state === 5 || state === 7" :label="$t('finish_day')" align="center">
          <!-- <template slot="header">
            <label>{{ $t("finish_day") }}</label>
            <el-date-picker
              v-model="finishDate"
              type="date"
              :placeholder="$t('input_date')"
            />
          </template> -->
          <template slot-scope="props">{{
            props.row.date_complete
              ? convertDateTime(props.row.date_complete)
              : ""
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('calling')" align="center" width="90">
          <template slot-scope="props">
            <el-link
              type="primary"
              @click="onShowDialogHistoryCall(props.row)"
            >{{ props.row.called ? $t("called") : $t("no_call") }}</el-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('note')" align="center">
          <template slot-scope="props">
            <template v-if="props.row.state === 5">{{
              props.row.customer_reject_content
            }}</template>
            <template v-if="props.row.state === 4">{{
              props.row.reject_content
            }}</template>
            <template v-if="props.row.state <= 3 || props.row.state > 5">{{
              props.row.shop_noted
            }}</template>
          </template>
        </el-table-column>
        <el-table-column :label="$t('thuc_hien')" width="140" align="center">
          <!-- <template slot="header">
            <label>{{ $t("thuc_hien") }}</label>
            <el-input
              v-model="saleMan"
              size="mini"
              :placeholder="$t('input_employee')"
            />
          </template> -->
          <!-- <template slot-scope="props">
            <template>{{ props.row.sale ? props.row.sale.name : '' }}</template>
          </template> -->
          <template slot-scope="props">
            <el-select
              v-model="props.row.sale_man"
              :placeholder="$t('telesale')"
              @change="value => changeTelesale(value, props.row.id)"
            >
              <el-option
                v-for="sale in Telesales"
                :key="sale.id"
                :label="sale.name"
                :value="sale.id"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-if="isShowUser">
      <user-v-g-a ref="refTableUser" :table-data-user="tableData" />
    </el-row>
    <dialog-cancel-order
      :show-dialog="onShowDialogCancelOrder"
      :object-data="objectDelivery"
      :content-note="listContent"
      @onClickButtonDialog="handleClickDialogButton"
    />
    <dialog-delivery-detail
      :dialog-visible="showDialogOrderDetail"
      :delivery-id="orderID"
      @onClickButtonDialogDetail="handleClickButtonDialogDetail"
    />
    <dialog-history-call
      :dialog-visible="showDialogHistory"
      :delivery-id="orderID"
      @onClickButtonDialogDetail="handleClickButtonDialogHistory"
    />
  </el-row>
</template>
<script>
import DeliveryResource from '@/api/delivery'
import { formatNumber, convertDateTime } from '@/utils/convert'
import { mapGetters } from 'vuex'
import DialogCancelOrder from '@/views/delivery/components/DialogCancelOrder'
import DialogDeliveryDetail from '@/views/delivery/components/DialogDeliveryDetail'
import { getAcountInfo } from '@/utils/auth'
import UserVGA from '@/views/delivery_admin/components/UserVGA'
import i18n from '@/lang/i18n'
import DialogHistoryCall from '@/views/delivery/components/DialogHistoryCall'
import { setStateToStringDelivery } from '@/utils/delivery/convertDelivery'
const deliveryResource = new DeliveryResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'TableDelivery',
  components: {
    DialogDeliveryDetail,
    DialogCancelOrder,
    UserVGA,
    DialogHistoryCall
  },
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
    },
    // eslint-disable-next-line vue/prop-name-casing
    Telesales: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    const account = getAcountInfo()
    console.log('....................account ', JSON.stringify(account))
    return {
      id: 0,
      isShowUser: this.isShowStatistical,
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      onShowDialogCancelOrder: false,
      showDialogHistory: false,
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
      listQuery: Object.assign({}, defaultQuery)
    }
  },
  computed: {
    ...mapGetters(['accountID'])
  },
  created() {
    this.onGetNoteContents()
  },
  methods: {
    /**
     * show dialog history
     */
    onShowDialogHistoryCall(row) {
      this.orderID = row.id
      this.showDialogHistory = true
    },
    /**
     * xu ly khi an dialog history
     */
    handleClickButtonDialogHistory(object) {
      this.showDialogHistory = object.dialog
    },
    changeTelesale(value, id) {
      console.log('..........thay doi telesale : ', value, id)
      const account = this.Telesales.find(d => d.id === value)
      const delivery = this.tableData.find(d => d.id === id)
      const msg = i18n
        .t('set_telesale_confirm')
        .format('DL' + delivery.id, account.name)
      this.$confirm(msg).then(_ => {
        this.requestUpdateSaleOrder(account.id, delivery.id)
      })
    },
    requestUpdateSaleOrder(telesale_id, delivery_id) {
      const body = {
        sale_id: telesale_id,
        delivery_id: delivery_id
      }
      this.loadingTable = true
      deliveryResource
        .updateTelesale(body)
        .then(respone => {
          const { error, msg } = respone
          // eslint-disable-next-line no-empty
          setTimeout(() => {
            this.loadingTable = false
            if (error === 0) {
              this.$msgbox(msg)
            } else {
              this.$msgbox(msg).then(_ => {
                const row = this.tableData.find(d => d.id === delivery_id)
                if (row) {
                  row.telesale_id = null
                }
              })
            }
          }, 1000)
        })
        .catch(_ => {
          this.loadingTable = false
        })
    },
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
        case 2:
          message = i18n.t('comfirm_delivered').format(row.name_delivery)
          break
        default:
          message = i18n.t('comfirm_sure_delivery').format(row.name_delivery)
          break
      }
      this.$confirm(message)
        .then(_ => {
          const data = { id: row.id, state: this.state + 1, code: 10 }
          deliveryResource.updateDelivery(data).then(response => {
            if (response.error === 0) {
              this.$message.success(i18n.t('comfirm_delivery_success'))
              this.$emit('onClickButtonReload')
            } else {
              this.$message.success(i18n.t('error_confirm'))
            }
          })
        })
        .catch(_ => {})
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
        this.listContent = [...JSON.parse(array)]
      }
    },
    formatNumber,
    convertDateTime,
    setStateToStringDelivery,
    updateShowUser(is_show_user) {
      this.isShowUser = is_show_user
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input {
  width: 130px;
}
</style>
