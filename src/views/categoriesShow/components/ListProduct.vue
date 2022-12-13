<template>
  <el-row class="app-container list-product-show">
    <el-row>
      <h1>{{ $t('add_cate_product') }} {{ categoryShowName }}</h1>
    </el-row>
    <el-row>
      <el-row class="list-product__header-search">
        <el-col :sm="12" class="pr-lg-5">
          <el-input v-model="listQuery.q" :placeholder="$t('product_input')" />
        </el-col>
        <el-col :sm="4" class="pr-lg-5">
          <el-select v-model="filterId" :placeholder="$t('key_input')">
            <el-option v-for="filter in filters" :key="`filter_${filter.key}`" :label="filter.name" :value="filter.key" />
          </el-select>
        </el-col>
        <el-col :sm="8" class="pr-lg-5">
          <div class="text-right">
            <el-button type="primary" icon="el-icon-search" @click="requestProduct">{{ $t('search') }}</el-button>
            <el-button type="error" icon="el-icon-clear" @click="onGetListProduct">Clear</el-button>
            <el-button type="info" icon="el-icon-refresh" @click="onRefresh"> {{ $t('refresh') }}</el-button>
            <!-- <el-button type="primary" icon="el-icon-search" round @click="onGetListProduct">Tìm kiếm</el-button> -->
          </div>
        </el-col>
      </el-row>
      <el-col :sm="5" class="pr-lg-5">
        <el-select v-model="shopId" :placeholder="$t('filter_shop')">
          <el-option v-for="shop in shops" :key="shop.id" :label="shop.name" :value="shop.id" />
        </el-select>
      </el-col>
      <el-col :sm="5" class="pr-lg-5">
        <el-select v-model="categoryId" :placeholder="$t('filter_cate')">
          <el-option v-for="cate in categories" :key="cate.id" :label="cate.name" :value="cate.id" />
        </el-select>
      </el-col>
      <el-col :sm="5" class="pr-lg-5">
        <el-select v-model="trademarkId" :placeholder="$t('filter_trademarks')">
          <el-option v-for="mark in trademarks" :key="`mark_${mark.id}`" :label="mark.name" :value="mark.id" />
        </el-select>
      </el-col>
      <el-col :sm="5" class="pr-lg-5">
        <el-select v-model="tagId" :placeholder="$t('filter_tag')">
          <el-option v-for="tag in tags" :key="`ta_${tag.id}`" :label="tag.name" :value="tag.id" />
        </el-select>
      </el-col>
      <el-col :sm="4" class="pr-lg-5">
        <el-select v-model="activeId" :placeholder="$t('filter_active')">
          <el-option v-for="ac in actives" :key="ac.id" :label="ac.name" :value="ac.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="product-list" style="text-align: right; padding-top: 10px">
      <!--      <template slot-scope="scope">-->
      <el-button type="primary" @click="onConfirmClick">{{ $t('confirm') }}</el-button>
      <el-button @click="onCancelClick">{{ $t('canel') }}</el-button>
      <!--      </template>-->
    </el-row>
    <el-row class="list-product">
      <el-table
        ref="multipleTable"
        v-model="checkedAll"
        :loading="loadingTable"
        :data="listProduct"
        border
        style="width: 100%"
        :row-key="getRowKeys"
        @selection-change="handleCheckedAll"
        @select="chooseChecked"
      >
        <el-table-column
          :label="$t('id')"
          width="80"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('logo')"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image
              v-if="scope.row.thumb"
              :src="scope.row.thumb"
              :fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('name')"
          align="center"
        />
        <el-table-column
          :label="$t('shop')"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.shop_name ? scope.row.shop_name : '' }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('category')"
          align="center"
        >
          <template slot-scope="scope">{{ (scope.row.category_name) ? scope.row.category_name : '' }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('trademark')"
          align="center"
        >
          <template slot-scope="scope">{{ (scope.row.trademark_name) ? scope.row.trademark_name : '' }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('tag')"
          align="center"
        >
          <template slot-scope="scope">{{ (scope.row.tag_name) ? scope.row.tag_name : '' }}</template>
        </el-table-column>
        <el-table-column
          prop="name_param_first"
          :label="$t('attribute1')"
          align="center"
        />
        <el-table-column
          prop="name_param_second"
          :label="$t('attribute2')"
          align="center"
        />
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :label="$t('check')"
          prop="id"
          :reserve-selection="true"
        />
      </el-table>
      <el-row class="list-product__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestProduct" />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import i18n from '@/lang/i18n'
import CategoryShowResource from '@/api/Categories_show'
import ProductResource from '@/api/product'
import { formatNumber } from '@/utils/convert'
import Pagination from '@/components/Pagination'
import TagResource from '@/api/tag'
import ShopResource from '@/api/shop'
import CategoryResource from '@/api/category'
import TrademarkResource from '@/api/trademark'
const productResource = new ProductResource()
const categoryShowResource = new CategoryShowResource()
const tagResource = new TagResource()
const shopResource = new ShopResource()
const categoryResource = new CategoryResource()
const trademarkResource = new TrademarkResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'ListProduct',
  components: { Pagination },
  props: {
    categoryShowId: {
      type: Number,
      default() { return 0 }
    },
    goBack: {
      type: Function,
      default() {
        return null
      }
    },
    categoryShowName: {
      type: String,
      default() {
        return String
      }
    }
  },
  data() {
    return {
      loadingTable: false,
      contain: 'contain',
      listProduct: [],
      listProductChoosen: [],
      listProductOrigin: [],
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      actives: [{ id: 2, name: i18n.t('active_') }, { id: 1, name: i18n.t('hide') }],
      activeId: 2,
      categoryId: null,
      trademarkId: null,
      tagId: null,
      shops: [],
      shopId: null,
      filterId: null,
      filters: [{ key: 3, name: 'Tìm theo Id' }, { key: 1, name: i18n.t('find_by_product_code') }, { key: 2, name: i18n.t('find_by_product_name') }],
      tags: [],
      categories: [],
      trademarks: [],
      multipleSelection: [],
      checkedAll: false, // chon tat ca
      onlySelectedRow: false,
      getRowKeys(row) {
        return row.id
      }
    }
  },
  watch: {
    shopId(shop_id) {
      this.listQuery.shop_id = shop_id
      this.requestProduct()
    },
    filterId(filter_id) {
      this.listQuery.filter = filter_id
      if (this.listQuery.q && this.listQuery.q.trim().length) {
        this.requestProduct()
      }
    },
    tagId(tag_id) {
      this.listQuery.tag_id = tag_id
      this.requestProduct()
    },
    categoryId(category_id) {
      this.listQuery.category_id = category_id
      this.requestProduct()
    },
    trademarkId(trademark_id) {
      this.listQuery.trademark_id = trademark_id
      this.requestProduct()
    },
    activeId(ac) {
      this.listQuery.active = ac
      this.requestProduct()
    }
  },
  created() {
    this.requestProduct()
    this.onGetListShop()
    this.onGetListCategories()
    this.onGetTrademarks()
    this.onGetTag()
  },
  methods: {
    onCancelClick() {
      if (this.goBack) {
        this.goBack()
      }
    },
    pushToChoosen(product) {
      console.log('..................addd san pham : ', product)
      const og = this.listProductChoosen.find(d => d.id === product.id)
      if (og) {
        og.checked = product.checked
      } else {
        this.listProductChoosen.push({
          id: product.id,
          checked: product.checked
        })
      }
    },
    removeFromListchoosen(product) {
      console.log('.coas san pham : ', product)
      const index = this.listProductChoosen.findIndex(d => d.id === product.id)
      console.log('..................... index xoa ', index)
      if (index !== -1) {
        this.listProductChoosen.splice(index, 1)
      }
    },
    chooseChecked(row, selection) {
      this.onlySelectedRow = true
      console.log('index choosen 1', JSON.stringify(row.map(d => d.id)))
      console.log('index choosen 2', JSON.stringify(selection))
      selection.checked = !!row.length
      const find = row.find(d => d.id === selection.id)
      selection.checked = !!find
      const ogirin = this.listProductOrigin.find(d => d.id === selection.id)
      if (ogirin) {
        if (origin.checked !== selection.checked) {
          this.pushToChoosen(selection)
        }
      }
    },
    handleCheckedAll(rows) {
      if (this.onlySelectedRow) {
        this.onlySelectedRow = false
        return
      }
      console.log('......................check all : ', rows.length)
      if (rows.length) { // neu user tich all
        rows.forEach(d => {
          d.checked = true
        })
        for (const product of rows) {
          const product_origin = this.listProductOrigin.find(d => d.id === product.id)
          const product_checked = product.checked ? product.checked : false
          const origin_checked = product_origin.checked ? product_origin.checked : false
          console.log('................tim kiem xoa sp: ', product.checked, product_origin.checked)
          if (product_origin) {
            if (product_checked === origin_checked) {
              // neu tich lai
              this.removeFromListchoosen(product)
            } else {
              this.pushToChoosen(product)
            }
          }
        }
      } else {
        // bo tich all
        this.listProduct.forEach(d => {
          d.checked = false
        })
        for (const product of this.listProduct) {
          const product_origin = this.listProductOrigin.find(d => d.id === product.id)
          if (product_origin) {
            console.log('................kiem tra bo tich all', product.checked, product_origin.checked)
            if (product_origin.checked === product.checked) {
              // neu tich lai
              this.removeFromListchoosen(product)
            } else {
              this.pushToChoosen(product)
            }
          }
        }
      }
    },

    onConfirmClick() {
      this.$confirm(i18n.t('confirm_add_product')).then(_ => {
        this.requestAddProduct()
      }).catch(_ => {})
    },

    requestAddProduct() {
      console.log('...............kiem tra ', this.categoryId, this.trademarkId, this.shopId, this.tagId)
      // if (!this.categoryId && !this.trademarkId && !this.shopId && !this.tagId) {
      // them bt
      const body = {
        id: this.categoryShowId,
        products: this.listProductChoosen.map(d => {
          return {
            id: d.id,
            checked: d.checked
          }
        })
      }
      console.log('...................body them sp: ', JSON.stringify(this.listProductChoosen.map(d => d.id)), this.listProductChoosen.length)
      this.requestAddProductNormal(body)
      // } else {
      //   // them nhanh
      //   const body = {
      //     id: this.categoryShowId,
      //     shop_id: this.shopId,
      //     category_id: this.categoryId,
      //     trademark_id: this.trademarkId,
      //     tag_id: this.tagId
      //   }
      //   console.log('...................body them sp nhanh: ', JSON.stringify(body))
      //   this.requestAddProductsFast(body)
      // }
    },

    requestAddProductNormal(body) {
      this.loadingTable = true
      categoryShowResource.addProduct(body).then(res => {
        this.loadingTable = false
        console.log('...............them binh thuogn ', JSON.stringify(body))
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.refreshLoadData()
        } else {
          this.$message.error(msg)
        }
      })
    },
    /**
     * them nhieu san pham
     * @param body
     */
    requestAddProductsFast(body) {
      this.loadingTable = true
      categoryShowResource.addProductFast(body).then(res => {
        this.loadingTable = false
        console.log('...........add nhanh', res)
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.refreshLoadData()
        } else {
          this.$message.error(msg)
        }
      }).catch(e => {

      })
    },
    /**
     *  refrsh lai cac mang data sau khi update thanh cong
     */
    refreshLoadData() {
      for (const product_chooden of this.listProductChoosen) {
        const product_origin = this.listProductOrigin.find(d => d.id === product_chooden.id)
        if (product_origin) {
          product_origin.checked = product_chooden.checked
        }
      }
      this.listProductChoosen = []
    },
    requestProduct() {
      // this.checkedAll = false
      this.loadingTable = true
      productResource.listProduct(this.listQuery).then(response => {
        this.loadingTable = false
        const { error, list, total } = response
        if (error === 0) {
          this.checkedAll = false
          this.listProduct = list
          this.listProduct.forEach(d => {
            if (d.category_show_id === this.categoryShowId) {
              d.checked = true
            }
            d.checked = d.checked ? d.checked : false
          })
          console.log('....................load san pham', JSON.stringify(list.map(d => d.checked)))
          for (const product of list) {
            const product_clone = Object.assign({}, product)
            this.listProductOrigin.push(product_clone)
          }
          this.total = this.listQuery.page === 1 ? total : this.total

          setTimeout(() => {
            this.listProduct.forEach(d => {
              console.log('.....................checked', d.checked)
              const checked = d.checked ? d.checked : false
              this.$refs.multipleTable.toggleRowSelection(d, checked)
            })
          }, 100)
        } else {
          // this.listProduct = []
          // this.total = 0
        }
      })
    },

    formatNumber,
    onGetListProduct() {
      this.listQuery.q = ''
      this.filterId = null
      this.requestProduct()
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
        this.categories = [{ id: 0, name: i18n.t('default') }, ...response.list]
      })
    },
    onGetTrademarks() {
      trademarkResource.listTrademarkOption().then(response => {
        this.trademarks = [{ id: 0, name: i18n.t('default') }, ...response.list]
      })
    },
    onGetTag() {
      tagResource.tagListOption({ category_id: this.categoryId }).then(response => {
        this.tags = [{ id: 0, name: i18n.t('default') }, ...response.list]
      })
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
    onRefresh() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.requestProduct()
    }
  }
}
</script>

<style scoped>
.el-input--medium {
  margin-bottom: 10px;
}
.product-list {
  margin: 20px 0;
}
.el-select{
  width: 100%;
}
</style>
