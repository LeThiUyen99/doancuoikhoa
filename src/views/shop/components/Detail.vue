<template>
  <el-dialog :title="$t('detail_shop')" :visible.sync="dialogVisible" :before-close="handleCloseDialog" width="99%">
    <el-row v-loading="loadingData" class="shop-detail-header">
      <el-card class="box-card left mb-10" shadow="hover">
        <el-row>
          <el-col class="mb-10">
            <label>{{ $t('id') }}:</label> <template>#{{ shopDetail ? shopDetail.id: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('shop_name') }}:</label> <template>{{ shopDetail ? shopDetail.name: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('address') }}:</label> <template>{{ shopDetail ? shopDetail.address_full: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('phone') }}:</label> <template>{{ shopDetail ? shopDetail.phone: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('create_date') }}:</label> <template>{{ shopDetail ? shopDetail.createdAt: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('update_date') }}:</label> <template>{{ shopDetail ? shopDetail.updatedAt: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('display_date') }}:</label> <template>{{ shopDetail ? shopDetail.date_active: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('date_finish') }}:</label> <template>{{ shopDetail ? shopDetail.date_finish: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('active_show') }}: </label>
            <template><el-tag :type="(shopDetail.active_show_menu === 1) ? 'success' : 'danger'">{{ (shopDetail.active_show_menu === 1) ? $t('yes') : $t('no') }}</el-tag></template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('active') }}: </label>
            <template>
              <el-tag :type="(shopDetail.active === 1) ? 'success' : 'danger'">{{ (shopDetail.active === 1) ? $t('active1') : $t('stop') }}</el-tag>
            </template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('manage_shop') }}:</label> <template>{{ shopDetail ? shopDetail.account_name: '' }}</template>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card right mb-10" shadow="hover">
        <el-col class="mb-10 image-ava">
          <label class="ava">{{ $t('logo') }}:</label> <el-image style="height: 200px; width: 200px" :src="shopDetail.logo" fit="contain" />
        </el-col>
        <el-col class="mb-10 image-ava">
          <label class="ava">{{ $t('logo_menu') }}:</label> <el-image style="height: 200px; width: 200px" :src="shopDetail.logo_menu" fit="contain" />
        </el-col>
      </el-card>
    </el-row>
  </el-dialog>
</template>
<script>

import ShopResource from '@/api/shop'
import I18n from '../../../lang/i18n'
const shopResource = new ShopResource()

export default {
  name: 'Detail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: Number,
      default() { return 0 }
    }
  },
  data() {
    return {
      loadingData: false,
      shopDetail: {},
      contain: 'contain'
      // shop: []
    }
  },
  watch: {
    shopId(id) {
      if (id > 0) {
        this.getDetailShop(id)
      }
    }
  },
  methods: {
    getDetailShop(id) {
      this.loadingData = true
      shopResource.detailShop(id).then(response => {
        console.log(response)
        this.loadingData = false
        if (response.error === 0) {
          const result = response.data
          this.shopDetail = Object.assign({}, result)
          console.log('.....................shop detail: ', JSON.stringify(result))
          // this.shop = [...result.shop]
        }
      }).catch(error => {
        this.loadingData = false
        this.$message.error(`${I18n.t('error')}, ${error}`)
      })
    },
    handleCloseDialog() {
      this.$emit('onClickButtonDialogDetail', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>
.shop-detail-header{
  display: flex;
  justify-content: space-between;
}
.mb-10{
  margin: 10px;
}
.ava{
  width: 100%;
  display: block;
  padding-bottom: 10px;
}
</style>
