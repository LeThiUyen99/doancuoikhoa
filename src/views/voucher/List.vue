<template>
  <el-row>
    <el-row
      v-if="!onShowCustom && !showHistory && !onShowCreateVoucher"
      class="app-container"
    >
      <el-row class="list-voucher-header">
        <el-col :sm="12">
          <h3 style="margin: 0;">{{ $t("manage_voucher") }}</h3>
        </el-col>
      </el-row>
      <el-row class="list-voucher-search">
        <el-col style="margin: 20px 0" :sm="24" align="right">
          <el-input
            v-model="listQuery.q"
            style="margin-right: 5px; width: 30%;"
            :placeholder="$t('search')"
          />
          <el-select
            v-model="type"
            style="padding: 0 5px"
            :placeholder="$t('type_voucher')"
          >
            <el-option
              v-for="type in types"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            />
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="requestListVoucher"
          >{{ $t("search") }}</el-button>
          <el-button
            :loading="loadingFresh"
            icon="el-icon-refresh"
            @click="onRefresh"
          >{{ $t("refresh") }}</el-button>
          <el-button v-if="is_write" type="primary" @click="onCreateVoucher">{{
            $t("create_voucher")
          }}</el-button>
        </el-col>
      </el-row>
      <el-row class="list-voucher-data">
        <el-table v-loading="loadingTable" :data="tableData" border>
          <!-- <el-table-column label="ID" align="center" width="80">
            <template
              slot-scope="scope"
            ><el-link
              @click="onShowHistory(scope.row)"
            >VC{{ scope.row.id }}</el-link></template>
          </el-table-column> -->
          <el-table-column :label="$t('id')" align="center" prop="code" width="100">
            <template
              slot-scope="scope"
            ><el-link
              @click="onShowHistory(scope.row)"
            >VC{{ scope.row.code }}</el-link></template>
          </el-table-column>
          <el-table-column :label="$t('name')" align="center" prop="name" />
          <el-table-column
            :label="$t('type')"
            align="center"
            prop="voucher_type_name"
          />
          <el-table-column
            :label="$t('type_code')"
            align="center"
            prop="type_voucher"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.global_apply === 1 ? 'success' : 'primary'"
              >{{
                scope.row.global_apply === 1 ? $t("prative") : $t("public")
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('time')" header-align="center">
            <template
              slot-scope="scope"
            >{{ scope.row.from_date }} - {{ scope.row.to_date }}</template>
          </el-table-column>
          <el-table-column :label="$t('user')" align="center" width="110">
            <!--          <template slot-scope="scope">{{ scope.row.golfer ? scope.row.golfer.name : '' }}</template>-->
            <template slot-scope="scope">
              <el-button
                icon="el-icon-s-custom"
                @click="onShowListCustom(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column :label="$t('active')" align="center" prop="status" width="100">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{
                scope.row.status === 1 ? $t("active_") : $t("off")
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('use_value')"
            header-align="center"
            prop="value"
          >
            <template slot-scope="scope">
              {{ `- ${$t('value')}: ${scope.row.value}` }} {{ nameType = scope.row.type? `(${types.find(d => d.id === scope.row.type).don_vi_tinh})`: '' }}<br>
              {{
                scope.row.condition
                  ? `- ${$t('minimum')}: ${formatNumber(
                    scope.row.condition.value_from
                  )} VND`
                  : ""
              }}
              <br>
              {{
                scope.row.condition
                  ? `- ${$t('max')}: ${formatNumber(
                    scope.row.condition.value_to
                  )} VND`
                  : ""
              }}<br>
              {{
                scope.row.condition && scope.row.condition.shops
                  ? `- ${$t('shop')}: ${scope.row.condition.shops.map(({name}) => name).join(", ")}`
                  : ""
              }}<br>
              {{
                scope.row.condition && scope.row.condition.categorys
                  ? `- ${$t('category')}: ${scope.row.condition.categorys.map(({name}) => name).join(", ")}`
                  : ""
              }}<br>
              {{
                scope.row.condition && scope.row.condition.tradermarks
                  ? `- ${$t('trademark')}: ${scope.row.condition.tradermarks.map(({name}) => name).join(", ")}`
                  : ""
              }}<br>
              <!-- - {{$t('shop')}}: {{ scope.row.condition.shops.map(({name}) => name).join(", ") }} -->
              <!-- - {{$t('shop')}}: <template v-for="(shop, index) in scope.row.condition.shops">{{index === scope.row.condition.shops.length -1 ? shop.name : `${shop.name}, `}} </template><br/>
              - {{$t('category')}}: <template v-for="cate in scope.row.condition.categorys">{{cate.name}}, </template><br/>
              - {{$t('trademark')}}: <template v-for="trade in scope.row.condition.tradermarks">{{trade.name}}, </template> -->
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('quantily')"
            align="center"
            prop="max_use"
            width="90"
          />
          <!-- <el-table-column
            :label="$t('product_user')"
            align="center"
            prop="account_name"
          /> -->
          <el-table-column
            v-if="is_delete || is_edit"
            :label="$t('active1')"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="is_edit"
                  type="primary"
                  icon="el-icon-s-order"
                  circle
                  @click="onShowDialogDetail(scope.row)"
                />
              </div>
              <div style="padding-top: 5px">
                <el-button
                  v-if="is_edit"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="onShowDialogEdit(scope.row)"
                />
              </div>
              <div style="padding-top: 5px">
                <el-button
                  v-if="is_delete"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="onDeleteVoucher(scope.row)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > listQuery.number"
          :total="total"
          :limit.sync="listQuery.number"
          :page.sync="listQuery.page"
          @pagination="requestListVoucher"
        />
      </el-row>
    </el-row>
    <el-row v-if="onShowCreateVoucher">
      <dialog-create-voucher
        :go-back="goBack"
        :show-dialog="onShowDialog"
        :is-add="isAdd"
        :object-data="objectVoucher"
        :types="types"
        @onClickButtonDialog="handleClickButtonDialog"
      />
    </el-row>
    <el-row v-if="onShowCustom">
      <show-custorm
        :show-dialog="onShowCustom"
        :voucher-id="voucherId"
        :go-back="goBack"
      />
    </el-row>
    <detail-voucher
      :show-dialog="onShowDetail"
      :voucher-id="voucherId"
      :object-data="objectVoucher"
      @onClickButtonDialog="handleClickButtonDialogDetail"
    />
    <el-row v-if="showHistory">
      <promotion-history :go-back="goBack" :voucher-id="voucherId" />
    </el-row>
  </el-row>
</template>

<script>
import { getAcountInfo } from '@/utils/auth'
import Pagination from '@/components/Pagination'
import { formatNumber } from '@/utils/convert'
import DialogCreateVoucher from '@/views/voucher/components/DialogCreateVoucher'
import VoucherResource from '@/api/voucher'
import i18n from '@/lang/i18n'
import ShowCustorm from '@/views/voucher/components/ShowCustorm'
import PromotionHistory from '@/views/voucher/components/promotion_history'
import DetailVoucher from '@/views/voucher/components/DetailVoucher.vue'
const voucherResource = new VoucherResource()
const defaultQuery = {
  page: 1,
  number: 10
}
export default {
  name: 'List',
  components: {
    PromotionHistory,
    ShowCustorm,
    DialogCreateVoucher,
    Pagination,
    DetailVoucher
  },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      loadingTable: false,
      tableData: [],
      types: [],
      q: '',
      type: null,
      onShowDialog: false,
      onShowDetail: false,
      onShowCustom: false,
      onShowCreateVoucher: false,
      showHistory: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      loadingFresh: false,
      isAdd: true,
      objectVoucher: {},
      voucherId: 0,
      nameType: ''
    }
  },
  watch: {
    type(type) {
      this.listQuery.type = type
      this.requestListVoucher()
    }
  },
  created() {
    this.requestListVoucher()
    this.onTypeVoucher()
  },
  methods: {
    onShowListCustom(row) {
      this.voucherId = row.id
      this.objectVoucher = Object.assign({}, row)
      this.onShowCustom = true
    },
    onShowHistory(row) {
      this.voucherId = row.id
      this.showHistory = true
    },
    goBack() {
      this.onShowCustom = false
      this.showHistory = false
      this.onShowCreateVoucher = false
      this.requestListVoucher()
    },
    onTypeVoucher() {
      voucherResource.voucherTypeList().then(res => {
        const { error, data } = res
        if (error === 0) {
          this.types = data
        }
      })
    },
    requestListVoucher() {
      this.loadingTable = true
      voucherResource.voucherList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error, data, total } = res
        if (error === 0) {
          this.tableData = data
          this.total = this.listQuery.page === 1 ? total : this.total
        }
      })
    },
    onCreateVoucher() {
      this.onShowDialog = true
      this.isAdd = true
      this.onShowCreateVoucher = true
      this.objectVoucher = {}
    },
    onShowDialogDetail(row) {
      this.onShowDetail = true
      this.voucherId = row.id
      this.objectVoucher = Object.assign({}, row)
    },
    handleClickButtonDialogDetail(object) {
      this.onShowDetail = object.dialog
      if (object.reload) {
        this.requestListVoucher()
      }
    },
    onShowDialogEdit(row) {
      this.onShowDialog = true
      this.isAdd = false
      this.onShowCreateVoucher = true
      this.objectVoucher = Object.assign({}, row)
    },
    onDeleteVoucher(row) {
      const data = {
        id: row.id
      }
      this.$confirm(i18n.t('delete_confirm').format(row.code))
        .then(_ => {
          this.loadingTable = true
          voucherResource.deleteVoucher(data).then(res => {
            this.loadingTable = false
            console.log('----------------')
            const { error, msg } = res
            if (error === 0) {
              this.$message.success(msg)
              this.requestListVoucher()
            } else {
              this.$message.error(msg)
            }
          })
        })
        .catch(_ => {})
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.requestListVoucher()
      }
    },
    onRefresh() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.type = null
      this.requestListVoucher()
    },
    formatNumber
  }
}
</script>

<style scoped></style>
