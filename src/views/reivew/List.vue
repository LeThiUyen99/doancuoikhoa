<template>
  <el-row class="app-container list-review">
    <el-row class="list-review__header">
      <el-col :sm="5">
        <h3>{{ $t('reivew_list') }}</h3>
      </el-col>
      <el-col :sm="19" align="right">
        <el-input v-model="listQuery.golfer_id" :placeholder="$t('find_vga')" style="width:40%; padding-right:10px" />
        <el-button v-if="listQuery.golfer_id" type="error" icon="el-icon-clear" @click="onClear">Clear</el-button>
        <el-button type="primary" @click="requsetReviewList">{{ $t('search') }}</el-button>
        <el-select v-model="filterId" style="padding:0 7px" :placeholder="$t('select-rate')">
          <el-option v-for="filter in filters" :key="`filter_${filter.key}`" :label="filter.name" :value="filter.key" />
        </el-select>
        <el-button :loading="loadingFresh" icon="el-icon-refresh" @click="onRefresh">{{ $t("refresh") }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-review__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column :label="$t('id')" align="center" width="80">
          <template slot-scope="scope">#{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('VGA')" align="center">
          <template slot-scope="scope">{{ `VGA${scope.row.golfer? scope.row.golfer.id: ''}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('full_name')" prop="name" align="center">
          <template slot-scope="scope">{{ `${scope.row.golfer? scope.row.golfer.name: ''}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('avatar')" align="center">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image v-if="scope.row.golfer? scope.row.golfer.avatar: ''" :src="scope.row.golfer? scope.row.golfer.avatar: ''" :fit="contain" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('desc')" prop="content" align="center" />
        <el-table-column :label="$t('vote')" align="center" width="150">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rate" disabled text-color="#ff9900" score-template="{value}" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('vote_date')" prop="created_at" align="center" />
        <el-table-column :label="$t('id_product')" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="onShowDialogDetailProduct(scope.row.product_id)">{{ `#${scope.row.product_id}` }}</el-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('product_name')" align="center">
          <template slot-scope="scope">{{ scope.row.product_name }}</template>
        </el-table-column>
        <el-table-column :label="$t('bill_code')" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="onShowDialogDetailDelivery(scope.row.delivery_id)">{{ `DL${scope.row.delivery_id}` }}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="list-shop__footer">
      <pagination v-show="total > listQuery.number" :total="total" :limit.sync="listQuery.number" :page.sync="listQuery.page" @pagination="requsetReviewList" />
    </el-row>
    <detail :dialog-visible="showDialogDetail" :product-id="idProduct" @onClickButtonDialogDetail="handleClickButtonDialogProductDetail" />
    <dialog-delivery-detail :dialog-visible="showDialogOrderDetail" :delivery-id="orderID" @onClickButtonDialogDetail="handleClickButtonDialogDetail" />
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import Detail from '@/views/products/components/Detail'
import DialogDeliveryDetail from '@/views/delivery/components/DialogDeliveryDetail'
import ReviewResource from '@/api/review'
const reviewResource = new ReviewResource()
const defaultQuery = {
  page: 1,
  number: 10
}
export default {
  name: 'List',
  components: { Pagination, Detail, DialogDeliveryDetail },

  data() {
    return {
      loadingFresh: false,
      tableData: [],
      loadingTable: false,
      contain: 'contain',
      listQuery: Object.assign({}, defaultQuery),
      idProduct: 0,
      showDialogDetail: false,
      showDialogOrderDetail: false,
      total: 0,
      filterId: null,
      filters: [
        { key: 0, name: 'Tất cả' },
        { key: 6, name: 'Lọc theo 0 sao' },
        { key: 1, name: 'Lọc theo 1 sao' },
        { key: 2, name: 'Lọc theo 2 sao' },
        { key: 3, name: 'Lọc theo 3 sao' },
        { key: 4, name: 'Lọc theo 4 sao' },
        { key: 5, name: 'Lọc theo 5 sao' }
      ],
      orderID: 0
    }
  },
  watch: {
    filterId(filter_id) {
      this.listQuery.vote = filter_id
      this.requsetReviewList()
    }
  },
  created() {
    this.requsetReviewList()
  },

  methods: {
    onShowDialogDetailProduct(product_id) {
      this.idProduct = product_id
      this.showDialogDetail = true
    },
    handleClickButtonDialogProductDetail(object) {
      this.showDialogDetail = object.dialog
      this.idProduct = 0
      if (object.reload) {
        this.requsetReviewList()
      }
    },
    onShowDialogDetailDelivery(delivery_id) {
      this.orderID = delivery_id
      this.showDialogOrderDetail = true
    },
    handleClickButtonDialogDetail(object) {
      this.showDialogOrderDetail = object.dialog
      if (object.reload) {
        this.requsetReviewList()
      }
    },
    onClear() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.filterId = ''
      this.requsetReviewList()
    },
    onRefresh() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.filterId = ''
      this.requsetReviewList()
    },
    requsetReviewList() {
      this.loadingTable = true
      reviewResource.reviewList(this.listQuery).then(res => {
        setTimeout(() => {
          this.loadingTable = false
          const { error, data, total } = res
          if (error === 0) {
            this.tableData = data
            this.total = this.listQuery.page === 1 ? total : this.total
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
