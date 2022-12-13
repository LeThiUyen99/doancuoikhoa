<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form :model="objectCodition">
      <el-form-item :label="$t('order_value')"> {{ `${objectCodition.value_from? formatNumber(objectCodition.value_from): 0} VND - ${objectCodition.value_to? formatNumber(objectCodition.value_to): 0} VND` }}
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
      <el-form-item :label="$t('shop')">
        <el-select
          v-model="objectCodition.shop_id"
          style="width:100%"
          :placeholder="$t('shop')"
        >
          <el-option
            v-for="shop in shops"
            :key="shop.id"
            :label="shop.name"
            :value="shop.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('category')">
        <el-select
          v-model="objectCodition.category_id"
          style="width:100%"
          :placeholder="$t('category')"
        >
          <el-option
            v-for="cate in categories"
            :key="cate.id"
            :label="cate.name"
            :value="cate.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('trademark')">
        <el-select
          v-model="objectCodition.trademark_id"
          style="width:100%"
          :placeholder="$t('trademark')"
        >
          <el-option
            v-for="mark in trademarks"
            :key="`mark_${mark.id}`"
            :label="mark.name"
            :value="mark.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t("canel") }}</el-button>
      <el-button type="primary" @click="onSubmit">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import i18n from '../../../lang/i18n'
import { formatNumber } from '@/utils/convert'
import ShopResource from '@/api/shop'
import CategoryResource from '@/api/category'
import TrademarkResource from '@/api/trademark'
import VoucherResource from '@/api/voucher'
const voucherResource = new VoucherResource()
const shopResource = new ShopResource()
const categoryResource = new CategoryResource()
const trademarkResource = new TrademarkResource()
export default {
  name: 'DialogConditions',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    objectCodition: {
      type: Object,
      default() {
        return {}
      }
    },
    isCondition: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      body: {},
      shops: [],
      categories: [],
      trademarks: [],
      listCondition: [],
      shopId: null,
      categoryId: null,
      trademarkId: null,
      dialog: { titleName: i18n.t('add_conditions'), buttonName: i18n.t('add') }
    }
  },
  created() {
    this.onGetListShop()
    this.onGetListCategories()
    this.onGetTrademarks()
    this.nameTitle()
  },
  methods: {
    nameTitle() {
      if (this.isCondition === true) {
        this.dialog = Object.assign({}, { titleName: i18n.t('add_conditions'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_conditions'), buttonName: i18n.t('update') })
      }
    },
    onSubmit() {
      if (this.isCondition) {
        this.createCondition()
      } else {
        this.updateCondition()
      }
    },
    createCondition() {
      const body = {
        value_from: parseInt(this.objectCodition.value_from),
        value_to: parseInt(this.objectCodition.value_to),
        shop_id: this.objectCodition.shop_id,
        shop_name: this.objectCodition.shop_id ? this.shops.find(d => d.id === this.objectCodition.shop_id).name : '',
        category_id: this.objectCodition.category_id,
        cate_name: this.objectCodition.category_id ? this.categories.find(d => d.id === this.objectCodition.category_id).name : '',
        trademark_id: this.objectCodition.trademark_id,
        trademark_name: this.objectCodition.trademark_id ? this.trademarks.find(d => d.id === this.objectCodition.trademark_id).name : ''
      }
      this.listCondition.push(body)
      console.log(this.listCondition)
      this.$emit('onClickButtonDialog', {
        dialog: false,
        reload: false,
        body: body
      })
    },
    updateCondition() {
      const body = {
        id: this.objectCodition.id,
        value_from: parseInt(this.objectCodition.value_from),
        value_to: parseInt(this.objectCodition.value_to),
        shop_id: this.objectCodition.shop_id,
        // shop_name: this.objectCodition.shop_id ? this.shops.find(d => d.id === this.objectCodition.shop_id).name : '',
        category_id: this.objectCodition.category_id,
        // cate_name: this.objectCodition.category_id ? this.categories.find(d => d.id === this.objectCodition.category_id).name : '',
        trademark_id: this.objectCodition.trademark_id
        // trademark_name: this.objectCodition.trademark_id ? this.trademarks.find(d => d.id === this.objectCodition.trademark_id).name : ''
      }
      this.loadingSubmit = true
      voucherResource.updateCondition(body).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, body: body })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
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
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    },
    formatNumber
  }
}
</script>

<style></style>
