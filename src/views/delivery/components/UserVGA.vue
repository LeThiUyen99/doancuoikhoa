<template>
  <el-row>
    <!--    <el-row class="user_statistics_header">-->
    <!--      <el-col :sm="24" style="display:flex;">-->
    <!--        <el-button style="border: none; padding: 0" icon="el-icon-back" @click="onCanelClick" />-->
    <!--        <h3>{{ $t('user_statistics') }}</h3>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-row class="user_statistics_data">
      <el-table
        v-loading="loading"
        :data="tableDataUser"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column
          prop="date"
          :label="$t('id')"
          align="center"
        >
          <template slot-scope="props">{{ `#${props.row.name_delivery}` }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('user')"
          align="center"
        >
          <template slot-scope="props">
            <template v-if="props.row.golfer">{{ `${props.row.golfer.name} - VGA${props.row.golfer.id}` }}</template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('gross_product')"
          align="center"
        >
          <template slot-scope="props">{{ props.row.orders.length }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('total_money')"
          align="center"
        >
          <template slot-scope="props">{{ $t('price_vnd').format(formatNumber(props.row.total_price)) }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('payment')"
          align="center"
        >
          <template slot-scope="props">
            <el-tag :type="(props.row.paid === 1) ? 'success' : 'warning'">{{ (props.row.paid === 1) ? $t('paid'): $t('wait') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="saleMan" :label="$t('handler')" align="center">
          <template slot-scope="scope">{{ scope.row.sale_man_info.name }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('date_create')"
          align="center"
        >
          <template slot-scope="props">{{ convertDateTime(props.row.date_customer_confirm ? props.row.date_customer_confirm : props.row.updatedAt) }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('note')"
          align="center"
        >
          <template slot-scope="props">
            <template v-if="props.row.state === 5">{{ props.row.customer_reject_content }}</template>
            <template v-if="props.row.state === 4">{{ props.row.reject_content }}</template>
            <template v-if="props.row.state <= 3">{{ props.row.shop_noted }}</template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('active')"
          width="140"
          align="center"
        >
          <template slot-scope="props">
            <el-tag :type="setStateToStringDelivery(props.row.state).typeName">{{ setStateToStringDelivery(props.row.state).textName }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script>
import { convertDateTime, formatNumber } from '@/utils/convert'
import { setStateToStringDelivery } from '@/utils/delivery/convertDelivery'
export default {
  name: 'UserVGA',
  props: {
    tableDataUser: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      state: 0,
      loading: false,
      showSaleMan: false
    }
  },
  methods: {
    saleMan(sale_man_info) {
      if (sale_man_info === null) {
        this.showSaleMan = false
      } else {
        this.showSaleMan = true
      }
    },
    onCanelClick() {},
    formatNumber,
    convertDateTime,
    setStateToStringDelivery,
    updateLoading(is_loading) {
      this.loading = is_loading
    }
  }
}
</script>

<style scoped>

</style>
