<template>
  <el-dialog
    :title="titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-row>
      <el-form ref="ruleForm" :model="objectData" status-icon :rules="rules">
        <el-form-item label="Ghi chú" prop="reject_content">
          <el-input v-model="objectData.reject_content" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-row>
        <h6>{{ $t('exam') }}:</h6>
        <el-tag
          v-for="(content, index) in contentNote"
          :key="index"
          closable
          :disable-transitions="false"
          @click="onSelectedContent(content)"
          @close="handleCloseTag(index)"
        >
          {{ content }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ {{ $t('add_content') }}</el-button>
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ $t('confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import DeliveryResource from '@/api/delivery'
const deliveryResource = new DeliveryResource()
export default {
  name: 'DialogCancelOrder',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    contentNote: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      titleName: '',
      rules: {
        reject_content: [
          { required: true, message: 'Vui lòng nhập nội dung ghi chú', trigger: 'blur' },
          { min: 10, max: 255, message: 'Nội dung phải từ 10 đến 255 ký tự', trigger: 'blur' }
        ]
      },
      loadingSubmit: false,
      inputVisible: false,
      inputValue: ''
    }
  },
  watch: {
    objectData(object) {
      this.titleName = `Xác nhận hủy đơn hàng: #${object.name_delivery}`
    }
  },
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = { id: this.objectData.id, state: 4, code: 0, reject_content: this.objectData.reject_content }
          deliveryResource.updateDelivery(data).then(response => {
            this.handleClose()
            if (response.error === 0) {
              this.$message.success('Cập nhật dữ liệu thành công.')
            } else {
              this.$message.success('Cập nhật dữ liệu không thành công.')
            }
          })
        }
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.contentNote.push(inputValue)
      }
      localStorage.setItem('contents', JSON.stringify(this.contentNote))
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    onSelectedContent(note) {
      this.objectData.reject_content = note
    },
    handleCloseTag(index) {
      this.contentNote.splice(index, 1)
      localStorage.setItem('contents', JSON.stringify(this.contentNote))
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: true })
    }
  }
}
</script>

<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
