<template>
  <el-dialog :title="$t('detail_product')" :visible.sync="dialogVisible" :before-close="handleCloseDialog" width="99%">
    <el-row v-loading="loadingTable" class="colum" :data="tableData">
      <el-card class="box-card left mb-10" shadow="hover">
        <el-row>
          <el-col class="mb-10">
            <label>{{ $t('id') }}: </label> <template>{{ categoryShowDetail ? categoryShowDetail.id :'' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('name') }}: </label> <template>{{ categoryShowDetail ? categoryShowDetail.name : '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('start_time') }}: </label> <template>{{ categoryShowDetail.start_time }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('finish_time') }}: </label> <template>{{ categoryShowDetail.end_time }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('active') }}: </label>
            <template>
              <el-tag :type="(categoryShowDetail.active === 1) ? 'success' : 'danger'">{{ (categoryShowDetail.active === 1) ? $t('active') : $t('stop') }}</el-tag>
            </template>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </el-dialog>
</template>

<script>
import CategoryShowResource from '@/api/Categories_show'
import { formatNumber } from '@/utils/convert'
const categoryShowResource = new CategoryShowResource()
export default {
  name: 'Detail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    categoryShowId: {
      type: Number,
      default() { return 0 }
    }
  },
  data() {
    return {
      titleName: '',
      loadingTable: false,
      categoryShowDetail: {},
      tableData: []
    }
  },
  watch: {
    categoryShowId(id) {
      console.log(id)
      if (id > 0) {
        this.detailCategoriesShow(id)
      }
    }
  },
  methods: {
    detailCategoriesShow(id) {
      this.loadingTable = true
      categoryShowResource.detailCategoriesShow(id).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          // this.tableData = response.data
          const result = response.data
          this.categoryShowDetail = Object.assign({}, result)
          // this.tableData = [...result.tableData]
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

</style>
