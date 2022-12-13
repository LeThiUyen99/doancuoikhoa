<template>
  <el-row>
    <el-row class="list-combo___search-list">
      <el-col :sm="24" class="pr-lg-5">
        <div class="text-right">
          <el-select v-model="filterId" :placeholder="$t('filter')">
            <el-option v-for="filter in filters" :key="`filter_${filter.key}`" :label="filter.name" :value="filter.key" />
          </el-select>
        </div>
      </el-col>
    </el-row>
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
        prop="user_name"
        :label="$t('name_golf')"
        align="center"
      />
      <el-table-column
        prop="user_phone"
        :label="$t('phone')"
        align="center"
      />
      <el-table-column
        prop="createdAt"
        :label="$t('date_create')"
        align="center"
      />
      <el-table-column
        prop="description"
        :label="$t('desc')"
        align="center"
      />
      <el-table-column
        :label="$t('golf_code')"
        align="center"
        width="100"
      >
        <template slot-scope="scope">{{ `VGA${scope.row.user_id}` }}</template>
      </el-table-column>
      <el-table-column
        prop="customer_name"
        :label="$t('caller')"
        align="center"
      />
      <el-table-column
        prop="noted"
        :label="$t('note')"
        align="center"
      />
      <el-table-column
        :label="$t('status')"
        align="center"
        width="120"
      >
        <template slot-scope="props">
          <el-tag :type="(props.row.called === 1) ? 'success' : 'error'">{{ (props.row.called === 1) ? $t('called') : $t('no_call') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="is_edit" label="Action" width="80" align="center">
        <template slot-scope="scope">
          <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-row class="list-combo__data-list">
      <dialog-form-combo :object-data="objectCombo" :show-dialog="onShowDialog" @onClickDialogCombo="handleClickDialogCombo" />
      <!--            <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestListCombo" />-->
    </el-row>
  </el-row>
</template>
<script>

import DialogFormCombo from '@/views/sale/components/DialogFormCombo'
import { getAcountInfo } from '@/utils/auth'
import i18n from '@/lang/i18n'

export default {
  name: 'Combo',
  components: { DialogFormCombo },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    requestListCombo: {
      type: Function,
      default() {
        return null
      }
    }
  },
  data() {
    const account = getAcountInfo()
    return {
      is_delete: account.is_delete,
      is_write: account.is_write,
      is_edit: account.is_edit,
      // total: 0,
      objectCombo: {},
      isAdd: true,
      loadingTable: false,
      onShowDialog: false,
      filterId: 0,
      filters: [{ key: 0, name: i18n.t('default') }, { key: 1, name: i18n.t('no_call') }, { key: 2, name: i18n.t('called') }]
    }
  },
  watch: {
    filterId(filter_id) {
      this.requestListCombo(filter_id)
    }
  },
  methods: {
    // onShowDialogCreate() {
    //   this.isAdd = true
    //   this.onShowDialog = true
    //   this.objectCombo = {}
    // },
    onShowDialogEdit(row) {
      // this.isAdd = false
      this.onShowDialog = true
      this.objectCombo = Object.assign({}, row)
    },
    handleClickDialogCombo(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        if (this.requestListCombo) {
          this.requestListCombo()
        }
      }
    }
  }
}
</script>

<style scoped>
.text-right{
  padding-bottom: 20px;
}
</style>
