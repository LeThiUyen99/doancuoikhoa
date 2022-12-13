<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form :model="postForm">
      <el-form-item :label="$t('reurn-policy-date')">
        <el-input v-model="postForm.return_count_date" type="number" :placeholder="$t('reurn-policy-date')" />
      </el-form-item>
      <el-form-item v-if="!objectData.id" :label="$t('apply-shop')">
        <el-select
          v-model="postForm.shop_id"
          style="width: 100%"
          class="w-100"
          filterable
          remote
          :multiple-limit="1"
          :placeholder="$t('filter_shop')"
        >
          <el-option
            v-for="shop in shops"
            :key="shop.id"
            :label="shop.name"
            :value="shop.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="objectData.id" :label="$t('apply-shop')">
        <el-select
          v-model="postForm.shop_id"
          :disabled="true"
          style="width: 100%"
          class="w-100"
          filterable
          remote
          :multiple-limit="1"
          :placeholder="$t('filter_shop')"
        >
          <el-option
            v-for="shop in shops"
            :key="shop.id"
            :label="shop.name"
            :value="shop.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('status')">
        <el-switch v-model="activeReturn" :active-text="activeTitle" />
      </el-form-item> </el-form><span slot="footer" class="dialog-footer">
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
import I18n from '../../../lang/i18n'
import ShopResource from '@/api/shop'
import ReturnPolicyResource from '@/api/return_policy'
const returnPolicyResource = new ReturnPolicyResource()
const shopResource = new ShopResource()
export default {
  name: 'DialogFormReturnPolicy',
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
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: {
        titleName: I18n.t('add_return_policy'),
        buttonName: I18n.t('add')
      },
      shops: [],
      loadingSubmit: false,
      activeReturn: false,
      activeTitle: I18n.t('off'),
      postForm: {}
    }
  },

  watch: {
    // isAdd(value) {
    //   console.log('......................wath is add ', value)
    //   if (value) {
    //     this.dialog = Object.assign( {}, { titleName: I18n.t("add_return_policy"), buttonName: I18n.t("add") } );
    //   } else {
    //     this.dialog = Object.assign( {},  { titleName: I18n.t("update_return_policy"), buttonName: I18n.t("update") } );
    //   }
    // },
    objectData(object) {
      this.postForm = object
      if (Object.keys(object).length > 0) {
        this.activeReturn = object.status === 1
        this.dialog = Object.assign({}, { titleName: I18n.t('update_return_policy'), buttonName: I18n.t('update') })
      } else {
        this.dialog = Object.assign({}, { titleName: I18n.t('add_return_policy'), buttonName: I18n.t('add') })
      }
    },
    activeReturn(value) {
      this.activeTitle = value ? I18n.t('on') : I18n.t('off')
      this.objectData.status = value ? 1 : 0
    }
  },
  created() {
    this.onGetListShop()
  },
  methods: {
    onSubmitForm() {
      if (this.isAdd) {
        this.handleCreate()
      } else {
        this.handleUpdate()
      }
    },
    handleCreate() {
      this.loadingSubmit = true
      returnPolicyResource.storeReturnPolicy(this.objectData).then(res => {
        this.loadingSubmit = false
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          this.onRefersh()
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
        } else {
          this.$message.error(msg)
        }
      })
    },
    handleUpdate() {
      this.loadingSubmit = true
      const body = {
        return_count_date: this.objectData.return_count_date,
        id: this.objectData.id,
        status: this.objectData.status
      }
      returnPolicyResource.updateReturnPolicy(body).then(res => {
        this.loadingSubmit = false
        const { error, msg } = res
        if (error === 0) {
          this.$message.success(msg)
          // this.onRefersh()
          this.$emit('onClickButtonDialog', { dialog: false, reload: true, reload_data: body })
        } else {
          this.$message.error(msg)
        }
      })
    },
    onRefersh() {
      this.objectData.return_count_date = ''
      this.objectData.shop_id = ''
      this.activeReturn = false
    },
    onGetListShop() {
      shopResource.listShopOption().then(response => {
        if (response.error === 0) {
          this.shops = [...response.list]
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
