<template>
  <el-row class="list-sale__data">
    <el-row class="list-sale__header-search">
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
          <el-button type="primary" icon="el-icon-search" @click="onSearchClick">{{ $t('search') }}</el-button>
          <el-button type="error" icon="el-icon-clear" @click="clearSale">{{ $t('clear') }}</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="onRefresh">{{ $t('refresh') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="6" class="fil pr-lg-5">
        <!-- <el-select ref="refSelectShop" v-model="shopId" :placeholder="$t('filter_shop')" @focus="focusSelect">
          <el-option v-for="shop in shops" :key="shop.id" :label="shop.name" :value="shop.id" />
        </el-select> -->
        <el-select ref="refSelectShop" v-model="shopId" style="width: 100%" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('filter_shop')" @focus="focusSelect">
          <el-option v-for="shop in shops" :key="shop.id" :label="shop.name" :value="shop.id" />
        </el-select>
      </el-col>
      <el-col :sm="6" class="fil pr-lg-5">
        <!-- <el-select ref="refSelectCategory" v-model="categoryId" :placeholder="$t('filter_cate')" @focus="focusSelectCategory">
          <el-option v-for="cate in categories" :key="cate.id" :label="cate.name" :value="cate.id" />
        </el-select> -->
        <el-select ref="refSelectCategory" v-model="categoryId" style="width: 100%" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('filter_cate')" @focus="focusSelectCategory">
          <el-option v-for="cate in categories" :key="cate.id" :label="cate.name" :value="cate.id" />
        </el-select>
      </el-col>
      <el-col :sm="6" class="fil pr-lg-5">
        <!-- <el-select ref="refSelectTrademark" v-model="trademarkId" :placeholder="$t('filter_trademarks')" @focus="focusSelectTrademark">
          <el-option v-for="mark in trademarks" :key="`mark_${mark.id}`" :label="mark.name" :value="mark.id" />
        </el-select> -->
        <el-select ref="refSelectTrademark" v-model="trademarkId" style="width: 100%" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('filter_trademarks')" @focus="focusSelectTrademark">
          <el-option v-for="mark in trademarks" :key="`mark_${mark.id}`" :label="mark.name" :value="mark.id" />
        </el-select>
      </el-col>
      <el-col :sm="6" class="fil pr-lg-5">
        <!-- <el-select ref="refSelectTag" v-model="tagId" :placeholder="$t('filter_tag')" @focus="focusSelectTag">
          <el-option v-for="tag in tags" :key="`ta_${tag.id}`" :label="tag.name" :value="tag.id" />
        </el-select> -->
        <el-select ref="refSelectTag" v-model="tagId" style="width: 100%" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('filter_tag')" @focus="focusSelectTag">
          <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="list-sale__data">
      <el-col :sm="24">
        <div class="text-right">
          <el-button v-if="is_write" type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
        </div>
      </el-col>
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('id')"
          width="80"
          align="center"
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
            <el-link type="primary" @click="onShowDialogSaleDetail(scope.row.thumb)">
              <el-image
                v-if="scope.row.thumb"
                :src="scope.row.thumb"
                :fit="contain"
              />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('name')"
          align="center"
        />
        <el-table-column
          prop="shop_name"
          :label="$t('shop')"
          align="center"
        />
        <el-table-column
          prop="category_name"
          :label="$t('category')"
          align="center"
        />
        <el-table-column
          prop="trademark_name"
          :label="$t('trademark')"
          align="center"
        />
        <el-table-column
          prop="tag_name"
          :label="$t('tag')"
          align="center"
        />
        <el-table-column
          :label="$t('price')"
          align="center"
        >
          <template slot-scope="scope">{{ $t('price_vnd').format(formatNumber(scope.row.price)) }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('price_sale')"
          align="center"
        >
          <template slot-scope="scope">{{ $t('price_vnd').format(formatNumber(scope.row.price_sale)) }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('sale')"
          align="center"
        >
          <template slot-scope="props">
            <template v-if="props.row.state === 0">{{ props.row.sale }}%</template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('priority')"
          align="center"
        >
          <template slot-scope="props">
            <template v-if="props.row.state === 1">{{ props.row.priority }}</template>
          </template>
        </el-table-column>
        <el-table-column v-if="is_edit" :label="$t('action')" width="120" align="center">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <dialog-form-sale
        :show-dialog="onShowDialog"
        :is-add="isAdd"
        :object-data="objectSale"
        @onClickButtonDialog="handleClickButtonDialog"
      />
      <detail-sale :dialog-visible="showDialogSaleDetail" :url="url_image" @onClickButtonDialogDetail="handleClickButtonDialogDetail" />
    </el-row>
  </el-row>
</template>

<script>
import DialogFormSale from '@/views/sale/components/DialogFormSale'
import { formatNumber } from '@/utils/convert'
import DetailSale from '@/views/sale/components/DetailSale'
import { getAcountInfo } from '@/utils/auth'
import i18n from '@/lang/i18n'

const OPTION_TYPE = {
  SHOP: 1,
  CATEGORY: 2,
  TRADER_MARK: 3,
  TAG: 4
}
export default {
  name: 'TableSale',
  components: { DialogFormSale, DetailSale },
  props: {
    state: {
      type: Number,
      default() {
        return 0
      }
    },
    tableData: {
      type: Array,
      default() {
        return [{ id: 0, name: 'Default' }]
      }
    },
    requestListSale: {
      type: Function,
      default() {
        return null
      }
    },
    dataShop: {
      type: Array,
      default() {
        return []
      }
    },
    requestOptionSale: {
      type: Function,
      default() {
        return null
      }
    }
  },
  data() {
    const account = getAcountInfo()
    // this.onGetListShop()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      objectSale: {},
      shops: [],
      shopId: null,
      filterId: null,
      filters: [{ key: 1, name: i18n.t('find_by_product_code') }, { key: 2, name: i18n.t('find_by_product_name') }],
      tags: [],
      loadingTable: false,
      categories: [],
      trademarks: [],
      total: 0,
      categoryId: null,
      trademarkId: null,
      tagId: null,
      activeId: 2,
      actives: [{ id: 2, name: i18n.t('active_') }, { id: 1, name: i18n.t('hide') }],
      isAdd: true,
      onShowDialog: false,
      listQuery: {},
      is_block: false,
      disabled: false,
      url_image: '',
      contain: 'contain',
      showDialogSaleDetail: false
    }
  },
  watch: {
    shopId(shop_id) {
      this.listQuery.shop_id = shop_id
      console.log('..................shop ', shop_id)
      this.requestListSale(this.listQuery)
    },
    filterId(filter_id) {
      this.listQuery.filter = filter_id
      if (this.listQuery.q && this.listQuery.q.trim().length) {
        this.requestListSale(this.listQuery)
      }
    },
    tagId(tag_id) {
      this.listQuery.tag_id = tag_id
      this.requestListSale(this.listQuery)
    },
    categoryId(category_id) {
      // this.tags = []
      this.listQuery.category_id = category_id
      // delete this.listQuery.tag_id
      this.requestListSale(this.listQuery)
    },
    trademarkId(trademark_id) {
      this.listQuery.trademark_id = trademark_id
      this.requestListSale(this.listQuery)
    }
  },
  methods: {
    onShowDialogSaleDetail(url) {
      this.url_image = url
      this.showDialogSaleDetail = true
    },
    handleClickButtonDialogDetail(object) {
      this.showDialogSaleDetail = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    onSearchClick() {
      if (this.requestListSale) {
        this.requestListSale(this.listQuery)
      }
    },
    setOption(options, type = OPTION_TYPE.SHOP) {
      switch (type) {
        case OPTION_TYPE.SHOP:
          this.shops = [...options]
          if (this.$refs.refSelectShop) {
            this.$refs.refSelectShop.selectOption()
          }
          break
        case OPTION_TYPE.CATEGORY:
          this.categories = [...options]
          if (this.$refs.refSelectCategory) {
            this.$refs.refSelectCategory.selectOption()
          }
          break
        case OPTION_TYPE.TRADER_MARK:
          this.trademarks = [...options]
          if (this.$refs.refSelectTrademark) {
            this.$refs.refSelectTrademark.selectOption()
          }
          break
        case OPTION_TYPE.TAG:
          this.tags = [...options]
          if (this.$refs.refSelectTag) {
            this.$refs.refSelectTag.selectOption()
          }
          break
        default:
          break
      }
    },
    focusSelect() {
      console.log('.........................focus shop')
      if (this.shops.length) {
        if (this.$refs.refSelectShop) {
          console.log('.........................focus shop 1')
          this.$refs.refSelectShop.selectOption()
        }
        console.log('.........................focus shop 2')
        return
      }
      console.log('.........................focus shop 3')
      if (this.requestOptionSale) {
        this.requestOptionSale(OPTION_TYPE.SHOP, {}, (data) => {
          this.shops = [...data]
          if (this.$refs.refSelectShop) {
            this.$refs.refSelectShop.selectOption()
          }
        })
      }
    },
    focusSelectCategory() {
      console.log('.........................focus ')
      if (this.categories.length) {
        if (this.$refs.refSelectCategory) {
          this.$refs.refSelectCategory.selectOption()
        }
        return
      }
      if (this.requestOptionSale) {
        this.requestOptionSale(OPTION_TYPE.CATEGORY, {}, (data) => {
          this.categories = [...data]
          if (this.$refs.refSelectCategory) {
            this.$refs.refSelectCategory.selectOption()
          }
        })
      }
    },
    focusSelectTrademark() {
      console.log('.........................focus ')
      if (this.trademarks.length) {
        if (this.$refs.refSelectTrademark) {
          this.$refs.refSelectTrademark.selectOption()
        }
        return
      }
      if (this.requestOptionSale) {
        this.requestOptionSale(OPTION_TYPE.TRADER_MARK, {}, (data) => {
          this.trademarks = [...data]
          if (this.$refs.refSelectTrademark) {
            this.$refs.refSelectTrademark.selectOption()
          }
        })
      }
    },
    focusSelectTag() {
      console.log('.........................focus ')
      if (this.tags.length) {
        if (this.$refs.refSelectTag) {
          this.$refs.refSelectTag.selectOption()
        }
        return
      }
      // if (!this.categoryId) {
      //   this.$message.warning('Bạn phải chọn danh mục')
      //   return
      // }
      if (this.requestOptionSale) {
        this.requestOptionSale(OPTION_TYPE.TAG, { category_id: this.categoryId }, (data) => {
          this.tags = [...data]
          if (this.$refs.refSelectTag) {
            this.$refs.refSelectTag.selectOption()
          }
        })
      }
    },
    onShowDialogCreate() {
      this.onShowDialog = true
      this.objectSale = {}
      this.isAdd = true
    },
    onShowDialogEdit(row) {
      this.onShowDialog = true
      this.objectSale = Object.assign({}, row)
      this.isAdd = false
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.requestListSale()
      }
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
    formatNumber,
    onGetListProduct() {

    },
    onRefresh() {
      this.requestListSale(this.listQuery)
    },
    clearSale() {
      this.listQuery.q = ''
      this.filterId = null
      this.requestListSale(this.listQuery)
    }
  }
}
</script>

<style scoped>
.el-input--medium {
  margin-bottom: 10px;
}

.el-select {
  width: 100%;
}

.fil {
  margin-bottom: 30px;
}

.text-right {
  margin-bottom: 20px;
}
</style>
