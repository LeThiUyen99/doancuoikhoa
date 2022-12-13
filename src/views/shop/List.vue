<template>
  <el-row class="app-container list-shop">
    <el-row class="list-shop__header">
      <el-col :sm="12">
        <h3>{{ $t('list_shop') }}</h3>
      </el-col>
      <el-col :sm="12">
        <div class="text-right">
          <el-button v-if="is_write" type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="search-wrapper" :gutter="10">
      <el-col :sm="8">
        <el-input v-model="listQuery.q" :placeholder="$t('filter_by_name')" icon="search" />
      </el-col>
      <el-col :sm="8">
        <el-input v-model="listQuery.phone" :placeholder="$t('filter_by_phone')" icon="search" />
      </el-col>
      <el-col :sm="8">
        <div class="text-right">
          <el-button type="primary" @click="onResetSearch">{{ $t('reload') }}</el-button>
          <el-button type="primary" @click="onFilterShop">{{ $t('search') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-shop__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('id')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="onShowDialogDetail(scope.row)">{{ `#${scope.row.id}` }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('logo')"
          align="center"
        >
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-link type="primary" @click="onShowDialogShopDetail(scope.row.logo)">
              <el-image
                v-if="scope.row.logo"
                :src="scope.row.logo"
                :fit="contain"
              />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('logo_menu')"
          align="center"
        >
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image
              v-if="scope.row.logo_menu"
              :src="scope.row.logo_menu"
              :fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('shop_name')"
          align="center"
        />
        <el-table-column
          prop="phone"
          :label="$t('phone')"
          align="center"
          width="120"
        />
        <el-table-column
          :label="$t('address')"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.address_full? scope.row.address_full: `${scope.row.address? scope.row.address: ''}${scope.row.township? ',': ''} ${scope.row.township? scope.row.township: ''}${scope.row.district? ',': ''} ${scope.row.district? scope.row.district: ''}${scope.row.city? ',': ''} ${scope.row.city? scope.row.city: ''}` }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_product"
          :label="$t('row_number')"
          align="center"
          width="115"
        />
        <el-table-column
          prop="total_order"
          :label="$t('order_number')"
          align="center"
          width="115"
        />
        <el-table-column
          :label="$t('action')"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('active1') : $t('stop') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="is_delete || is_edit" :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteShop(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="list-shop__footer">
      <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListShop" />
    </el-row>
    <!--    <dialog-form-shop :is-add="isAdd" :object-data="objectShop" :show-dialog="onShowDialog" :province-data="provinces" @onClickDialogShop="handleClickDialogShop" />-->
    <dialog-form-shop :is-add="isAdd" :object-data="objectShop" :show-dialog="onShowDialog" @onClickDialogShop="handleClickDialogShop" />
    <detail-shop :dialog-visible="showDialogShopDetail" :url="url_image" @onClickButtonDialogDetail="handleClickButtonDialogDetail" />
    <detail :dialog-visible="showDialogDetail" :shop-id="shopID" @onClickButtonDialogDetail="handClickButtonDetail" />
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import ShopResource from '@/api/shop'
import DialogFormShop from '@/views/shop/components/DialogFormShop'
import DetailShop from '@/views/shop/components/DetailShop'
// import Detail from '@/views/products/components/Detail'
import Detail from '@/views/shop/components/Detail'
import { getAcountInfo } from '@/utils/auth'
import i18n from '@/lang/i18n'
const shopResource = new ShopResource()
const defaultQuery = {
  page: 1,
  limit: 10
}

export default {
  name: 'List',
  components: { Detail, DialogFormShop, Pagination, DetailShop },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      filters: [],
      data: [],
      listQuery: Object.assign({}, defaultQuery),
      tableData: [],
      total: 0,
      loadingTable: false,
      objectShop: {},
      isAdd: true,
      onShowDialog: false,
      // provinces: [],
      url_image: '',
      contain: 'contain',
      showDialogShopDetail: false,
      showDialogDetail: false,
      shopID: 0
    }
  },
  created() {
    this.onGetListShop()
    // this.onGetProvinceList()
  },
  methods: {
    onShowDialogDetail(row) {
      this.shopID = row.id
      this.showDialogDetail = true
    },
    handClickButtonDetail(object) {
      this.showDialogDetail = object.dialog
      this.shopID = 0
      if (object.reload) {
        this.onGetListShop()
      }
    },
    onShowDialogShopDetail(url) {
      this.url_image = url
      this.showDialogShopDetail = true
    },
    handleClickButtonDialogDetail(object) {
      this.showDialogShopDetail = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    onShowDialogCreate() {
      this.isAdd = true
      this.onShowDialog = true
      this.objectShop = {}
    },
    onShowDialogEdit(row) {
      this.isAdd = false
      this.onShowDialog = true
      this.objectShop = Object.assign({}, row)
    },
    handleClickDialogShop(object) {
      console.log('--------------------------------dialog', object)
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.onGetListShop()
      }
    },
    onGetListShop() {
      this.loadingTable = true
      shopResource.shopList(this.listQuery).then(response => {
        this.loadingTable = false
        const { error, list, total } = response
        if (error === 0) {
          this.tableData = [...list]
          this.data = [...list]
          this.total = total || 0
        } else {
          this.tableData = []
          this.data = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${i18n.t('error')}, ${error}`)
      })
    },
    // onGetProvinceList() {
    //   shopResource.getProvinceList().then(response => {
    //     const array = []
    //     if (response.error === 0) {
    //       const result = response.data
    //       if (result.length > 0) {
    //         result.map(value => {
    //           const item = { value: value.PROVINCE_ID, label: value.PROVINCE_NAME, data: value }
    //           array.push(item)
    //         })
    //       }
    //     }
    //     this.provinces = [...array]
    //   })
    // },
    onDeleteShop(row) {
      this.$confirm(i18n.t('delete_shop_confirm').format(row.name)).then(_ => {
        shopResource.deleteShop(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('delete_shop_success').format(row.name))
            this.onGetListShop()
          } else {
            this.$message.error(response.mgs)
          }
        })
      }).catch(_ => {})
    },
    onFilterShop() {
      this.loadingTable = true
      let { q, phone } = this.listQuery
      q = q ? q.trim() : ''
      phone = phone ? phone.trim() : ''
      if (!q.length && !phone.length) {
        this.loadingTable = false
        this.tableData = [...this.data]
      } else {
        shopResource.getFilterList(this.listQuery).then(response => {
          this.loadingTable = false
          const { error, data } = response
          if (error === 0) {
            this.tableData = [...data]
          }
        })
      }
    },
    onResetSearch() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.onGetListShop()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper{
  margin-bottom: 10px;
}
</style>
