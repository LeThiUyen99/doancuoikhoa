<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="99%"
  >
    <el-row class="dialog-product">
      <el-form ref="ruleForm" :model="objectProduct" status-icon :rules="rules">
        <el-row>
          <el-col :sm="18" class="pr-lg-10">
            <el-form-item :label="$t('product_id')" prop="product_code">
              <el-input v-model="objectProduct.product_code" :placeholder="$t('product_id')" autocomplete="off" />
            </el-form-item>
            <el-form-item :label="$t('product_name')" prop="name">
              <el-input v-model="objectProduct.name" :placeholder="$t('product_name')" autocomplete="off" />
            </el-form-item>
            <el-form-item :label="$t('product_desc')" prop="desc">
              <el-input v-model="objectProduct.desc" type="textarea" rows="10" :placeholder="$t('product_desc')" autocomplete="off" />
            </el-form-item>
            <el-row>
              <el-col :sm="6" class="pr-lg-5">
                <el-form-item :label="$t('attribute1')" prop="name_param_first">
                  <el-input v-model="objectProduct.name_param_first" :placeholder="$t('attribute1')" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :sm="6" class="pr-lg-5">
                <el-form-item :label="$t('attribute2')" prop="name_param_second">
                  <el-input v-model="objectProduct.name_param_second" :placeholder="$t('attribute2')" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :sm="6" class="pr-lg-5">
                <el-form-item :label="$t('weight')" prop="weight">
                  <el-input v-model="objectProduct.weight" type="number" :placeholder="$t('weight_gram')" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :sm="6" class="pr-lg-5">
                <el-form-item>
                  <label>{{ $t("ship_viettel") }}:</label>
                  <div class="delivery">
                    <el-select v-model="day_pickup" :placeholder="$t('ship_viettel')" style="width: 100%;">
                      <el-option
                        v-for="day in pickDays"
                        :key="`day_${day.key}`"
                        :label="day.name"
                        :value="day.key"
                      />
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="6" class="pr-lg-5">
                <el-form-item :label="$t('import_price')" prop="cost"> {{ $t("price_vnd").format(formatNumber(objectProduct.cost? objectProduct.cost: 0)) }}
                  <el-input v-model="objectProduct.cost" type="number" :placeholder="$t('import_price')" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :sm="6" class="pr-lg-5">
                <el-form-item :label="$t('price')" prop="price"> {{ $t("price_vnd").format(formatNumber(objectProduct.price? objectProduct.price: 0)) }}
                  <el-input v-model="objectProduct.price" type="number" :placeholder="$t('price')" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :sm="6" class="pr-lg-5">
                <el-form-item :label="$t('sale')" prop="sale"> {{ formatNumber(priceSale? priceSale: 0) }}%
                  <el-input v-model="priceSale" type="number" :placeholder="$t('sale')" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :sm="6">
                <el-form-item :label="$t('price_sale')" prop="sale">
                  <el-input disabled :placeholder="(priceSale > 0) ? Math.round(objectProduct.price - priceSale * objectProduct.price / 100) : objectProduct.price" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item :label="$t('Image')" prop="image">
                <div class="clearfix" />
                <upload-image-product :file-list="listImage" @onChangeUploadImage="handleChangeUploadImage" />
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :sm="6">
            <el-form-item :label="$t('product_cate')" prop="category_id">
              <el-select key="category" v-model="objectProduct.category_id" :placeholder="$t('product_cate')" class="w-100" @change="changeCategory">
                <el-option
                  v-for="category in categories"
                  :key="`category_${category.id}`"
                  :label="category.name"
                  :value="category.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item key="shop" :label="$t('shop')" prop="shop_id">
              <el-select v-model="objectProduct.shop_id" class="w-100" :placeholder="$t('shop')">
                <el-option
                  v-for="shop in shops"
                  :key="`shop_${shop.id}`"
                  :label="shop.name"
                  :value="shop.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item key="trademark" :label="$t('trademarks')" prop="trademark_id">
              <el-select v-model="objectProduct.trademark_id" class="w-100" :placeholder="$t('trademarks')" aria-label="acd">
                <el-option
                  v-for="trademark in trademarks"
                  :key="`trademark_${trademark.id}`"
                  :label="trademark.name"
                  :value="trademark.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('tag')" prop="tag_ids">
              <el-select
                v-model="product_tags"
                class="w-100"
                multiple
                filterable
                :placeholder="$t('tag')"
              >
                <el-option
                  v-for="tag in tags"
                  :key="`tag_${tag.id}`"
                  :label="tag.name"
                  :value="tag.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('priority_level')" prop="priority">
              <el-input v-model="objectProduct.priority" rows="10" :placeholder="$t('priority_level')" autocomplete="off" />
            </el-form-item>
            <el-form-item :label="$t('avatar')" prop="category_id">
              <div class="clearfix" />
              <upload-image :url-current="productAvatar" @onSetUrlImage="handleSetImageProduct" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <table-list-param :object-product="objectProduct" @onSetData="handleSetData" />
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { formatNumber } from '@/utils/convert'
import ProductResource from '@/api/product'
import { calculatorPriceSale } from '@/utils/product/convertProduct'
import UploadImageProduct from '@/views/products/components/UploadImageProduct'
import UploadImage from '@/components/UploadImage'
import { setRules } from '@/utils/product/validateProduct'
import TagResource from '@/api/tag'
const productResource = new ProductResource()
const tagResource = new TagResource()
import TableListParam from '@/views/products/components/TableListParam'
import i18n from '@/lang/i18n'

