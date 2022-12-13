<template>
  <el-row class="app-container list-noti">
    <el-row v-if="!onShowDialog">
      <el-row class="list-noti-header">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple">
              <el-col :sm="12" style="padding: 0;">
                <h2 style="margin: 0;">{{ $t('Shoot-noti') }}</h2>
              </el-col>
              <el-col :sm="12" align="right" style="padding: 0;">
                <el-button type="primary" @click="showHistory">{{ $t('show_history') }}</el-button>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="list-noti-form">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple">
              <el-form>
                <el-form-item :label="$t('title')">
                  <el-input v-model="title" :placeholder="$t('title')" />
                </el-form-item>
                <el-form-item :label="$t('content')">
                  <el-input v-model="content" type="textarea" :rows="3" :placeholder="$t('content')" />
                </el-form-item>
                <el-form-item :label="$t('type_noti')">
                  <el-select v-model="saveId" :placeholder="$t('type_noti')" style="width: 100%">
                    <el-option v-for="save in saves" :key="`save_${save.key}`" :label="save.name" :value="save.key" />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('navigate')">
                  <el-select v-model="navigateId" :placeholder="$t('navigate')" style="width: 100%">
                    <el-option v-for="navigate in navigates" :key="`navigate_${navigate.key}`" :label="navigate.name" :value="navigate.key" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="showCate" :label="$t('find-cate')">
                  <el-select v-model="categoriesId" :placeholder="$t('find-cate')" style="width: 100%">
                    <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="showProduct" :label="$t('find-product')">
                  <div style="display: flex; width: 100%;">
                    <el-select
                      v-model="productId"
                      clearable
                      style="width: 100%"
                      class="w-100"
                      filterable
                      remote
                      reserve-keyword
                      :placeholder="$t('product_input')"
                      :remote-method="onSearchProduct"
                      :loading="loadingproduct"
                    >
                      <el-option
                        v-for="product in products"
                        :key="product.value"
                        :label="product.label"
                        :value="product.value"
                      />
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item v-if="showUser" :label="$t('customer')">
                  <div style="display: flex; width: 100%;">
                    <el-select
                      v-model="customer"
                      clearable
                      style="width: 100%; padding-right: 5px"
                      class="w-100"
                      filterable
                      remote
                      reserve-keyword
                      :placeholder="$t('enter_vga')"
                      :remote-method="onSearchVga"
                      :loading="loadingUser"
                    >
                      <el-option
                        v-for="vga in vgas"
                        :key="vga.value"
                        :label="vga.label"
                        :value="vga.value"
                      />
                    </el-select>
                    <el-button type="primary" @click="addVGA">Thêm</el-button>
                  </div>
                </el-form-item>
                <el-table v-if="showUser" v-loading="loadingTable" :data="listVga" border style="margin-bottom: 10px">
                  <el-table-column :label="$t('id')" prop="id" align="center" />
                  <el-table-column :label="$t('name')" prop="name" align="center" />
                  <el-table-column :label="$t('action')" align="center">
                    <template slot-scope="scope">
                      <el-button type="danger" :loading="loadingTable" icon="el-icon-delete" circle @click="onDeleteParam(scope.row.id)" />
                    </template>
                  </el-table-column>
                </el-table>
                <el-form-item v-if="showUser" :label="$t('list-vga')">
                  <el-input v-model="user_list" type="textarea" :rows="5" :placeholder="$t('list-vga')" />
                </el-form-item>
              </el-form>

            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6" align="right">
          <div class="grid-content bg-purple">
            <el-button @click="reLoad">{{ $t('canel') }}</el-button>
            <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm">{{ $t('confirm') }}</el-button>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row v-if="onShowDialog">
      <dialog-show-history :show-dialog="onShowDialog" :go-back="goBack" />
    </el-row>
  </el-row>
</template>

