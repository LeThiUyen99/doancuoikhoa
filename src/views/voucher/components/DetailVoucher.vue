<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    width="70%"
  >
    <el-row style="display: flex">
      <el-card class="box-card">
        <el-row>
          <el-col class="mb-10">
            <label>{{ $t('id_voucher') }}: </label> <template>{{ voucherDetail.code }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('name_voucher') }}: </label> <template>{{ voucherDetail.name }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('limit_max') }}: </label> <template>{{ formatNumber(voucherDetail.limit_max) }} VND</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('applicable_date') }}: </label> <template>{{ `${convertDateTime(voucherDetail.from_date)} - ${convertDateTime(voucherDetail.to_date)}` }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('number_uses_user') }}: </label> <template>{{ voucherDetail.count_use_per_golfer }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('desc') }}: </label> <template>{{ voucherDetail.description }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('type_code') }}: </label> <template>{{ voucherDetail.voucher_type_name }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('type_voucher') }}: </label> <template>{{ voucherDetail.type }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('number_uses_voucher') }}: </label> <template>{{ voucherDetail.max_use }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('product_user') }}: </label> <template>{{ objectData.account_name }}</template>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card card">
        <el-row>
          <el-col class="mb-10">
            <label>{{ $t('use_value') }} </label>
          </el-col>
          <el-col class="mb-10">
            <label>{{ voucherDetail.value? `${$t('value')}: `: '' }} </label> <template>{{ voucherDetail.value? voucherDetail.value: '' }}</template>
          </el-col>
          <!-- <el-col class="mb-10">
            <label><template>{{ `${voucherDetail.condition? `Áp dụng cho đơn từ ${formatNumber(voucherDetail.condition.value_from)}  VND`: ''} ${voucherDetail.condition? `đến ${formatNumber(voucherDetail.condition.value_to)} VND`: ''}` }}</template> </label>
          </el-col> -->
          <el-col class="mb-10">
            <label>{{ voucherDetail.condition? `${$t('apply_or')}: `: '' }}</label> <template>{{ `${voucherDetail.condition? `${formatNumber(voucherDetail.condition.value_from)}  VND`: ''} ${voucherDetail.condition? `${$t('to')} ${formatNumber(voucherDetail.condition.value_to)} VND`: ''}` }}</template>
          </el-col>
          <!-- <el-col class="mb-10">
            <label>{{ $t('minimum') }}: </label> <template>{{ voucherDetail.condition? voucherDetail.condition.value_from: '' }} VND</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ $t('max') }}: </label> <template>{{ voucherDetail.condition? voucherDetail.condition.value_to: '' }} VND</template>
          </el-col> -->
          <el-col class="mb-10">
            <label>{{ (voucherDetail.condition) && (voucherDetail.condition.shop)? `${$t('shop')}: `: '' }} </label> <template>{{ (voucherDetail.condition) && (voucherDetail.condition.shop)? voucherDetail.condition.shop.name: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ (voucherDetail.condition) && (voucherDetail.condition.tradermark)? `${$t('tradermark')}: `: '' }} </label> <template>{{ (voucherDetail.condition) && (voucherDetail.condition.tradermark)? voucherDetail.condition.tradermark.name: '' }}</template>
          </el-col>
          <el-col class="mb-10">
            <label>{{ (voucherDetail.condition) && (voucherDetail.condition.category)? `${$t('category')}: `: '' }} </label> <template>{{ (voucherDetail.condition) && (voucherDetail.condition.category)? voucherDetail.condition.category.name: '' }}</template>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </el-dialog>
</template>

<script>
import i18n from '@/lang/i18n'
import { formatNumber, convertDateTime } from '@/utils/convert'
import VoucherResource from '@/api/voucher'
const voucherResource = new VoucherResource()
export default {
  name: 'DetailVoucher',
  props: {
    voucherId: {
      type: Number,
      default() { return 0 }
    },
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: { titleName: i18n.t('detail_voucher') },
      loadingTable: false,
      voucherDetail: {}
    }
  },

  watch: {
    voucherId(id) {
      if (id > 0) {
        this.requetDetailVoucher(id)
      }
    }
  },

  methods: {
    requetDetailVoucher(id) {
      voucherResource.detailVoucher(id).then(response => {
        this.loadingTable = false
        if (response.error === 0) {
          // this.tableData = response.data
          const result = response.data
          this.voucherDetail = Object.assign({}, result)
        }
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    },
    formatNumber,
    convertDateTime
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  width: 100%;
}
.card{
  margin-left: 10px;
}
</style>
