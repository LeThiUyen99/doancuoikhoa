<template>
  <el-row class="app-container">
    <el-row class="create-order">
      <el-col style="display: flex">
        <el-link
          :underline="false"
          style="border: none; padding: 0px; padding-right: 5px"
          icon="el-icon-back"
          @click="onCancelClick"
        />
        <h3 class="h1">{{ $t("create-order-off") }}</h3>
      </el-col>
      <div class="note">
        <span class="star">{{ `*${$t("note")}: ${$t("note_create")}` }}</span>
      </div>
      <el-form ref="ruleForm" v-loading="loadingTable" :model="formRules">
        <el-row>
          <div class="top-pro">
            <h3 style="float: left; margin-bottom: 0">
              {{ $t("info_add_product") }}
            </h3>
            <el-button style="margin-top: 10px" @click="onSubmit">{{ isUpdate? $t('choose_product_same_shop'): $t('update_product_in_delivery') }}</el-button>
          </div>
          <el-form ref="ruleFormProduct" class="product-add demo-ruleForm" :model="productRules">
            <el-row>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item prop="product_code">
                  <label><span class="star">*</span> {{ $t("product_id") }}:</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.product_code"
                      :placeholder="$t('input_product_id')"
                    />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item prop="product_name">
                  <label><span class="star">*</span>
                    {{ $t("product_name") }}:</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.product_name"
                      :placeholder="$t('product_input')"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item>
                  <label>{{ $t("attribute-name-1") }}:</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.param_first_name"
                      :placeholder="$t('attribute-name-1')"
                    />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item>
                  <label>{{ $t("attribute-name-2") }}:</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.param_second_name"
                      :placeholder="$t('attribute-name-2')"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item>
                  <label>{{ $t("attribute-value-1") }}:</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.attribute1"
                      :placeholder="$t('attribute-value-1')"
                    />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item>
                  <label>{{ $t("attribute-value-2") }}:</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.attribute2"
                      :placeholder="$t('attribute-value-2')"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item prop="price_buy">
                  <label><span class="star">*</span> {{ $t("price_buy") }}: {{ formatNumber(productRules.price_buy? productRules.price_buy: 0) }} VND</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.price_buy"
                      type="number"
                      :placeholder="$t('price_buy')"
                    />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item prop="count">
                  <label><span class="star">*</span> {{ $t("quantily") }}:</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.count"
                      type="number"
                      :placeholder="$t('inpur_quantily')"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item prop="price">
                  <label><span class="star">*</span>
                    {{ $t("original_price") }}: {{ formatNumber(productRules.price? productRules.price: 0) }} VND</label>
                  <div class="delivery">
                    <el-input
                      v-model="productRules.price"
                      type="number"
                      :placeholder="$t('original_price')"
                    />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :sm="12" class="pr-lg-5">
                <el-form-item prop="shop_id">
                  <label><span class="star">*</span> {{ $t("shop") }}:</label>
                  <div class="delivery">
                    <!--                  <el-input v-model="shop_name" :placeholder="$t('shop')" />-->
                    <el-select v-model="productRules.shop_id" :placeholder="$t('shop')">
                      <el-option
                        v-for="shop in shops"
                        :key="shop.id"
                        :label="shop.name"
                        :value="shop.id"
                      />
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="listProduct" border style="margin-top: 20px">
            <el-table-column
              prop="date"
              label="Code"
              align="center"
              width="80px"
            >
              <template slot-scope="props">{{
                `${props.row.product_code}`
              }}</template>
            </el-table-column>
            <el-table-column
              prop="product_name"
              :label="$t('product_name')"
              align="center"
            />
            <el-table-column
              prop="price_buy"
              :label="$t('price_buy')"
              align="center"
            >
              <template slot-scope="scope">{{
                $t("price_vnd").format(formatNumber(scope.row.price_buy))
              }}</template>
            </el-table-column>
            <el-table-column
              prop="price"
              :label="$t('original_price')"
              align="center"
            >
              <template slot-scope="scope">{{
                $t("price_vnd").format(formatNumber(scope.row.price))
              }}</template>
            </el-table-column>
            <el-table-column
              prop="shop_id"
              :label="$t('shop')"
              align="center"
            />
            <el-table-column
              prop="attribute1"
              :label="$t('attribute-value-1')"
              align="center"
            />
            <el-table-column
              prop="attribute2"
              :label="$t('attribute-value-2')"
              align="center"
            />
            <el-table-column
              prop="param_first_name"
              :label="$t('attribute-name-1')"
              align="center"
            />
            <el-table-column
              prop="param_second_name"
              :label="$t('attribute-name-2')"
              align="center"
            />
            <el-table-column
              prop="count"
              :label="$t('quantily')"
              align="center"
            />
            <el-table-column :label="$t('action')" align="center" width="120px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="onUpdate(scope.row)" />
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="onDelete(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="display: flex; padding-top: 15px">
          <el-form-item style="width: 100%; padding-right: 5px" prop="method_payment_id">
            <label><span class="star">*</span> {{ $t("method_payment") }}:</label>
            <div class="delivery">
              <el-select
                v-model="formRules.method_payment_id"
                :placeholder="$t('select_method_payment')"
              >
                <el-option
                  v-for="payment in list_payment"
                  :key="payment.id"
                  :label="payment.name"
                  :value="payment.id"
                />
              </el-select>
            </div>
          </el-form-item>
        </el-row>
        <el-form-item>
          <label>{{ $t("info_buyer") }}</label>
          <div class="product-inf">
            <el-form-item style="width: 100%; padding: 10px 0;" prop="fullname">
              <label> <span class="star">*</span> {{ $t("customer") }}:</label>
              <div class="delivery">
                <el-input v-model="formRules.fullname" :placeholder="$t('name_golf')" />
              </div>
            </el-form-item>
            <el-form-item style="width: 100%; padding: 10px 0;" prop="phone_golfer">
              <label> <span class="star">*</span> {{ $t("phone") }}:</label>
              <div class="delivery">
                <el-input v-model="formRules.phone_golfer" :placeholder="$t('phone')" />
              </div>
            </el-form-item>
            <el-form-item style="width: 100%; padding: 10px 0;" prop="golfer_address">
              <label> <span class="star">*</span> {{ $t("address") }}:</label>
              <div class="delivery">
                <el-input v-model="formRules.golfer_address" :placeholder="$t('address')" />
              </div>
            </el-form-item>
          </div>
        </el-form-item>
        <el-row style="display: flex">
          <el-form-item style="width: 100%; padding-right: 5px" prop="time_order_id">
            <label><span class="star">*</span> {{ $t("time_order") }}</label>
            <el-date-picker
              v-model="formRules.time_order_id"
              style="width: 100%"
              type="datetime"
              format="dd-MM-yyyy HH:mm:ss"
              :placeholder="$t('time_order')"
            />
          </el-form-item>
          <el-form-item style="width: 100%" prop="transfer_id">
            <label><span class="star">*</span> {{ $t("transportation") }}:</label>
            <div class="delivery">
              <el-input
                v-model="formRules.transfer_id"
                :placeholder="$t('select_transportation')"
              />
            </div>
          </el-form-item>
        </el-row>
        <el-row style="display: flex">
          <el-form-item style="width: 100%; padding-right: 5px" prop="transport_title">
            <label><span class="star">*</span> {{ $t("transport_title") }}</label>
            <el-input
              v-model="formRules.transport_title"
              :placeholder="$t('transport_title')"
            />
          </el-form-item>
          <el-form-item style="width: 100%" prop="salary_ship">
            <label><span class="star">*</span> {{ $t("salary_ship") }}: {{ formatNumber(formRules.salary_ship? formRules.salary_ship: 0) }} VND</label>
            <div class="delivery">
              <el-input
                v-model="formRules.salary_ship"
                type="number"
                :placeholder="$t('salary_ship')"
              />
            </div>
          </el-form-item>
        </el-row>
        <el-form-item>
          <label>{{ $t("note") }}:</label>
          <div class="delivery">
            <el-input
              v-model="formRules.note"
              type="textarea"
              :rows="5"
              :placeholder="$t('note')"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <label>{{ $t("delivery_info") }}:</label>
          <div class="product-inf">
            <div class="delivery">
              <label
                class="info-deli"
              >{{ $t("date_receipt") }}:
                {{ convertDateTime(formRules.time_order_id) }}</label>
            </div>
            <div class="delivery">
              <label
                class="info-deli"
              >{{ $t("salary_ship") }}:
                {{ $t("price_vnd").format(formatNumber(formRules.salary_ship)) }}</label>
            </div>
            <div class="delivery">
              <label
                class="info-deli"
              >{{ $t("order_price") }}:
                <!--                {{-->
                <!--                  $t("price_vnd").format(-->
                <!--                    formatNumber(-->
                <!--                      parseInt(listProduct.map((d) => d.price_buy)) *-->
                <!--                        parseInt(listProduct.map((d) => d.count))-->
                <!--                    )-->
                <!--                  )-->
                <!--                }}-->
                {{ $t("price_vnd").format(formatNumber(price_product)) }}
              </label>
            </div>
            <div class="delivery">
              <label
                class="info-deli"
              >{{ $t("total_money") }}:
                {{
                  $t("price_vnd").format(
                    formatNumber(
                      parseInt(formRules.salary_ship) +
                        parseInt(listProduct.map((d) => d.price_buy)) *
                        parseInt(listProduct.map((d) => d.count))
                    )
                  )
                }}</label>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div>
        <span style="float: right">
          <el-button @click="onCancelClick">{{ $t("canel") }}</el-button>
          <el-button type="primary" @click="onCreateBillClick">{{
            $t("create_order")
          }}</el-button>
        </span>
      </div>
    </el-row>
    <detail
      :dialog-visible="showDialogDetail"
      :product-id="productId"
      @onClickButtonDialogDetail="handleClickButtonDialogProductDetail"
    />
    <dialog-add-address
      :dialog-visible="showDialogForm"
      @onClickButtonForm="handleClickButtonForm"
    />
    <edit-info-buyer
      :show-dialog="onShowDialog"
      :id-delivery="idDelivery"
      :name-golfer="nameGolfer"
      :phone-golfer="phoneGolfer"
      @onClickButtonDialog="handleClickButtonDialog"
    />
  </el-row>
