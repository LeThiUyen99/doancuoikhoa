<template>
  <el-dialog
    :title="$t('history_call_title')"
    :visible.sync="dialogVisible"
    :before-close="handleCloseDialog"
    width="90%"
  >
    <el-table
      v-loading="loadingTable"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        :label="$t('stt')"
        align="center"
        width="80"
      >
        <template slot-scope="props">
          {{ props.row.stt }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        :label="$t('delivery_id')"
        align="center"
      >
        <template slot-scope="props">
          {{ `DL${props.row.delivery_id}` }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        :label="$t('nhan_vien_goi')"
        align="center"
      >
        <template slot-scope="props">
          {{ props.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        :label="$t('date_call')"
        align="center"
      >
        <template slot-scope="props">
          {{ props.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        :label="$t('note')"
        align="center"
      >
        <template slot-scope="props">
          {{ props.row.noted }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        :label="$t('action')"
        align="center"
        width="100"
      >
        <template slot-scope="props">
          <el-button v-if="props.row.account_id === account_id" size="small" :title="$t('order_comfirm')" type="primary" icon="el-icon-check" circle @click="onEditNoteClick(props.row)" />
        </template>
      </el-table-column>
    </el-table>
    <dialog-note-call :show-dialog="onShowDialog" :noted-shop="note" :id-delivery="idDelivery " @onClickButtonDialog="handleClickButtonDialog" />
  </el-dialog>
</template>
<script>

import HistoryCallResource from '@/api/history_call'
const historyCallResource = new HistoryCallResource()
import { formatNumber } from '@/utils/convert'
import { setStateToString } from '@/utils/product/convertProduct'
import { getAcountInfo } from '@/utils/auth'
import moment from 'moment'
import DialogNoteCall from '@/views/delivery/components/DialogNoteCall'

export default {
  name: 'DialogHistoryCall',
  components: { DialogNoteCall },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    deliveryId: {
      type: Number,
      default() { return 0 }
    }
  },
  data() {
    const account = getAcountInfo()
    console.log('-------------------------------------bbb', getAcountInfo())
    return {
      loadingSubmit: false,
      prefix_domain: account.prefix_domain,
      titleName: '',
      orderDetail: {},
      loadingData: false,
      onShowDialog: false,
      idDelivery: 0,
      note: '',
      tableData: [],
      loadingTable: false,
      account_id: account.id,
      id: null
    }
  },
  watch: {
    deliveryId(id) {
      if (id > 0 && this.dialogVisible) {
        this.requestHistory(id)
      }
    }
  },
  methods: {
    onEditNoteClick(row) {
      this.note = row.noted
      this.id = row.id
      this.idDelivery = row.delivery_id
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      const { reload, noted, dialog } = object
      this.onShowDialog = dialog
      if (reload) {
        const body = {
          account_id: this.account_id,
          noted: noted,
          id: this.id
        }
        this.requestUpdateHistoryNoted(body)
      }
    },
    requestHistory(id) {
      this.loadingData = true
      historyCallResource.getHistory(id).then(response => {
        this.loadingData = false
        const { error, data } = response
        if (error === 0) {
          this.tableData = [...data]
        }
      }).catch(_ => {
        this.loadingData = false
      })
    },
    requestUpdateHistoryNoted(body) {
      historyCallResource.updateNoteHistory(body).then(response => {
        const { error, msg } = response
        if (error === 0) {
          this.$message(msg)
          const row = this.tableData.find(d => d.id === body.id)
          if (row) {
            row.noted = body.noted
            this.tableData = [...this.tableData]
          }
        } else {
          this.$message(msg)
        }
      })
    },
    handleCloseDialog() {
      this.$emit('onClickButtonDialogDetail', { dialog: false, reload: false })
    },
    formatNumber,
    setStateToString,
    moment
  }
}
</script>

<style lang="scss" scoped>
.update-deli {
  border: none;
  float: right;
  padding: 0;
}
  .order-detail-header {
    padding: 0;
    background-color: transparent;
    position: relative;
    .align-items-start {
      align-items: flex-start!important;
      .order-detail--list-status {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 0 -10px;
        .ui-toolbar-product-info {
          padding: 6px 10px;
          max-width: 275px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-right: 1px solid hsla(0,0%,87.8%,.37);
          .ui-product-body {
            color: #6c798f;
            font-size: 12px;
            font-weight: 500;
            line-height: 21px;
            letter-spacing: .5px;
            text-transform: uppercase;
          }
          .ui-product-head {
            color: #212121;
            font-size: 16px;
            line-height: 26px;
          }
        }
      }
    }
  }
</style>
