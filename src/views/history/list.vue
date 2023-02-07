<template>
  <el-row class="history-container">
    <el-row :gutter="20">
      <el-col :span="16" :offset="4" align="center" class="history tabs-his">
        <el-breadcrumb separator="/" style="padding:10px; background: #FFFFFF">
          <el-breadcrumb-item :to="{ path: '/' }">{{
            $t("home")
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('history') }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="16" :offset="4" align="center" class="history tabs-his">
        <div class="grid-content bg-purple">
          <el-tabs v-model="activeName" :stretch="true">
            <!--            <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.name" :name="tab.id" />-->
            <el-tab-pane name="0" :label="$t('confirm_wait')" />
            <el-tab-pane name="1" :label="$t('confirmation_complete')" />
            <el-tab-pane name="2" :label="$t('cancel_tour')" />
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4" class="history list-his" style="padding: 0;">
        <div class="grid-content bg-purple">
          <history-tour :table-data="histories" :state="parseInt(activeName)" :loading-table="loadingTable" @onClickButtonReload="handleClickButtonReload" />
        </div>
      </el-col>
    </el-row>
    <el-row class="list-delivery__data-list">
      <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestHistoryList" />
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import HistoryTour from '@/views/history/compoments/HistoryTour'
import { getUID } from '@/utils/auth'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()

const defaultQuery = {
  limit: 20,
  page: 1
}
export default {
  name: 'List',
  components: { HistoryTour, Pagination },
  data() {
    return {
      activeName: 0,
      histories: [],
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false
    }
  },
  watch: {
    activeName(value) {
      const active = { active: parseInt(value) }
      this.listQuery = Object.assign(this.listQuery, active)
      this.listQuery.page = 1
      this.requestHistoryList()
    }
  },
  created() {
    this.requestHistoryList()
  },
  methods: {
    requestHistoryList() {
      this.listQuery.user_id = getUID()
      listTourResource.historyList(this.listQuery).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.histories = data.list
          console.log(this.histories)
          this.total = this.listQuery.page === 1 ? data.total : this.total
        }
      })
    },
    handleClickButtonReload() {
      this.requestHistoryList()
    }
  }
}
</script>

<style scoped>
.history-container{
  margin-top: 109px;
}
</style>
