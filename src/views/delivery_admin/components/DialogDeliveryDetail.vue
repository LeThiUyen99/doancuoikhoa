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
              <div class="ui-product-body pl-0">{{ $t('id') }}</div>
              <div class="ui-product-head"><div class="table-break-word"><strong class="order-detail--list-status-code">#{{ orderDetail.name_delivery }}</strong></div></div>
            </div>
            <div class="ui-toolbar-product-info">
              <div class="ui-product-body">{{ $t('status_delivery') }}</div>
              <div class="ui-product-head">
                <div class="table-break-word">
                  <span class="order-detail--list-status-name">
                    <div class="status-component">
                      <span class="circle-status mr-2 circle-status-shipment_notyet" />
                      <span class="badges--carrier-status-7"> <el-tag :type="setStateToString(orderDetail.state).typeName">{{ setStateToString(orderDetail.state).textName }}</el-tag></span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div class="ui-toolbar-product-info">
              <div class="ui-product-body">{{ $t('status_pay') }}</div>
              <div class="ui-product-head">
                <div class="table-break-word">
                  <span class="order-detail--list-status-name">
                    <div class="status-component">
                      <span class="circle-status mr-2 circle-status-2" />
                      <span class="badges--order-payment-status-2"> <el-tag :type="(orderDetail.paid === 1) ? 'success' : 'warning'">{{ (orderDetail.paid === 1) ? 'Đã thanh toán' : 'Chờ xử lý' }}</el-tag></span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div v-if="isShowBtnFinishDelivery" class="ui-toolbar-product-info">
              <div class="ui-product-body">{{ $t('status_order') }}</div>
              <div class="ui-product-head">
                <div class="table-break-word">
                  <span class="order-detail--list-status-name">
                    <div class="status-component">
                      <span class="circle-status mr-2 circle-status-2" />
                      <span class="badges--order-payment-status-2">
                        <!--                        <template slot-scope="scope">-->
                        <el-button :loading="loadingSubmit" type="primary" @click="finishDelivery(id)">{{ $t('confirmation_complete') }}</el-button>
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
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t('product_list') }}</strong>
            </div>
            <el-row class="table-product">
              <el-table
                :data="orders"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  :label="$t('id')"
                  width="70"
                  align="center"
                >
                  <template slot-scope="props">{{ `#${props.row.product_id}` }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('logo')"
                  align="center"
                >
                  <template slot-scope="props"><img v-if="props.row.product" width="120" :src="props.row.product.thumb"></template>
                </el-table-column>
                <el-table-column
                  prop="product.name"
                  :label="$t('name')"
                  align="center"
                />
                <el-table-column
                  :label="$t('count')"
                  width="80"
                  align="center"
                >
                  <template slot-scope="props">{{ `${props.row.number}` }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('attribute1')"
                  align="center"
                >
                  <template slot-scope="props">
                    <template v-if="props.row.product && props.row.product.name_param_first">
                      <span>{{ props.row.product.name_param_first }}: </span><strong>{{ props.row.size }}</strong>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('attribute2')"
                  align="center"
                >
                  <template slot-scope="props">
                    <template v-if="props.row.product && props.row.product.name_param_second">
                      <span>{{ props.row.product.name_param_second }}: </span><strong>{{ props.row.color }}</strong>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('price')"
                  align="center"
                >
                  <template slot-scope="props">{{ $t('price_vnd').format(formatNumber(props.row.product.price)) }}</template>
                </el-table-column>
                <el-table-column
                  :label="$t('price_sale')"
                  align="center"
                >
                  <template slot-scope="props">
                    {{ $t('price_vnd').format(formatNumber(props.row.product.price_sale)) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('shop')" align="center">
                  <template slot-scope="props">
                    {{ props.row.product.shop.name }}
                    <el-tooltip :content="props.row.product.shop.address" effect="light">
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
              <strong>{{ $t('inf_order') }}</strong>
            </div>
            <el-row>
              <el-col class="mb-10">
                <label>{{ $t('bill_code') }}: </label>{{ order_number }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t('gross_product') }}: </label> <template v-if="'orders' in orderDetail">{{ orderDetail.orders.length }}</template>
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t('salary_ship') }}: </label> {{ $t('price_vnd').format(formatNumber(orderDetail.cod_price)) }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t('total_money') }}: </label> {{ $t('price_vnd').format(formatNumber(orderDetail.total_price)) }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t('total_money_order') }}: </label> {{ $t('price_vnd').format(formatNumber(orderDetail.total_price+orderDetail.cod_price)) }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t('order_date') }}: </label> {{ moment(orderDetail.date_customer_confirm).format('HH:mm DD/MM/YYYY') }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t('time_giao_du_kien') }}: </label> {{ moment(orderDetail.date_confirm).format('HH:mm DD/MM/YYYY') }}
              </el-col>
              <el-col class="mb-10">
                <label>{{ $t('payment_type') }}: </label> <template v-if="orderDetail.method_payment">{{ orderDetail.method_payment.name }}</template>
              </el-col>
              <el-col>
                <label>{{ $t('content') }}: </label> {{ orderDetail.payment_des }}
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t('info_buyer') }}</strong>
            </div>
            <el-row>
              <el-col class="mb-10">
                <el-avatar v-if="'golfer' in orderDetail" :size="60" :src="orderDetail.golfer.avatar">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
                </el-avatar>
              </el-col>
              <template v-if="'golfer' in orderDetail">
                <el-col class="mb-10">
                  <label>{{ $t('name') }}: </label> {{ orderDetail.golfer.name }}
                </el-col>
                <el-col>
                  <label>{{ $t('id') }} VGA: </label> {{ `VGA${orderDetail.golfer.id}` }}
                </el-col>
              </template>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t('info_delivery') }}</strong>
            </div>
            <el-row>
              <template v-if="'golf_address' in orderDetail && orderDetail.golf_address">
                <el-col class="mb-10">
                  <label>{{ $t('name') }}: </label> {{ orderDetail.golf_address.name }}
                </el-col>
                <el-col class="mb-10">
                  <label>{{ $t('phone') }}: </label> {{ orderDetail.golf_address.phone }}
                </el-col>
                <el-col>
                  <label>{{ $t('Address') }}: </label>
                  <p>{{ orderDetail.golf_address.address }}, {{ orderDetail.golf_address.township }}, {{ orderDetail.golf_address.district }}, {{ orderDetail.golf_address.city }}</p>
                </el-col>
              </template>
            </el-row>
          </el-card>
          <el-card class="box-card mb-10" shadow="hover">
            <div slot="header" class="clearfix">
              <strong>{{ $t('note') }}</strong>
              <el-button class="update-deli" icon="el-icon-edit" @click="onShowDialogEdit(id)" />
            </div>
            <el-row>
              <el-col class="mb-10">{{ orderDetail.shop_noted }}</el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <DialogNote :show-dialog="onShowDialog" :noted-shop="note" :id-delivery="idDelivery" @onClickButtonDialog="handleClickButtonDialog" />
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

