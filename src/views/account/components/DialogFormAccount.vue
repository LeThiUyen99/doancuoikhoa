<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form ref="ruleForm" :model="objectData" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('account')" prop="name">
        <el-input v-model="objectData.name" :placeholder="$t('account')" />
      </el-form-item>
      <el-form-item :label="$t('phone')" prop="phone">
        <el-input v-model="objectData.phone" :placeholder="$t('phone')" />
      </el-form-item>
      <el-form-item :label="$t('browser_account')">
        <el-switch
          v-model="activeAccount"
          :active-text="activeTitle"
        />
      </el-form-item>
      <el-form-item :label="$t('shop')" prop="shop_id">
        <el-select v-model="objectData.shop_id" class="w-100" :placeholder="$t('shop')">
          <el-option
            v-for="shop in shops"
            :key="shop.id"
            :label="shop.name"
            :value="shop.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AccountResource from '@/api/account'
const accountResource = new AccountResource()
import i18n from '@/lang/i18n'
export default {
  name: 'DialogFormAccount',
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    shops: {
      type: Array,
      default() {
        return []
      }
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
      activeAccount: false,
      activeTitle: i18n.t('not_browse'),
      rules: {
        name: [
          { required: true, message: i18n.t('vali_acc_name'), trigger: 'blur' }
        ]
      },
      dialog: { titleName: i18n.t('add_acc'), buttonName: i18n.t('add') },
      loadingSubmit: false
    }
  },
  watch: {
    isAdd(value) {
      if (value) {
        this.dialog = Object.assign({}, { titleName: i18n.t('add_acc'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_inf_acc'), buttonName: i18n.t('update') })
      }
    },
    objectData(object) {
      if (Object.keys(object).length > 0) {
        this.activeAccount = (object.active === 1)
      }
    },
    activeAccount(value) {
      this.activeTitle = value ? i18n.t('browse') : i18n.t('not_browse')
      this.objectData.active = value ? 1 : 0
    }
  },
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate((validate) => {
        if (validate) {
          // if (!this.objectData.shop_id || this.objectData.shop_id === '' || this.objectData.shop_id === undefined) {
          //   this.$message.warning('Vui lòng chọn shop.')
          // } else {
          if (this.isAdd) {
            this.handleSubmitAccount()
          } else {
            this.handleUpdateAccount()
          }
          // }
        }
      })
    },
    handleSubmitAccount() {
      this.loadingSubmit = true
      accountResource.storeAccount(this.objectData).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    handleUpdateAccount() {
      this.loadingSubmit = true
      accountResource.updateAccount(this.objectData).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
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
