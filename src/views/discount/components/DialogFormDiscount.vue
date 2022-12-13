<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form>
      <el-row class="gr-dis">
        <el-row class="left">
          <el-form-item label="Ảnh mô tả">
            <el-upload class="upload">
              <el-button size="small" type="primary">Chọn tệp</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="Tên chương trình">
            <el-input placeholder="Tên chương trình" />
          </el-form-item>
          <el-form-item label="Loại mã">
            <el-select placeholder="Loại mã">
              <el-option value="" />
            </el-select>
          </el-form-item>
          <el-form-item label="Số lượng">
            <el-input placeholder="Số lượng" />
          </el-form-item>
          <el-form-item label="Loại khuyến mại">
            <el-select placeholder="Loại khuyến mại">
              <el-option value="" />
            </el-select>
          </el-form-item>
          <el-form-item label="Trạng thái">
            <el-select placeholder="Trạng thái">
              <el-option value="" />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Mã">
            <el-input placeholder="Mã" />
          </el-form-item>
          <el-form-item label="Giá trị">
            <el-input placeholder="Giá trị" />
          </el-form-item>
          <el-form-item label="Giá trị tối đa khuyến mại">
            <el-input placeholder="Giá trị tối đa khuyến mại" />
          </el-form-item>
          <el-form-item label="Số lần nhập tối đa mỗi golfer">
            <el-input placeholder="Số lần nhập tối đa mỗi golfer" />
          </el-form-item>
          <el-form-item label="Thời gian áp dụng">
            <el-input placeholder="Thời gian áp dụng" />
          </el-form-item>
          <el-form-item label="Danh sách golfer (chỉ mã riêng)">
            <el-upload class="upload">
              <el-button size="small" type="primary">Chọn tệp</el-button>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogFormDiscount',
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: { titleName: 'Thêm mới mã giảm giá', buttonName: 'Thêm mới' }
    }
  },
  methods: {
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>
.gr-dis{
  display: flex;
}
.el-row{
  width: 100%;
}
.el-select, .el-upload--text{
  width: 100%;
}
.left{
  margin-right: 10px;
}
</style>
