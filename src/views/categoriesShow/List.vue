<template>
  <el-row class="app-container list-cetegories-show">
    <el-row v-if="!isShowProductList">
      <el-row class="list-cetegories-show__header mb-10">
        <el-row class="list-product__header-title">
          <el-col :sm="12">
            <h3>{{ $t('manage_category_two') }}</h3>
          </el-col><el-col v-if="is_write" :sm="12">
            <div class="text-right">
              <el-button type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="list-product__data">
        <el-table
          v-loading="loadingTable"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            label="ID"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="onShowDialogDetail(scope.row)">{{ `#${scope.row.id}` }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('name')"
            align="center"
          />
          <el-table-column
            prop="createdAt"
            :label="$t('date_create')"
            align="center"
          />
          <el-table-column
            prop="updatedAt"
            :label="$t('date_update')"
            align="center"
          />
          <el-table-column
            prop="sort_index"
            :label="$t('order_of_display')"
            align="center"
          />
          <el-table-column
            :label="$t('active')"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('active1') : $t('stop') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('action')" align="center">
            <template slot-scope="scope">
              <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
              <!-- <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteCategoriesShow(scope.row)" /> -->
            </template>
          </el-table-column>
        </el-table>
        <el-row class="list-product__footer">
          <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestCategoriesShow" />
        </el-row>
      </el-row>
      <dialog-form-categories-show :is-add="isAdd" :object-data="objectCategoriesShow" :show-dialog="onShowDialog" @onClickButtonDialog="handleClickButtonDialog" />
      <detail :dialog-visible="showDialogDetail" :category-show-id="categoryShowID" @onClickButtonDialogDetail="handleClickButtonDialogCategoryShowDetail" />
    </el-row>
    <el-row v-if="isShowProductList">
      <list-product :category-show-id="categoryShowID" :category-show-name="categoryShowName" :go-back="goBack" />
    </el-row>
  </el-row>
</template>

<script>
import I18n from '@/lang/i18n'
import CategoryShowResource from '@/api/Categories_show'
import DialogFormCategoriesShow from '@/views/categoriesShow/components/DialogFormCategoriesShow'
import ListProduct from '@/views/categoriesShow/components/ListProduct'
import Detail from '@/views/categoriesShow/components/Detail'
import Pagination from '@/components/Pagination'
import { getAcountInfo } from '@/utils/auth'
const categoryShowResource = new CategoryShowResource()
const defaultQuery = {
  page: 1,
  limit: 10
}

export default {
  name: 'List',
  components: { Detail, ListProduct, DialogFormCategoriesShow, Pagination },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      tableData: [],
      loadingTable: false,
      objectCategoriesShow: {},
      isAdd: true,
      onShowDialog: false,
      isShowProductList: false,
      categoryShowID: 0,
      showDialogDetail: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      categoryShowName: ''
    }
  },
  created() {
    this.requestCategoriesShow()
  },
  methods: {
    goBack() {
      this.isShowProductList = false
    },
    onShowDialogDetail(row) {
      this.categoryShowID = row.id
      this.showDialogDetail = true
    },
    handleClickButtonDialogCategoryShowDetail(object) {
      this.showDialogDetail = object.dialog
      this.categoryShowID = 0
      if (object.reload) {
        this.requestCategoriesShow()
      }
    },
    onShowDialogCreate() {
      this.isAdd = true
      this.onShowDialog = true
      this.objectCategoriesShow = {}
    },
    onShowDialogEdit(row) {
      this.isAdd = false
      this.onShowDialog = true
      this.objectCategoriesShow = Object.assign({}, row)
      this.categoryShowID = row.id
      this.categoryShowName = row.name
      console.log('....................id category ', this.categoryShowID)
    },
    /**
     * xu ly tat popup
     * @param params
     */
    handleClickButtonDialog(params) {
      const { dialog, reload, is_add_fast } = params
      this.onShowDialog = dialog
      if (reload) {
        if (this.requestCategoriesShow()) {
          this.requestCategoriesShow()
        }
        return
      }
      if (is_add_fast) {
        this.isShowProductList = true
      }
    },
    requestCategoriesShow() {
      this.loadingTable = true
      categoryShowResource.categoriesShowList(this.listQuery).then(response => {
        this.loadingTable = false
        const { error, data, total } = response
        if (error === 0) {
          this.tableData = data
          this.total = this.listQuery.page === 1 ? total : this.total
        } else {
          this.tableData = []
          this.total = 0
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(` Có lỗi, ${error}`)
      })
    },
    onDeleteCategoriesShow(row) {
      const body = {}
      body.id = row.id
      console.log('-------------------------------id', row.id)
      this.$confirm(I18n.t('delete_product_1')).then(_ => {
        categoryShowResource.deleteCategoriesShow(body).then(response => {
          if (response.error === 0) {
            this.$message.success(I18n.t('delete_product_success'))
            this.requestCategoriesShow()
          } else {
            this.$message.error(response.mgs)
          }
        })
      }).catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
