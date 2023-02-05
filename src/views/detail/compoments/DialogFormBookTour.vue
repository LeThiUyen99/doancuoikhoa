<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose" width="40%">
    <el-form :model="body">
      <el-form-item :label="$t('name')">
        <el-input v-model="body.customer_name" :placeholder="$t('name')" />
      </el-form-item>
      <el-form-item :label="$t('phone')">
        <el-input v-model="body.customer_phone" :placeholder="$t('phone')" />
      </el-form-item>
      <el-form-item :label="$t('email')">
        <el-input v-model="body.customer_email" :placeholder="$t('email')" />
      </el-form-item>
      <el-form-item :label="$t('start_date')">
        <!-- <el-input v-model="body.start_date" :placeholder="$t('start_date')" /> -->
        <el-date-picker v-model="body.start_date" type="date" :placeholder="$t('start_date')" style="width:100%" />
      </el-form-item>
      <el-form-item :label="$t('quantity')">
        <el-input v-model="body.guest_number" :placeholder="$t('quantity')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ListTourResource from '@/api/list-tour'
import { convertDate } from '@/utils/convert'
import { getAcountInfo } from '@/utils/auth'
const account = getAcountInfo()
const listTourResource = new ListTourResource()
import i18n from '@/lang/i18n'
export default {
  name: 'DialogFormBookTour',
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
    }
  },

  data() {
    return {
      dialog: { titleName: i18n.t('book_tour'), buttonName: i18n.t('book_tour') },
      body: {},
      loadingSubmit: false
    }
  },
  // watch: {
  //   objectData(object) {
  //     if (Object.keys(object).length > 0) {
  //       this.body = Object.assign({}, object)
  //     }
  //   }
  // },

  mounted() {

  },

  methods: {
    onSubmitForm() {
      this.loadingSubmit = true
      this.body.user_id = account.id
      this.body.tour_id = this.objectData.id
      this.body.price = this.objectData.price
      listTourResource.storeBookTour(this.body).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(error_msg)
          this.handleClose()
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    },
    convertDate
  }
}
</script>

<style lang="scss" scoped>

</style>
