<template>
  <el-row class="app-container list-cetegories-show">
    <el-row class="list-cetegories-show__header mb-10">
      <el-row class="list-product__header-title">
        <el-col :sm="12">
          <h3>{{ $t('list_transport_title') }}</h3>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="list-sale__data">
      <el-table
        v-loading="loadingTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="ID"
          width="100"
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
          prop="desc"
          :label="$t('desc')"
          align="center"
        />
        <el-table-column
          :label="$t('status')"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('active1') : $t('stop') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          :label="$t('date_create')"
          align="center"
        />
        <el-table-column :label="$t('action')" align="center" width="100">
          <template v-if="is_edit" slot-scope="scope">
            <el-button :key="scope.row.id" v-model="scope.row.active" :loading="getLoadingItem(scope.row.id)" @click="changeStateTransport(scope.row)">{{ scope.row.active === 1 ? $t('off') : $t('on') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-product__footer">
        <!--        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestTransport" />-->
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import TransportResource from '@/api/transport'
const transportResource = new TransportResource()
import { getAcountInfo } from '@/utils/auth'
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  data() {
    const account = getAcountInfo()
    return {
      is_edit: account.is_edit,
      tableData: [],
      loadingTable: false,
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      loading_item: {}
    }
  },
  created() {
    this.requestTransportList()
  },
  methods: {
    updateLoadingItem(id, is_loading = false) {
      this.loading_item[id] = is_loading
    },
    getLoadingItem(id) {
      let is_loading = this.loading_item[id]
      is_loading = is_loading || false
      console.log('...........get loading item ', is_loading)
      return is_loading
    },
    changeStateTransport(row) {
      let active = row.active
      active = active === 1 ? 0 : 1
      const body = {
        id: row.id,
        active: active
      }
      this.updateLoadingItem(row.id, true)
      this.tableData = [...this.tableData]
      console.log('..........................row ', JSON.stringify(row))
      transportResource.changeState(body).then(response => {
        console.log('----------------------------------body', body)
        console.log('.............................res', response)
        setTimeout(() => {
          this.updateLoadingItem(row.id, false)
          const { error, msg } = response
          if (error === 0) {
            this.$message.success(msg)
            row.active = active
          } else {
            this.$message.error(msg)
          }
        }, 1000)
      }).catch(err => {
        this.updateLoadingItem(row.id, false)
        this.$message.error(err)
      })
    },
    requestTransportList() {
      this.loadingTable = true
      transportResource.listTransport(this.listQuery).then(response => {
        console.log('tran', JSON.stringify(response))
        this.loadingTable = false
        const { error, data, total, msg } = response
        if (error === 0) {
          this.tableData = data
          this.tableData.forEach(d => {
            d.loadingSubmit = false
          })
          this.total = this.listQuery.page === 1 ? total : this.total
        } else {
          this.$message.info(msg)
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(` Có lỗi, ${error}`)
      })
    }
  }
}
</script>
