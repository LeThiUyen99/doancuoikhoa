<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose" width="30%">
    <div class="feedback">
      <el-form :model="commentForm">
        <el-rate
          v-model="commentForm.rating"
          :colors="colors"
        />
        <el-input v-model="commentForm.comment" type="textarea" :placeholder="$t('content')" />
        <el-form-item class="btn-comment" size="large">
          <el-button :loading="loadingSubmit" type="primary" @click="onSubmit">{{ $t('vote') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import i18n from '@/lang/i18n'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()
export default {
  name: 'DialogVoteTour',
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
      dialog: { titleName: i18n.t('comment'), buttonName: i18n.t('vote') },
      commentForm: {},
      loadingSubmit: false,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },
  methods: {
    onSubmit() {
      this.addComment()
      this.updateActive()
    },
    addComment() {
      this.loadingSubmit = true
      this.commentForm.tour_id = this.objectData.tour_id
      this.commentForm.user_id = this.objectData.user_id
      console.log(this.objectData, 'dfsfds')
      listTourResource.postComment(this.commentForm).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(error_msg)
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    updateActive() {
      const body = {
        active_comment: 1,
        id: this.objectData.id
      }
      this.loadingTable = true
      listTourResource.updateActiveComment(body).then(res => {
        this.loadingTable = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(error_msg)
          const data_active = {
            active_comment: body.active_comment
          }
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, data_active: data_active })
        } else {
          this.$message.error(error_msg)
        }
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style>
.history-delivery-container .el-dialog__body{
  padding: 0px 20px 20px 20px;
}
.history-delivery-container .el-input--medium{
  padding: 10px 0;
}
.btn-comment{
  text-align: right;
}
</style>
