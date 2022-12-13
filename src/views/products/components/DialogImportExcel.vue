<template>
  <el-dialog
    :title="$t('add_import_file')"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-row class="dialog-upload">
      <el-upload
        class="upload-demo"
        name="image"
        :action="urlBaseApi"
        :file-list="fileList"
        :on-success="handleUploadSuccess"
        :before-upload="handleBeforeUpload"
        accept=".xlsx, .xls, .zip"
        list-type="picture"
      >
        <el-button size="small" type="primary">{{ $t('click_upload') }}</el-button>
        <div slot="tip" class="el-upload__tip">{{ $t('file_import') }} <span v-if="uploadSuccess" style="color: red">{{ $t('uploading') }}</span></div>
      </el-upload>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitPostForm">{{ $t('update') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProductResource from '@/api/product'
const productResource = new ProductResource()
const urlBaseApi = process.env.VUE_APP_BASE_API
import FileExcel from '@/assets/images/excel.png'
import FileZip from '@/assets/images/zip-file.png'
import i18n from '@/lang/i18n'
export default {
  name: 'DialogImportExcel',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingSubmit: false,
      fileList: [],
      urlBaseApi: `${urlBaseApi}/api/public/post`,
      isFileZip: true,
      postForm: {},
      uploadSuccess: false
    }
  },
  methods: {
    onSubmitPostForm() {
      if (this.fileList.length === 2) {
        this.loadingSubmit = true
        console.log('.......post upload : ', JSON.stringify(this.postForm))
        productResource.importFileProduct(this.postForm).then(response => {
          this.loadingSubmit = false
          this.onGetProductStatus(response.id)
        }).catch(error => {
          console.log('............. co loi : ', error)
          this.loadingSubmit = false
        })
      } else {
        this.$message.warning(i18n.t('mess_import'))
      }
    },
    onGetProductStatus(id) {
      const self = this
      productResource.statusProduct(id).then(response => {
        this.loadingSubmit = true
        const info = response.info
        console.log('...........check info : ', JSON.stringify(info))
        if (info) {
          if ([1, 3].includes(info.status)) {
            this.$emit('onClickButtonImport', { dialog: false, reload: false })
            this.fileList = []
            const msg = (info.status === 1) ? i18n.t('add_success_product').format(`${info.total_finish}/${info.total_import}`) : info.error_msg
            // const msg = `Thêm thành công ${info.total_finish}/${info.total_import} sản phẩm`
            this.loadingSubmit = false
            this.$message.success(msg)
          } else {
            setTimeout(() => {
              self.onGetProductStatus(id)
            }, 500)
          }
        } else {
          this.$message.error('')
        }
      })
    },
    handleUploadSuccess(response, file) {
      const File = (this.isFileZip) ? FileZip : FileExcel
      const objectFile = { name: response.path, url: File, data: response }
      if (this.isFileZip) {
        this.postForm.path_zip = response.path
        this.uploadSuccess = false
      } else {
        this.postForm.path_exel = response.path
      }
      this.fileList.push(objectFile)
    },
    handleBeforeUpload(file) {
      const extension = file.name.split('.').pop()
      if (extension === 'zip') {
        this.isFileZip = true
        this.uploadSuccess = true
      } else {
        this.isFileZip = false
        this.uploadSuccess = false
      }
    },
    handleClose() {
      this.loadingSubmit = false
      this.$emit('onClickButtonImport', { dialog: false, reload: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
