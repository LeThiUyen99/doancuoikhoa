<template>
  <el-row class="app-container list-categories">
    <el-row class="list-categories__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_category') }}</h3>
      </el-col>
      <el-col :sm="12">
        <div class="text-right">
          <el-button v-if="is_write" type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-categories__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('id')"
          width="100"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('logo')"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar :size="60" :src="scope.row.thumb">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('name_cate')"
        />
        <el-table-column
          prop="total_product"
          :label="$t('row_number')"
          width="120"
          align="center"
        />
        <el-table-column
          prop="total_order"
          :label="$t('order_number')"
          width="120"
          align="center"
        />
        <el-table-column
          prop="sort_index"
          :label="$t('order_of_display')"
          width="130"
          align="center"
        />
        <el-table-column
          prop="duyet"
          :label="$t('active')"
          width="130"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('on'): $t('off') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="is_delete || is_edit" :label="$t('active')" width="120" align="center">
          <template v-if="is_delete || is_edit" slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteCategory(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="list-categories__footer">
      <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListCategories" />
    </el-row>
    <dialog-form-category :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectCategory" @onClickButtonDialog="handleClickButtonDialog" />
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import CategoryResource from '@/api/category'
import DialogFormCategory from '@/views/categories/components/DialogFormCategory'
import { getAcountInfo } from '@/utils/auth'
import i18n from '@/lang/i18n'
const categoryResource = new CategoryResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormCategory, Pagination },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      tableData: [],
      loadingTable: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      onShowDialog: false,
      objectCategory: {},
      isAdd: true,
      sortIndex: 0
    }
  },
  watch: {
    sortIndex(sort_index) {
      this.listQuery.sort_index = sort_index
      this.onGetListCategories()
    }
  },
  created() {
    this.onGetListCategories()
  },
  methods: {
    onShowDialogCreate() {
      this.onShowDialog = true
      this.objectCategory = {}
      this.isAdd = true
    },
    onShowDialogEdit(row) {
      this.onShowDialog = true
      this.objectCategory = Object.assign({}, row)
      this.isAdd = false
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      const { data, reload } = object
      if (reload) {
        if (data && Object.keys(data).length) {
          const obj = this.tableData.find(d => parseInt(d.id) === parseInt(data.id))
          if (obj) {
            const keys = Object.keys(data)
            for (const key of keys) {
              obj[key] = data[key]
            }
          }
        } else {
          this.onGetListCategories()
        }
      }
    },
    onDeleteCategory(row) {
      this.$confirm(i18n.t('delete_category_confirm').format(row.name)).then(_ => {
        categoryResource.deleteCategory(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('delete_success.'))
            this.onGetListCategories()
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    onGetListCategories() {
      this.loadingTable = true
      categoryResource.listCategory(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = [...response.list]
          this.total = response.total
        } else {
          this.tableData = []
          this.total = 0
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`Có lỗi, ${error}`)
      })
    }
  }
}
</script>

<style scoped>
.el-avatar--circle{
  border-radius: unset;
}
</style>