</template>

<script>
import DialogAddAddress from '@/views/delivery/components/DialogAddAddress'
import PaymentResource from '@/api/method_payment'
import GolferAddressResource from '@/api/golfer_address'
import DeliveryResource from '@/api/delivery'
import ShopResource from '@/api/shop'
import Detail from '@/views/products/components/Detail'
import i18n from '@/lang/i18n'
import moment from 'moment'
import { formatNumber, convertDateTime } from '@/utils/convert'
import EditInfoBuyer from '@/views/delivery/components/EditInfoBuyer'
// import { setRules, setRulesProduct } from '@/utils/delivery/orderOfflineValidate'
const paymentResource = new PaymentResource()
const golferAddressResource = new GolferAddressResource()
const deliveryResource = new DeliveryResource()
const shopResource = new ShopResource()

const LOADING = {
  PRODUCT: 'loading',
  PAYMENT: 'loading_pay',
  ADDRESS: 'loading_add',
  TRANSPORT: 'loading_tran',
  GOLFER: 'loading_golfer'
}
export default {
  name: 'OrderOffline',
  components: { EditInfoBuyer, Detail, DialogAddAddress },
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
      // rules: setRules(),
      // rule: setRulesProduct(),
      productRules: {},
      formRules: {},
      loading_text: LOADING.PRODUCT,
      product_code: null,
      param: null,
      count: '',
      fullname: null,
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
      id_info: null,
      shopId: null,
      shops: [],
      list_transfer: [],
      method_payment_id: null,
      time_order_id: null,
      price_buy: null,
      transport_title: null,
      salary_ship: null,
      product_name: null,
      attribute1: null,
      attribute2: null,
      shop_name: null,
      list_payment: [],
      time_order: [],
      date_transfer_bill: moment(Date.now()).format('HH:mm DD/MM/YYYY'),
      total_bill: 0,
      cod_price: 0,
      bill_price: 0,
      showDialogDetail: false,
      productId: 0, // dung de luu thong tin xem chi tiet san pham
      note: '',
      showDialogForm: false,
      param_second_name: '',
      param_first_name: '',
      price: '',
      idDelivery: 0,
      phone_golfer: '',
      name_golfer: '',
      phoneGolfer: '',
      nameGolfer: '',
      onShowDialog: false,
      isUpdate: true,
      price_product: 0
    }
  },
  watch: {
    // golfer_address() {
    //   this.nameAddress();
    //   this.phoneAddress();
    // },
    shopId(shop_id) {
      this.productRules.shop_id = shop_id
    }
  },
  created() {
    this.getPaymentList()
    this.getTimeOrder()
    this.onGetListShop()
  },
  methods: {
    getPriceProduct() {
      let tempPriceProduct = 0
      for (const p of this.listProduct) {
        tempPriceProduct = tempPriceProduct + (parseInt(p.price_buy) * parseInt(p.count))
      }
      this.price_product = tempPriceProduct
    },
    onUpdate(row) {
      console.log(row)
      this.productRules = row
      this.isUpdate = false
    },
    nameAddress() {
      this.name_golfer = this.list_address.find(
        (d) => d.id === this.golfer_address
      ).name
      console.log('-------------------name', this.name_golfer)
    },
    phoneAddress() {
      this.phone_golfer = this.list_address.find(
        (d) => d.id === this.golfer_address
      ).phone
    },
    onShowDialogEdit(id_info) {
      this.onShowDialog = true
      this.idDelivery =
        id_info ||
        this.list_address.find((d) => d.id === this.golfer_address).id
      this.nameGolfer = this.name_golfer
      this.phoneGolfer = this.phone_golfer
    },
    handleClickButtonDialog(object) {
      const { dialog, name_golfer, phone_golfer } = object
      this.onShowDialog = dialog
      this.idDelivery = 0
      this.name_golfer = name_golfer
      this.phone_golfer = phone_golfer
    },
    onGetListShop() {
      shopResource.listShopOption().then((response) => {
        if (response.error === 0) {
          this.shops = [{ id: 0, name: i18n.t('default') }, ...response.list]
        }
      })
    },
    getTimeOrder() {
      deliveryResource.timeOrder().then((response) => {
        const { error, data } = response
        if (error === 0) {
          this.time_order = [...data]
        }
      })
    },
    addAddress() {
      this.showDialogForm = true
    },
    handleClickButtonForm(object) {
      const { dialog, address, golfer, insert } = object
      this.showDialogForm = dialog
      if (address) {
        address.full_address = `${address.address}, ${address.township}, ${address.district}, ${address.city}`
        this.list_address = [...this.list_address, address]
        this.golfer_address = address.id
      }
      this.name_golfer = insert.name
      this.phone_golfer = insert.phone
      this.id_info = insert.id
      if (golfer) {
        this.golfer_id = `${golfer.name} - VGA${golfer.id}`
        this.golfer = golfer
      }
    },
    onDelete(row) {
      console.log('xos id', JSON.stringify(row))
      this.$confirm(i18n.t('confirm_remove_product').format(row.product_name)).then(
        (_) => {
          const index = this.listProduct.findIndex((d) => d.product_code === row.product_code)
          if (index !== -1) {
            this.listProduct.splice(index, 1)
            this.getPriceProduct()
          }
        }
      )
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
      golferAddressResource
        .listGolferAddress(this.golfer.id)
        .then((response) => {
          this.loadingTable = false
          const { error, list } = response
          if (error === 0) {
            this.list_address = [...this.list_address, ...list]
            this.list_address.forEach((d) => {
              d.full_address = `${d.address},${d.township},${d.district},${d.city}`
            })
          }
        })
        .then((_err) => {
          this.loadingTable = false
        })
    },
    onSubmitProduct(formName) {
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.addProduct()
        }
      })
    },
    onSubmit() {
      if (this.isUpdate) {
        this.addProduct()
      } else {
        this.updateProduct()
      }
    },
    addProduct() {
      this.loading_text = LOADING.PRODUCT
      this.loadingTable = true
      const product = this.productRules
      console.log('-----------------------product 1', JSON.stringify(product))
      product.id = Math.floor(Math.random() * 1000)
      product.product_code = product.product_code.toString().trim()
      console.log('-----------------------product', JSON.stringify(product))
      setTimeout(() => {
        this.listProduct.push(product)
        this.getPriceProduct()
        // this.product_code = null;
        // this.product_name = null;
        // this.attribute1 = null;
        // this.count = null;
        // this.attribute2 = null;
        // this.param_second_name = null;
        // this.param_first_name = null;
        // this.price_buy = null;
        // this.price = null;
        // this.shopId = null;
        this.productRules = {}
        this.loadingTable = false
      }, 1000)
    },
    updateProduct() {
      this.loading_text = LOADING.PRODUCT
      this.loadingTable = true
      const product = this.productRules
      product.product_code = product.product_code.toString().trim()
      console.log('______________________', product)
      setTimeout(() => {
        console.log('_________________________index', this.listProduct.findIndex(({ id }) => id === product.id))
        this.listProduct[this.listProduct.findIndex(({ product_code }) => product_code === product.product_code)] = product
        // this.listProduct.splice(product)
        this.getPriceProduct()
        this.productRules = {}
        this.loadingTable = false
        this.isUpdate = true
      }, 1000)
    },
    /**
     * xu ly khi them san pham, neu van san pham cu thi chi tang so luong
     */
    onCancelClick() {
      if (this.goBack) {
        this.goBack()
      }
    },
    getPaymentList() {
      this.loading_text = LOADING.PAYMENT
      this.loadingTable = true
      paymentResource.listPayment().then((response) => {
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
    requestGolferInfo() {
      this.loading_text = LOADING.GOLFER
      this.loadingTable = true
      if (!this.golfer_id) return
      deliveryResource
        .get_golfer_info(this.golfer_id)
        .then((res) => {
          const { error, info } = res
          if (error === 0) {
            this.golfer_id = `${info.name} - VGA${info.id}`
            this.golfer = info
            this.requestListAddress()
          }
        })
        .then((_err) => {
          this.loadingTable = false
        })
    },
    formatNumber,
    convertDateTime,
    onSubmitOrder(formName) {
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.onCreateBillClick()
        }
      })
    },
    onCreateBillClick() {
      this.$confirm(i18n.t('create_bill_confirm')).then(() => {
        const golfer = {
          phone: this.formRules.phone_golfer,
          address: this.formRules.golfer_address,
          fullname: this.formRules.fullname
        }
        const body = {
          orders: this.listProduct,
          // golfer: this.golfer_id,
          // phone: this.phone_golfer,
          golfer: golfer,
          method_payment: this.list_payment.find(
            (d) => d.id === this.formRules.method_payment_id
          ),
          // address: this.list_address.find((d) => d.id === this.golfer_address),
          // address: this.golfer_address,
          cod_ship: this.formRules.transfer_id,
          note: this.formRules.note,
          cod_ship_time: this.formRules.time_order_id.getTime(),
          // price_buy: this.price_buy,
          price_ship: this.formRules.salary_ship,
          transport_title: this.formRules.transport_title
        }
        this.loadingTable = true
        deliveryResource
          .create_bill_offline(body)
          .then((res) => {
            console.log('------------------------------body', body)
            setTimeout(() => {
              this.loadingTable = false
              const { error, msg } = res
              if (error === 0) {
                this.$msgbox(msg).then((_) => {
                  this.reload()
                })
              } else {
                this.$msgbox(msg).then((_) => {
                  this.$msgbox(msg)
                })
              }
            }, 1000)
          })
          .catch((_err) => {})
      })
    },
    reload() {
      this.listProduct = []
      this.formRules = {}
      // this.fullname = "";
      // this.method_payment_id = "";
      // this.golfer_address = "";
      // this.transfer_id = "";
      // this.note = "";
      // this.shopId = "";
      // this.time_order_id = null;
      // this.price_buy = "";
      // this.salary_ship = "";
      // this.transport_title = "";
      // this.product_code = "";
      // this.product_name = "";
      // this.param_first_name = "";
      // this.param_second_name = "";
      // this.attribute1 = "";
      // this.attribute2 = "";
      // this.price_buy = "";
      // this.count = "";
      // this.price = "";
      // this.name_golfer = "";
      // this.phone_golfer = "";
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 0 20px 20px 20px;
}
.delivery {
  display: flex;
}
.money-delivery {
  margin-bottom: 0;
}
.button-delivery {
  margin-left: 10px;
}
.product-add {
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.product-inf {
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 5px;
}
.top-pro {
  display: flex;
  justify-content: space-between;
}
.el-select {
  width: 100%;
}
.info-deli {
  font-weight: unset;
}
.star {
  color: #ff4949;
  font-style: italic;
  font-size: 14px;
  padding-top: 50px;
}
.h1 {
  margin: 0;
}
.note {
  padding-top: 30px;
  display: inline-block;
}
</style>
