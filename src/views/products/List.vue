<template>
  <el-row class="app-container list-product">
    <el-row class="list-product__header mb-10">
      <el-row class="list-product__header-title">
        <el-col :sm="12">
          <h3>{{ $t("product_list") }}</h3>
        </el-col>
        <el-col :sm="12">
          <div class="text-right">
            <el-button
              v-if="is_write"
              type="warning"
              @click="updateProductExist = true"
            >{{ $t("products_exist") }}</el-button>
            <el-button
              v-if="is_write"
              type="warning"
              @click="showDialogImport = true"
            >{{ $t("import") }}</el-button>
            <el-button
              v-if="is_write"
              type="primary"
              @click="showDialogExport"
            >{{ $t("export") }}</el-button>
            <el-button
              v-if="is_write"
              type="primary"
              @click="onShowDialogCreate"
            >{{ $t("add") }}</el-button>
            <!--            <el-col :sm="17" class="pr-lg-5">-->
            <!--              <el-select v-model="sort_type_data" placeholder="Sắp xếp">-->
            <!--                <el-option v-for="sort in list_sort_type" :key="sort.key" :label="sort.name" :value="sort" />-->
            <!--              </el-select>-->
            <!--            </el-col>-->
          </div>
        </el-col>
      </el-row>
      <el-row class="list-product__header-search">
        <el-col :sm="12" class="pr-lg-5">
          <el-input v-model="listQuery.q" :placeholder="$t('product_input')" />
        </el-col>
        <el-col :sm="4" class="pr-lg-5">
          <el-select v-model="filterId" :placeholder="$t('key_input')">
            <el-option
              v-for="filter in filters"
              :key="`filter_${filter.key}`"
              :label="filter.name"
              :value="filter.key"
            />
          </el-select>
        </el-col>
        <el-col :sm="8" class="pr-lg-5">
          <div class="text-right">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="requestListProduct"
            >{{ $t("search") }}</el-button>
            <el-button
              type="error"
              icon="el-icon-clear"
              @click="onGetListProduct"
            >{{ $t("clear") }}</el-button>
            <el-button type="info" icon="el-icon-refresh" @click="onRefresh">
              {{ $t("refresh") }}</el-button>
            <!-- <el-button type="primary" icon="el-icon-search" round @click="onGetListProduct">Tìm kiếm</el-button> -->
          </div>
        </el-col>
      </el-row>
      <el-col :sm="5" class="pr-lg-5">
        <!-- <el-select v-model="shopId" :placeholder="$t('filter_shop')">
          <el-option v-for="shop in shops" :key="shop.id" :label="shop.name" :value="shop.id" />
        </el-select> -->
        <el-select
          v-model="shopId"
          style="width: 100%"
          class="w-100"
          filterable
          remote
          :multiple-limit="1"
          :placeholder="$t('filter_shop')"
        >
          <el-option
            v-for="shop in shops"
            :key="shop.id"
            :label="shop.name"
            :value="shop.id"
          />
        </el-select>
      </el-col>
      <el-col :sm="5" class="pr-lg-5">
        <!-- <el-select v-model="categoryId" :placeholder="$t('filter_cate')">
          <el-option v-for="cate in categories" :key="cate.id" :label="cate.name" :value="cate.id" />
        </el-select> -->
        <el-select
          v-model="categoryId"
          style="width: 100%"
          class="w-100"
          filterable
          remote
          :multiple-limit="1"
          :placeholder="$t('filter_cate')"
        >
          <el-option
            v-for="cate in categories"
            :key="cate.id"
            :label="cate.name"
            :value="cate.id"
          />
        </el-select>
      </el-col>
      <el-col :sm="5" class="pr-lg-5">
        <!-- <el-select v-model="trademarkId" :placeholder="$t('filter_trademarks')">
          <el-option
            v-for="mark in trademarks"
            :key="`mark_${mark.id}`"
            :label="mark.name"
            :value="mark.id"
          />
        </el-select> -->
        <el-select
          v-model="trademarkId"
          style="width: 100%"
          class="w-100"
          filterable
          remote
          :multiple-limit="1"
          :placeholder="$t('filter_trademarks')"
        >
          <el-option
            v-for="mark in trademarks"
            :key="`mark_${mark.id}`"
            :label="mark.name"
            :value="mark.id"
          />
        </el-select>
      </el-col>
      <el-col :sm="5" class="pr-lg-5">
        <!-- <el-select v-model="tagId" :placeholder="$t('filter_tag')">
          <el-option
            v-for="tag in tags"
            :key="`ta_${tag.id}`"
            :label="tag.name"
            :value="tag.id"
          />
        </el-select> -->
        <el-select
          v-model="tagId"
          style="width: 100%"
          class="w-100"
          filterable
          remote
          :multiple-limit="1"
          :placeholder="$t('filter_tag')"
        >
          <el-option
            v-for="tag in tags"
            :key="`ta_${tag.id}`"
            :label="tag.name"
            :value="tag.id"
          />
        </el-select>
      </el-col>
      <el-col :sm="4" class="pr-lg-5">
        <el-select v-model="activeId" :placeholder="$t('filter_active')">
          <el-option
            v-for="ac in actives"
            :key="ac.id"
            :label="ac.name"
            :value="ac.id"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="list-product__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        :element-loading-text="loading_text"
        border
        style="width: 100%"
      >
        <el-table-column :label="$t('id')" width="80">
          <template slot-scope="scope">
            <el-link type="primary" @click="onShowDialogDetail(scope.row)">{{
              `#${scope.row.id}`
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('logo')" width="110" align="center">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-link
              type="primary"
              @click="onShowDialogProductDetail(scope.row.images)"
            >
              <el-image
                v-if="scope.row.thumb"
                :src="scope.row.thumb"
                :fit="contain"
              />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('name')" align="center" />
        <el-table-column :label="$t('shop')" align="center">
          <template slot-scope="scope">{{
            scope.row.shop_name ? scope.row.shop_name : ""
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('category')" align="center">
          <template slot-scope="scope">{{
            scope.row.category_name ? scope.row.category_name : ""
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('trademark')" align="center">
          <template slot-scope="scope">{{
            scope.row.trademark_name ? scope.row.trademark_name : ""
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('tag')" align="center">
          <template slot-scope="scope">{{
            scope.row.tag_name ? scope.row.tag_name : ""
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('import_price')" align="center">
          <template slot-scope="scope">{{
            `${formatNumber(scope.row.cost)} VNĐ`
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('price')" align="center">
          <template slot-scope="scope">{{
            `${formatNumber(scope.row.price)} VNĐ`
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('price_sale')" align="center">
          <template slot-scope="scope">{{
            `${formatNumber(scope.row.price_sale)} VNĐ`
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('attribute1')" align="center">
          <template slot-scope="scope">{{
            formatAtributed(
              scope.row.name_param_first,
              scope.row.params.map(d => d.param_first)
            )
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('attribute2')" align="center">
          <template slot-scope="scope">{{
            formatAtributed(
              scope.row.name_param_second,
              scope.row.params.map(d => d.param_second)
            )
          }}</template>
        </el-table-column>
        <!--        <el-table-column v-if="is_delete || is_edit" label="Action" width="120" align="center">-->
        <el-table-column :label="$t('active')" width="120" align="center">
          <template slot-scope="scope">
            <!--            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />-->
            <el-button
              v-if="is_edit"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="onShowDialogEdit(scope.row)"
            />
            <el-button
              v-if="is_delete"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteProduct(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="list-shop__footer">
      <pagination
        v-show="total > listQuery.limit"
        :total="total"
        :limit.sync="listQuery.limit"
        :page.sync="listQuery.page"
        @pagination="requestListProduct"
      />
    </el-row>
    <dialog-import-excel
      :dialog-visible="showDialogImport"
      @onClickButtonImport="handleClickButtonImport"
    />
    <dialog-import-product :dialog-visible="updateProductExist" @onClickButtonImport="handleClickButtonImportProduct" />
    <dialog-form-product
      :dialog-visible="showDialogForm"
      :product-id="productID"
      :is-add="isAdd"
      :shops="shops"
      :tags="tags"
      :categories="categories"
      :trademarks="trademarks"
      @onClickButtonForm="handleClickButtonForm"
    />
    <detail-product
      :dialog-visible="showDialogProductDetail"
      :image_urls="url_image"
      @onClickButtonDialogDetail="handleClickButtonDialogDetail"
    />
    <detail
      :dialog-visible="showDialogDetail"
      :product-id="idProduct"
      @onClickButtonDialogDetail="handleClickButtonDialogProductDetail"
    />
  </el-row>
</template>

<script>
import ProductResource from '@/api/product'
import TagResource from '@/api/tag'
import ShopResource from '@/api/shop'
import CategoryResource from '@/api/category'
import TrademarkResource from '@/api/trademark'
import Pagination from '@/components/Pagination'
const productResource = new ProductResource()
const tagResource = new TagResource()
const shopResource = new ShopResource()
const categoryResource = new CategoryResource()
const trademarkResource = new TrademarkResource()
import { formatNumber } from '@/utils/convert'
import DialogImportExcel from '@/views/products/components/DialogImportExcel'
import DialogImportProduct from './components/DialogImportProduct.vue'
import DialogFormProduct from '@/views/products/components/DialogFormProduct'
import DetailProduct from '@/views/products/components/DetailProduct'
import Detail from '@/views/products/components/Detail'
import { getAcountInfo, parseJson } from '@/utils/auth'
import i18n from '@/lang/i18n'
const defaultQuery = {
  page: 1,
  limit: 10
}
const LOADING_TEXT = {
  LOADING: 'Đang tải dữ liệu...',
  EXPORT: 'Đang xuất dữ liệu, vui lòng đợi...'
}
export default {
  name: 'List',
  components: {
    DialogFormProduct,
    DialogImportExcel,
    Pagination,
    DetailProduct,
    Detail,
    DialogImportProduct
  },
  data() {
    const account = getAcountInfo()
    // console.log('...................bien toan cuc : ', typeof account)
    return {
      loading_text: LOADING_TEXT.LOADING,
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      showDialogDetail: false,
      url_image: [],
      contain: 'contain',
      showDialogProductDetail: false,
      loadingTable: false,
      tableData: [],
      shops: [],
      shopId: null,
      filterId: null,
      filters: [
        { key: 3, name: 'Tìm theo Id' },
        { key: 1, name: 'Tìm theo mã sản phẩm' },
        { key: 2, name: 'Tìm theo tên sản phẩm' }
      ],
      tags: [],
      categories: [],
      trademarks: [],
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      showDialogImport: false,
      updateProductExist: false,
      showDialogForm: false,
      isAdd: true,
      productID: 0,
      idProduct: 0,
      categoryId: null,
      trademarkId: null,
      tagId: null,
      activeId: 2,
      actives: [
        { id: 2, name: 'Kích hoạt' },
        { id: 1, name: 'Tạm ẩn' }
      ],
      // sort_type_data: null,
      list_sort_type: [
        {
          key: 1,
          name: 'Priority'
        },
        {
          key: 2,
          name: 'Giá tăng dần'
        },
        {
          key: 3,
          name: 'Giá giảm dần'
        },
        {
          key: 4,
          name: 'Khuyến mại'
        },
        {
          key: 5,
          name: 'Sản phẩm mới'
        },
        {
          key: 6,
          name: 'Mã sản phẩm'
        }
      ]
    }
  },
  watch: {
    shopId(shop_id) {
      this.listQuery.shop_id = shop_id
      // this.onGetListRevenue()
      this.requestListProduct()
    },
    filterId(filter_id) {
      this.listQuery.filter = filter_id
      if (this.listQuery.q && this.listQuery.q.trim().length) {
        this.requestListProduct()
      }
    },
    tagId(tag_id) {
      this.listQuery.tag_id = tag_id
      this.requestListProduct()
    },
    categoryId(category_id) {
      this.listQuery.category_id = category_id
      this.onGetTag()
      this.requestListProduct()
    },
    trademarkId(trademark_id) {
      this.listQuery.trademark_id = trademark_id
      this.requestListProduct()
    },
    activeId(ac) {
      this.listQuery.active = ac
      this.requestListProduct()
    }
  },
  created() {
    this.onGetListShop()
    this.requestListProduct()
    this.onGetListCategories()
    this.onGetTrademarks()
    // this.onGetTag()
  },
  methods: {
    formatAtributed(params_name, params_value) {
      const values = params_value.filter(d => d !== null)
      var text_show = `${params_name}`
      if (values.length) {
        text_show = `${text_show}(${values.join(',')})`
      }
      return text_show
    },
    showDialogExport() {
      this.$confirm(`Bạn có chắc chắn muốn export dữ liệu`).then(_ => {
        this.loading_text = LOADING_TEXT.EXPORT
        this.loadingTable = true
        productResource
          .getExportList(this.listQuery)
          .then(response => {
            setTimeout(() => {
              this.loadingTable = false
              const { error, msg } = response
              if (error === 0) {
                this.confirmDowload(response.link)
              } else {
                this.$message.error(msg)
              }
            }, 2000)
          })
          .catch(_ => {
            this.loadingTable = false
          })
      })
    },
    confirmDowload(url) {
      this.getFileFromServer(url)
    },
    async getFileFromServer(url) {
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      const response = await fetch(url)
      const blob = await response.blob()
      const newBlob = new Blob([blob])
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
      } else {
        const objUrl = window.URL.createObjectURL(newBlob)
        const link = document.createElement('a')
        link.href = objUrl
        link.download = fileName
        link.click()
        setTimeout(() => {
          window.URL.revokeObjectURL(objUrl)
          this.$message.success(
            'Đã export thành công, vui lòng vào thư mục download để lấy'
          )
        }, 250)
      }
    },
    onShowDialogDetail(row) {
      this.idProduct = row.id
      this.showDialogDetail = true
    },
    handleClickButtonDialogProductDetail(object) {
      this.showDialogDetail = object.dialog
      this.idProduct = 0
      if (object.reload) {
        this.requestListProduct()
      }
    },
    onShowDialogProductDetail(urls) {
      urls = parseJson(urls)
      this.url_image = [...urls]
      console.log(
        ('.................click list url : ', JSON.stringify(this.url_image))
      )
      this.showDialogProductDetail = true
    },
    handleClickButtonDialogDetail(object) {
      this.showDialogProductDetail = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    onShowDialogCreate() {
      this.DetailProduct = {}
      this.isAdd = true
      this.showDialogForm = true
    },
    onShowDialogEdit(row) {
      this.productID = row.id
      this.isAdd = false
      this.showDialogForm = true
    },
    handleClickButtonForm(object) {
      this.showDialogForm = object.dialog
      this.productID = 0
      if (object.reload) {
        this.requestListProduct()
      }
    },
    handleClickButtonImportProduct(object) {
      this.updateProductExist = object.dialog
      if (object.reload) {
        this.requestListProduct()
      }
    },
    handleClickButtonImport(object) {
      this.showDialogImport = object.dialog
      if (object.reload) {
        this.requestListProduct()
      }
    },
    onDeleteProduct(row) {
      this.$confirm(i18n.t('delete_category_confirm').format(row.name))
        .then(_ => {
          productResource.deleteProduct(row.id).then(response => {
            if (response.error === 0) {
              this.requestListProduct()
              this.$message.success(response.msg)
            } else {
              this.$message.warning(response.msg)
            }
          })
        })
        .catch(_ => {})
    },
    requestListProduct() {
      this.loading_text = LOADING_TEXT.LOADING
      this.loadingTable = true
      console.log(
        '............ lay san pham : ',
        JSON.stringify(this.listQuery)
      )
      productResource
        .listProduct(this.listQuery)
        .then(response => {
          console.log(
            '---------------------------------------------lítproduct',
            JSON.stringify(response)
          )
          this.loadingTable = false
          if (response.error === 0) {
            this.tableData = response.list
            this.total =
              this.listQuery.page === 1 ? response.total : this.total
          } else {
            this.tableData = []
          }
        })
        .catch(error => {
          this.loadingTable = false
          this.$message.error(`Có lỗi xảy ra : ${error}`)
        })
    },
    onGetListProduct() {
      this.listQuery.q = ''
      this.filterId = null
      this.requestListProduct()
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
    onGetTag() {
      tagResource
        .tagListOption({ category_id: this.categoryId })
        .then(response => {
          this.tags = [{ id: 0, name: i18n.t('default') }, ...response.list]
        })
    },
    onRefresh() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.requestListProduct()
    },
    handleGetNameShop(shopID) {
      const shops = this.shops
      if (shops.length > 0) {
        shops.map(shop => {
          if (shopID === shop.id) {
            return shop.name
          }
        })
      }
      return ''
    },
    handleGetNameCategogy(category_id) {
      if (this.categories.length > 0) {
        this.categories.map(category => {
          if (category_id === category.id) {
            return category.name
          }
        })
      }
      return ''
    },
    formatNumber
  }
}
</script>

<style lang="scss" scoped>
.el-input--medium {
  margin-bottom: 10px;
}
.el-select {
  width: 100%;
}
</style>
