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
      <el-form-item :label="$t('order_of_display')" prop="sort_index">
        <el-input v-model="objectData.sort_index" :placeholder="$t('order_of_display')" />
      </el-form-item>
      <el-form-item :label="$t('logo')">
        <div class="clearfix" />
        <upload-image :url-current="objectData.thumb" @onSetUrlImage="handleSetUrlImage" />
      </el-form-item>
      <el-form-item :label="$t('active')">
        <el-switch
          v-model="activeCategories"
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
import I18n from '@/lang/i18n'
import CategoryResource from '@/api/category'
import UploadImage from '@/components/UploadImage'
const categoryResource = new CategoryResource()
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
      activeCategories: false,
      activeTitle: I18n.t('off'),
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
    },
    objectData(object) {
      if (Object.keys(object).length > 0) {
        this.activeCategories = (object.active === 1)
      }
    },
    activeCategories(value) {
      this.activeTitle = value ? I18n.t('on') : I18n.t('off')
      this.objectData.active = value ? 1 : 0
    }
  },
  methods: {
    onSubmitForm() {
      if (this.isAdd) {
        this.handleSubmitCreate()
      } else {
        this.handleUpdateCategory()
      }
    },
    handleSubmitCreate() {
      this.loadingSubmit = true
      this.objectData.sort_index = parseInt(this.objectData.sort_index)
      categoryResource.storeCategory(this.objectData).then(response => {
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
      this.objectData.sort_index = parseInt(this.objectData.sort_index)
      categoryResource.updateCategory(this.objectData).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, data: this.objectData })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    handleSetUrlImage(object) {
      if (object.remove === 1) {
        this.objectData.thumb = ''
      } else {
        this.objectData.thumb = object.name
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
