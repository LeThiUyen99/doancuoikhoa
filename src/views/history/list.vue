<template>
  <el-row class="history-container">
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <div class="grid-content bg-purple">
          <el-table v-loading="loadingTable"></el-table>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getUID } from '@/utils/auth'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()

const defaultQuery = {
  limit: 20,
  page: 1
}
export default {
  name: 'List',
  data() {
    return {
      histories: [],
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false
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
          this.histories = data.history
          this.total = this.listQuery.page === 1 ? data.total : this.total
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
