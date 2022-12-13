<template>
  <el-dialog
    :title="titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    append-to-body
    width="30%"
  >
    <el-form>
      <el-form-item :label="$t('note')" prop="notedShop">
        <el-input ref="refInput" v-model="notedShop" type="textarea" :placeholder="$t('note')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm">{{ $t('update') }}</el-button>
    </span>
  </el-dialog>
</template>
<script>

// import DeliveryResource from '@/api/delivery'
import i18n from '@/lang/i18n'
// const deliveryResource = new DeliveryResource()

export default {
  name: 'DialogNoteCall',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    idDelivery: {
      type: Number,
      default() { return 0 }
    },
    notedShop: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    console.log('........... note ghi chu: ', this.notedShop)
    return {
      titleName: i18n.t('update_history_title').format(''),
      body: {
        shop_noted: this.notedShop
      },
      loadingSubmit: false
    }
  },
  watch: {
    // showDialog(show) {
    //   console.log('....................show popup ', show, this.notedShop)
    //   if (show) {
    //     // if (this.$refs.refInput) {
    //     //   console.log('....................focus ')
    //     //   this.$refs.refInput.focus()
    //     // }
    //   }
    // },
    idDelivery(id) {
      this.titleName = i18n.t('update_history_title').format(`DL${id}`)
    }
  },
  methods: {
    onSubmitForm() {
      this.handleUpdateNote()
    },
    handleUpdateNote() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: true, noted: this.notedShop })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>

</style>
