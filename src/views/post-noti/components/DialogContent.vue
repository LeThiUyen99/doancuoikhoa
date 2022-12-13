<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    width="50"
  >
    <el-col>{{ content }}</el-col>
  </el-dialog>
</template>

<script>
import I18n from '../../../lang/i18n'
export default {
  name: 'DialogContent',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      dialog: { titleName: I18n.t('content') }
    }
  },
  methods: {
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style lang="scss" scoped></style>
