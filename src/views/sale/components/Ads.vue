<template>
  <el-row class="list-sale__data">
    <el-row class="list-sale__data">
      <div :sm="24" class="text-right">
        <el-col :sm="3" class="pr-lg-5">
          <el-select v-model="filterId" :placeholder="$t('find_by_status')">
            <el-option v-for="filter in filters" :key="filter.key" :label="filter.name" :value="filter.key" />
          </el-select>
        </el-col>
        <el-col style="margin-left: 8px" :sm="2">
          <div class="text-right">
            <el-button v-if="is_write" type="primary" style="margin-bottom: 0px" @click="onShowDialogCreate">{{ $t('add') }}</el-button>
          </div>
        </el-col>
      </div>
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          :label="$t('id')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('name')"
          align="center"
        />
        <el-table-column
          label="Banner"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-link type="primary" @click="onShowDialogAdsDetail(scope.row.url_baner)">
              <el-image
                v-if="scope.row.url_baner"
                style="width: 120px; height: 80px"
                :src="scope.row.url_baner"
                :fit="contain"
              />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Poster"
          align="center"
        >
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-link type="primary" @click="onShowDialogAdsDetail(scope.row.url_poster)">
              <el-image
                v-if="scope.row.url_poster"
                style="width: 80px; height: 120px"
                :src="scope.row.url_poster"
                :fit="contain"
              />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="from_date"
          :label="$t('from_date')"
          align="center"
        />
        <el-table-column
          prop="to_date"
          :label="$t('to_date')"
          align="center"
        />
        <el-table-column
          :label="$t('active')"
          align="center"
        >
          <template slot-scope="props">
            <el-tag :type="(props.row.active === 1) ? 'success' : 'error'">{{ (props.row.active === 1) ? $t('active1') : $t('deactive') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="category_name"
          :label="$t('category')"
          align="center"
        />
        <el-table-column :label="$t('position')" width="135" align="center">
          <template slot-scope="scope">
            <!-- <el-button v-model="scope.row.redirect" :loading="scope.row.loadingSubmit" @click="updatePosition(scope.row)">{{ scope.row.redirect === 1 ? 'TOP' : 'MID' }}</el-button> -->
            <el-select v-model="scope.row.redirect" :placeholder="$t('key_input')" @change="updatePosition(scope.row)">
              <el-option
                v-for="act in actives"
                :key="`act_${act.key}`"
                :label="act.name"
                :value="act.key"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :label="$t('active')" align="center">
          <template v-if="is_delete || is_edit" slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteAds(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <dialog-form-ads :is-add="isAdd" :object-data="objectAds" :category-data="categories" :show-dialog="onShowDialog" @onClickDialogAds="handleClickDialogAds" />
      <detail-ads :dialog-visible="showDialogAdsDetail" :url="url_image" @onClickButtonDialogDetail="handleClickButtonDialogDetail" />
    </el-row>
    <!--    <el-row class="list-delivery__data-list">-->
    <!--      <pagination v-show="100> listQuery.limit" :total="100" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestListAds" />-->
    <!--    </el-row>-->
  </el-row>
</template>

<script>
import DialogFormAds from '@/views/sale/components/DialogFormAds'
// import Pagination from '@/components/Pagination'
import DetailAds from '@/views/sale/components/DetailAds'
import CategoryResource from '@/api/category'
import { getAcountInfo } from '@/utils/auth'
import SaleResource from '@/api/sale'
import i18n from '@/lang/i18n'
const saleResource = new SaleResource()
const categoryResource = new CategoryResource()

export default {
  name: 'Combo',
  components: { DialogFormAds, DetailAds },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    requestListAds: {
      type: Function,
      default() {
        return null
      }
    },
    filterAds: {
      type: Function,
      default() {
        return null
      }
    }
  },
  data() {
    const account = getAcountInfo()
    return {
      actives: [
        { key: 0, name: 'MID' },
        { key: 1, name: 'TOP' },
        { key: 2, name: 'BOTTON' }
      ],
      redirectAds: 0,
      loadingSubmit: false,
      positionTitle: 'MID',
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      objectAds: {},
      adsID: 0,
      categories: [],
      showDialogAdsDetail: false,
      isAdd: true,
      onShowDialog: false,
      total: 0,
      listQuery: {},
      url_image: '',
      contain: 'contain',
      loadingTable: false,
      filterId: 3,
      filters: [{ key: 0, name: i18n.t('deactive') }, { key: 1, name: i18n.t('active1') }, { key: 3, name: i18n.t('all') }]
    }
  },
  watch: {
    tableData(object) {
      if (Object.keys(object).length > 0) {
        this.redirectAds = object.redirect
      }
    },
    redirectAds(value) {
      this.positionTitle = value ? 'TOP' : 'MID'
      this.redirect = value ? 1 : 0
    },
    filterId(filter_id) {
      console.log('................... filter id', filter_id)
      if (filter_id === 3) {
        this.requestListAds()
        return
      }
      this.listQuery.page = 1
      this.active = filter_id
      this.filterAds(this.active, this.listQuery)
    }
  },
  methods: {
    onShowDialogCreate() {
      this.isAdd = true
      this.onShowDialog = true
      this.objectAds = {}
    },
    onShowDialogEdit(row) {
      this.isAdd = false
      this.onShowDialog = true
      this.objectAds = Object.assign({}, row)
    },
    handleClickDialogAds(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        if (this.requestListAds) {
          this.requestListAds()
        }
      }
    },
    onShowDialogAdsDetail(url) {
      this.url_image = url
      this.showDialogAdsDetail = true
    },
    handleClickButtonDialogDetail(object) {
      this.showDialogAdsDetail = object.dialog
      if (object.reload) {
        this.$emit('onClickButtonReload')
      }
    },
    getListCategory() {
      categoryResource.listCategory().then(response => {
        if (response.error === 0) {
          const result = response.list
          this.categories = [...result]
        }
      })
    },
    onDeleteAds(row) {
      this.$confirm(i18n.t('delete_confirm').format(row.name)).then(_ => {
        saleResource.deleteAds(row.id).then(response => {
          if (response.error === 0) {
            this.$message.success(i18n.t('delete_success_').format(row.name))
            this.requestListAds()
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(_ => {
      })
    },
    updatePosition(row) {
      const position = row.redirect
      this.loadingTable = true
      saleResource.positionAds(row.id, position).then(respone => {
        // eslint-disable-next-line no-empty
        setTimeout(() => {
          this.loadingTable = false
          const { error, msg } = respone
          if (error === 0) {
            this.$msgbox(msg)
          } else {
            this.$msgbox(msg).then(_ => {
              const row = this.tableData.find(d => d.id === row.id)
              if (row) {
                row.position = null
              }
            })
          }
        }, 1000)
      })
        .catch(_ => {
          this.loadingTable = false
        })
    }
    // updatePosition(row) {
    //   row.loadingSubmit = true
    //   const position = row.redirect ? 0 : 1
    //   saleResource.positionAds(row.id, position).then(response => {
    //     setTimeout(() => {
    //       row.loadingSubmit = false
    //       if (response.error === 0) {
    //         this.$emit('onClickDialogAds', { dialog: false, reload: true })
    //         this.$message.success(response.msg)
    //         row.redirect = position
    //       } else {
    //         this.$message.error(response.msg)
    //       }
    //     }, 1000)
    //   }).catch(err => {
    //     row.loadingSubmit = false
    //     this.$message.error(err)
    //   })
    // }
  }
}
</script>

<style scoped>
.el-input--medium {
  margin-bottom: 10px;
}
.el-select{
  width: 100%;
}
.fil{
  margin-bottom: 30px;
}
.text-right{
  margin-bottom: 20px;
  display: flex;
  justify-content: end;
}
pagination-container{
  display: block!important;
}
</style>
