<template>
  <el-dialog
    :title="$t('order_detail')"
    :visible.sync="dialogVisible"
    :before-close="handleCloseDialog"
    width="99%"
  >
    <el-row v-loading="loadingData" class="order-detail-header">
      <el-row class="align-items-start">
        <el-col :sm="24">
          <div class="order-detail--list-status">
            <div class="ui-toolbar-product-info">
              <div class="ui-product-body pl-0">{{ $t("id") }}</div>
              <div class="ui-product-head">
                <div class="table-break-word">
                  <strong
                    class="order-detail--list-status-code"
                  >#{{ orderDetail.name_delivery }}</strong>
                </div>
              </div>
            </div>
            <div class="ui-toolbar-product-info">
              <div class="ui-product-body">{{ $t("status_delivery") }}</div>
              <div class="ui-product-head">
                <div class="table-break-word">
                  <span class="order-detail--list-status-name">
                    <div class="status-component">
                      <span
                        class="circle-status mr-2 circle-status-shipment_notyet"
                      />
                      <span class="badges--carrier-status-7">
                        <el-tag
                          :type="setStateToString(orderDetail.state).typeName"
                        >{{
                          setStateToString(orderDetail.state).textName
                        }}</el-tag></span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div class="ui-toolbar-product-info">
              <div class="ui-product-body">{{ $t("status_pay") }}</div>
              <div class="ui-product-head">
                <div class="table-break-word">
                  <span class="order-detail--list-status-name">
                    <div class="status-component">
                      <span class="circle-status mr-2 circle-status-2" />
                      <span class="badges--order-payment-status-2">
                        <el-tag
                          :type="orderDetail.paid === 1 ? 'success' : 'warning'"
                        >{{
                          orderDetail.paid === 1
                            ? "Đã thanh toán"
                            : "Chờ xử lý"
                        }}</el-tag></span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div v-if="isShowBtnFinishDelivery" class="ui-toolbar-product-info">
              <div class="ui-product-body">{{ $t("status_order") }}</div>
              <div class="ui-product-head">
                <div class="table-break-word">
                  <span class="order-detail--list-status-name">
                    <div class="status-component">
                      <span class="circle-status mr-2 circle-status-2" />
                      <span class="badges--order-payment-status-2">
                        <!--                        <template slot-scope="scope">-->
                        <el-button
                          :loading="loadingSubmit"
                          type="primary"
                          @click="finishDelivery(id)"
                        >{{ $t("confirmation_complete") }}</el-button>
                        <!--                        </template>-->
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="clearfix-10" />
      <el-row>
        <el-col :sm="18" class="pr-lg-20">
          <el-card
            class="box-card"
            shadow="hover"
            :body-style="{ padding: '0px' }"
          >
            <div slot="header" class="clearfix">
              <strong>{{ $t("product_list") }}</strong>
            </div>
            <el-row class="table-product">
              <el-table :data="orders" stripe style="width: 100%">
                <el-table-column :label="$t('id')" width="70" align="center">
                  <template slot-scope="props">{{
                    `#${props.row.product_id? props.row.product_id: props.row.product_delivery_id}`
                  }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('product_code')"
                  prop="product.product_code_shop"
                  align="center"
                />
                <el-table-column :label="$t('logo')" align="center">
                  <template
                    slot-scope="props"
                  ><img
                    v-if="props.row.product"
                    width="120"
                    :src="props.row.product.thumb"
                  ></template>
                </el-table-column>
                <el-table-column :label="$t('name')" align="center">
                  <template slot-scope="scope">{{
                    scope.row.name ? scope.row.name : scope.row.product.name
                  }}</template>
                </el-table-column>
                <el-table-column :label="$t('count')" align="center">
                  <template slot-scope="props">{{
                    `${props.row.number}`
                  }}</template>
                </el-table-column>
                <el-table-column :label="$t('attribute1')" align="center">
                  <template slot-scope="props">
                    <template
                      v-if="
                        props.row.product && props.row.product.name_param_first
                      "
                    >
                      <span>{{ props.row.product.name_param_first }}: </span><strong>{{ props.row.size }}</strong>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('attribute2')" align="center">
                  <template slot-scope="props">
                    <template
                      v-if="
                        props.row.product && props.row.product.name_param_second
                      "
                    >
                      <span>{{ props.row.product.name_param_second }}: </span><strong>{{ props.row.color }}</strong>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('original_price')" align="center">
                  <template slot-scope="props">
                    {{ $t("price_vnd").format(formatNumber(props.row.price)) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('price_buy')" align="center">
                  <template slot-scope="props">
                    {{
                      $t("price_vnd").format(
                        formatNumber(props.row.product.price_sale)
                      )
                    }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('shop')" align="center">
                  <template slot-scope="props">
                    {{ props.row.product.shop ? props.row.product.shop.name : "" }}
                    <el-tooltip
                      :content="props.row.product.shop? props.row.product.shop.address: ''"
                      effect="light"
                    >
                      <svg-icon icon-class="address" />
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-card>
        </el-col>
        <el-col :sm="6">
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t("inf_order") }}</strong>
            </div>
            <el-row>
              <el-col class="mb-10">
                <label>{{ $t('bill_code') }}: </label>{{ order_number }}
                <el-button v-if="isShowBtnFinishDelivery" class="update-deli" icon="el-icon-edit" @click="onEditBillCode(id)" />
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("gross_product") }}: </label>
                <template v-if="'orders' in orderDetail">{{
                  orderDetail.orders.length
                }}</template>
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("salary_ship") }}: </label>
                {{
                  $t("price_vnd").format(formatNumber(orderDetail.cod_price))
                }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("total_money") }}: </label>
                {{
                  $t("price_vnd").format(formatNumber(orderDetail.total_price))
                }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("total_money_order") }}: </label>
                {{
                  $t("price_vnd").format(
                    formatNumber(
                      orderDetail.total_price + orderDetail.cod_price
                    )
                  )
                }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("order_date") }}: </label>
                {{
                  moment(orderDetail.date_customer_confirm).format(
                    "HH:mm DD/MM/YYYY"
                  )
                }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("time_giao_du_kien") }}: </label>
                {{
                  moment(orderDetail.date_confirm).format("HH:mm DD/MM/YYYY")
                }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("payment_type") }}: </label>
                <template v-if="orderDetail.method_payment">{{
                  orderDetail.method_payment.name
                }}</template>
              </el-col>
              <el-col>
                <label>{{ $t("content") }}: </label>
                {{ orderDetail.payment_des }}
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t("transport_title") }}</strong>
            </div>
            <el-row>
              <el-col class="mb-10">
                <label>{{ $t('name_transport') }}: </label>
                <template v-if="'cod' in orderDetail">{{
                  orderDetail.cod.name
                }}</template>
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("ship_type") }}: </label>
                <template v-if="'cod' in orderDetail">{{
                  orderDetail.cod.desc
                }}</template>
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("salary_ship") }}: </label>
                {{
                  $t("price_vnd").format(formatNumber(orderDetail.cod_price? orderDetail.cod_price: 0))
                }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t("active") }}: </label>{{ orderDetail.viettel_post_bill? orderDetail.viettel_post_bill.order_status: 'N/A' }}
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t("info_buyer") }}</strong>
              <el-button v-if="isShowBtnFinishDelivery" class="update-deli" icon="el-icon-edit" @click="onEditInfoBuyer()" />
            </div>
            <el-row>
              <el-col class="mb-10">
                <el-avatar
                  v-if="'golfer' in orderDetail"
                  :size="60"
                  :src="orderDetail.golfer.avatar"
                >
                  <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  >
                </el-avatar>
              </el-col>
              <template v-if="'golfer' in orderDetail">
                <el-col class="mb-10">
                  <label>{{ $t("name") }}: </label>
                  {{ orderDetail.golfer.name }}
                </el-col>
                <el-col class="mb-10">
                  <label>{{ $t("id") }} VGA: </label>
                  {{ `VGA${orderDetail.golfer.id}` }}
                </el-col>
                <el-col class="mb-10">
                  <label>{{ $t("height") }}: </label>
                  {{ `${orderDetail.golfer_info? orderDetail.golfer_info.height: ''} (cm)` }}
                </el-col>
                <el-col class="mb-10">
                  <label>{{ $t("weight_customer") }}: </label>
                  {{ `${orderDetail.golfer_info? orderDetail.golfer_info.weight: ''} (g)` }}
                </el-col>
                <el-col class="mb-10">
                  <label>{{ $t("hobbies") }}: </label>
                  {{ orderDetail.golfer_info? orderDetail.golfer_info.interests: '' }}
                </el-col>
                <el-col class="mb-10">
                  <label>{{ $t("note") }}: </label>
                  {{ orderDetail.golfer_info? orderDetail.golfer_info.noted: '' }}
                </el-col>
              </template>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t("info_delivery") }}</strong>
              <el-button
                v-if="showJob"
                class="update-deli"
                icon="el-icon-edit"
                @click="onShowDialogEditAddress(id)"
              />
            </div>
            <el-row>
              <template
                v-if="'golf_address' in orderDetail && orderDetail.golf_address"
              >
                <el-col class="mb-10">
                  <label>{{ $t("name") }}: </label>
                  {{ orderDetail.golf_address? orderDetail.golf_address.name: '' }}
                </el-col>
                <el-col class="mb-10">
                  <label>{{ $t("phone") }}: </label>
                  {{ orderDetail.golf_address? orderDetail.golf_address.phone: '' }}
                </el-col>
                <el-col>
                  <label>{{ $t("address") }}: </label>
                  <p>
                    {{ orderDetail.golf_address? orderDetail.golf_address.address: '' }},
                    {{ orderDetail.golf_address? orderDetail.golf_address.township: '' }},
                    {{ orderDetail.golf_address? orderDetail.golf_address.district: '' }},
                    {{ orderDetail.golf_address? orderDetail.golf_address.city: '' }}
                  </p>
                </el-col>
              </template>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t("note_shop") }}</strong>
              <el-button
                class="update-deli"
                icon="el-icon-edit"
                @click="onShowDialogEdit(id)"
              />
            </div>
            <el-row>
              <el-col class="mb-10">{{ orderDetail.shop_noted }}</el-col>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10 table" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t("history-call") }}</strong>
            </div>
            <el-row>
              <el-table :data="shop_notes" border>
                <el-table-column
                  prop="account_name"
                  :label="$t('caller')"
                  align="center"
                />
                <el-table-column
                  prop="created_at"
                  :label="$t('date_call')"
                  align="center"
                />
                <el-table-column
                  prop="noted"
                  :label="$t('note')"
                  align="center"
                />
              </el-table>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t("note_customer") }}</strong>
            </div>
            <el-row>
              <el-col class="mb-10">{{ orderDetail.note }}</el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <!-- <DialogNote :show-dialog="onShowDialog" :noted-shop="note" :id-delivery="idDelivery" @onClickButtonDialog="handleClickButtonDialog" /> -->
      <dialog-bill-code :show-dialog="onShowDialogBill" :trans-code="trans_code" :bill-code="bill_code" :order-number="order_number" :id-delivery="idDelivery" @onClickBillCode="handleDialogBillCode" />
      <dialog-edit-info-buyer :show-dialog="onShowDialogEditInfo" :object-data="objectInfo" :name-buy="name" :vga-buy="vga" :id-delivery="idDelivery" @onClickButtonDialog="handleDialogEditBuyer" />
      <list-address :show-dialog="onShowDialogAddress" :id-delivery="idDelivery" @onClickButtonDialogAddress="handleClickButtonDialogAddress" />
      <DialogNote
        :show-dialog="onShowDialog"
        :noted-shop="note"
        :id-delivery="idDelivery"
        @onClickButtonDialog="handleClickButtonDialog"
      />
    </el-row>
  </el-dialog>
