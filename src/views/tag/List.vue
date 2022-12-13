<template>
  <el-row class="app-container list-account">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('list_tag_title') }}</h3>
      </el-col>
      <el-col :sm="12">
        <div class="text-right">
          <el-button v-if="is_write" type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-account__data">
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
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('name')"
          align="center"
        />
        <el-table-column
          prop="category.name"
          :label="$t('category')"
          align="center"
        />
        <el-table-column
          prop="total_product"
          :label="$t('row_number')"
          align="center"
        />
        <el-table-column
          prop="total_order"
          :label="$t('order_number')"
          align="center"
        />
        <el-table-column v-if="is_delete || is_edit" :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteTag(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListTag" />
      </el-row>
      <dialog-form-tag :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objecttag" :category-data="categories" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import DialogFormTag from '@/views/tag/components/DialogFormTag'
import TagResource from '@/api/tag'
import CategoryResource from '@/api/category'
import { getAcountInfo } from '@/utils/auth'
import I18n from '../../lang/i18n'
const tagResource = new TagResource()
const categoryResource = new CategoryResource()

const defaultQuery = {
  page: 1,
  limit: 10
}

export default {
  name: 'List',
  components: { DialogFormTag, Pagination },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      tableData: [],
      categories: [],
      loadingTable: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      isAdd: true,
      onShowDialog: false,
      objecttag: {}
    }
  },
  created() {
    this.onGetListTag()
    this.onGetCategoryList()
  },
  methods: {
    onShowDialogCreate() {
      this.onShowDialog = true
      this.objecttag = {}
      this.isAdd = true
    },
    onShowDialogEdit(row) {
      this.onShowDialog = true
      this.objecttag = Object.assign({}, row)
      this.isAdd = false
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.onGetListTag()
      }
    },
    onDeleteTag(row) {
      this.$confirm(I18n.t('delete_category_confirm').format(row.name)).then(_ => {
        tagResource.deleteTag(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(I18n.t('delete_success'))
            this.onGetListTag()
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    onGetCategoryList() {
      categoryResource.listCategory().then(response => {
        if (response.error === 0) {
          const result = response.list
          this.categories = [...result]
        }
      })
    },
    onGetListTag() {
      this.loadingTable = true
      tagResource.tagList(this.listQuery).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          this.tableData = response.list
          this.total = response.total
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(`${I18n.t('error')}, ${error}`)
      })
    }
  }
}
</script>
<style scoped>

</style>
