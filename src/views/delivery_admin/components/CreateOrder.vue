<template>
  <el-row class="app-container create-order">
    <el-row class="create-order">
      <h1 class="h1">{{ $t('create_order') }}</h1>
      <span class="star">{{ `*${$t('note')}: ${$t('note_create')}` }}</span>
      <el-form
        v-loading="loadingTable"
      >
        <el-row>
          <div class="top-pro">
            <h3 style="float:left; margin-bottom: 0">{{ $t('info_add_product') }}</h3>
            <el-button style="margin-top: 10px" @click="addProduct">{{ $t('choose_product_same_shop') }}</el-button>
          </div>
          <el-form class="product-add">
            <el-form-item>
              <label><span class="star">*</span> {{ $t('choose_product') }}:</label>
              <div class="delivery">
                <el-input v-model="product_id" :placeholder="$t('input_product_id')" />
                <el-button :loading="loadingSubmit" class="button-delivery" @click="getProductSearch">{{ $t('search') }}</el-button>
              </div>
            </el-form-item>
            <el-row>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item>
                  <label><span class="star">*</span> {{ $t('enter_cate') }}:</label>
                  <div class="delivery">
                    <el-select v-model="param" :placeholder="$t('select_enter_cate')">
                      <el-option v-for="par in params" :key="par.id" :value="par.id" :label="par.name" />
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item>
                  <label><span class="star">*</span> {{ $t('quantily') }}:</label>
                  <div class="delivery">
                    <el-input v-model="count" :placeholder="$t('inpur_quantily')" />
                    <!-- <el-button class="button-delivery" :loading="loadingSubmit1" @click="getCheckProduct">{{ $t('extra') }}</el-button> -->
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            :data="listProduct"
            border
            style="margin-top: 20px"
          >
            <!-- <el-table-column prop="id" :label="$t('id')" width="90px" align="center" /> -->
            <el-table-column
              prop="date"
              :label="$t('id')"
              align="center"
              width="80px"
            >
              <template slot-scope="props">
                <el-link type="primary" @click="onShowDialogDetail(props.row)">{{ `#${props.row.id}` }}</el-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('logo')" align="center">
              <template slot-scope="scope">
                <el-image
                  v-if="scope.row.thumb"
                  :src="scope.row.thumb"
                  :fit="contain"
                />
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('product_name')" align="center" />
            <el-table-column prop="price" :label="$t('product_salary')" align="center">
              <template slot-scope="scope">{{ $t('price_vnd').format(formatNumber(scope.row.price)) }}</template>
            </el-table-column>
            <el-table-column :label="$t('price_sale')" align="center">
              <template slot-scope="scope">{{ $t('price_vnd').format(formatNumber(scope.row.price_sale)) }}</template>
            </el-table-column>
            <el-table-column prop="shop_id" :label="$t('shop')" align="center" width="90px" />
            <el-table-column prop="param.name" :label="$t('attribute_')" align="center" />
            <el-table-column prop="count" :label="$t('quantily')" align="center" width="90px" />
            <el-table-column :label="$t('action')" align="center" width="100px">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle @click="onDelete(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="display:flex; padding-top: 15px">
          <el-form-item style="width: 100%; padding-right: 5px">
            <label><span class="star">*</span> {{ $t('method_payment') }}:</label>
            <div class="delivery">
              <el-select v-model="method_payment_id" :placeholder="$t('select_method_payment')">
                <el-option v-for="payment in list_payment" :key="payment.id" :label="payment.name" :value="payment.id" />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item style="width: 100%;">
            <label> <span class="star">*</span> {{ $t('customer') }}:</label>
            <div class="delivery">
              <el-input v-model="golfer_id" :placeholder="$t('enter_vga')" />
              <el-button class="button-delivery" :loading="loadingSubmit2" @click="requestGolferInfo">{{ $t('extra') }}</el-button>
            </div>
          </el-form-item>
        </el-row>
        <el-form-item>
          <label><span class="star">*</span> {{ $t('delivery_address') }}:</label>
          <div class="delivery">
            <el-select v-model="golfer_address" :placeholder="$t('select_delivery_address')">
              <el-option v-for="add in list_address" :key="add.id" :label="add.full_address" :value="add.id" />
            </el-select>
            <el-button class="button-delivery" @click="addAddress">{{ $t('add_address') }}</el-button>
          </div>
        </el-form-item>
        <el-row style="display: flex">
          <el-form-item style="width: 100%; padding-right: 5px">
            <label><span class="star">*</span> {{ $t('time_order') }}</label>
            <el-select v-model="time_order_id" :placeholder="$t('time_order')">
              <el-option v-for="time in time_order" :key="time.id" :label="time.name" :value="time.id" />
            </el-select>
          </el-form-item>
          <el-form-item style="width: 100%;">
            <label><span class="star">*</span> {{ $t('transportation') }}:</label>
            <div class="delivery">
              <!--            <el-input :placeholder="$t('transportation')" />-->
              <el-select v-model="transfer_id" :placeholder="$t('select_transportation')">
                <el-option v-for="transfer in list_transfer" :key="transfer.MA_DV_CHINH" :label="transfer.name" :value="transfer.MA_DV_CHINH" />
              </el-select>
            <!-- <el-button @click="requestTransport">{{ $t('choosen') }}</el-button> -->
            </div>
          </el-form-item>
        </el-row>
        <el-form-item>
          <label>{{ $t('note') }}:</label>
          <div class="delivery">
            <el-input v-model="note" type="textarea" :rows="5" :placeholder="$t('note')" />
          </div>
        </el-form-item>
        <el-form-item>
          <label>{{ $t('delivery_info') }}:</label>
          <div class="product-inf">
            <div class="delivery">
              <label class="info-deli">{{ $t('delivery_date') }}: {{ date_transfer_bill }}</label>
            </div>
            <div class="delivery">
              <label class="info-deli">{{ $t('salary_ship') }}: {{ $t('price_vnd').format(formatNumber(cod_price)) }}</label>
            </div>
            <div class="delivery">
              <label class="info-deli">{{ $t('order_price') }}: {{ $t('price_vnd').format(formatNumber(bill_price)) }}</label>
            </div>
            <div class="delivery">
              <label class="info-deli">{{ $t('total_money') }}: {{ $t('price_vnd').format(formatNumber(total_bill)) }}</label>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div>
        <span style="float:right;">
          <el-button @click="onCancelClick">{{ $t('canel') }}</el-button>
          <el-button type="primary" @click="onCreateBillClick">{{ $t('create_order') }}</el-button>
        </span>
      </div>
    </el-row>
    <detail :dialog-visible="showDialogDetail" :product-id="productId" @onClickButtonDialogDetail="handleClickButtonDialogProductDetail" />
    <dialog-add-address :dialog-visible="showDialogForm" @onClickButtonForm="handleClickButtonForm" />
  </el-row>
