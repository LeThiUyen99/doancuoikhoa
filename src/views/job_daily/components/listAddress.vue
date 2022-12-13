<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
    append-to-body
    width="80%"
  >
    <el-row v-if="isAddressShow" class="change-address">
      <el-col>
        <el-form :model="postForm" class="demo-ruleForm">
          <el-row>
            <el-col :sm="24" class="pr-lg-5">
              <el-form-item :label="$t('name')" prop="name">
                <el-input v-model="postForm.name" :placeholder="$t('name')" />
              </el-form-item>
              <el-form-item :label="$t('phone')" prop="phone">
                <el-input v-model="postForm.phone" :placeholder="$t('phone')" />
              </el-form-item>
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
                prop="address"
              >
                <el-input
                  v-model="postForm.address"
                  :placeholder="$t('input_specific_address')"
                />
              </el-form-item>
              <el-form-item v-if="this.postForm.id" :label="$t('active_show')">
                <el-switch
                  v-model="activeAddress"
                  :active-text="activeTitle"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <div style="float: right">
        <el-button @click="handleClose">{{ $t("canel") }}</el-button>
        <el-button
          type="primary"
          :loading="loadingSubmit"
          @click="onSubmitForm"
        >{{ postForm.id? $t('update'): $t('add') }}</el-button>
      </div>
    </el-row>
    <el-row v-if="!isAddressShow" class="list-data-address">
      <el-col>
        <el-col align="right">
          <el-button
            style="margin-bottom: 10px"
            type="primary"
            @click="addNewAddress"
          >{{ $t("add_new_address") }}</el-button>
        </el-col>
        <el-table v-loading="loadingAddress" :data="listAddress" border>
          <el-table-column label="id" prop="id" align="center" />
          <el-table-column :label="$t('name')" prop="name" align="center" />
          <el-table-column :label="$t('phone')" prop="phone" align="center" />
          <el-table-column
            :label="$t('address')"
            prop="address"
            align="center"
          />
          <el-table-column
            :label="$t('district')"
            prop="district"
            align="center"
          />
          <el-table-column
            :label="$t('township')"
            prop="township"
            align="center"
          />
          <el-table-column :label="$t('city')" prop="city" align="center" />
          <el-table-column :label="$t('active')" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="" @click="choosenAddress(scope.row)">{{
                $t("choosen")
              }}</el-button>
              <el-button type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
              <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteAddress(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import I18n from '@/lang/i18n'
import DeliveryResource from '@/api/delivery'
import ShopResource from '@/api/shop'
import i18n from '@/lang/i18n'
import { getAcountInfo } from '@/utils/auth'
const account = getAcountInfo()
const deliveryResource = new DeliveryResource()
const shopResource = new ShopResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'ListAddress',
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
    }
  },
  data() {
    return {
      loadingAddress: false,
      dialog: {
        titleName: I18n.t('address_receipt'),
        buttonName: I18n.t('add')
      },
      listAddress: [],
      isAddressShow: false,
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      postForm: {},

      activeAddress: false,
      activeTitle: i18n.t('hide'),
      provinces: [],
      provinceModel: null,
      districts: [],
      districtModel: {},
      wards: [],
      wardsModel: {},
      districts_search: [],
      district_loading: true,
      provinces_search: [],
      provice_loading: true,
      wards_search: [],
      wards_loading: true,
      province_id_old: null,
      district_id_old: null,
      loadingSubmit: false,
      name: '',
      address: '',
      objectAddress: {},
      is_default: {},
      pauseWatcher: false
    }
  },
  watch: {
    provinceModel(province_id) {
      if (!this.pauseWatcher) {
        if (this.province_id_old !== province_id) {
          this.resetDistrict()
          this.resetWards()
          this.province_id_old = province_id
        }
        if (province_id) {
          this.onGetDistrict(province_id)
        }
      }
    },
    districtModel(district_id) {
      if (!this.pauseWatcher) {
        if (!district_id) return
        if (this.district_id_old !== district_id) {
          this.resetWards()
          this.district_id_old = district_id
        }
        if (district_id) {
          this.onGetWards(district_id)
        }
      }
    },
    activeAddress(value) {
      this.activeTitle = value ? i18n.t('show') : i18n.t('hide')
      this.postForm.is_default = value ? 1 : 0
    },
    postForm(object) {
      if (Object.keys(object).length > 0) {
        this.activeAddress = (object.is_default === 1)
      }
    }
  },
  created() {
    this.requestAddressList()
  },
  methods: {
    addNewAddress() {
      this.isAddressShow = true
      this.postForm = {}
    },
    requestAddressList() {
      this.loadingAddress = true
      deliveryResource.addressGolferList(this.listQuery).then(res => {
        this.loadingAddress = false
        const { error, list, total } = res
        if (error === 0) {
          this.listAddress = list
          this.total = this.listQuery.page === 1 ? total : this.total
        }
      })
    },
    choosenAddress(row) {
      this.golfer_address_id = row.id
      this.delivery_id = this.idDelivery
      deliveryResource
        .changeGolferAddress(this.delivery_id, this.golfer_address_id)
        .then(res => {
          const { error, msg } = res
          if (error === 0) {
            this.$message.success(msg)
            this.$emit('onClickButtonDialogAddress', {
              dialog: false,
              reload: true,
              data_reload: row
            })
          } else {
            this.$message.error(msg)
          }
        })
    },
    onShowDialogEdit(row) {
      console.log(row, 'row')
      this.isAddressShow = true
      this.postForm = Object.assign({}, row)
      this.provinces_search = [{ viettel_id: row.city_viettel_post_id, viettel_name: row.city }]
      this.districts_search = [{ viettel_id: row.district_viettel_post_id, viettel_name: row.district }]
      this.wards_search = [{ viettel_id: row.township_viettel_post_id, viettel_name: row.township }]

      this.pauseWatcher = true
      this.provinceModel = row.city_viettel_post_id
      this.districtModel = row.district_viettel_post_id
      this.wardsModel = row.township_viettel_post_id

      setTimeout(() => { this.pauseWatcher = false }, 0)
    },
    onDeleteAddress(row) {
      this.$confirm(i18n.t('delete_address').format(row.address)).then(_ => {
        deliveryResource.deleteAddress(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('Successfully_deleted_address'))
            for (const address of this.listAddress) {
              if (address.id === row.id) {
                const index = this.listAddress.indexOf(address)
                this.listAddress.splice(index, 1)
                break
              }
            }
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {})
    },
    onSubmitForm() {
      if (this.postForm.id) {
        this.handleUpdateAddress()
      } else {
        this.handleAddAddress()
      }
    },
    handleAddAddress() {
      this.loadingSubmit = true
      const city = this.provinces.find(d => d.viettel_id === this.provinceModel)
      const district = this.districts.find(d => d.viettel_id === this.districtModel)
      const wards = this.wards.find(d => d.viettel_id === this.wardsModel)
      if (!city) {
        return this.$msgbox(i18n.t('city_empty'))
      }
      if (!district) {
        return this.$msgbox(i18n.t('district_empty'))
      }
      if (!wards) {
        return this.$msgbox(i18n.t('district_empty'))
      }
      const body = {
        golfer_id: account.id, // mã vga của khách
        address: this.postForm.address,
        city: city.viettel_name,
        district: district.viettel_name,
        township: wards.viettel_name,
        name: this.postForm.name,
        phone: this.postForm.phone,
        city_viettel_post_code: city.viettel_code,
        city_viettel_post_id: city.viettel_id,
        district_viettel_post_code: district.viettel_value,
        district_viettel_post_id: district.viettel_id,
        township_viettel_post_code: '',
        township_viettel_post_id: wards.viettel_id
      }
      deliveryResource.createGolferAddress(body).then(res => {
        this.loadingSubmit = false
        const { error, insert, msg } = res
        body.address_id = insert
        if (error === 0) {
          // this.handleClose(true, body)
          // this.handleClearDataDialog()
          this.isAddressShow = false
          this.requestAddressList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    handleUpdateAddress() {
      this.loadingSubmit = true
      // const city = this.provinces.find(d => d.viettel_id === this.provinceModel)
      // const district = this.districts.find(d => d.viettel_id === this.districtModel)
      // const wards = this.wards.find(d => d.viettel_id === this.wardsModel)
      const city = this.provinces_search.find(d => d.viettel_id === this.provinceModel)
      console.log(this.provinces_search, 'city')
      const district = this.districts_search.find(d => d.viettel_id === this.districtModel)
      const wards = this.wards_search.find(d => d.viettel_id === this.wardsModel)
      if (!city) {
        return this.$msgbox(i18n.t('city_empty'))
      }
      if (!district) {
        return this.$msgbox(i18n.t('district_empty'))
      }
      if (!wards) {
        return this.$msgbox(i18n.t('district_empty'))
      }
      const body = {
        id: this.postForm.id,
        golfer_id: account.id,
        address: this.postForm.address,
        city: city.viettel_name,
        district: district.viettel_name,
        township: wards.viettel_name,
        name: this.postForm.name,
        phone: this.postForm.phone,
        city_viettel_post_code: city.viettel_code,
        city_viettel_post_id: city.viettel_id,
        district_viettel_post_code: district.viettel_value,
        district_viettel_post_id: district.viettel_id,
        township_viettel_post_code: '',
        township_viettel_post_id: wards.viettel_id,
        is_default: this.activeAddress
      }
      console.log(body)
      deliveryResource.updateGolferAddress(body).then(res => {
        this.loadingSubmit = false
        const { error, insert, msg } = res
        body.address_id = insert
        if (error === 0) {
          // this.handleClose(true, body)
          // this.handleClearDataDialog()
          this.isAddressShow = false
          this.requestAddressList()
        } else {
          this.$message.error(msg)
        }
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

    onSearchProvince(keyword) {
      if (keyword !== '') {
        this.provinces_search = this.provinces.filter(item => {
          // const string = removeVietnameseTones(item.label.toLowerCase())
          const _string = item.viettel_name.toLowerCase()
          return _string.indexOf(keyword.toLowerCase()) > -1
        })
        if (this.provinces_search.length) {
          this.provice_loading = false
        }
      }
    },
    onSearchDistrict(keyword) {
      if (keyword !== '') {
        this.districts_search = this.districts.filter(item => {
          // const string = removeVietnameseTones(item.label.toLowerCase())
          const _string = item.viettel_name.toLowerCase()
          return _string.indexOf(keyword.toLowerCase()) > -1
        })
        if (this.districts_search.length) {
          this.district_loading = false
        }
      }
    },
    onGetProvinceList() {
      shopResource.getProvinceList().then(response => {
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
        .then(response => {
          const { error, data } = response
          if (error === 0) {
            this.districts = [...data]
            this.districts_search = [...data]
            this.district_loading = false
          }
        })
        .catch(er => {
          this.loadingTable = false
        })
    },
    onWardsSearch(keyword) {
      if (keyword !== '') {
        this.wards_search = this.wards.filter(item => {
          // const string = removeVietnameseTones(item.label.toLowerCase())
          const _string = item.viettel_name.toLowerCase()
          // console.log('............. tim tu', _string)
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
        .then(response => {
          const { error, data } = response
          if (error === 0) {
            this.wards = [...data]
            this.wards_search = [...data]
            this.wards_loading = false
          }
        })
        .catch(er => {
          this.loadingTable = false
        })
    },

    handleClearDataDialog() {
      this.provinceModel = null
      this.provinces = []
      this.provinces_search = []
      this.wardsModel = null
      this.wards = []
      this.wards_search = []
      this.districtModel = null
      this.districts = []
      this.districts_search = []
      this.postForm.address = null
    },
    handleClose(reload = false, data_reload = {}) {
      this.isAddressShow = false
      this.$emit('onClickButtonDialogAddress', {
        dialog: false
        // is_reload: reload,
        // data_reload: data_reload
      })
    }
  }
}
</script>

<style scoped>

</style>
