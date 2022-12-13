<template>
  <el-dialog
    :title="titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    append-to-body
    width="30%"
  >
    <el-form>
      <el-form-item :label="$t('bill_code')">
        <el-input ref="refInput" v-model="bill_code" :placeholder="$t('bill_code')" />
      </el-form-item>
      <el-form-item :label="$t('transport_title')">
        <el-select v-model="trans_code" style="width:100%" :placeholder="$t('transport_title')">
          <el-option v-for="transport in transports" :key="transport.id" :label="transport.name" :value="transport.code" />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm">{{ $t('update') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import i18n from '@/lang/i18n'
import DeliveryResource from '@/api/delivery'
const deliveryResource = new DeliveryResource()
export default {
  name: 'DialogBillCode',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    idDelivery: {
      type: Number,
      default() { return 0 }
    },
    billCode: {
      type: String,
      default() {
        return ''
      }
    },
    transCode: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      titleName: i18n.t('update_bill_code'),
      loadingSubmit: false,
      transports: [],
      trans_code: '',
      bill_code: ''
    }
  },
  watch: {
    billCode(value) {
      this.bill_code = value
      console.log('bill', this.bill_code)
    },
    transCode(value) {
      this.trans_code = value
    }
  },
  created() {
    this.onGetListTransfer()
  },
  methods: {
    onSubmitForm() {
      const body = {
        delivery_id: this.idDelivery,
        bill_code: this.bill_code,
        trans_code: this.trans_code
      }
      deliveryResource.updateTranport(body).then(res => {
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.$emit('onClickBillCode', { dialog: false, reload: true, reload_data: body })
        } else {
          this.$message.error(msg)
        }
      })
    },
    onGetListTransfer() {
      deliveryResource.listTransfer().then(res => {
        const { error, data } = res
        if (error === 0) {
          this.transports = data
        }
      })
    },
    handleClose() {
      this.$emit('onClickBillCode', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>

</style>
