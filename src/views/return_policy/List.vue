<template>
  <el-row class="app-container list-return-policy">
    <el-row class="list-return-policy__header">
      <el-col :sm="12">
        <h3>{{ $t("return_policy_list") }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button
          icon="el-icon-refresh"
          :loading="loadingFresh"
          @click="onRefresh"
        >{{ $t("refresh") }}</el-button>
        <el-button type="primary" @click="onShowDialogCreate">{{
          $t("add")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-return-policy__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column :label="$t('id')" align="center" width="100">
          <template slot-scope="scope">#{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('shop')" prop="shop_name" align="center" />
        <el-table-column :label="$t('active')" align="center">
          <template slot-scope="scope">
            <el-switch
              :key="scope.row.id"
              :value="scope.row.status ? true : false"
              :active-text="getStatusTitle(scope.row.status)"
              @change="changeActiveReturn(scope.row)"
            />
            <!-- <el-switch
              v-model="scope.row.status"
              :key="scope.row.id"
              :active-value="1"
              :inactive-value="0"
              :active-text="activeTitle"
              @change="changeActiveReturn(scope.row)"
            /> -->
            <!-- <el-button
              :key="scope.row.id"
              v-model="scope.row.status"
              :loading="getLoadingItem(scope.row.id)"
              @click="changeActiveReturn(scope.row)"
            >{{ scope.row.status === 1 ? $t("on") : $t("off") }}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('return_date')"
          prop="return_count_date"
          align="center"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.return_count_date }} ngày</template>
        </el-table-column>
        <el-table-column
          :label="$t('update_date')"
          prop="update_at"
          align="center"
        />
        <el-table-column
          :label="$t('date_create')"
          prop="created_at"
          align="center"
        />
        <el-table-column
          :label="$t('user_update')"
          prop="account_name"
          align="center"
        />
        <el-table-column label="Action" align="center" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="onShowDialogEdit(scope.row)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteReturn(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
        <pagination
          v-show="total > listQuery.number"
          :total="total"
          :limit.sync="listQuery.number"
          :page.sync="listQuery.page"
          @pagination="onGetListReturnPolicy"
        />
      </el-row>
    </el-row>
    <dialog-form-return-policy
      :show-dialog="onShowDialog"
      :is-add="isAdd"
      :object-data="objectReturn"
      @onClickButtonDialog="handleClickButtonDialog"
    />
  </el-row>
</template>

<script>
import I18n from '../../lang/i18n'
import Pagination from '@/components/Pagination'
import DialogFormReturnPolicy from '@/views/return_policy/components/DialogFormReturnPolicy'
import ReturnPolicyResource from '@/api/return_policy'
const returnPolicyResource = new ReturnPolicyResource()
const defaultQuery = {
  page: 1,
  number: 10
}
export default {
  name: 'List',
  components: { DialogFormReturnPolicy, Pagination },
  data() {
    return {
      valuePublic: null,
      activeTitle: I18n.t('off'),
      tableData: [],
      loadingTable: false,
      onShowDialog: false,
      objectReturn: {},
      isAdd: false,
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      loading_item: {},
      // switchData: {},
      loadingFresh: false
    }
  },
  watch: {},
  created() {
    this.onGetListReturnPolicy()
  },
  methods: {
    // updateLoadingItem(id, is_loading = false) {
    //   this.loading_item[id] = is_loading;
    // },
    // getLoadingItem(id) {
    //   let is_loading = this.loading_item[id];
    //   is_loading = is_loading || false;
    //   console.log("...........get loading item ", is_loading);
    //   return is_loading;
    // },
    getStatus(value) {
      return !!value
    },
    getStatusTitle(value) {
      return value ? I18n.t('on') : I18n.t('off')
    },
    changeActiveReturn(row) {
      let status = row.status
      status = status === 1 ? 0 : 1
      const body = {
        id: row.id,
        status: status,
        return_count_date: row.return_count_date
      }
      console.log('..........................row ', JSON.stringify(row))
      returnPolicyResource
        .updateReturnPolicy(body)
        .then(response => {
          console.log('----------------------------------body', body)
          console.log('.............................res', response)
          const { error, msg } = response
          if (error === 0) {
            this.$message.success(msg)
            row.status = status
          } else {
            this.$message.error(msg)
            status = status === 1 ? 0 : 1
            // this.switchData[row.id] = status === 1 ? true : false
          }
        })
        .catch(err => {
          this.$message.error(err)
          // this.switchData[row.id] = status === 1 ? true : false
        })
    },
    onShowDialogCreate() {
      this.onShowDialog = true
      this.objectReturn = {}
      this.isAdd = true
    },
    onShowDialogEdit(row) {
      this.objectReturn = Object.assign({}, row)
      this.isAdd = false
      this.onShowDialog = true
      console.log('.......................edit popup ', this.isAdd)
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      const reload_data = object.reload_data
      if (object.reload_data) {
        // this.onGetListReturnPolicy();
        const obj = this.tableData.find(d => d.id === reload_data.id)
        console.log('...................tim thay object : ', JSON.stringify(obj))
        if (obj) {
          obj.return_count_date = reload_data.return_count_date
          obj.status = reload_data.status
          // this.switchData[row.id] = status === 1 ? true : false
        }
      }
    },
    onGetListReturnPolicy() {
      this.loadingTable = true

      returnPolicyResource.returnPolicyList(this.listQuery).then(res => {
        setTimeout(() => {
          this.loadingTable = false
          const { error, data, total } = res
          if (error === 0) {
            this.tableData = data
            // this.switchData = data.reduce((a, c) => {
            //   return { ...a, [c.id]: c.status ? true : false };
            // }, {});
            this.total = total
          }
        }, 1000)
      })
    },
    onRefresh() {
      this.listQuery = Object.assign({}, defaultQuery)
      this.onGetListReturnPolicy()
    },
    onDeleteReturn(row) {
      this.$confirm(I18n.t('delete_return_confirm').format(row.shop_name))
        .then(_ => {
          // this.loadingTable = true;
          returnPolicyResource.deleteReturnPolicy(row.id).then(response => {
            // this.loadingTable = false;
            const { error, msg } = response
            if (error === 0) {
              this.$message.success(I18n.t('delete_success'))
              const removeIndex = this.tableData.findIndex((e) => e.id === row.id)
              this.tableData.splice(removeIndex, 1)
            } else {
              this.$message.error(msg)
            }181199
          })
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
