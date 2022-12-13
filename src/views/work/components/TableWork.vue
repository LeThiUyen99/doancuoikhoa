<template>
  <el-row class="body-data">
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        :label="$t('id')"
        align="center"
        width="120"
      >
        <template slot-scope="props">
          <el-link type="primary" @click="onShowDialogOrderDetail(props.row)">{{ `#${props.row.name_delivery}` }}</el-link>
        </template>
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
          <template>{{ props.row.shop_noted }}</template>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('give')"
        width="160"
        align="center"
      >
        <template slot-scope="props">
          <el-select v-model="props.row.sale_man" :placeholder="$t('telesale')" @change="(value) => changeTelesale(value,props.row.id)">
            <el-option v-for="sale in Telesales" :key="sale.id" :label="sale.name" :value="sale.id" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <dialog-delivery-detail :dialog-visible="showDialogOrderDetail" :delivery-id="orderID" @onClickButtonDialogDetail="handleClickButtonDialogDetail" />
  </el-row>
</template>
<script>

import { formatNumber, convertDateTime } from '@/utils/convert'
import i18n from '@/lang/i18n'
import DeliveryResource from '@/api/delivery'
import DialogDeliveryDetail from '@/views/delivery/components/DialogDeliveryDetail'
const deliveryResource = new DeliveryResource()

export default {
  name: 'TableWork',
  components: { DialogDeliveryDetail },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    // eslint-disable-next-line vue/prop-name-casing
    Telesales: {
      type: Array,
      default() {
        return []
      }
    },
    loadingTable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      telesale_id: null,
      showDialogOrderDetail: false,
      orderID: 0
    }
  },
  methods: {
    handleClickButtonDialogDetail(object) {
      this.showDialogOrderDetail = object.dialog
    },
    onShowDialogOrderDetail(row) {
      this.orderID = row.id
      this.showDialogOrderDetail = true
    },
    formatNumber,
    convertDateTime,
    changeTelesale(value, id) {
      console.log('..........thay doi telesale : ', value, id)
      const account = this.Telesales.find(d => d.id === value)
      const delivery = this.tableData.find(d => d.id === id)
      const msg = i18n.t('set_telesale_confirm').format('DL' + delivery.id, account.name)
      this.$confirm(msg).then(_ => {
        this.requestUpdateSaleOrder(account.id, delivery.id)
      })
    },
    requestUpdateSaleOrder(telesale_id, delivery_id) {
      const body = {
        sale_id: telesale_id,
        delivery_id: delivery_id
      }
      this.loadingTable = true
      deliveryResource.updateTelesale(body).then(respone => {
        const { error, msg } = respone
        // eslint-disable-next-line no-empty
        setTimeout(() => {
          this.loadingTable = false
          if (error === 0) {
            this.$msgbox(msg)
          } else {
            this.$msgbox(msg).then(_ => {
              const row = this.tableData.find(d => d.id === delivery_id)
              if (row) {
                row.telesale_id = null
              }
            })
          }
        }, 1000)
      }).catch(_ => {
        this.loadingTable = false
      })
    }
  }
}
</script>

<style scoped>

</style>
