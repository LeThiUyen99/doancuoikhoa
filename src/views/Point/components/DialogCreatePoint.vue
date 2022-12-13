<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    width="80%"
  >
    <el-form v-model="postForm">
      <div style="display: flex">
        <div style="padding-right:10px; width:100%">
          <el-form-item :label="$t('user')">
            <el-input
              v-model="postForm.golfer_id"
              type="number"
              :placeholder="$t('user')"
            />
          </el-form-item>
          <el-form-item :label="$t('order')">
            <el-input
              v-model="postForm.delivery_id"
              type="number"
              :placeholder="$t('order')"
            />
          </el-form-item>
        </div>
        <div style="width:100%">
          <el-form-item :label="$t('program_name')">
            <el-input
              v-model="postForm.name_promotion"
              :placeholder="$t('program_name')"
            />
          </el-form-item>
          <el-form-item :label="$t('completed_points')">
            {{ formatNumber(postForm.point ? postForm.point : 0) }} VND
            <el-input
              v-model="postForm.point"
              type="number"
              :placeholder="$t('completed_points')"
            />
          </el-form-item>
        </div>
      </div>
      <el-form-item :label="$t('note')">
        <el-input v-model="postForm.noted" type="textarea" :placeholder="$t('note')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t("canel") }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="createPoint">{{
        dialog.buttonName
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import I18n from '../../../lang/i18n'
import { formatNumber } from '@/utils/convert'
import PointResource from '@/api/point'
const pointResource = new PointResource()
export default {
  name: 'DialogCreatePoint',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: {
        titleName: I18n.t('complete_points'),
        buttonName: I18n.t('add')
      },
      postForm: {},
      loadingSubmit: false
    }
  },

  mounted() {},

  methods: {
    onRefersh() {
      this.postForm.golfer_id = ''
      this.postForm.delivery_id = ''
      this.postForm.point = ''
    },
    createPoint() {
      this.loadingSubmit = true
      pointResource
        .storePoint(
          this.postForm.golfer_id,
          this.postForm.point,
          this.postForm.delivery_id,
          this.postForm.name_promotion,
          this.postForm.noted
        )
        .then(res => {
          this.loadingSubmit = false
          const { error, msg } = res
          if (error === 0) {
            this.$message.success(msg)
            this.onRefersh()
            this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          } else {
            this.$message.success(msg)
            // this.$emit('onClickButtonDialog', { dialog: false, reload: false })
          }
        })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    },
    formatNumber
  }
}
</script>

<style lang="scss" scoped></style>
