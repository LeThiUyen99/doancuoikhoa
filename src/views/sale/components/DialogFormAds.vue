<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    width="80%"
  >
    <el-form :model="body" class="adsForm">
      <div style="display: flex">
        <el-form-item class="col-sp top" :label="$t('name')" prop="name">
          <el-input v-model="body.name" :placeholder="$t('name')" />
        </el-form-item>
        <el-form-item class="col-sp" :label="$t('category')" prop="name">
          <el-select v-model="body.category_id" class="w-100" :placeholder="$t('category')">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item class="col-sp top" :label="$t('banner')" prop="url_baner">
          <div class="clearfix" />
          <upload-image v-model="body.url_baner" :url-current="body.url_baner" @onSetUrlImage="handleSetUrlImage" />
        </el-form-item>
        <el-form-item class="col-sp" :label="$t('poster')" prop="url_poster">
          <div class="clearfix" />
          <upload-image v-model="body.url_poster" :url-current="body.url_poster" @onSetUrlImage="handleSetUrlImage1" />
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item class="col-sp top" :label="$t('from_date')" prop="from_date">
          <span class="time" />
          <el-date-picker
            v-model="body.from_date"
            style="width:100%; padding-right:10px"
            type="datetime"
            :placeholder="$t('from_start')"
          />
        </el-form-item>
        <el-form-item class="col-sp" :label="$t('to_date')" prop="to_date">
          <span class="time" />
          <el-date-picker
            v-model="body.to_date"
            style="width:100%"
            type="datetime"
            format="dd-MM-yyyy HH:mm:ss"
            :default-time="defaultTime"
            :picker-options="datePickerOptions"
            :placeholder="$t('time_end')"
          />
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item class="col-sp top" label="Action">
          <el-switch
            v-model="activeAds"
            :active-text="activeTitle"
          />
        </el-form-item>
        <el-form-item class="col-sp" :label="$t('show_details')">
          <el-switch
            v-model="activeShow"
            :active-text="activeTitleshow"
          />
        </el-form-item>
      </div>
      <el-form-item :label="$t('hotline')" prop="hotline">
        <el-input v-model="body.hotline" :placeholder="$t('hotline')" />
      </el-form-item>
      <el-form-item :label="$t('desc')" prop="info_pack">
        <el-input v-model="body.info_pack" type="textarea" :placeholder="$t('desc')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>
<script>

import UploadImage from '@/components/UploadImage'
import CategoryResource from '@/api/category'
import SaleResource from '@/api/sale'
import moment from 'moment'
import i18n from '@/lang/i18n'
const saleResource = new SaleResource()
const categoryResource = new CategoryResource()

export default {
  name: 'DialogFormAds',
  components: { UploadImage },
  props: {
    objectData: {
      type: Object,
      default() {
        return {}
      }
    },
    categoryData: {
      type: Array,
      default() {
        return []
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
      dialog: { titleName: i18n.t('create_banner'), buttonName: i18n.t('add') },
      activeAds: false,
      activeTitle: i18n.t('deactive'),
      activeTitleshow: i18n.t('no'),
      activeShow: false,
      categories: [],
      url_baner: '',
      defaultTime: '23:59:00',
      url_poster: '',
      body: {},
      loadingSubmit: false
    }
  },
  computed: {
    datePickerOptions() {
      return {
        disabledDate: time => {
          const yestoday = new Date(this.body.from_date)
          yestoday.setDate(yestoday.getDate())
          return time.getTime() < yestoday.getTime()
        }
      }
    }
  },
  watch: {
    objectData(object) {
      if (Object.keys(object).length > 0) {
        this.activeAds = (object.active === 1)
        this.activeShow = (object.app_type === 1)
        this.body = Object.assign({}, object)
      }
    },
    showDialog(value) {
      if (value) {
        if (this.isAdd) {
          this.body = {}
        }
        this.getListCategory()
      }
    },
    activeAds(value) {
      this.activeTitle = value ? i18n.t('active1') : i18n.t('deactive')
      this.body.active = value ? 1 : 0
    },
    activeShow(value) {
      this.activeTitleshow = value ? i18n.t('yes') : i18n.t('no')
      this.body.app_type = value ? 1 : 0
    },
    isAdd(value) {
      if (value) {
        this.dialog = Object.assign({}, { titleName: i18n.t('create_banner'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_banner'), buttonName: i18n.t('update') })
      }
    }
  },
  methods: {
    validateTime() {
      if (this.body.from_date) {
        this.body.from_date = moment(this.body.from_date).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.body.to_date) {
        this.body.to_date = moment(this.body.to_date).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    onSubmitForm() {
      console.log('..................... onSubmitForm ')
      if (this.isAdd) {
        this.validateTime()
        this.onCreateAds()
      } else {
        const keys = Object.keys(this.body)
        for (const key of keys) {
          if (this.body[key] === this.objectData[key]) {
            delete this.body[key]
          }
        }
        delete this.body.category_name
        this.body.id = this.objectData.id
        this.validateTime()
        this.onUpdateAds()
      }
    },
    onCreateAds() {
      console.log('........................ body update', JSON.stringify(this.body))
      this.loadingSubmit = true
      this.$confirm(i18n.t('create_banner_confirm')).then(_ => {
        saleResource.createAds(this.body).then(response => {
          this.loadingSubmit = false
          if (response.error === 0) {
            this.$emit('onClickDialogAds', { dialog: false, reload: true })
            this.$message.success(response.msg)
          } else {
            this.$message.error(response.msg)
          }
        })
      })
    },
    onUpdateAds() {
      console.log('........................ body update', JSON.stringify(this.body))
      this.$confirm(i18n.t('update_banner_confirm')).then(_ => {
        this.loadingSubmit = true
        saleResource.updateAds(this.body).then(response => {
          this.loadingSubmit = false
          if (response.error === 0) {
            this.$emit('onClickDialogAds', { dialog: false, reload: true })
            this.$message.success(response.msg)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(err => {
          this.loadingSubmit = false
          this.$message.error(err)
        })
      })
    },
    getListCategory() {
      categoryResource.listCategory().then(response => {
        const { error, list } = response
        if (error === 0) {
          this.categories = [...list]
        }
      })
    },
    handleSetUrlImage(object) {
      if (Object.keys(object).length > 0) {
        this.body.url_baner = object.name
      }
    },
    handleSetUrlImage1(object) {
      if (Object.keys(object).length > 0) {
        this.body.url_poster = object.name
      }
    },
    handleClose() {
      this.$emit('onClickDialogAds', { dialog: false, reload: false })
      // this.handleClearDataDialog()
    }
  }
}
</script>

<style scoped>
.time{
  width: 79px;
  display: block;
  height: 40px;
}
.col-sp {
  width: 100%;
}
.top {
  padding-right: 10px;
}
</style>
