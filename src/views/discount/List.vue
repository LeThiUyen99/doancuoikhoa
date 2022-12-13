<template>
  <el-row class="app-container list-discount">
    <el-row class="list-discount__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_discount') }}</h3>
      </el-col>
      <el-col :sm="12">
        <div class="text-right">
          <el-button type="primary" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-discount__data">
      <el-table
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('id')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ `#${scope.row.name_delivery}` }}</template>
        </el-table-column>
      </el-table>
      <dialog-form-discount :show-dialog="onShowDialog" :object-data="objectdiscount" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import DialogFormDiscount from '@/views/discount/components/DialogFormDiscount'
export default {
  name: 'List',
  components: { DialogFormDiscount },
  data() {
    return {
      objectdiscount: {},
      onShowDialog: false
    }
  },
  methods: {
    onShowDialogCreate() {
      this.onShowDialog = true
      this.objectdiscount = {}
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      // if (object.reload) {
      //   this.onGetListDiscount()
      // }
    }
  }
}
</script>

<style scoped>

</style>
