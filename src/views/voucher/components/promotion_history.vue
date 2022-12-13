<template>
  <el-row class="app-container">
    <el-row class="list-custom-header">
      <el-col :sm="24">
        <el-col :sm="12">
          <el-col :sm="1">
            <el-button style="border: none; padding:5px 0;" icon="el-icon-back" @click="onCancel" />
          </el-col>
          <h2 style="margin-top: 0">{{ $t('promotion_history') }}</h2>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="list-custom-data">
      <el-table v-loading="loadingTable" :data="listPromotion" border>
        <el-table-column align="center" label="ID" prop="id" />
        <el-table-column align="center" :label="$t('VGA')">
          <template slot-scope="scope"><el-link @click="fillterPromotion(scope.row)">VGA - {{ scope.row.golfer.id }}</el-link></template>
        </el-table-column>
        <el-table-column align="center" :label="$t('name')">
          <template slot-scope="scope">{{ scope.row.golfer.name }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('applicable_date')" prop="created_at" />
        <!--        <el-table-column align="center" :label="$t('number_uses')" />-->
        <el-table-column align="center" :label="$t('active')">
          <template slot-scope="scope">
            <el-tag :type="(scope.row.status === 1) ? 'success' : 'danger'">{{ (scope.row.status === 1) ? $t('success'): $t('fail') }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script>
import VoucherResource from '@/api/voucher'
const voucherResource = new VoucherResource()
const defaultQUery = {
  page: 1,
  number: 10,
  voucher_id: 0
}
export default {
  name: 'PromotionHistory',
  props: {
    voucherId: {
      type: Number,
      default() { return 0 }
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    goBack: {
      type: Function,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      listPromotion: [],
      loadingTable: false,
      total: 0,
      listfilter: [],
      isBack: false,
      listQuery: Object.assign({}, defaultQUery)
    }
  },
  created() {
    this.requestHistoryPromotion()
  },
  methods: {
    onCancel() {
      if (this.isBack === true) {
        this.listQuery.golfer_id = null
        this.requestHistoryPromotion()
        this.isBack = false
      } else {
        this.onGoBack()
      }
    },
    onGoBack() {
      this.isBack = false
      if (this.goBack) {
        this.goBack()
      }
    },
    fillterPromotion(row) {
      this.isBack = true
      this.listQuery.golfer_id = row.golfer.id
      this.listQuery.voucher_id = this.voucherId
      voucherResource.historyPromotionList(this.listQuery).then(res => {
        const { error, data, total } = res
        if (error === 0) {
          this.listPromotion = data
          this.total = total || 0
        }
      })
    },
    requestHistoryPromotion() {
      this.listQuery.voucher_id = this.voucherId
      voucherResource.historyPromotionList(this.listQuery).then(res => {
        const { error, data, total } = res
        if (error === 0) {
          this.listPromotion = data
          this.total = total || 0
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