export default {
  name: 'DialogDeliveryDetail',
  components: { DialogNote },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    deliveryId: {
      type: Number,
      default() { return 0 }
    }
  },
  data() {
    const account = getAcountInfo()
    console.log('-------------------------------------bbb', getAcountInfo())
    return {
      loadingSubmit: false,
      isShowBtnFinishDelivery: !!((account.prefix_domain === 'admin' || account.prefix_domain === 'super_admin')),
      prefix_domain: account.prefix_domain,
      titleName: '',
      orderDetail: {},
      loadingData: false,
      orders: [],
      order_number: '',
      onShowDialog: false,
      objectDetail: {},
      idDelivery: 0,
      note: ''
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
      console.log('------------------id', id)
      this.onShowDialog = true
      this.idDelivery = id
      this.note = this.orderDetail.shop_noted
      console.log(this.note)
    },
    handleClickButtonDialog(object) {
      const { reload, noted, dialog } = object
      this.onShowDialog = dialog
      this.idDelivery = 0
      if (reload) { this.orderDetail.shop_noted = noted }
      // if (reload) {
      //   this.onGetOrderDetail()
      // }
    },
    getBody() {
      const body = {}
      body.id = this.id
      console.log('==============================', this.id)
      return body
    },
    finishDelivery(id) {
      const body = this.getBody()
      console.log('-------------------------------id', id)
      this.$confirm('Bạn có chắc chắn muốn xác nhận hoàn thành?').then(_ => {
        this.loadingSubmit = true
        deliveryResource.onFinishDelivery(body).then(response => {
          this.loadingSubmit = false
          console.log('-----------------------------------res', body)
          if (response.error === 0) {
            this.$message.success(response.msg)
            this.$emit('onClickButtonDialogDetail', { dialog: false, reload: true })
            // this.$router.go(this.$router.currentRoute)
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    onGetOrderDetail(id) {
      this.loadingData = true
      deliveryResource.onGetDeliveryDetail(id).then(response => {
        // console.log('...............chi tiet don hang', JSON.stringify(response))
        this.loadingData = false
        if (response.error === 0) {
          const result = response.info
          this.orderDetail = Object.assign({}, result)
          this.id = this.orderDetail.id
          console.log('-------------------------------detail', JSON.stringify(this.orderDetail))
          this.orders = [...result.orders]
          const { viettel_post_bill } = result
          this.order_number = viettel_post_bill ? viettel_post_bill.order_number : ''
          this.note = this.orderDetail.shop_noted
          console.log('.............note shop la : ', result.state, typeof result.state)
          if (result.state >= 3 && result.state < 6) {
            this.isShowBtnFinishDelivery = false
          }
          // console.log('....................order number : ', this.order_number)
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

<style lang="scss" scoped>
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
      align-items: flex-start!important;
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
          border-right: 1px solid hsla(0,0%,87.8%,.37);
          .ui-product-body {
            color: #6c798f;
            font-size: 12px;
            font-weight: 500;
            line-height: 21px;
            letter-spacing: .5px;
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