</template>
<script>

import DialogAddAddress from '@/views/delivery/components/DialogAddAddress'
import ProductResource from '@/api/product'
import PaymentResource from '@/api/method_payment'
import GolferAddressResource from '@/api/golfer_address'
import TransportVTResource from '@/api/viettel_post'
import DeliveryResource from '@/api/delivery'
import Detail from '@/views/products/components/Detail'
import i18n from '@/lang/i18n'
import moment from 'moment'
import { formatNumber } from '@/utils/convert'
const productResource = new ProductResource()
const paymentResource = new PaymentResource()
const golferAddressResource = new GolferAddressResource()
const transportVTResource = new TransportVTResource()
const deliveryResource = new DeliveryResource()

const LOADING = {
  PRODUCT: 'loading',
  PAYMENT: 'loading_pay',
  ADDRESS: 'loading_add',
  TRANSPORT: 'loading_tran',
  GOLFER: 'loading_golfer'
}

export default {
  name: 'CreateOrder',
  components: { Detail, DialogAddAddress },
  props: {
    goBack: {
      type: Function,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      loading_text: LOADING.PRODUCT,
      product_id: null,
      param: null,
      count: '',
      golfer_id: null,
      params: [],
      postForm: {},
      listProduct: [],
      loadingSubmit: false,
      loadingSubmit1: false,
      loadingSubmit2: false,
      product: null,
      contain: 'contain',
      list_address: [],
      loadingTable: false,
      golfer: null,
      golfer_address: null,
      transfer_id: null,
      list_transfer: [],
      method_payment_id: null,
      time_order_id: null,
      list_payment: [],
      time_order: [],
      date_transfer_bill: moment(Date.now()).format('HH:mm DD/MM/YYYY'),
      total_bill: 0,
      cod_price: 0,
      bill_price: 0,
      showDialogDetail: false,
      productId: 0, // dung de luu thong tin xem chi tiet san pham
      note: '',
      showDialogForm: false
    }
  },
  watch: {
    method_payment_id() {
      this.checkRequestTransfer()
    },
    listProduct() {
      // this.bill_price = this.listProduct.map(d => d.)
      const bills_price = this.listProduct.map(d => parseInt(d.price_sale) * parseInt(d.count))
      console.log('...........check bill gia : ', bills_price)
      this.bill_price = bills_price.length === 1 ? bills_price[0] : bills_price.reduce((v1, v2) => v1 + v2)
      this.total_bill = this.bill_price + this.cod_price
      this.checkRequestTransfer()
    },
    golfer_address() {
      this.checkRequestTransfer()
    },
    transfer_id() {
      const cod = this.list_transfer.find(d => d.MA_DV_CHINH === this.transfer_id)
      console.log('..........kiem tra gia cuoc : ', JSON.stringify(cod), JSON.stringify(this.list_transfer), this.transfer_id)
      this.cod_price = cod.GIA_CUOC
      this.total_bill = this.bill_price + this.cod_price
      // eslint-disable-next-line no-unused-vars
      let time = cod.THOI_GIAN.replace('giờ', '').trim()
      time = Date.now() + parseInt(time) * 3600 * 1000
      this.date_transfer_bill = moment(time).format('HH:mm DD/MM/YYYY')
    }
  },
  created() {
    this.getPaymentList()
    this.getTimeOrder()
  },
  methods: {
    getTimeOrder() {
      deliveryResource.timeOrder().then(response => {
        const { error, data } = response
        if (error === 0) {
          this.time_order = [...data]
          console.log('-----------------------------------time', JSON.stringify(this.time_order))
        }
      })
    },
    addAddress() {
      this.showDialogForm = true
    },
    handleClickButtonForm(object) {
      const { dialog, address, golfer } = object
      this.showDialogForm = dialog
      if (address) {
        address.full_address = `${address.address}, ${address.township}, ${address.district}, ${address.city}`
        this.list_address = [...this.list_address, address]
        this.golfer_address = address.id
      }
      if (golfer) {
        this.golfer_id = `${golfer.name} - VGA${golfer.id}`
        this.golfer = golfer
      }
    },
    onDelete(row) {
      console.log('----------------------------------row', row)
      this.$confirm(i18n.t('confirm_remove_product').format(row.name)).then(_ => {
        const index = this.listProduct.findIndex(d => d.id === row.id)
        if (index !== -1) {
          this.listProduct.splice(index, 1)
        }
      })
    },
    onShowDialogDetail(row) {
      this.productId = row.id
      this.showDialogDetail = true
    },
    handleClickButtonDialogProductDetail(object) {
      this.showDialogDetail = object.dialog
      this.productId = 0
    },
    requestListAddress() {
      golferAddressResource.listGolferAddress(this.golfer.id).then(response => {
        this.loadingTable = false
        const { error, list } = response
        if (error === 0) {
          this.list_address = [...this.list_address, ...list]
          console.log('.........list dia chi', JSON.stringify(this.list_address))
          this.list_address.forEach(d => {
            d.full_address = `${d.address},${d.township},${d.district},${d.city}`
          })
        }
      }).then(_err => {
        this.loadingTable = false
      })
    },
    addProduct() {
      this.loading_text = LOADING.PRODUCT
      this.loadingTable = true
      this.getCheckProduct(() => {
        setTimeout(() => {
          this.product.count = this.count
          this.product.param_id = this.param
          this.product.param = this.product.params.find(d => d.id === this.param)
          this.pushListProduct(this.product)
          this.product = null
          this.params = []
          this.param = null
          this.count = null
          this.product_id = null
          this.loadingTable = false
          this.checkRequestTransfer()
        }, 1000)
      })
    },
    /**
     * xu ly khi them san pham, neu van san pham cu thi chi tang so luong
     */
    pushListProduct(product) {
      const product_check = this.listProduct.find(d => d.id === product.id && d.param_id === product.param_id)
      if (!product_check) {
        this.listProduct.push(product)
      } else {
        product_check.count = parseInt(product_check.count) + parseInt(product.count)
        this.listProduct = [...this.listProduct]
      }
    },
    onCancelClick() {
      if (this.goBack) {
        this.goBack()
      }
    },
    getProductSearch() {
      this.loadingSubmit = true
      let shop_id = 0
      if (this.listProduct.length) {
        shop_id = this.listProduct[0].shop_id
      }
      productResource.getProduct(this.product_id, shop_id).then(response => {
        this.loadingSubmit = false
        const { error, data, msg } = response
        if (error === 0) {
          console.log('................................ ', JSON.stringify(data))
          this.product_id = data.name
          const { name_param_first, name_param_second } = data
          for (const param of data.params) {
            let { param_first, param_second } = param
            let name = ''
            param_first = param_first ? param_first.replace('null', '').replace('undefined', '') : ''
            param_second = param_second ? param_second.replace('null', '').replace('undefined', '') : ''
            const names = []
            if (param_first.length) {
              names.push(`${name_param_first} : ${param_first}`)
            }
            if (param_second.length) {
              names.push(`${name_param_second} : ${param_second}`)
            }
            name = names.join(' - ')
            param.name = name
          }
          this.params = [...data.params]
          this.product = Object.assign({}, data)
        } else {
          this.$msgbox(msg)
        }
      })
    },
    getCheckProduct(callback = null) {
      this.loadingTable = true
      productResource.checkProduct(this.param, this.count).then(response => {
        this.loadingTable = false
        console.log(response)
        const { error, msg } = response
        if (error === 0) {
          // this.$message.success(msg)
          if (callback) {
            callback()
          }
        } else {
          this.$msgbox(msg)
        }
      }).then(() => {
        this.loadingTable = false
      })
    },
    getPaymentList() {
      this.loading_text = LOADING.PAYMENT
      this.loadingTable = true
      paymentResource.listPayment().then(response => {
        console.log('------------------', response)
        setTimeout(() => {
          this.loadingTable = false
          console.log(response)
          const { error, data } = response
          if (error === 0) {
            this.list_payment = [...data]
          }
        }, 2000)
      })
    },
    checkRequestTransfer() {
      if (!this.listProduct.length || !this.golfer_address || !this.method_payment_id) {
        return
      }
      this.transfer_id = null
      this.list_transfer = []
      this.requestTransport()
    },
    requestTransport() {
      console.log('..............golfer address ', this.golfer_address)
      // eslint-disable-next-line no-empty
      if (!this.listProduct.length) {
        return this.$msgbox(i18n.t('error_select_product'))
      }
      if (!this.golfer_address) {
        return this.$msgbox(i18n.t('error_select_golfer'))
      }
      if (!this.method_payment_id) {
        return this.$msgbox(i18n.t('error_select_golfer'))
      }
      this.loading_text = LOADING.TRANSPORT
      this.loadingTable = true
      const body = {
        golfer_address: this.list_address.find(d => d.id === this.golfer_address),
        method_payment_id: this.method_payment_id,
        products: this.listProduct
      }
      transportVTResource.transportVT(body).then(response => {
        setTimeout(() => {
          this.loadingTable = false
          console.log('-------------------------------------------tran', JSON.stringify(response))
          const { error, info, msg } = response
          if (error === 0) {
            this.list_transfer = [...info]
            this.list_transfer.forEach(d => {
              d.name = `${d.TEN_DICHVU} - ${i18n.t('price')}: ${i18n.t('price_vnd').format(formatNumber(d.GIA_CUOC))} - ${i18n.t('time')}: ${d.THOI_GIAN}`
            })
          } else {
            this.$msgbox(msg)
          }
        }, 1000)
      }).then(_err => {
        this.loadingTable = false
      })
    },
    requestGolferInfo() {
      this.loading_text = LOADING.GOLFER
      this.loadingTable = true
      if (!this.golfer_id) return
      deliveryResource.get_golfer_info(this.golfer_id).then(res => {
        console.log('........golfer id ', JSON.stringify(res))
        const { error, info } = res
        if (error === 0) {
          this.golfer_id = `${info.name} - VGA${info.id}`
          this.golfer = info
          this.requestListAddress()
        }
      }).then(_err => {
        this.loadingTable = false
      })
    },
    formatNumber,
    onCreateBillClick() {
      this.$confirm(i18n.t('create_bill_confirm')).then(() => {
        const body = {
          orders: this.listProduct,
          golfer: this.golfer,
          method_payment: this.list_payment.find(d => d.id === this.method_payment_id),
          address: this.list_address.find(d => d.id === this.golfer_address),
          cod_ship: this.list_transfer.find(d => d.MA_DV_CHINH === this.transfer_id),
          note: this.note,
          cod_ship_time: this.time_order.find(d => d.id === this.time_order_id)
        }
        this.loadingTable = true
        deliveryResource.create_bill(body).then(res => {
          setTimeout(() => {
            this.loadingTable = false
            const { error, msg } = res
            if (error === 0) {
              this.$msgbox(msg).then(_ => {
                if (this.goBack) {
                  this.goBack(true)
                }
              })
            } else {
              this.$msgbox(msg)
            }
          }, 1000)
        }).catch(_err => {

        })
      })
    }
  }
}
</script>

<style scoped>
  .delivery{
    display: flex;
  }
  .money-delivery{
    margin-bottom: 0;
  }
  .button-delivery{
    margin-left: 10px;
  }
  .product-add{
    border: 1px solid #dddddd;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  .product-inf{
    border: 1px solid #dddddd;
    padding: 10px;
    border-radius: 5px;
  }
  .top-pro{
    display: flex;
    justify-content: space-between;
  }
  .el-select{
    width: 100%;
  }
  .info-deli{
    font-weight: unset;
  }
  .star {
    color: #ff4949;
    font-style: italic;
    font-size: 14px;
    padding-top: 50px;
  }
  .h1 {
    font-size: 2em;
    margin: 0.67em 0;
    margin-bottom: 0.67em;
    margin-bottom: 50px;
  }
</style>
