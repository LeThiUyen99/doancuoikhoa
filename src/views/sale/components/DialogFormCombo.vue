<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form :model="body" class="adsForm">
      <el-form-item :label="$t('note')" prop="noted">
        <el-input v-model="body.noted" type="textarea" :placeholder="$t('note')" />
      </el-form-item>
      <el-form-item :label="$t('status')">
        <el-switch
          v-model="activeCombo"
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

import SaleResource from '@/api/sale'
import i18n from '@/lang/i18n'
const saleResource = new SaleResource()

export default {
  name: 'DialogFormCombo',
  props: {
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
    // isAdd: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      dialog: { titleName: i18n.t('update_compo'), buttonName: i18n.t('update') },
      body: {},
      activeTitle: i18n.t('no_call'),
      activeCombo: false,
      loadingSubmit: false
    }
  },
  watch: {
    objectData(object) {
      console.log('......................combo ', JSON.stringify(object))
      if (Object.keys(object).length > 0) {
        this.activeCombo = (object.called === 1)
        this.body = Object.assign({}, object)
      }
    },
    activeCombo(value) {
      this.activeTitle = value ? i18n.t('called') : i18n.t('no_call')
      this.body.called = value ? 1 : 0
    }
    // isAdd(value) {
    //   if (value) {
    //     this.dialog = Object.assign({}, { titleName: 'Thêm mới combo', buttonName: 'Thêm mới' })
    //   } else {
    //     this.dialog = Object.assign({}, { titleName: `Cập nhật combo`, buttonName: 'Cập nhật' })
    //   }
    // }
  },
  methods: {
    onSubmitForm() {
      const keys = Object.keys(this.body)
      for (const key of keys) {
        if (this.body[key] === this.objectData[key]) {
          delete this.body[key]
        }
      }
      this.body.id = this.objectData.id
      this.onUpdateCombo()
    },
    onUpdateCombo() {
      console.log('........................ body update', JSON.stringify(this.body))
      this.$confirm(i18n.t('update_combo_confirm')).then(_ => {
        this.loadingSubmit = true
        saleResource.updateCombo(this.body).then(response => {
          this.loadingSubmit = false
          const { error, msg } = response
          if (error === 0) {
            this.$emit('onClickDialogCombo', { dialog: false, reload: true })
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }).catch(err => {
          this.loadingSubmit = false
          this.$message.error(err)
        })
      })
    },
    handleClose() {
      this.$emit('onClickDialogCombo', { dialog: false, reload: false })
      // this.handleClearDataDialog()
    }
  }
}
</script>

<style scoped>

</style>
