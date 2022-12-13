<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form ref="ruleForm" :model="dataPromotion" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('program_name')" prop="name">
        <el-input v-model="dataPromotion.name " :placeholder="$t('program_name')" />
      </el-form-item>
      <el-form-item :label="$t('start_time')" prop="start_time">
        <el-date-picker
          v-model="dataPromotion.start_time"
          type="datetime"
          :placeholder="$t('start_time')"
        />
      </el-form-item>
      <el-form-item :label="$t('finish_time')" prop="end_time">
        <el-date-picker
          v-model="dataPromotion.end_time"
          type="datetime"
          format="dd-MM-yyyy HH:mm:ss"
          :default-time="defaultTime"
          :placeholder="$t('finish_time')"
        />
      </el-form-item>
      <el-form-item :label="$t('active')">
        <el-switch
          v-model="activePromotions"
          :active-text="activeTitle"
        />
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{
        dialog.buttonName
      }}</el-button>
    </span>

    <el-main v-if="dataPromotion.id">
      <h4>{{ $t('promotion_list') }}</h4>
      <el-input v-model="number_product_add" :placeholder="$t('product_id')" />
      <el-input v-model="sale_number" placeholder="Sale" />
      <span>
        <el-button @click="AddProduct">{{ $t('add') }}</el-button>
      </span>
    </el-main>
    <el-table
      v-if="dataPromotion.id"
      v-loading="loadingTable"
      :data="listData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="product.id"
        :label="$t('product_id')"
        align="center"
        width="160"
      />
      <el-table-column
        prop="name"
        :label="$t('product_name')"
        align="center"
      />
      <el-table-column
        prop="sale"
        :label="$t('sale')"
        align="center"
        width="120"
      />
      <el-table-column :label="$t('active')" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteProduct(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-row class="list-promotion__footer">
      <pagination v-if="dataPromotion.id" v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="reload_item_sale" />
    </el-row>
  </el-dialog>
</template>
<script>
import PromotionsResource from '@/api/promotions'
import Pagination from '@/components/Pagination'
const promotionsResource = new PromotionsResource()
import PromotionsProductResource from '@/api/promotions_product'
import i18n from '@/lang/i18n'

const promotionsproductResource = new PromotionsProductResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'DialogFormPromotions',
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
      activePromotions: false,
      activeTitle: i18n.t('stop'),
      listData: [],
      loadingTable: false,
      number_product_add: null,
      sale_number: null,
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      rules: {
        name: [
          { required: true, message: i18n.t('valid_name_pro'), trigger: 'blur' }
        ]
      },
      dialog: { titleName: i18n.t('add_promotion'), buttonName: i18n.t('add') },
      loadingSubmit: false,
      dataPromotion: { name: '' },
      defaultTime: '23:59:00',
      is_add_action: false
    }
  },
  watch: {
    isAdd(value) {
      // this.is_add_action = value
      console.log('................check ', this.is_add_action, this.isAdd)
    },
    is_add_action(value) {
      console.log('...................check add : ', value)
      if (value) {
        this.dialog = Object.assign({}, { titleName: i18n.t('add_promotion'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_promotion'), buttonName: i18n.t('update') })
      }
    },
    objectData(object) {
      // if (Object.keys(object).length > 0) {
      //   this.activePromotions = (object.active === 1)
      // }
      this.dataPromotion = Object.assign({}, object)
      if (this.dataPromotion.id) {
        this.reload_item_sale()
      }
    },
    dataPromotion(object) {
      if (Object.keys(object).length > 0) {
        this.activePromotions = (object.active === 1)
      }
      if (object && object.id) {
        this.is_add_action = false
      } else {
        this.is_add_action = true
      }
      if (this.is_add_action) {
        this.dialog = Object.assign({}, { titleName: i18n.t('add_promotion'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_promotion'), buttonName: i18n.t('update') })
      }
      console.log('................check', this.is_add_action)
    },
    activePromotions(value) {
      this.activeTitle = value ? i18n.t('active1') : i18n.t('stop')
      this.dataPromotion.active = value ? 1 : 0
    }
  },
  methods: {
    AddProduct() {
      if (this.loadingTable) return
      if (!this.number_product_add || !this.sale_number) {
        this.$confirm(` ${this.number_product_add}, ${this.sale_number}`)
      }
      this.loadingTable = true
      promotionsproductResource.storePromotionsProduct({
        promotions_id: this.dataPromotion.id,
        product_id: this.number_product_add,
        sale: this.sale_number
      }).then(response => {
        this.loadingTable = false
        const { error, msg } = response
        if (error === 0) {
          this.$message.success(msg || i18n.t('confirm_add_product_campaign'))
          this.reload_item_sale()
        } else {
          this.$message.error(response.msg)
        }
      }).catch((er) => {
        this.loadingTable = false
      })
    },
    reload_item_sale() {
      this.listQuery.promotions_id = this.dataPromotion.id
      promotionsproductResource.PromotionsProductList(this.listQuery).then(response => {
        if (response.error === 0) {
          const result = response.list
          this.listData = [...result]
          this.total = response.total
        }
      })
    },
    onDeleteProduct(row) {
      this.$confirm(i18n.t('delete_shop_confirm').format(row.name)).then(_ => {
        promotionsproductResource.deletePromotionsProduct(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('delete_shop_success').format(row.name))
            this.reload_item_sale()
          } else {
            this.$message.error(response.mgs)
          }
        })
      }).catch(_ => {
      })
    },
    onSubmitForm(formName) {
      if (this.loadingSubmit) return
      this.$refs[formName].validate((validate) => {
        if (validate) {
          if (this.is_add_action) {
            this.handleSubmitPromotions()
          } else {
            this.handleUpdatePromotions()
          }
        }
      })
    },
    handleSubmitPromotions() {
      this.loadingSubmit = true
      promotionsResource.storePromotions(this.dataPromotion).then(response => {
        this.loadingSubmit = false
        const { error, insert, msg } = response
        if (error === 0) {
          this.dataPromotion = Object.assign({}, insert)
        } else {
          this.$message.error(msg || i18n.t('confirm_add_program_promotion'))
        }
      }).catch((er) => {
        this.loadingSubmit = false
      })
    },
    handleUpdatePromotions() {
      this.loadingSubmit = true
      promotionsResource.updatePromotions(this.dataPromotion).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      }).catch((er) => {
        this.loadingSubmit = false
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

.dialog-footer {
  display: block;
  text-align: right;
}
.el-main{
  padding: 20px 0;
}
</style>