<script>
import i18n from '@/lang/i18n'
import CategoryResource from '@/api/category'
import ProductResource from '@/api/product'
import AccountResource from '@/api/account'
import NotificationResource from '@/api/notification'
import DialogShowHistory from '@/views/post-noti/components/DialogShowHistory'
const accountResource = new AccountResource()
const categoryResource = new CategoryResource()
const productResource = new ProductResource()
const notificationResource = new NotificationResource()
export default {
  name: 'List',
  components: { DialogShowHistory },
  data() {
    return {
      title: '',
      content: '',
      saveId: 1,
      navigateId: 0,
      customer: null,
      categoriesId: null,
      productId: null,
      loadingSubmit: false,
      filterId: null,
      q: null,
      loadingUser: false,
      loadingproduct: false,
      loadingTable: false,
      onShowDialog: false,
      categories: [],
      products: [],
      vgas: [],
      listVga: [],
      user_list: '',
      showCate: false,
      showProduct: false,
      listQuery: Object.assign({}),
      saves: [{ key: 1, name: i18n.t('saved') }, { key: 2, name: i18n.t('not-save') }, { key: 3, name: i18n.t('system-wide') }],
      filters: [{ key: 1, name: i18n.t('find_by_product_code') }, { key: 2, name: i18n.t('find_by_product_name') }, { key: 3, name: i18n.t('find-id') }],
      navigates: [{ key: 0, name: i18n.t('home-shop') }, { key: 1, name: i18n.t('categories') }, { key: 2, name: i18n.t('detail-product') }],
      showUser: true
    }
  },
  watch: {
    navigateId(navigate_id) {
      if (navigate_id === 1) {
        this.showCate = true
        this.showProduct = false
        this.onSearchCategories()
      } else if (navigate_id === 2) {
        this.showProduct = true
        this.showCate = false
        this.onSearchProduct()
      } else {
        this.showCate = false
        this.showProduct = false
      }
    },
    saveId(save_id) {
      if (save_id === 1) {
        this.showUser = true
      } else if (save_id === 2) {
        this.showUser = true
      } else if (save_id === 3) {
        this.showUser = false
      }
    },
    productId(q) {
      this.listQuery.q = q
      this.onSearchProduct()
    },
    filterId(filter_id) {
      this.listQuery.filter = filter_id
      if (this.listQuery.q && this.listQuery.q.trim().length) {
        this.onSearchProduct()
      }
    },
    categoriesId(shop_id) {
      this.listQuery.shop_id = shop_id
      this.onSearchCategories()
    }
  },
  methods: {
    onSearchCategories() {
      categoryResource.listCategory().then(res => {
        const { error, list } = res
        if (error === 0) {
          this.categories = list
        }
      })
    },
    onSearchProduct() {
      this.loadingproduct = true
      productResource.listProduct(this.listQuery).then(res => {
        this.loadingproduct = false
        const { error, list } = res
        if (error === 0) {
          const result = list
          if (result.length > 0) {
            const arr = []
            result.map(d => {
              const name = `VGA${d.id} - ${d.name}`
              const item = { label: name, value: d.id }
              arr.push(item)
            })
            this.products = [...arr]
          } else {
            this.products = []
          }
        }
      })
    },
    onSearchVga(key) {
      this.loadingUser = true
      accountResource.searchVga(key).then(res => {
        this.loadingUser = false
        const { error, data } = res
        if (error === 0) {
          if (data) {
            const name = `${data.name} - VGA${data.id}`
            data.label = name
            this.vgas = [data]
          } else {
            this.vgas = []
          }
        }
      })
    },
    addVGA() {
      const vga = this.vgas[0]
      console.log(this.vgas)
      this.listVga.push(vga)
    },
    onDeleteParam(id) {
      console.log('...............xoa id', id)
      const userIndex = this.listVga.findIndex(d => d.id === id)
      if (userIndex !== -1) {
        this.listVga.splice(userIndex, 1)
      }
      // this.listVga.splice(userIndex, 1)
    },
    reLoad() {
      this.title = null
      this.content = null
      this.categoriesId = null
      this.listVga = []
      this.saveId = null
      this.productId = null
      this.customer = null
      this.navigateId = null
      this.user_list = null
    },
    onSubmitForm() {
      if (this.navigateId === 0) {
        this.redirect_id = 0
      } else if (this.navigateId === 1) {
        this.redirect_id = this.categoriesId
      } else if (this.navigateId === 2) {
        this.redirect_id = this.productId
      }
      const user_list = this.user_list ? this.user_list.split(',') : this.listVga.map(d => d.id)
      user_list.forEach(element => {
        return parseInt(element.toString().trim())
      })
      const body = {
        title: this.title,
        content: this.content,
        category_id: this.categoriesId,
        list_user: user_list,
        save_recode: this.saveId,
        redirect_type: this.navigateId,
        redirect_id: this.redirect_id,
        product_id: this.productId
      }
      notificationResource.confirm(body).then(res => {
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.reLoad()
        } else {
          this.$message.error(msg)
          this.reLoad()
        }
      })
    },
    showHistory() {
      this.onShowDialog = true
    },
    goBack() {
      this.onShowDialog = false
    }
  }
}
</script>

<style scoped>

</style>