export default {
  name: 'DialogFormProduct',
  components: { TableListParam, UploadImage, UploadImageProduct },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    shops: {
      type: Array,
      default() { return [] }
    },
    categories: {
      type: Array,
      default() { return [] }
    },
    trademarks: {
      type: Array,
      default() { return [] }
    },
    // tags: {
    //   type: Array,
    //   default() { return [] }
    // },
    isAdd: {
      type: Boolean,
      default: false
    },
    productId: {
      type: Number,
      default() { return 0 }
    }
  },
  data() {
    return {
      rules: setRules(),
      dialog: { title: i18n.t('add_product'), buttonName: i18n.t('add') },
      priceSale: 0,
      numberSalePrice: 0,
      productAvatar: '',
      listImage: [],
      listProperties: null,
      loadingSubmit: false,
      objectProduct: {},
      product_tags: [],
      tags: [],
      pickDays: [
        { key: 0, name: 'Không' },
        { key: 1, name: 'Có' }
      ],
      day_pickup: 0,
      objectProductOrigin: {}// object san phẩm gốc
    }
  },
  watch: {
    productId(newID) {
      if (newID > 0) {
        this.onGetProductDetail(newID)
      }
    },
    isAdd(value) {
      if (value) {
        this.objectProduct = {}
        this.objectProductOrigin = {}
        this.listProperties = null
        this.dialog = Object.assign({}, { title: i18n.t('add_product'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { title: i18n.t('update_product'), buttonName: i18n.t('update') })
      }
    }
  },
  methods: {
    changeCategory(id) {
      this.tags = []
      this.product_tags = []
      this.onGetTag(id)
    },
    onGetTag(categoryId) {
      tagResource.tagListOption({ category_id: categoryId }).then(response => {
        this.tags = [...response.list]
      })
    },
    onGetProductDetail(id) {
      productResource.DetailProduct(id).then(response => {
        const result = response.info
        console.log('........................ chi tiet san pham : ', JSON.stringify(result))
        this.objectProduct = Object.assign({}, result)
        // this.objectProduct = result
        this.objectProductOrigin = Object.assign({}, result)
        // this. = result.tags ? result.tag_ids : []
        // console.log('.................list tags : ', tags)
        const category_id = result.category_id
        if (category_id) {
          this.onGetTag(category_id)
        }
        this.product_tags = result.tags.map(d => d.id)
        this.priceSale = result.sale
        this.productAvatar = result.thumb
        // console.log('................................123', result)
        this.day_pickup = result.day_pickup
        if (result.images && result.images.length > 0) {
          const arrayImage = []
          result.images.map(image => {
            arrayImage.push({ url: image })
          })
          this.listImage = [...arrayImage]
        }
        // this.objectProduct.tag_ids = JSON.parse(result.tag_ids)
      })
    },
    onSubmitForm(formName) {
      if (this.listImage.length > 0) {
        const array = []
        this.listImage.map(image => {
          array.push(image.url)
        })
        this.objectProduct.images = [...array]
      } else {
        this.objectProduct.images = []
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.handleCreateProduct()
          } else {
            this.handleUpdateProduct()
          }
        } else {
          return false
        }
      })
    },
    handleCreateProduct() {
      this.$confirm(i18n.t('confirm_add_product')).then(_ => {
        this.objectProduct.map_params = this.listProperties ? JSON.stringify(this.listProperties) : undefined
        this.objectProduct.day_pickup = this.day_pickup
        this.objectProduct.tag_ids = this.formatTags(this.product_tags)
        this.objectProduct.sale = this.priceSale
        this.loadingSubmit = true
        console.log('-----------------------', JSON.stringify(this.objectProduct.tag_ids))
        productResource.storeProduct(this.objectProduct).then(response => {
          this.loadingSubmit = false
          if (response.error === 0) {
            this.$message.success(response.msg)
            this.$emit('onClickButtonForm', { dialog: false, reload: true })
            this.handleClearData()
          } else {
            this.$message.error(response.msg)
          }
        }).catch(err => {
          this.loadingSubmit = false
          this.$message.error('Có lỗi xảy ra ' + err)
        })
      })
    },
    formatTags(array) {
      const tags = []
      for (const tag of array) {
        if (typeof (tag) === 'object') {
          tags.push(tag.id)
        } else {
          tags.push(tag)
        }
      }
      return tags
    },
    getBodyUpdate() {
      // this.objectProduct.map_params = this.listProperties ? JSON.stringify(this.listProperties) : undefined
      this.objectProduct.tag_ids = this.formatTags(this.product_tags).join(',')// JSON.stringify(this.product_tags)
      this.objectProduct.day_pickup = this.day_pickup
      console.log(this.objectProduct.day_pickup)
      this.objectProduct.sale = this.priceSale
      const keys = Object.keys(this.objectProduct)
      const body = {}
      for (const key of keys) {
        if (key === 'images') { // iamge la doi tuong nen phai so sanh cac phan tu torng mang image vs nhau
          const images = this.objectProduct[key] || []
          const image_origin = this.objectProductOrigin[key] || []
          if (images.length !== image_origin.length) { // mang co chieu dai khac nhau thi se lay du lieu tu giao dien day len sever
            body[key] = this.objectProduct[key]
            continue// thoat khoi vong for hien tai
          }
          for (let i = 0; i < images.length; i++) { // neu 2 mang co cung chieu dai thi so sanh cac phan tu tuong ung trong 2 mang vs nhau
            if (images[i] !== image_origin[i]) { // chi can 1 phan tu khac phan tu tuong ung o mang kia chung to mang da bi thay doi
              body[key] = this.objectProduct[key]// luu lai mang image tu giao dien dong thoi thoat khoi vong for con
              break
            }
          }
          continue// bo qua cau lenh dang sau vong for hien tai
        }
        if (this.objectProduct[key] !== this.objectProductOrigin[key]) {
          body[key] = this.objectProduct[key]
        }
      }
      body.id = this.objectProduct.id
      console.log('............body update : ', JSON.stringify(body))
      return body
    },
    handleUpdateProduct() {
      // this.objectProduct.map_params = JSON.stringify(this.listProperties)
      // this.objectProduct.tag_ids = this.formatTags(this.product_tags)// JSON.stringify(this.product_tags)
      // this.objectProduct.sale = this.priceSale
      const body = this.getBodyUpdate()
      if (Object.keys(body).length <= 1) {
        this.$emit('onClickButtonForm', { dialog: false, reload: false })
        return
      }
      this.loadingSubmit = true
      productResource.updateProduct(body).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$message.success(response.msg)
          this.$emit('onClickButtonForm', { dialog: false, reload: true })
          this.handleClearData()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.loadingSubmit = false
        console.log('.....................loi, ', error)
      })
    },
    handleSetData(data) {
      console.log('..................xoa thuoc tinh ', data)
      this.listProperties = [...data]
    },
    handleCalculatorPriceSale(sale) {
      if (this.priceSale === 0) {
        this.numberSalePrice = this.objectProduct.price
      } else {
        this.numberSalePrice = calculatorPriceSale(this.objectProduct.price, sale)
      }
    },
    handleChangeUploadImage(images) {
      console.log('........list image update ', JSON.stringify(images))
      this.listImage = [...images]
    },
    handleSetImageProduct(object) {
      if (Object.keys(object).length > 0) {
        this.objectProduct.thumb = object.name
      }
    },
    handleClearData() {
      this.listImage = []
      this.productAvatar = ''
      this.priceSale = 0
      this.day_pickup = 0
    },
    formatNumber,
    handleClose() {
      this.handleClearData()
      if (Object.keys(this.objectProduct).length > 0 && this.isAdd) {
        this.$confirm(i18n.t('comfirm_product')).then(_ => {
          this.$emit('onClickButtonForm', { dialog: false, reload: false })
        }).catch(_ => {})
      } else {
        this.$emit('onClickButtonForm', { dialog: false, reload: false })
      }
    }
  }
}
</script>

<style lang="scss">
.el-dialog {
  margin-top: 20px !important;
}
</style>
