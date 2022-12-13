<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form ref="ruleForm" :model="body" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('name_cate')" prop="name">
        <el-input v-model="body.name " :placeholder="$t('name_cate')" />
      </el-form-item>
      <el-form-item :label="$t('order_of_display')" prop="sort_index">
        <el-input v-model="body.sort_index " :placeholder="$t('order_of_display')" />
      </el-form-item>
      <!-- <el-form-item :label="$t('start_time')" prop="start_time">
        <el-date-picker
          v-model="body.start_time"
          type="datetime"
          :placeholder="$t('start_time')"
        />
      </el-form-item> -->
      <!-- <el-form-item :label="$t('finish_time')" prop="end_time">
        <el-date-picker
          v-model="body.end_time"
          type="datetime"
          format="dd-MM-yyyy HH:mm:ss"
          :default-time="defaultTime"
          :placeholder="$t('finish_time')"
        />
      </el-form-item> -->
      <el-form-item :label="$t('active')">
        <el-switch
          v-model="activeCategoriesShow"
          :active-text="activeTitle"
        />
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>

    <el-main class="product">
      <h4>{{ $t('product_list') }}</h4>
      <el-button type="primary" @click="AddProductFast">{{ $t('product_add') }}</el-button>
    </el-main>

    <el-table
      v-loading="loadingTable"
      :data="listData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        :label="$t('product_id')"
        align="center"
        width="160"
      />
      <el-table-column
        prop="name"
        :label="$t('product_name')"
        align="center"
      />
      <el-table-column :label="$t('active')" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="danger" :loading="scope.row.loadingTable" icon="el-icon-close" circle @click="onRemoveProduct(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-row class="list-product__footer">
      <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestProductList" />
    </el-row>
  </el-dialog>
</template>

<script>
import I18n from '@/lang/i18n'
import CategoryShowResource from '@/api/Categories_show'
import Pagination from '@/components/Pagination'
const categoryShowResource = new CategoryShowResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'DialogFormCategoriesShow',
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
      activeCategoriesShow: false,
      activeTitle: I18n.t('stop'),
      rules: {
        name: [
          { required: true, message: I18n.t('valid_name_pro'), trigger: 'blur' }
        ]
      },
      dialog: { titleName: I18n.t('add_cate_show_product'), buttonName: I18n.t('add') },
      loadingSubmit: false,
      body: {},
      defaultTime: '23:59:00',
      product_ids: null,
      loadingTable: false,
      listData: [],
      objectListData: {},
      listQuery: Object.assign({}, defaultQuery),
      total: 0
    }
  },
  watch: {
    isAdd(value) {
      console.log('.............. watch isAdd : ', this.isAdd)
      if (value) {
        this.dialog = Object.assign({}, { titleName: I18n.t('add_cate_show_product'), buttonName: I18n.t('add') })
        this.body = {}
        this.objectData = {}
      } else {
        this.dialog = Object.assign({}, { titleName: I18n.t('update_cate_show_product').format(this.objectData.name), buttonName: I18n.t('update') })
      }
    },
    objectData(object) {
      console.log('.........onject update ... ', JSON.stringify(object))
      if (Object.keys(object).length > 0) {
        this.activeCategoriesShow = (object.active === 1)
        this.body = Object.assign({}, object)
        if (this.body.id) {
          this.requestProductList()
        }
        console.log('--------------------------------------', this.body)
      }
    },
    activeCategoriesShow(value) {
      this.activeTitle = value ? I18n.t('active1') : I18n.t('stop')
      this.body.active = value ? 1 : 0
    }
  },
  methods: {
    // getBodyDelete(row) {
    //   const body = {}
    //   body.id = this.objectData.id
    //   console.log('-----------------------------------------bosy', row.id)
    //   return body
    // },
    onRemoveProduct(row) {
      const body = {}
      body.product_id = row.id
      body.id = this.objectData.id
      this.$confirm(I18n.t('delete_product')).then(_ => {
        row.loadingTable = true
        categoryShowResource.deleteProduct(body).then(res => {
          row.loadingTable = false
          const { error, msg } = res
          if (error === 0) {
            this.$message.success(msg)
            const index = this.listData.findIndex(d => d.id === row.id)
            if (index !== -1) {
              this.listData.splice(index, 1)
            }
          } else {
            this.$message.error(msg)
          }
        })
      }).catch(_ => {
        row.loadingTable = false
      })
    },
    requestProductList() {
      this.id = this.body.id
      this.loadingTable = true
      categoryShowResource.productList(this.id, this.listQuery).then(response => {
        // console.log('-------------------------------------------rdl', JSON.stringify(response))
        this.loadingTable = false
        const { error, data, total } = response
        if (error === 0) {
          this.listData = data
          this.total = this.listQuery.page === 1 ? total : this.total
        } else {
          // this.listData = []
          // this.total = 0
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(` Có lỗi, ${error}`)
      })
    },
    AddProductFast() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false, is_add_fast: true })
    },
    // getBodyProduct() {
    //   const body = {}
    //   body.id = this.objectData.id
    //   body.product_ids = [this.product_ids]
    //   return body
    // },
    // AddProduct() {
    //   this.loadingTable = true
    //   const body = this.getBodyProduct()
    //   categoryShowResource.addProduct(body).then(response => {
    //     console.log('---------------------------------add', JSON.stringify(body))
    //     this.loadingTable = false
    //     const { error, msg } = response
    //     if (error === 0) {
    //       this.$message.success(msg)
    //     } else {
    //       this.$message.error(msg)
    //     }
    //   }).catch((er) => {
    //     this.loadingTable = false
    //   })
    // },
    onSubmitForm() {
      if (this.isAdd) {
        this.handleSubmitCategoriesShow()
      } else {
        this.handleUpdateCategoriesShow()
      }
    },
    getBody() {
      const body = {}
      const keys = Object.keys(this.body)
      console.log('.........get body ', JSON.stringify(this.body), JSON.stringify(this.objectData))
      for (const key of keys) {
        if (this.body[key] !== this.objectData[key]) {
          body[key] = this.body[key]
        }
      }
      body.id = this.objectData.id
      console.log('..........body sau khi check ', JSON.stringify(body))
      // body.sort_index = body.sort_index ? parseInt(body.sort_index) : 10
      console.log('-------------------------------------bi', body.id)
      return body
    },
    handleSubmitCategoriesShow() {
      this.loadingSubmit = true
      categoryShowResource.storeCategoriesShow(this.body).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    handleUpdateCategoriesShow() {
      this.loadingSubmit = true
      const body = this.getBody()
      console.log('------------------------------------', JSON.stringify(body))
      categoryShowResource.updateCategoriesShow(body).then(response => {
        console.log('-------------------------------------------th', JSON.stringify(body))
        this.loadingSubmit = false
        const { error, msg } = response
        if (error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>
.el-input {
  margin-bottom: 20px;
}
.el-main{
  padding: 20px 0;
}
.product{
  display: flex;
  justify-content: space-between;
}
.product h4{
  margin: auto 0;
}
</style>
