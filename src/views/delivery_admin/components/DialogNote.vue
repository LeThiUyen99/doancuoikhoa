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

import DeliveryResource from '@/api/delivery'
import i18n from '@/lang/i18n'
const deliveryResource = new DeliveryResource()

export default {
  name: 'DialogNote',
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
      titleName: i18n.t('update_note'),
      body: {
        shop_noted: this.notedShop
      },
      loadingSubmit: false
    }
  },
  watch: {
    showDialog(show) {
      console.log('....................show popup ', show, this.notedShop)
      if (show) {
        // if (this.$refs.refInput) {
        //   console.log('....................focus ')
        //   this.$refs.refInput.focus()
        // }
      }
    },
    idDelivery(id) {
      if (id > 0) {
        this.body.id = id
        console.log('this.body.id', this.body.id)
      }
    }
  },
  methods: {
    onSubmitForm() {
      this.handleUpdateNote()
    },
    handleUpdateNote() {
      const body = {
        id: this.body.id,
        shop_noted: this.notedShop
      }
      this.loadingSubmit = true
      deliveryResource.updateNote(body).then(response => {
        console.log(body)
        this.loadingSubmit = false
        const { error, msg } = response
        if (error === 0) {
          this.$message.success(msg)
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, noted: body.shop_noted })
        } else {
          this.$message.error(msg)
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
