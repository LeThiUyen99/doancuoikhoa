<template>
  <el-dialog :title="$t('detail_product')" :visible.sync="dialogVisible" :before-close="handleCloseDialog" width="99%">
    <el-row v-loading="loadingTable" class="colum" :data="tableData">
      <el-card class="box-card left mb-10" shadow="hover">
        <el-row>
          <el-col class="mb-10">
            <label>{{ $t('id') }}: </label> <template>{{ productDetail ? productDetail.id :'' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('product_id') }}: </label> <template>{{ productDetail ? productDetail.product_code :'' }}</template>
          </el-col>
          <el-col class="image-ava">
            <el-col class="mb-10"><label class="ava">{{ $t('avatar') }}: </label> <el-image style="height: 200px; width: 200px" :src="productDetail.thumb" fit="contain" /></el-col>
            <el-col class="mb-10"><label>{{ $t('image') }}:</label>
              <el-carousel height="200px" arrow="always" :autoplay="false">
                <el-carousel-item v-for="url in listImage" :key="url">
                  <el-image :src="url" :fit="contain" style="height: 100%; width: 100%;" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('product_name') }}: </label> <template>{{ productDetail ? productDetail.name : '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('product_desc') }}: </label> <template>{{ productDetail.desc }}</template>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card center mb-10" shadow="hover">
        <el-row>
          <el-col class="mb-10">
            <label>{{ $t('attribute1') }}: </label> <template>{{ productDetail.name_param_first }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('attribute2') }}: </label> <template>{{ productDetail.name_param_second }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('weight') }}: </label> <template>{{ productDetail.weight }} gram</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('product_cate') }}: </label> <template>{{ productDetail.category_name }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('trademark') }}: </label> <template>{{ productDetail.tradermark_name }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('shop') }}: </label> <template>{{ productDetail.shop_name }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('tag') }}: </label> <template>{{ productDetail.tag_name }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('priority_level') }}: </label> <template>{{ productDetail.priority }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('date_create') }}: </label> <template>{{ productDetail.createdAt }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('date_update') }}: </label> <template>{{ productDetail.updatedAt }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('active') }}: </label>
            <template>
              <el-tag :type="(productDetail.active === 1) ? 'success' : 'danger'">{{ (productDetail.active === 1) ? $t('active1') : $t('stop') }}</el-tag>
            </template>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card right mb-10" shadow="hover">
        <el-row>
          <el-col class="mb-10">
            <label>{{ $t('product_salary') }}: </label> <template>{{ formatNumber(productDetail.price) }} VNĐ</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('sale') }}: </label> <template>{{ productDetail.sale }}%</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('price_sale') }}: </label> <template>{{ formatNumber(productDetail.price_sale) }} VNĐ</template>
          </el-col>
          <el-col v-if="productDetail.user_upload_info" class="mb-10">
            <label>{{ $t('product_user') }}: </label>
            <el-col class="edit mb-10">
              <el-avatar :src="productDetail && productDetail.user_upload_info ? productDetail.user_upload_info.avatar : '' " />
              <span class="user-edit"><template>{{ productDetail && productDetail.user_upload_info ? productDetail.user_upload_info.name : '' }}</template></span>
            </el-col>
          </el-col>
          <el-col v-if="productDetail.user_edit_info" class="mb-10">
            <label>{{ $t('user_edit') }}: </label>
            <el-col class="edit mb-10">
              <el-avatar :src="productDetail && productDetail.user_edit_info ? productDetail.user_edit_info.avatar : '' " />
              <span class="user-edit"><template>{{ productDetail && productDetail.user_edit_info ? productDetail.user_edit_info.name : '' }}</template></span>
            </el-col>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </el-dialog>
</template>

<script>
import ProductResource from '@/api/product'
import { parseJson } from '@/utils/auth'
import { formatNumber } from '@/utils/convert'
const productResource = new ProductResource()
export default {
  name: 'Detail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    productId: {
      type: Number,
      default() { return 0 }
    }
  },
  data() {
    return {
      titleName: '',
      loadingTable: false,
      productDetail: {},
      tableData: [],
      listImage: [],
      contain: 'contain',
      width: '0px',
      height: '0px'
    }
  },
  watch: {
    productId(id) {
      if (id > 0) {
        this.detailProduct(id)
      }
    },
    // listImage(array) {
    //   const url = array.length ? array[0] : ''
    //   this.getSizeImage(url)
    // }
    listImage(value) {
      if (value.length) {
        const url = value[0]
        this.getSizeImage(url)
      }
    }
  },
  methods: {
    getSizeImage(url) {
      if (!url || !url.length) return
      const img = new Image()
      img.src = url
      img.onload = () => {
        console.log(`the image dimensions are ${img.width}x${img.height}`)
        this.width = img.width
        this.height = img.height
      }
    },
    detailProduct(id) {
      this.loadingTable = true
      productResource.Detail(id).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          // this.tableData = response.data
          const result = response.data
          this.productDetail = Object.assign({}, result)
          // this.tableData = [...result.tableData]
          if (result.images) {
            this.listImage = [...parseJson(result.images)]
          }
        }
      })
    },
    handleCloseDialog() {
      this.$emit('onClickButtonDialogDetail', { dialog: false, reload: false })
    },
    formatNumber
  }
}
</script>

<style scoped>
.colum{
  display: flex;
  justify-content: space-between;
}
.center{
  margin-left: 10px;
  margin-right: 10px;
}
.image-ava{
  display: flex;
}
.ava{
  width: 100%;
  display: block;
}
.edit{
  display: flex;
  padding-top: 10px;
}
.user-edit {
  padding-top: 10px;
  padding-left: 10px;
}
.left{
  width: 100%;
}
.center, .right{
  width: 50%;
}
</style>
