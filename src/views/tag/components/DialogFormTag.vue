<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form ref="ruleForm" :model="objectData" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('product_name')" prop="name">
        <el-input v-model="objectData.name" :placeholder="$t('product_name')" />
      </el-form-item>
      <el-form-item :label="$t('shop')" prop="shop_id">
        <el-select v-model="objectData.category_id" class="w-100" :placeholder="$t('category')">
          <el-option
            v-for="category in categoryData"
            :key="category.id"
            :label="category.name"
            :value="category.id"
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
import TagResource from '@/api/tag'
import I18n from '../../../lang/i18n'
const tagResource = new TagResource()

export default {
  name: 'DialogFormTag',
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    categoryData: {
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
      categories: [],
      rules: {
        name: [
          { required: true, message: I18n.t('input_name_product'), trigger: 'blur' }
        ]
      },
      dialog: { titleName: I18n.t('add_new_tag'), buttonName: I18n.t('add') },
      loadingSubmit: false
    }
  },
  watch: {
    isAdd(value) {
      if (value) {
        this.dialog = Object.assign({}, { titleName: I18n.t('add_new_tag'), buttonName: I18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: I18n.t('update_tag_confirm'), buttonName: I18n.t('update') })
      }
    },
    objectData(object) {
      // if (object && Object.keys(object).length > 0) {
      //   this.onGetCategoryList(object.value)
      // }
    }
  },
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate((validate) => {
        if (validate) {
          if (!this.objectData.category_id || this.objectData.category_id === '' || this.objectData.category_id === undefined) {
            this.$message.warning(I18n.t('choosen_category'))
          } else {
            if (this.isAdd) {
              this.handleSubmitTag()
            } else {
              this.handleUpdateTag()
            }
          }
        }
      })
    },
    handleSubmitTag() {
      this.loadingSubmit = true
      tagResource.storeTag(this.objectData).then(response => {
        this.loadingSubmit = false
        if (response.error === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(response.msg)
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    handleUpdateTag() {
      this.loadingSubmit = true
      tagResource.updateTag(this.objectData).then(response => {
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
