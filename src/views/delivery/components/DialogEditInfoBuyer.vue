<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    append-to-body
    width="30%"
  >
    <el-form :model="objectData">
      <el-form-item :label="$t('VGA')" prop="vga">
        <el-input
          ref="refInput"
          v-model="vga"
          :disabled="true"
          :placeholder="$t('VGA')"
        />
      </el-form-item>
      <el-form-item :label="$t('name')" prop="name">
        <el-input
          ref="refInput"
          v-model="name"
          :disabled="true"
          :placeholder="$t('name')"
        />
      </el-form-item>
      <el-form-item :label="$t('height')" prop="height">(cm)
        <el-input ref="refInput" v-model="objectData.height" type="number" :placeholder="$t('height')" />
      </el-form-item>
      <el-form-item :label="$t('weight_customer')" prop="weight">(g)
        <el-input ref="refInput" v-model="objectData.weight" type="number" :placeholder="$t('weight')" />
      </el-form-item>
      <el-form-item :label="$t('hobbies')" prop="interests">
        <el-input
          ref="refInput"
          v-model="objectData.interests"
          :placeholder="$t('hobbies')"
        />
      </el-form-item>
      <el-form-item :label="$t('note')" prop="noted">
        <el-input ref="refInput" v-model="objectData.noted" :placeholder="$t('note')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t("canel") }}</el-button>
      <el-button
        type="primary"
        :loading="loadingSubmit"
        @click="onSubmitForm"
      >{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import DeliveryResource from '@/api/delivery'
import i18n from '@/lang/i18n'
const deliveryResource = new DeliveryResource()
export default {
  name: 'DialogEditInfoBuyer',
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
    vgaBuy: {
      type: Number,
      default() {
        return 0
      }
    },
    nameBuy: {
      type: String,
      default() {
        return ''
      }
    },
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: { titleName: i18n.t('create_info'), buttonName: i18n.t('add') },
      loadingSubmit: false,
      vga: '',
      name: '',
      height: '',
      weight: '',
      hobbies: '',
      note: ''
    }
  },
  watch: {
    vgaBuy(id) {
      if (id > 0) {
        this.vga = id
      }
    },
    nameBuy(value) {
      this.name = value
    },
    isAdd(value) {
      console.log(value)
    }
  },
  created() {
    this.nameTitle()
  },

  methods: {
    nameTitle() {
      if (this.isAdd === true) {
        console.log(this.isAdd)
        this.dialog = Object.assign({}, { titleName: i18n.t('create_info'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_info'), buttonName: i18n.t('update') })
      }
    },
    onSubmitForm() {
      if (!this.objectData.id) {
        this.onCreateInfoBuyer()
      } else {
        (
          this.onUpdateInfoBuyer()
        )
      }
    },
    onCreateInfoBuyer() {
      const body = {
        golfer_id: this.vga,
        weight: this.objectData.weight,
        height: this.objectData.height,
        interests: this.objectData.interests,
        noted: this.objectData.noted
      }
      deliveryResource.pushInfoBuyer(body).then(res => {
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, reload_data: body })
        } else {
          this.$message.error(msg)
        }
      })
    },
    onUpdateInfoBuyer() {
      const body = {
        id: this.objectData.id,
        weight: this.objectData.weight,
        height: this.objectData.height,
        interests: this.objectData.interests,
        noted: this.objectData.noted
      }
      deliveryResource.updateInfoBuyer(body).then(res => {
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, reload_data: body })
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

<style lang="scss" scoped></style>
