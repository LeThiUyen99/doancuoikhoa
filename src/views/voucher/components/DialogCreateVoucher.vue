<template>
  <el-row class="app-container">
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="col-back">
        <div class="grid-content bg-purple">
          <el-button
            style="border: none; padding:5px 0;"
            icon="el-icon-back"
            @click="goBack"
          />
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light">
          <h3 v-if="!objectData.id" style="margin: 0">
            {{ $t("create_voucher") }}
          </h3>
          <h3 v-if="objectData.id" style="margin: 0">
            {{ $t("update_voucher") }}
          </h3>
        </div>
      </el-col>
      <el-col
        :xs="4"
        :sm="6"
        :md="8"
        :lg="9"
        :xl="11"
      ><div
        class="grid-content bg-purple"
      /></el-col>
      <el-col
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="1"
      ><div
        class="grid-content bg-purple-light"
      /></el-col>
    </el-row>
    <el-form :model="body">
      <el-row :gutter="10">
        <el-col style="width:50%" :xs="4" :sm="6" :md="8" :lg="9" :xl="24">
          <div class="grid-content bg-purple-light">
            <el-form-item :label="$t('id_voucher')" prop="code">
              <el-input v-model="body.code" :placeholder="$t('id_voucher')" />
            </el-form-item>
            <el-form-item :label="$t('name_voucher')" prop="name">
              <el-input v-model="body.name" :placeholder="$t('name_voucher')" />
            </el-form-item>
            <el-form-item :label="$t('type_voucher')" prop="voucher_type_name">
              <el-select
                v-model="typeId"
                :placeholder="$t('type_voucher')"
                style="width: 100%"
              >
                <el-option
                  v-for="type in types"
                  :key="`type_${type.id}`"
                  :label="type.name"
                  :value="type.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('number_uses_voucher')" prop="max_use">
              <el-input
                v-model="body.max_use"
                type="number"
                :placeholder="$t('number_uses')"
              />
            </el-form-item>
            <el-form-item :label="$t('use_value')" prop="value">
              <label style="color: #32CD32">( {{ nameType }} )</label>
              <el-input
                v-model="body.value"
                type="number"
                :placeholder="$t('use_value')"
              />
            </el-form-item>
            <el-form-item :label="$t('limit_max')" prop="limit_max">
              <label>{{
                formatNumber(body.limit_max ? body.limit_max : 0)
              }}
                VND</label>
              <el-input
                v-model="body.limit_max"
                type="number"
                :placeholder="$t('limit_max')"
              />
            </el-form-item>
            <el-form-item :label="$t('applicable_date')">
              <el-col :sm="24" style="padding:0">
                <el-col :sm="11" style="padding:0">
                  <el-date-picker
                    v-model="body.from_date"
                    style="width:100%"
                    type="datetime"
                    placeholder="from date"
                  />
                </el-col>
                <el-col :sm="2" align="center">
                  {{ $t("to") }}
                </el-col>
                <el-col :sm="11" style="padding:0">
                  <el-date-picker
                    v-model="body.to_date"
                    style="width:100%"
                    type="datetime"
                    placeholder="to date"
                    :picker-options="datePickerOptions"
                  />
                </el-col>
              </el-col>
            </el-form-item>
            <el-form-item :label="$t('number_uses_user')" prop="max_use">
              <el-input
                v-model="body.count_use_per_golfer"
                type="number"
                :placeholder="$t('number_uses')"
              />
            </el-form-item>
            <el-form-item :label="$t('desc')" prop="description">
              <el-input
                v-model="body.description"
                style="margin-top:11px"
                type="textarea"
                :rows="2"
                :placeholder="$t('desc')"
              />
            </el-form-item>
            <el-form-item
              v-if="!objectData.id"
              :label="$t('type_code')"
              prop="voucher_type_name"
            >
              <el-select
                v-model="typeVoucherId"
                :placeholder="$t('type_code')"
                style="width: 100%"
              >
                <el-option
                  v-for="type in typeVouchers"
                  :key="`type_${type.key}`"
                  :label="type.name"
                  :value="type.key"
                />
              </el-select>
            </el-form-item>
            <span v-if="!objectData.id">
              <el-form-item v-if="isUser" :label="$t('list-vgas')" prop="value">
                <el-input
                  v-model="user_list"
                  type="textarea"
                  :row="2"
                  :placeholder="$t('list-vgas')"
                />
              </el-form-item>
            </span>
            <el-form-item :label="$t('active')">
              <el-switch v-model="activeVoucher" :active-text="activeTitle" />
            </el-form-item>
          </div>
        </el-col>
        <el-col style="width:50%" :xs="4" :sm="6" :md="8" :lg="9" :xl="12">
          <div class="grid-content bg-purple">
            <el-form-item>
              <label>{{ $t("conditions_apply") }}</label>
              <el-button
                v-if="!objectData.condition"
                type="primary"
                class="button-delivery"
                @click="addConditions"
              >{{ $t("add_conditions") }}</el-button>
              <el-button
                v-if="objectData.condition"
                type="primary"
                class="button-delivery"
                @click="updateConditions"
              >{{ $t("update_conditions") }}</el-button>
              <!-- <div class="product-inf">
                <div class="delivery">
                  <label class="info-deli">{{ $t("order_value") }}:</label>
                  <template>
                    {{
                      `${
                        body.condition
                          ? formatNumber(body.condition.value_from)
                          : formatNumber(min_money)
                      } VND ${`${
                        body.condition
                          ? `- ${formatNumber(body.condition.value_to)}`
                          : `- ${formatNumber(max_money)}`
                      } VND`}`
                    }}</template>
                </div>
                <div class="delivery">
                  <label class="info-deli">{{ $t("shop") }}: </label>{{
                    body.condition && body.condition.shop
                      ? body.condition.shop.name
                      : shop_name
                  }}
                </div>
                <div class="delivery">
                  <label class="info-deli">{{ $t("category") }}: </label>{{
                    body.condition && body.condition.category
                      ? body.condition.category.name
                      : cate_name
                  }}
                </div>
                <div class="delivery">
                  <label class="info-deli">{{ $t("trademark") }}:</label>
                  {{
                    body.condition && body.condition.tradermark
                      ? body.condition.tradermark.name
                      : trademark_name
                  }}
                </div>
              </div> -->
              <el-form :model="objectCodition">
                <div class="product-inf">
                  <div class="delivery">
                    <el-form-item :label="$t('order_value')">
                      {{
                        `${
                          objectCodition
                            ? formatNumber(objectCodition.value_from)
                            : 0
                        } VND - ${
                          objectCodition
                            ? formatNumber(objectCodition.value_to)
                            : 0
                        } VND`
                      }}
                      <el-col :sm="24">
                        <el-col :sm="11">
                          <el-input
                            v-model="objectCodition.value_from"
                            type="number"
                            :placeholder="$t('order_value')"
                          />
                        </el-col>
                        <el-col :sm="2" align="center"> {{ $t("to") }}</el-col>
                        <el-col :sm="11">
                          <el-input
                            v-model="objectCodition.value_to"
                            type="number"
                            :placeholder="$t('order_value')"
                          /></el-col>
                      </el-col>
                    </el-form-item>
                  </div>
                  <div class="delivery">
                    <el-form-item :label="$t('shop')">
                      <div style="display: flex; width: 100%;">
                        <el-select
                          v-model="objectCodition.shop_id"
                          style="width:100%; padding-right: 5px"
                          class="w-100"
                          filterable
                          remote
                          :multiple-limit="1"
                          :placeholder="$t('shop')"
                        >
                          <el-option
                            v-for="shop in shops"
                            :key="shop.id"
                            :label="shop.name"
                            :value="shop.id"
                          />
                        </el-select>
                        <el-button type="primary" @click="addShop">{{
                          $t("add")
                        }}</el-button>
                      </div>
                    </el-form-item>
                    <el-table
                      v-loading="loadingTable"
                      :data="
                        listShop
                      "
                      border
                      style="margin: 10px 0"
                    >
                      <el-table-column
                        :label="$t('id')"
                        prop="id"
                        align="center"
                      />
                      <el-table-column
                        :label="$t('name')"
                        prop="name"
                        align="center"
                      />
                      <el-table-column
                        :label="$t('address')"
                        prop="address"
                        align="center"
                      />
                      <el-table-column :label="$t('action')" align="center">
                        <template slot-scope="scope">
                          <el-button
                            type="danger"
                            :loading="loadingTable"
                            icon="el-icon-delete"
                            circle
                            @click="onDeleteParamShop(scope.row.id)"
                          />
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="delivery">
                    <el-form-item :label="$t('category')">
                      <div style="display: flex; width: 100%;">
                        <el-select
                          v-model="objectCodition.category_id"
                          style="width:100%; padding-right: 5px"
                          class="w-100"
                          filterable
                          remote
                          :multiple-limit="1"
                          :placeholder="$t('category')"
                        >
                          <el-option
                            v-for="cate in categories"
                            :key="cate.id"
                            :label="cate.name"
                            :value="cate.id"
                          />
                        </el-select>
                        <el-button type="primary" @click="addCate">{{
                          $t("add")
                        }}</el-button>
                      </div>
                    </el-form-item>
                    <el-table
                      v-loading="loadingTable"
                      :data="
                        listCate
                      "
                      border
                      style="margin: 10px 0"
                    >
                      <el-table-column
                        :label="$t('id')"
                        prop="id"
                        align="center"
                      />
                      <el-table-column
                        :label="$t('name')"
                        prop="name"
                        align="center"
                      />
                      <el-table-column :label="$t('action')" align="center">
                        <template slot-scope="scope">
                          <el-button
                            type="danger"
                            :loading="loadingTable"
                            icon="el-icon-delete"
                            circle
                            @click="onDeleteParamCate(scope.row.id)"
                          />
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="delivery">
                    <el-form-item :label="$t('trademark')">
                      <div style="display: flex; width: 100%;">
                        <el-select
                          v-model="objectCodition.trademark_id"
                          style="width:100%; padding-right: 5px"
                          class="w-100"
                          filterable
                          remote
                          :multiple-limit="1"
                          :placeholder="$t('trademark')"
                        >
                          <el-option
                            v-for="mark in trademarks"
                            :key="`mark_${mark.id}`"
                            :label="mark.name"
                            :value="mark.id"
                          />
                        </el-select>
                        <el-button type="primary" @click="addTrade">{{
                          $t("add")
                        }}</el-button>
                      </div>
                    </el-form-item>
                    <el-table
                      v-loading="loadingTable"
                      :data="
                        listTrade
                      "
                      border
                      style="margin: 10px 0"
                    >
                      <el-table-column
                        :label="$t('id')"
                        prop="id"
                        align="center"
                      />
                      <el-table-column
                        :label="$t('name')"
                        prop="name"
                        align="center"
                      />
                      <el-table-column :label="$t('action')" align="center">
                        <template slot-scope="scope">
                          <el-button
                            type="danger"
                            :loading="loadingTable"
                            icon="el-icon-delete"
                            circle
                            @click="onDeleteParamTrade(scope.row.id)"
                          />
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-form>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <span style="float: right">
      <el-button @click="goBack">{{ $t("canel") }}</el-button>
      <el-button
        v-if="!objectData.id"
        type="primary"
        :loading="loadingSubmit"
        @click="onCreateVoucher"
      >{{ $t("add") }}</el-button>
      <el-button
        v-if="objectData.id"
        type="primary"
        :loading="loadingSubmit"
        @click="onUpdateVoucher"
      >{{ $t("update") }}</el-button>
    </span>
    <dialog-conditions
      :is-condition="isCondition"
      :object-codition="objectCodition"
      :show-dialog="onShowDialog"
      @onClickButtonDialog="handleClickButtonDialog"
    />
  </el-row>
