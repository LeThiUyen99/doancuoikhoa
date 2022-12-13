<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form :model="body">
      <el-form-item :label="$t('number_uses')" prop="max_count_use">
        <el-input v-model="body.max_count_use" :placeholder="$t('number_uses')" />
      </el-form-item>
      <el-form-item v-if="body.id" :label="$t('VGA')">
        <el-input v-model="body.golfer.id" disabled :placeholder="$t('VGA')" />
      </el-form-item>
      <el-form-item v-if="body.id" :label="$t('customer')">
        <el-input v-model="body.golfer.name" disabled :placeholder="$t('customer')" />
      </el-form-item>
      <el-form-item v-if="!body.id" :label="$t('customer')">
        <div style="display: flex; width: 100%;">
          <el-select
            v-model="customer"
            v-loading="loadingUser"
            clearable
            style="width: 100%; padding-right: 5px"
            class="w-100"
            filterable
            remote
            reserve-keyword
            :placeholder="$t('enter_vga')"
            :remote-method="onSearchVga"
          >
            <el-option
              v-for="vga in vgas"
              :key="vga.value"
              :label="vga.label"
              :value="vga.value"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item :label="$t('active')">
        <el-switch
          v-model="activeCustom"
          :active-text="activeTitle"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AccountResource from '@/api/account'
import VoucherResource from '@/api/voucher'
import i18n from '@/lang/i18n'
const accountResource = new AccountResource()
const voucherResource = new VoucherResource()

export default {
  name: 'DialogCustom',
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    idVoucher: {
      type: Number,
      default() { return 0 }
    },
    types: {
      type: Array,
      default() { return [] }
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: { titleName: i18n.t('create_custom'), buttonName: i18n.t('add') },
      body: {},
      vgas: [],
      vga: null,
      loadingUser: false,
      customer: null,
      activeCustom: false,
      activeTitle: i18n.t('deactive'),
      loadingTable: false,
      loadingSubmit: false
    }
  },
  watch: {
    isAdd(value) {
      if (value) {
        this.body = {}
        this.dialog = Object.assign({}, { titleName: i18n.t('create_custom'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_custom'), buttonName: i18n.t('update') })
      }
    },
    objectData(object) {
      if (Object.keys(object).length > 0) {
        this.activeCustom = (object.state === 1)
        this.body = Object.assign({}, object)
      }
    },
    activeCustom(value) {
      this.activeTitle = value ? i18n.t('active1') : i18n.t('deactive')
      this.state = value ? 1 : 0
    },
    customer(value) {
      const user = this.vgas.find(d => d.value === this.customer)
      this.user_id = user.id
    }
  },
  methods: {
    onSubmitForm() {
      if (this.isAdd) {
        this.onCreateCustom()
      } else {
        this.onUpdateCustom()
      }
    },
    onCreateCustom() {
      const body = {
        max_use: this.body.max_count_use,
        voucher_id: this.idVoucher,
        state: this.state,
        golfer_id: this.user_id
      }
      this.loadingSubmit = true
      voucherResource.storeCustom(body).then(res => {
        this.loadingSubmit = false
        const { error, msg } = res
        if (error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(msg)
          this.reLoad()
        } else {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.error(msg)
          this.reLoad()
        }
      })
    },
    getBody() {
      const body = {}
      const keys = Object.keys(this.body)
      this.body.state = this.state
      for (const key of keys) {
        if (this.body[key] !== this.objectData[key]) {
          body[key] = this.body[key]
        }
      }
      body.id = this.objectData.id
      return body
    },
    onUpdateCustom() {
      const body = this.getBody()
      this.loadingSubmit = true
      voucherResource.updateCustom(body).then(res => {
        this.loadingSubmit = false
        const { error, msg } = res
        if (error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(msg)
          this.reLoad()
        } else {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.error(msg)
          this.reLoad()
        }
      })
    },
    reLoad() {
      this.body.max_count_use = null
      this.user_id = null
    },
    onSearchVga(key) {
      this.loadingUser = true
      accountResource.searchVga(key).then(res => {
        this.loadingUser = false
        const { error, data } = res
        if (error === 0) {
          if (data) {
            const name = `${data.name} - VGA${data.id}`
            data.label = name
            this.vgas = [data]
          } else {
            this.vgas = []
          }
        }
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>

</style>
