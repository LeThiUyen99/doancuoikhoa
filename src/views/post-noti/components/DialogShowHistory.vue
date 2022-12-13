<template>
  <el-row class="app-container">
    <el-row class="list-history-header">
      <el-col :sm="24">
        <el-col :sm="19">
          <el-col :sm="1">
            <el-button style="border: none; padding:5px 0;" icon="el-icon-back" @click="goBack" />
          </el-col>
          <el-col :sm="18">
            <h2 style="margin-top: 0">{{ $t('noti_history') }}</h2>
          </el-col>
        </el-col>
        <el-col :sm="5" align="right">
          <el-button @click="requestShowHistory">{{ $t('refresh') }}</el-button>
        </el-col>
      </el-col>
      <el-col :sm="12" align="right">
        <!--        <el-button @click="goBack">{{$t('back')}}</el-button>-->
      </el-col>
    </el-row>
    <el-row class="list-history-data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column prop="id" label="ID" align="center" width="80" />
        <el-table-column prop="title" :label="$t('title')" align="center" />
        <el-table-column prop="content" :label="$t('content')" align="center">
          <template slot-scope="scope"><div class="aaa"><el-link @click="onClickListContent(scope.row.content)">{{ scope.row.content }}</el-link></div></template>
        </el-table-column>
        <el-table-column :label="$t('type_noti')" align="center">
          <template slot-scope="scope">
            <el-tag :type="(scope.row.type === 1) ? 'success' : 'danger'">{{ (scope.row.type === 1) ? $t('saved'): $t('not-save') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="redirect_name" :label="$t('navigate')" align="center" />
        <el-table-column prop="created_at" :label="$t('shoot-day')" align="center" />
        <el-table-column prop="status_name" :label="$t('active')" align="center">
          <template slot-scope="scope">
            <el-tag :type="(scope.row.status === 1) ? 'success' : 'danger'">{{ (scope.row.status === 1) ? $t('success'): $t('Processing') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('list-user')" align="center">
          <template slot-scope="scope"><div class="list-user"><el-link @click="onClickListUser(scope.row.list_users)">{{ scope.row.list_users }}</el-link></div></template>
        </el-table-column>
        <el-table-column prop="account_name" :label="$t('shooter')" align="center" />
      </el-table>
      <pagination v-show="total > listQuery.number" :total="total" :limit.sync="listQuery.number" :page.sync="listQuery.page" @pagination="requestShowHistory" />
    </el-row>
    <dialog-list-user :show-dialog="onShowDialogList" :list-users="list_users" @onClickButtonDialog="handleClickButtonDialog" />
    <dialog-content :show-dialog="onShowDialogContent" :content="content" @onClickButtonDialog="handleClickButtonDialogContent" />
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import NotificationResource from '@/api/notification'
import DialogListUser from './DialogListUser.vue'
import DialogContent from './DialogContent.vue'
const notificationResource = new NotificationResource()
const defaultQuery = {
  page: 1,
  number: 10
}
export default {
  name: 'DialogShowHistory',
  components: { Pagination, DialogListUser, DialogContent },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    goBack: {
      type: Function,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      tableData: [],
      loadingTable: false,
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      onShowDialogList: false,
      onShowDialogContent: false,
      isAdd: false,
      content: '',
      list_users: ''
    }
  },
  created() {
    this.requestShowHistory()
  },
  methods: {
    onClickListContent(content) {
      this.onShowDialogContent = true
      this.content = content
      this.isAdd = true
    },
    onClickListUser(list_users) {
      this.onShowDialogList = true
      this.isAdd = false
      this.list_users = list_users
    },
    handleClickButtonDialog(object) {
      this.onShowDialogList = object.dialog
      if (object.reload) {
        this.requestShowHistory()
      }
    },
    handleClickButtonDialogContent(object) {
      this.onShowDialogContent = object.dialog
      if (object.reload) {
        this.requestShowHistory()
      }
    },
    requestShowHistory() {
      this.loadingTable = true
      notificationResource.showHistory(this.listQuery).then(res => {
        console.log('-----------------------------', res)
        this.loadingTable = false
        const { error, data, total } = res
        if (error === 0) {
          this.tableData = data
          // this.total = total
          this.total = this.listQuery.page === 1 ? total : this.total
        }
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>
.app-container{
  padding-top: 0;
}
.list-user, .aaa{
  overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
}
</style>