</template>
<script>
import DeliveryResource from '@/api/delivery'
const deliveryResource = new DeliveryResource()
import { formatNumber } from '@/utils/convert'
import { setStateToString } from '@/utils/product/convertProduct'
import { getAcountInfo } from '@/utils/auth'
import DialogNote from '@/views/delivery/components/DialogNote'
import moment from 'moment'
import DialogBillCode from '@/views/delivery/components/DialogBillCode'
import DialogEditInfoBuyer from '@/views/delivery/components/DialogEditInfoBuyer'
import ListAddress from '@/views/job_daily/components/listAddress'

export default {
  name: 'DialogDeliveryDetail',
  components: { ListAddress, DialogBillCode, DialogNote, DialogEditInfoBuyer },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    showJob: {
      type: Boolean,
      default: false
    },
    deliveryId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    const account = getAcountInfo()
    return {
      loadingSubmit: false,
      isShowBtnFinishDelivery: !!(
        account.prefix_domain === 'admin' ||
        account.prefix_domain === 'super_admin'
      ),
      prefix_domain: account.prefix_domain,
      titleName: '',
      orderDetail: {},
      loadingData: false,
      orders: [],
      order_number: '',
      onShowDialog: false,
      onShowDialogBill: false,
      onShowDialogEditInfo: false,
      onShowDialogAddress: false,
      objectDetail: {},
      idDelivery: 0,
      shop_notes: [],
      note: '',
      bill_code: '',
      trans_code: '',
      name: '',
      vga: 0,
      objectInfo: {},
      isAdd: false

    }
  },
  watch: {
    deliveryId(id) {
      if (id > 0) {
        this.onGetOrderDetail(id)
      }
    }
  },
  methods: {
    onShowDialogEdit(id) {
      this.onShowDialog = true
      this.idDelivery = id
      this.note = this.orderDetail.shop_noted
      console.log(this.note)
    },
    onShowDialogEditAddress(id) {
      this.onShowDialogAddress = true
      this.idDelivery = id
      console.log(id)
    },
    handleClickButtonDialogAddress(object) {
      const { dialog, data_reload } = object
      this.onShowDialogAddress = dialog
      // const data_reload = object.data_reload;
      // const item = this.idDelivery
      console.log('....................doi dia chi : ', data_reload)
      if (data_reload) {
        const { address, township, district, city, name, phone } = data_reload
        this.orderDetail.golf_address.address = address
        this.orderDetail.golf_address.township = township
        this.orderDetail.golf_address.district = district
        this.orderDetail.golf_address.city = city
        this.orderDetail.golf_address.name = name
        this.orderDetail.golf_address.phone = phone
      }
    },
    onInfoBuyer() {
      if (this.orderDetail.golfer_info.id) {
        this.onEditInfoBuyer()
      } else {
        this.onCreateInfoBuyer()
      }
    },
    onCreateInfoBuyer() {
      this.onShowDialogEditInfo = true
      this.isAdd = true
      this.idDelivery = this.orderDetail.id
      this.name = this.orderDetail.golfer.name
      this.vga = this.orderDetail.golfer.id
    },
    onEditInfoBuyer() {
      this.onShowDialogEditInfo = true
      this.isAdd = false
      this.idDelivery = this.orderDetail.id
      this.name = this.orderDetail.golfer.name
      this.vga = this.orderDetail.golfer.id
      this.objectInfo = this.orderDetail.golfer_info
    },
    onEditBillCode(id) {
      this.onShowDialogBill = true
      this.idDelivery = id
      this.bill_code = this.order_number
      this.trans_code = this.orderDetail.cod.code
      // this.trans_code = this.trans_code
      // this.order_number = this.orderDetail.order_number
    },
    handleDialogEditBuyer(object) {
      const { reload, reload_data, dialog } = object
      this.onShowDialogEditInfo = dialog
      this.idDelivery = 0
      if (reload) {
        this.orderDetail.golfer.id = reload_data.golfer_id
        this.orderDetail.golfer_info.height = reload_data.height
        this.orderDetail.golfer_info.interests = reload_data.interests
        this.orderDetail.golfer_info.weight = reload_data.weight
        this.orderDetail.golfer_info.noted = reload_data.noted
      }
    },
    handleDialogBillCode(object) {
      const { reload, reload_data, dialog } = object
      this.onShowDialogBill = dialog
      this.idDelivery = 0
      if (reload) {
        this.order_number = reload_data.bill_code
        // this.orderDetail.cod.name = reload_data.trans_code
        this.orderDetail.cod.name = reload_data.trans_code
      }
    },
    handleClickButtonDialog(object) {
      const { reload, noted, dialog } = object
      this.onShowDialog = dialog
      this.idDelivery = 0
      if (reload) {
        this.orderDetail.shop_noted = noted
      }
    },
    getBody() {
      const body = {}
      body.id = this.id
      return body
    },
    finishDelivery(id) {
      const body = this.getBody()
      this.$confirm('Bạn có chắc chắn muốn xác nhận hoàn thành?')
        .then((_) => {
          this.loadingSubmit = true
          deliveryResource.onFinishDelivery(body).then((response) => {
            this.loadingSubmit = false
            if (response.error === 0) {
              this.$message.success(response.msg)
              this.$emit('onClickButtonDialogDetail', {
                dialog: false,
                reload: true
              })
            } else {
              this.$message.error(response.msg)
            }
          })
        })
        .catch((_) => {})
    },
    onGetOrderDetail(id) {
      this.loadingData = true
      deliveryResource.onGetDeliveryDetail(id).then((response) => {
        this.loadingData = false
        if (response.error === 0) {
          const result = response.info
          this.orderDetail = Object.assign({}, result)
          this.id = this.orderDetail.id
          this.orders = [...result.orders]
          const { viettel_post_bill } = result
          this.order_number = viettel_post_bill
            ? viettel_post_bill.order_number
            : ''
          this.note = this.orderDetail.shop_noted
          this.shop_notes = result.shop_notes
          this.bill_code = result.order_number
          console.log(result.state)
          if (result.state > 3 && result.state < 6) {
            this.isShowBtnFinishDelivery = false
          } else {
            this.isShowBtnFinishDelivery = true
          }
        }
      })
    },
    handleCloseDialog() {
      this.$emit('onClickButtonDialogDetail', { dialog: false, reload: false })
    },
    formatNumber,
    setStateToString,
    moment
  }
}
</script>
<style lang="css">
.table .el-card__body {
  padding: 10px;
}
</style>
<style lang="scss" scoped>
.mb-10 {
  margin-top: 0;
  padding-right: 0;
}
.update-deli {
  border: none;
  float: right;
  padding: 0;
}
.order-detail-header {
  padding: 0;
  background-color: transparent;
  position: relative;
  .align-items-start {
    align-items: flex-start !important;
    .order-detail--list-status {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin: 0 -10px;
      .ui-toolbar-product-info {
        padding: 6px 10px;
        max-width: 275px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-right: 1px solid hsla(0, 0%, 87.8%, 0.37);
        .ui-product-body {
          color: #6c798f;
          font-size: 12px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .ui-product-head {
          color: #212121;
          font-size: 16px;
          line-height: 26px;
        }
      }
    }
  }
}
</style>
