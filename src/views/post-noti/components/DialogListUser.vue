<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-col>{{ listUsers }}</el-col>
  </el-dialog>
</template>

<script>
import I18n from '../../../lang/i18n'
export default {
  name: 'DialogListUser',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    listUsers: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      dialog: { titleName: I18n.t('list-user') }
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