</template>

<script>
import AccountResource from '@/api/account'
import VoucherResource from '@/api/voucher'
import i18n from '@/lang/i18n'
import { formatNumber } from '@/utils/convert'
import DialogConditions from './DialogConditions.vue'
import ShopResource from '@/api/shop'
import CategoryResource from '@/api/category'
import TrademarkResource from '@/api/trademark'
const shopResource = new ShopResource()
const categoryResource = new CategoryResource()
const trademarkResource = new TrademarkResource()
const accountResource = new AccountResource()
const voucherResource = new VoucherResource()
export default {
  name: 'DialogCreateVoucher',
  components: { DialogConditions },
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    types: {
      type: Array,
      default() {
        return []
      }
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
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
    return {
      typeVouchers: [
        { key: 0, name: i18n.t('public') },
        { key: 1, name: i18n.t('prative') }
      ],
      isUser: false,
      vgas: [],
      vga: null,
      typeVoucherId: 0,
      typeId: null,
      loadingUser: false,
      user_list: '',
      activeVoucher: false,
      activeTitle: i18n.t('off'),
      from_date: 0,
      to_date: 0,
      fromDate: '',
      toDate: '',
      loadingSubmit: false,
      body: {},
      listVga: [],
      loadingTable: false,
      onShowDialog: false,
      isCondition: false,
      min_money: '',
      max_money: '',
      shop_id: '',
      category_id: '',
      trademark_id: '',
      shop_name: '',
      cate_name: '',
      trademark_name: '',
      nameType: '',
      objectCodition: {},
      shops: [],
      categories: [],
      trademarks: [],
      shopId: null,
      categoryId: null,
      trademarkId: null,
      listShop: [],
      listCate: [],
      listTrade: []
    }
  },
  computed: {
    datePickerOptions() {
      return {
        disabledDate: time => {
          const yestoday = new Date(this.body.from_date)
          yestoday.setDate(yestoday.getDate())
          return time.getTime() < yestoday.getTime()
        }
      }
    }
  },
  watch: {
    objectData(object) {
      this.body = Object.assign({}, object)
      if (Object.keys(object).length > 0) {
        this.activeVoucher = object.status === 1
      }
    },
    activeVoucher(value) {
      this.activeTitle = value ? i18n.t('active_') : i18n.t('off')
      this.body.status = value ? 1 : 0
    },
    typeVoucherId(type_voucher_id) {
      if (type_voucher_id === 1) {
        this.isUser = true
      } else {
        this.isUser = false
      }
    },
    typeId(type) {
      console.log(type)
      this.nameTypes(type)
    }
  },
  created() {
    this.requestBody()
    this.onGetListShop()
    this.onGetListCategories()
    this.onGetTrademarks()
  },
  methods: {
    deleteCondition() {
      const id = this.objectCodition.id
      console.log('---------------------id', id)
      voucherResource.deleteCondition(id).then(res => {
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
    },
    addShop() {
      const shop = {
        id: this.objectCodition.shop_id,
        name: this.shops.find(d => d.id === this.objectCodition.shop_id).name,
        address: this.shops.find(d => d.id === this.objectCodition.shop_id).address
      }
      console.log(shop)
      // console.log(this.listShop.push(shop));
      // this.listShop = [...this.listShop, shop]
      console.log(this.listShop)
      this.listShop.push(shop)
      // this.objectCodition.shops = [...this.objectCodition.shops, shop]
    },
    addCate() {
      const cate = {
        id: this.objectCodition.category_id,
        name: this.categories.find(d => d.id === this.objectCodition.category_id).name
      }
      this.listCate.push(cate)
    },
    addTrade() {
      const trade = {
        id: this.objectCodition.trademark_id,
        name: this.trademarks.find(d => d.id === this.objectCodition.trademark_id).name
      }
      this.listTrade.push(trade)
    },
    onDeleteParamShop(id) {
      console.log('...............xoa id', id)
      const userIndex = this.listShop.findIndex(d => d.id === id)
      if (userIndex !== -1) {
        this.listShop.splice(userIndex, 1)
      }
    },
    onDeleteParamCate(id) {
      console.log('...............xoa id', id)
      const userIndex = this.listCate.findIndex(d => d.id === id)
      if (userIndex !== -1) {
        this.listCate.splice(userIndex, 1)
      }
    },
    onDeleteParamTrade(id) {
      console.log('...............xoa id', id)
      const userIndex = this.listTrade.findIndex(d => d.id === id)
      if (userIndex !== -1) {
        this.listTrade.splice(userIndex, 1)
      }
    },
    onGetListShop() {
      shopResource.listShopOption().then(response => {
        if (response.error === 0) {
          this.shops = [{ id: 0, name: i18n.t('default') }, ...response.list]
        }
      })
    },
    onGetListCategories() {
      categoryResource.listCategory().then(response => {
        this.categories = [
          { id: 0, name: i18n.t('default') },
          ...response.list
        ]
      })
    },
    onGetTrademarks() {
      trademarkResource.listTrademarkOption().then(response => {
        this.trademarks = [
          { id: 0, name: i18n.t('default') },
          ...response.list
        ]
      })
    },
    requestBody() {
      this.body = Object.assign({}, this.objectData)
      this.objectCodition = Object.assign({}, this.objectData.condition)
      console.log(this.objectData.condition)
      this.listShop = this.objectData.condition?.shops || []
      this.listCate = this.objectData.condition?.categorys || []
      this.listTrade = this.objectData.condition?.tradermarks || []
    },
    nameTypes() {
      this.nameType = this.typeId
        ? this.types.find(d => d.id === this.typeId).don_vi_tinh
        : ''
    },
    addConditions() {
      this.isCondition = true
      this.onShowDialog = true
      this.objectCodition = {}
    },
    updateConditions() {
      // this.isCondition = false;
      // this.onShowDialog = true;
      // this.objectCodition = objectData.condition;
      // console.log("-------------condition", objectData.condition);
      const body = {
        id: this.objectCodition.id,
        value_from: parseInt(this.objectCodition.value_from),
        value_to: parseInt(this.objectCodition.value_to),
        shop_ids: this.objectCodition ? this.objectCodition.shops.map(d => d.id) : this.listShop.map(d => d.id),
        category_ids: this.objectCodition ? this.objectCodition.categorys.map(d => d.id) : this.listCate.map(d => d.id),
        trademark_ids: this.objectCodition ? this.objectCodition.tradermarks.map(d => d.id) : this.listTrade.map(d => d.id)
      }
      this.loadingSubmit = true
      voucherResource.updateCondition(body).then(response => {
        console.log('confi', body)
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', {
            dialog: false,
            reload: true,
            body: body
          })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    handleClickButtonDialog(object) {
      const { dialog, body } = object
      console.log('----', body)
      this.onShowDialog = dialog
      this.min_money = body.value_from
      this.max_money = body.value_to
      this.shop_id = body.shop_id
      this.category_id = body.category_id
      this.trademark_id = body.trademark_id
      this.shop_name = body.shop_name ? body.shop_name : body.shop_id
      this.cate_name = body.cate_name ? body.cate_name : body.category_id
      this.trademark_name = body.trademark_name
        ? body.trademark_name
        : body.trademark_id
    },
    addVGA() {
      const vga = this.vgas[0]
      this.listVga.push(vga)
    },
    onDeleteParam(index) {
      this.listVga.splice(index, 1)
    },
    onSubmitForm() {
      if (this.isAdd) {
        this.onCreateVoucher()
      } else {
        this.onUpdateVoucher()
      }
    },
    getBodyCreate() {
      // const keys = Object.keys(this.body)
      if (this.isUser === true) {
        this.body.list_golfers = this.user_list.split(',')
      }
      this.body.condition = {
        value_from: parseInt(this.objectCodition.value_from),
        value_to: parseInt(this.objectCodition.value_to),
        shop_ids: this.listShop.map(d => d.id),
        category_ids: this.listCate.map(d => d.id),
        trademark_ids: this.listTrade.map(d => d.id)
      }
      this.body.type_voucher = this.typeVoucherId
      this.body.type = this.typeId
      // this.body.condition = condition;
      console.log(this.body.list_golfers)
      this.body.from_date = new Date(this.body.from_date).getTime()
      this.body.to_date = new Date(this.body.to_date).getTime()
      return this.body
    },
    onCreateVoucher() {
      const body = this.getBodyCreate()
      this.loadingSubmit = true
      voucherResource.storeVoucher(body).then(res => {
        console.log('----------------------------update vou', JSON.stringify(body))
        this.loadingSubmit = false
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.reLoad()
          this.goBack()
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
        } else {
          this.$message.error(msg)
          // this.reLoad();
        }
      })
    },
    getBody() {
      const keys = Object.keys(this.body)
      const body = {}
      if (this.isUser === true) {
        body.list_golfers = this.user_list.split(',')
      }
      this.condition = {
        value_from: parseInt(this.objectCodition.value_from),
        value_to: parseInt(this.objectCodition.value_to),
        shop_ids: this.objectCodition ? this.objectCodition.shops.map(d => d.id) : this.listShop.map(d => d.id),
        category_ids: this.objectCodition ? this.objectCodition.categorys.map(d => d.id) : this.listCate.map(d => d.id),
        trademark_ids: this.objectCodition ? this.objectCodition.tradermarks.map(d => d.id) : this.listTrade.map(d => d.id)
      }
      if (this.condition) {
        this.body.condition = this.condition
      }
      // if (this.typeVoucherId) {
      //   body.type_voucher = this.typeVoucherId;
      // }
      if (this.typeId) {
        body.type = this.typeId
      }
      if (this.body.from_date) {
        this.body.from_date = new Date(this.body.from_date).getTime()
      }
      if (this.body.to_date) {
        this.body.to_date = new Date(this.body.to_date).getTime()
      }
      for (const key of keys) {
        body[key] = this.body[key]
      }
      body.id = this.objectData.id
      return body
    },
    onUpdateVoucher() {
      const body = this.getBody()
      this.loadingSubmit = true
      voucherResource.updateVoucher(body).then(res => {
        console.log('body', body)
        this.loadingSubmit = false
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.goBack()
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
        } else {
          this.$message.error(msg)
          // this.reLoad();
        }
      })
    },
    reLoad() {
      this.body.code = ''
      this.body.from_date = ''
      this.body.to_date = ''
      this.body.type = ''
      this.body.name = ''
      this.body.max_use = ''
      this.body.value = ''
      this.body.description = ''
      this.body.limit_max = ''
      this.body.count_use_per_golfer = ''
      this.body.user_list = []
      this.shop_name = ''
      this.trademark_name = ''
      this.cate_name = ''
      this.min_money = ''
      this.max_money = ''
    },
    onSearchVga(key) {
      this.loadingUser = true
      accountResource.searchVga(key).then(res => {
        this.loadingUser = false
        const { error, data } = res
        if (error === 0) {
          if (data) {
            const name = `${data.name} - VGA${data.id}`
            data.label = name
            this.vgas = [data]
          } else {
            this.vgas = []
          }
        }
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: true })
    },
    formatNumber
  }
}
</script>

<style scoped>
.product-inf {
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.button-delivery {
  float: right;
}
.col-back {
  width: 25px;
}
</style>
