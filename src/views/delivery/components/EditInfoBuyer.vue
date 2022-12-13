<template>
  <el-dialog
    :title="titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    append-to-body
    width="30%"
  >
    <el-form>
      <el-form-item :label="$t('full_name')" prop="nameGolfer">
        <el-input
          ref="refInput"
          v-model="nameGolfer"
          :placeholder="$t('full_name')"
        />
      </el-form-item>
      <el-form-item :label="$t('phone')" prop="phoneGolfer">
        <el-input
          ref="refInput"
          v-model="phoneGolfer"
          :placeholder="$t('phone')"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t("canel") }}</el-button>
      <el-button
        type="primary"
        :loading="loadingSubmit"
        @click="onSubmitForm"
      >{{ $t("update") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import GolferAddressResource from '@/api/golfer_address'
import i18n from '@/lang/i18n'
const golferAddressResource = new GolferAddressResource()
export default {
  name: 'EditInfoBuyer',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    idDelivery: {
      type: Number,
      default() {
        return 0
      }
    },
    nameGolfer: {
      type: String,
      default() {
        return ''
      }
    },
    phoneGolfer: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      titleName: i18n.t('info_buyer'),
      loadingSubmit: false,
      body: {
        name: this.nameGolfer,
        phone: this.phoneGolfer
      }
    }
  },
  methods: {
    onSubmitForm() {
      this.handleUpdateInfo()
    },
    handleUpdateInfo() {
      const body = {
        id: this.idDelivery,
        name: this.nameGolfer,
        phone: this.phoneGolfer
      }
      this.loadingSubmit = true
      golferAddressResource.updateInfoGolfer(body).then(response => {
        console.log(body)
        this.loadingSubmit = false
        const { error, msg } = response
        if (error === 0) {
          this.$message.success(msg)
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, name_golfer: body.name, phone_golfer: body.phone })
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
