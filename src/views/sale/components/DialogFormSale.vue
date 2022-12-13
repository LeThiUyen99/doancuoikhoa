<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form :model="objectData" class="saleForm">
      <el-form-item v-if="objectData.id">
        <label>{{ $t('product_name') }}: </label>
        <template>{{ objectData.name }}</template>
      </el-form-item>
      <el-form-item v-if="objectData.id">
        <label>{{ $t('product_id') }}: </label>
        <template>{{ objectData.id }}</template>
      </el-form-item>
      <el-form-item label="Sale" prop="sale">
        <el-input v-model="sale" placeholder="Sale" />
      </el-form-item>
      <!--      <el-form-item v-if="!objectData.id">-->
      <!--        <el-radio v-model="objectData.picked" label="product">Mã sản phẩm</el-radio>-->
      <!--        <el-radio v-model="objectData.picked" label="shop">Mã shop</el-radio>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item v-if="!objectData.id">-->
      <!--        <el-input v-model="objectData.code" placeholder="Nhập mã"/>-->
      <!--      </el-form-item>-->
      <el-form-item v-if="isShowProduct && !objectData.id">
        <el-table
          border
          :data="tableChoosen"
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="name" :label="$t('product_name')" align="center" />
          <el-table-column prop="product_code" :label="$t('vgs_code')" align="center" />
          <el-table-column prop="createdAt" :label="$t('date_create')" align="center" />
        </el-table>
      </el-form-item>
      <div v-if="isFormShow" class="tableshop">
        <el-table
          :data="tableChoosen"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="name" :label="$t('product_name')" align="center" />
          <el-table-column prop="address" :label="$t('address')" align="center" />
          <el-table-column prop="createdAt" :label="$t('date_create')" align="center" />
          <!--          <el-table-column label="Action" align="center">-->
          <!--            <template>-->
          <!--              <el-button>Chọn</el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
        <!--        <el-row class="list-shop__footer">-->
        <!--          <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onListShop" />-->
        <!--        </el-row>-->
      </div>
    </el-form>
    <div class="dialog-footer" align="right">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm">{{ dialog.buttonName }}</el-button>
    </div>
    <!--    <div>-->
    <!--      <a @click="onShowProductClick"><input type="radio">Mã sản phẩm</a>-->
    <!--      <a @click="onShowShopClick"><input type="radio">Mã shop</a>-->
    <!--    </div>-->
    <div v-if="!objectData.id">
      <template>
        <el-radio v-model="radio" label="1" @change="change">{{ $t('product_id') }}</el-radio>
        <el-radio v-model="radio" label="2" @change="change">{{ $t('id_shop') }}</el-radio>
      </template>
    </div>
    <div v-if="!objectData.id">
      <div v-if="isShowProduct" class="search">
        <el-col :sm="12" class="pr-lg-5">
          <el-input v-model="search_text" :placeholder="$t('find_code')" />
        </el-col>
        <el-col :sm="6" class="pr-lg-5">
          <el-select v-model="filterId" :placeholder="$t('key_input')">
            <el-option
              v-for="filter in filters"
              :key="`filter_${filter.key}`"
              :label="filter.name"
              :value="filter.key"
            />
          </el-select>
        </el-col>
        <el-col :sm="6" class="pr-lg-5">
          <el-button type="primary">{{ $t('search') }}</el-button>
        </el-col>
      </div>
      <div v-if="isFormShow" class="tableshop">
        <el-table
          v-loading="loadingTable"
          :data="tableShop"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="name" :label="$t('product_name')" align="center" />
          <el-table-column prop="address" :label="$t('address')" align="center" />
          <el-table-column prop="createdAt" :label="$t('date_create')" align="center" />
          <el-table-column label="Action" align="center">
            <template slot-scope="scope">
              <el-button @click="selectedItem(scope.row)">{{ $t('choosen') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="list-shop__footer">
          <pagination
            v-show="total > listQuery.limit"
            :total="total"
            :limit.sync="listQuery.limit"
            :page.sync="listQuery.page"
            @pagination="onListShop"
          />
        </el-row>
      </div>
      <div v-if="isShowProduct" class="product">
        <el-table
          v-loading="loadingTable"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="name" :label="$t('product_name')" align="center" />
          <el-table-column prop="product_code" :label="$t('vgs_code')" align="center" />
          <el-table-column prop="createdAt" :label="$t('date_create')" align="center" />
          <el-table-column :label="$t('action')" align="center">
            <template slot-scope="scope">
              <el-button @click="selectedItem(scope.row)">{{ $t('choosen') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="list-shop__footer">
          <pagination
            v-show="total > listQuery.limit"
            :total="total"
            :limit.sync="listQuery.limit"
            :page.sync="listQuery.page"
            @pagination="requestListProduct"
          />
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import SaleResource from '@/api/sale'
import ProductResource from '@/api/product'
import ShopResource from '@/api/shop'
import Pagination from '@/components/Pagination'
import i18n from '@/lang/i18n'

const productResource = new ProductResource()
const shopResource = new ShopResource()
const saleResource = new SaleResource()
const defaultQuery = {
  page: 1,
  limit: 10
}

const SWAP_RADIO_TYPE = {
  PRODUCT: 1,
  SHOP: 2
}
export default {
  name: 'DialogFormSale',
  components: { Pagination },
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingTable: false,
      tableData: [],
      isShowProduct: false,
      loadingSubmit: false,
      tableShop: [],
      isFormShow: false,
      isActive: true,
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      dialog: { titleName: i18n.t('add_product_sale'), buttonName: i18n.t('add') },
      is_add_action: false,
      filters: [{ key: 1, name: i18n.t('find_by_product_code') }, { key: 2, name: i18n.t('find_by_product_name') }],
      filterId: null,
      search_text: '',
      type_form: SWAP_RADIO_TYPE.PRODUCT,
      radio: '1',
      tableChoosen: [],
      product_name: '',
      body: {},
      sale: 0
    }
  },
  watch: {
    // sale(value) {
    //   this.bo
    // },
    objectData(data) {
      console.log('.....................san pham:', JSON.stringify(data))
      this.product_name = data.name
    },
    showDialog(isShow) {
      console.log('..............show dialog ', isShow)
      if (isShow) {
        this.reset()
        console.log('.....................type ', this.type_form)
        if (this.type_form === SWAP_RADIO_TYPE.PRODUCT) {
          setTimeout(() => {
            this.isShowProduct = true
            this.requestListProduct()
          }, 200)
        } else {
          setTimeout(() => {
            this.onListShop()
          }, 200)
        }
      }
    },
    type_form(type) {
      this.type_form = type
      if (this.type_form === SWAP_RADIO_TYPE.SHOP) {
        this.isFormShow = true
        this.isShowProduct = false
        this.onListShop()
      } else {
        this.isFormShow = false
        this.isShowProduct = true
        this.requestListProduct()
      }
    },
    search_text(text) {
      console.log('.....................tu khoa tim kiem', text)
      this.listQuery.q = text
    },
    filterId(filter_id) {
      this.listQuery.filter = filter_id
      if (this.listQuery.q && this.listQuery.q.trim().length) {
        this.requestListProduct()
      }
    },
    isAdd(value) {
      console.log('..................add san pham', value)
      if (value) {
        this.dialog = Object.assign({}, { titleName: i18n.t('add_product_sale'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_product_sale'), buttonName: i18n.t('update') })
      }
    }
  },
  created() {
    // this.onGetListProduct()
    // this.onListShop()
  },
  methods: {
    reset() {
      this.loadingTable = false
      this.tableData = []
      this.isShowProduct = false
      this.tableShop = []
      this.isActive = true
      this.isFormShow = false
      this.total = 0
      this.listQuery = Object.assign({}, defaultQuery)
      this.dialog = { titleName: i18n.t('add_product_sale'), buttonName: i18n.t('add') }
      this.is_add_action = false
      this.filterId = null
      this.search_text = ''
      this.type_form = SWAP_RADIO_TYPE.PRODUCT
      this.radio = '1'
      this.tableChoosen = []
    },
    selectedItem(row) {
      console.log('................... chon item : ', JSON.stringify(row))
      if (this.type_form === SWAP_RADIO_TYPE.SHOP) {
        this.tableChoosen = [row]
        return
      }
      const index = this.tableChoosen.findIndex(d => d.id === row.id)
      if (index === -1) {
        this.tableChoosen.push(row)
      }
    },
    change(value) {
      console.log('...................raaidon butotn : ', value)
      if (this.type_form !== parseInt(value)) {
        this.tableChoosen = []
        this.body = {}
      }
      this.type_form = parseInt(value)
    },
    onShowShopClick() {
      this.isActive = true
      this.isFormShow = true
      this.type_form = SWAP_RADIO_TYPE.SHOP
    },
    onShowProductClick() { // show hien thi san pham
      this.type_form = SWAP_RADIO_TYPE.PRODUCT
    },
    onSubmitForm() {
      if (this.loadingTable) return
      this.body.sale = this.sale
      if (this.objectData && this.objectData.id) {
        const product_ids = [this.objectData.id]
        this.body.product_ids = product_ids
      } else if (this.type_form === SWAP_RADIO_TYPE.PRODUCT) {
        const product_ids = this.tableChoosen.map(d => d.id)
        if (!product_ids.length) {
          this.$message.warning(i18n.t('choosen_product_for_update'))
          return
        }
        this.body.product_ids = product_ids
      } else if (this.type_form === SWAP_RADIO_TYPE.SHOP) {
        const shop_ids = this.tableChoosen.map(d => d.id)
        if (!shop_ids.length) {
          this.$message.warning(i18n.t('select_shop_for_updater'))
          return
        }
        const shop_id = shop_ids[0]
        this.body.shop_id = shop_id
      }
      console.log('.......................body update ', JSON.stringify(this.body))
      this.onUpdateSale()
    },
    onUpdateSale() {
      this.$confirm(i18n.t('update_product_sale_confirm')).then(_ => {
        this.loadingSubmit = true
        saleResource.updateSale(this.body).then(response => {
          console.log('=========================================================', JSON.stringify(response))
          this.loadingSubmit = false
          if (response.error === 0) {
            this.$emit('onClickButtonDialog', { dialog: false, reload: true })
            this.$message.success(response.msg)
          } else {
            this.$message.error(response.msg)
          }
        })
      })
    },
    onGetListProduct() {
      this.listQuery.q = ''
      this.filterId = null
      this.requestListProduct()
    },
    requestListProduct() {
      this.loadingTable = true
      productResource.listProduct(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = response.list
          this.total = response.total
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${i18n.t('error_')} : ${error}`)
      })
    },
    onListShop() {
      this.loadingTable = true
      shopResource.shopList(this.listQuery).then(response => {
        this.loadingTable = false
        const { error, list, total } = response
        if (error === 0) {
          this.tableShop = [...list]
          this.data = [...list]
          this.total = total || 0
        } else {
          this.tableShop = []
          this.data = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${i18n.t('error_')}, ${error}`)
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>
.search {
  margin: 20px 0;
  float: left;
  width: 100%;
}

.tableshop {
  margin: 20px 0;
}

.el-form-item {
  margin: 0;
  margin-bottom: 20px;
}

.dialog-footer {
  margin-top: 20px;
}
</style>
