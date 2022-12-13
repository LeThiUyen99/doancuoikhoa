<template>
  <el-dialog
    :title="$t('add_address')"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-row class="dialog-address">
      <el-form
        ref="ruleForm"
        :model="postForm"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="golfer_id">
          <label><span style="color: #ff4949">*</span> {{ $t("VGA") }}:</label>
          <div class="address">
            <el-input
              ref="refVga"
              v-model="postForm.golfer_id"
              style="padding-right: 5px"
              :placeholder="$t('VGA')"
            />
            <el-button
              :loading="loadingSubmit"
              class="button-delivery"
              :autofocus="true"
              @click="searchUser"
            >{{ $t("search") }}</el-button>
          </div>
        </el-form-item>
        <el-row style="display: flex">
          <el-form-item
            style="width: 100%; padding-right: 5px"
            :label="$t('full_name')"
            prop="name"
          >
            <el-input
              v-model="postForm.name"
              :placeholder="$t('full_name')"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item style="width: 100%" :label="$t('phone')" prop="phone">
            <el-input
              ref="refPhone"
              v-model="postForm.phone"
              :placeholder="$t('phone')"
              autocomplete="off"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :sm="8" class="pr-lg-5">
            <el-form-item :label="$t('city')" :required="true">
              <el-select
                v-model="provinceModel"
                class="w-100"
                filterable
                remote
                reserve-keyword
                :placeholder="$t('search_city')"
                :remote-method="onSearchProvince"
                :loading="provice_loading"
                @focus="provicesFocus"
              >
                <el-option
                  v-for="province in provinces_search"
                  :key="province.viettel_id"
                  :label="province.viettel_name"
                  :value="province.viettel_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8" class="pr-lg-5">
            <el-form-item :label="$t('district')" :required="true">
              <el-select
                v-model="districtModel"
                class="w-100"
                filterable
                remote
                reserve-keyword
                :remote-method="onSearchDistrict"
                :placeholder="$t('search_district')"
                :loading="district_loading"
                @focus="districtFocus"
              >
                <el-option
                  v-for="district in districts_search"
                  :key="district.viettel_id"
                  :label="district.viettel_name"
                  :value="district.viettel_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item :label="$t('wards')" :required="true">
              <el-select
                v-model="wardsModel"
                class="w-100"
                filterable
                remote
                reserve-keyword
                :remote-method="onWardsSearch"
                :placeholder="$t('search_wards')"
                :loading="wards_loading"
                @focus="wardsFocus"
              >
                <el-option
                  v-for="ward in wards_search"
                  :key="ward.viettel_id"
                  :label="ward.viettel_name"
                  :value="ward.viettel_id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          :label="$t('specific_address')"
          :required="true"
          prop="specific_address"
        >
          <el-input
            v-model="postForm.specific_address"
            :placeholder="$t('input_specific_address')"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <span style="float: right">
        <el-button @click="handleClose">{{ $t("canel") }}</el-button>
        <el-button
          type="primary"
          :loading="loadingSubmit"
          @click="onSubmitForm('ruleForm')"
        >{{ $t("add") }}</el-button>
      </span>
    </el-row>
  </el-dialog>
</template>
<script>
import GolferAddressResource from '@/api/golfer_address'
import ShopResource from '@/api/shop'
import DeliveryResource from '@/api/delivery'
import { setRules } from '@/utils/address/validateAddress'
// import { convertDataDistrict, convertDataSelect, convertWards } from '@/utils/shop/convertShop'
import i18n from '@/lang/i18n'
const shopResource = new ShopResource()
const golferAddressResource = new GolferAddressResource()
const deliveryResource = new DeliveryResource()

