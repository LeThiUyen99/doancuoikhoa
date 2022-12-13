<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form ref="ruleForm" :model="objectData" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('name_cate')" prop="name">
        <el-input v-model="objectData.name" :placeholder="$t('name_cate')" />
      </el-form-item>
      <el-form-item :label="$t('size_chart')" prop="size_chart">
        <el-input v-model="objectData.size_chart" :placeholder="$t('size_chart')" />
      </el-form-item>
      <el-form-item :label="$t('img_category')">
        <div class="clearfix" />
        <upload-image :url-current="objectData.image" @onSetUrlImage="handleSetUrlImage" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import TrademarkResource from '@/api/trademark'
import UploadImage from '@/components/UploadImage'
import I18n from '../../../lang/i18n'
import i18n from '../../../lang/i18n'
const trademarkResource = new TrademarkResource()

export default {
  name: 'DialogFormCategory',
  components: { UploadImage },
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
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: I18n.t('input_name_category'), trigger: 'blur' }
        ]
      },
      dialog: { titleName: I18n.t('add_category'), buttonName: I18n.t('add') },
      loadingSubmit: false
    }
  },
  watch: {
    isAdd(value) {
      if (value) {
        this.dialog = Object.assign({}, { titleName: I18n.t('add_category'), buttonName: I18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: I18n.t('update_info_category'), buttonName: I18n.t('update') })
      }
    }
  },
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate((validate) => {
        if (validate) {
          if (this.objectData.image === '' || this.objectData.image === undefined) {
            this.$message.warning(i18n.t('img_category_error'))
          } else {
            if (this.isAdd) {
              this.handleSubmitCreate()
            } else {
              this.handleUpdateCategory()
            }
          }
        }
      })
    },
    handleSubmitCreate() {
      this.loadingSubmit = true
      trademarkResource.storeTrademark(this.objectData).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    handleUpdateCategory() {
      this.loadingSubmit = true
      trademarkResource.updateTrademark(this.objectData).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    handleSetUrlImage(object) {
      if (object.remove === 1) {
        this.objectData.image = ''
      } else {
        this.objectData.image = object.name
      }
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>

</style>
