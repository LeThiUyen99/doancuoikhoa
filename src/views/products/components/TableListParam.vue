<template>
  <el-row>
    <el-col :sm="18">
      <el-row v-if="isShowForm">
        <el-form ref="rule_form" :model="body" :rules="rules">
          <el-col :sm="6" class="pr-lg-5">
            <el-form-item :label="$t('attribute1')" prop="param_first">
              <el-input v-model="body.param_first" placeholder="Thuộc tính 1" />
            </el-form-item>
          </el-col>
          <el-col :sm="6" class="pr-lg-5">
            <el-form-item :label="$t('attribute2')" prop="param_second">
              <el-input v-model="body.param_second" placeholder="Thuộc tính 2" />
            </el-form-item>
          </el-col>
          <el-col :sm="6" class="pr-lg-5">
            <el-form-item :label="$t('quantily')" prop="number">
              <el-input v-model="body.number" type="number" placeholder="Số lượng" />
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item :label="$t('active')">
              <div class="clearfix" />
              <div class="text-right">
                <el-button type="info" @click="onCancelProperties">{{ $t('canel') }}</el-button>
                <el-button type="primary" :loading="loadingSubmit" @click="onSubmitProperties">{{ (isAdd) ? $t('add') : $t('update') }}</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row v-else>
        <el-link type="primary" @click="onShowFormAddProperties">{{ $t('add_attribute') }}</el-link>
      </el-row>
      <div class="clearfix-10" />
      <el-row>
        <el-table
          v-loading="loadingTable"
          :data="listProperties"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="param_first"
            :label="$t('attribute1')"
          />
          <el-table-column
            prop="param_second"
            :label="$t('attribute2')"
          />
          <el-table-column
            prop="number"
            :label="$t('quantily')"
          />
          <el-table-column :label="$t('active')">
            <template slot-scope="scope">
              <!--              <el-button type="primary" icon="el-icon-edit" circle @click="onEditParam(scope.row, scope.$index)" />-->
              <el-button type="primary" icon="el-icon-edit" circle @click="onEditParam(scope.row)" />
              <el-button type="danger" :loading="loadingTable" icon="el-icon-delete" circle @click="onDeleteParam(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import ProductResource from '@/api/product'
const productResource = new ProductResource()
export default {
  name: 'TableListParam',
  props: {
    objectProduct: {
      type: Object,
      default() { return {} }
    }
  },
  data() {
    return {
      listProperties: [],
      loadingTable: false,
      loadingSubmit: false,
      isShowForm: false,
      // postForm: {},
      body: {},
      isAdd: true,
      indexEdit: 0,
      rules: {
        number: [
          { required: true, message: 'Vui lòng nhập số lượng', trigger: 'blur' }
        ]
      }
    }
  },
  isShowForm(value) {
    if (value) {
      this.body = {}
    }
  },
  watch: {
    objectProduct(value) {
      this.body = {}
      if (Object.keys(value).length > 0) {
        if ('map_params' in value) {
          this.listProperties = [...value.map_params]
        }
      } else {
        this.listProperties = []
      }
    }
  },
  methods: {
    onSubmitProperties() {
      this.$refs.rule_form.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            if (this.objectProduct.id) {
              this.createQuantity()
            } else {
              this.listProperties.push(this.body)
              this.body = {}
            }
            // this.listProperties = [this.body]
          } else {
            this.updateQuantity()
            // this.listProperties = [this.body]
            // this.$set(this.listProperties, this.indexEdit, this.postForm)
            this.isShowForm = false
          }
          this.$emit('onSetData', this.listProperties)
        } else {
          return false
        }
      })
    },
    createQuantity() {
      this.body.product_id = this.objectProduct.id
      this.loadingSubmit = true
      productResource.createQuantity(this.body).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$message.success(response.msg)
          this.body.id = response.params_id
          this.listProperties.push(this.body)
          this.body = {}
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    updateQuantity() {
      this.loadingSubmit = true
      delete this.body.createdAt
      delete this.body.updatedAt
      productResource.updateQuantity(this.body).then(response => {
        console.log('-----------------------------body', JSON.stringify(this.body))
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$message.success(response.msg)
          console.log('-----------------------------------eror', response.msg)
          const obj = this.listProperties.find(d => d.id === this.body.id)
          if (obj) {
            const keys = Object.keys(this.body)
            for (const key of keys) {
              obj[key] = this.body[key]
            }
          }
          this.body = {}
        } else {
          this.$message.error(response.msg)
          console.log('------------------------err', response.msg)
        }
      }).catch(err => {
        this.loadingSubmit = false
        this.$message.error(err)
      })
    },
    onShowFormAddProperties() {
      this.isAdd = true
      this.isShowForm = true
    },
    onCancelProperties() {
      this.body = {}
      this.isShowForm = false
    },
    // onEditParam(row, index) {
    //   this.indexEdit = index
    //   this.isAdd = false
    //   this.isShowForm = true
    //   this.postForm = Object.assign({}, row)
    // },
    onEditParam(row) {
      this.isAdd = false
      this.isShowForm = true
      // this.objectParam = Object.assign({}, row)
      this.body = Object.assign({}, row)
    },
    onDeleteParam(row) {
      // this.listProperties.splice(index, 1)
      // this.$emit('onSetData', this.listProperties)
      // {"id":2779,"product_id":1116,"param_first":"Xanh đen","param_second":"MISC","number":1,"createdAt":"2021-06-15 15:00:26","updatedAt":"2021-06-15 15:00:26"}
      this.$confirm(`Bạn có chắc chắn muốn xóa thuộc tính ${row.param_first.toUpperCase()}-${row.param_second.toUpperCase()}?`).then(_ => {
        this.loadingTable = true
        productResource.deleteParam(row.id).then(response => {
          this.loadingTable = false
          if (response.error === 0) {
            this.$message.success(response.msg)
            const index = this.listProperties.findIndex(d => d.id === row.id)
            if (index !== -1) {
              this.listProperties.splice(index, 1)
            }
            // this.requestListProduct()
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    }
  }
}
</script>
<style scoped>
</style>