export default {
  name: 'DialogAddAddress',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      provinces: [],
      provinces_search: [],
      provinceModel: null,
      districts: [],
      districts_search: [],
      districtModel: {},
      wards: [],
      wards_search: [],
      wardsModel: {},
      name: '',
      phone: '',
      vga: '',
      // specific_address: '',
      postForm: {},
      loadingSubmit: false,
      provice_loading: true,
      district_loading: true,
      wards_loading: true,
      rules: setRules()
    }
  },
  watch: {
    dialogVisible(show) {
      setTimeout(() => {
        this.$refs.refVga.focus()
      }, 100)
      if (show && !this.provinces.length) {
        this.onGetProvinceList()
      }
    },
    provinceModel(province_id) {
      this.resetDistrict()
      this.resetWards()
      if (province_id) {
        this.onGetDistrict(province_id)
      }
    },
    districtModel(district_id) {
      if (!district_id) return
      this.resetWards()
      if (district_id) {
        this.onGetWards(district_id)
      }
    }
  },
  // created() {
  //   this.onGetProvinceList()
  // },
  methods: {
    onSubmitForm(formName) {
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.handleCreateAddress()
        }
      })
    },
    provicesFocus() {
      if (!this.provinces.length) {
        this.onGetProvinceList()
      }
    },
    districtFocus() {
      if (!this.districts.length) {
        this.onGetDistrict(this.provinceModel)
      }
    },
    wardsFocus() {},
    searchUser() {
      // if (!this.postForm.golfer_id || !this.postForm.golfer_id.length) {
      //   return this.$msgbox(i18n.t('vga_empty'))
      // }
      deliveryResource
        .get_golfer_info(this.postForm.golfer_id)
        .then((res) => {
          const { error, info } = res
          if (error === 0) {
            this.vga = info.id
            this.name = info.name
            this.postForm.name = info.name
            this.postForm = Object.assign({}, this.postForm)
            this.$refs.refPhone.focus()
          }
        })
        .then((_err) => {
          // this.loadingTable = false
        })
    },
    handleCreateAddress() {
      const city = this.provinces.find(
        (d) => d.viettel_id === this.provinceModel
      )
      const district = this.districts.find(
        (d) => d.viettel_id === this.districtModel
      )
      const wards = this.wards.find((d) => d.viettel_id === this.wardsModel)
      if (!city) {
        return this.$msgbox(i18n.t('city_empty'))
      }
      if (!district) {
        return this.$msgbox(i18n.t('district_empty'))
      }
      if (!wards) {
        return this.$msgbox(i18n.t('district_empty'))
      }
      this.$msgbox(i18n.t('confirm_create_address')).then(() => {
        const body = {
          address: this.postForm.specific_address,
          golfer_id: this.vga,
          city: city.viettel_name,
          district: district.viettel_name,
          township: wards.viettel_name,
          name: this.postForm.name,
          phone: this.postForm.phone,
          is_default: 1,
          city_viettel_post_code: city.viettel_code,
          city_viettel_post_id: city.viettel_id,
          district_viettel_post_code: district.viettel_value,
          district_viettel_post_id: district.viettel_id,
          township_viettel_post_code: '',
          township_viettel_post_id: wards.viettel_id
        }
        golferAddressResource.createAddress(body).then((response) => {
          const { error, insert, msg } = response
          if (error === 0) {
            this.handleClose(true, insert)
            const golfer = {
              name: this.name,
              id: this.vga,
              phone: this.phone
            }

            this.$emit('onClickButtonForm', {
              dialog: false,
              reload: false,
              insert: insert,
              golfer: golfer
            })
          } else {
            this.$message.error(msg)
          }
        })
      })
    },
    resetDistrict() {
      this.districtModel = null
      this.districts = []
    },
    resetWards() {
      this.wardsModel = null
      this.wards = []
    },
    onSearchProvince(keyword) {
      if (keyword !== '') {
        this.provinces_search = this.provinces.filter((item) => {
          // const string = removeVietnameseTones(item.label.toLowerCase())
          const _string = item.viettel_name.toLowerCase()
          // console.log('............. tim tu', _string)
          return _string.indexOf(keyword.toLowerCase()) > -1
        })
        if (this.provinces_search.length) {
          this.provice_loading = false
        }
      }
    },
    onSearchDistrict(keyword) {
      if (keyword !== '') {
        this.districts_search = this.districts.filter((item) => {
          // const string = removeVietnameseTones(item.label.toLowerCase())
          const _string = item.viettel_name.toLowerCase()
          // console.log('............. tim tu', _string)
          return _string.indexOf(keyword.toLowerCase()) > -1
        })
        if (this.districts_search.length) {
          this.district_loading = false
        }
      }
    },
    onGetProvinceList() {
      shopResource.getProvinceList().then((response) => {
        const { error, data } = response
        if (error === 0) {
          this.provinces = [...data]
          this.provinces_search = [...data]
          this.provice_loading = false
        }
      })
    },
    onGetDistrict(viettel_province_id) {
      const params = { viettel_province_id }
      shopResource
        .getDistrictList(params)
        .then((response) => {
          const { error, data } = response
          if (error === 0) {
            this.districts = [...data]
            this.districts_search = [...data]
            this.district_loading = false
          }
        })
        .catch((er) => {
          this.loadingTable = false
        })
    },
    onWardsSearch(keyword) {
      if (keyword !== '') {
        this.wards_search = this.wards.filter((item) => {
          const _string = item.viettel_name.toLowerCase()
          return _string.indexOf(keyword.toLowerCase()) > -1
        })
        if (this.wards_search.length) {
          this.wards_loading = false
        }
      }
    },
    onGetWards(viettel_district_id) {
      const params = { viettel_district_id }
      shopResource
        .getWardsList(params)
        .then((response) => {
          const { error, data } = response
          if (error === 0) {
            this.wards = [...data]
            this.wards_search = [...data]
            this.wards_loading = false
          }
        })
        .catch((er) => {
          this.loadingTable = false
        })
    },
    handleClose(reload = false, info_address = null) {
      // const golfer = {
      //   name: this.name,
      //   id: this.vga,
      //   phone: this.phone,
      // };
      this.$emit('onClickButtonForm', {
        dialog: false,
        reload: reload,
        address: info_address
        // golfer: golfer,
      })
    },
    handleSetInfoAddress() {
      this.postForm.province_id = this.provinceModel.value
      this.postForm.province_name = this.provinceModel.label
      this.postForm.province_code = this.provinceModel.data.PROVINCE_CODE
      this.postForm.district_id = this.districtModel.value
      this.postForm.district_name = this.districtModel.label
      this.postForm.district_code = this.districtModel.data.DISTRICT_VALUE
      this.postForm.wards_id = this.wardsModel.value
      this.postForm.wards_name = this.wardsModel.label
    },
    handleClearDataDialog() {
      this.provinceModel = {}
      this.provinces = []
      this.wardsModel = {}
      this.wards = []
      this.districtModel = {}
      this.districts = []
    }
  }
}
</script>

<style scoped>
.address {
  display: flex;
}
</style>
