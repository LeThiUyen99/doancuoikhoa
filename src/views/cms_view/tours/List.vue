<template>
  <el-row class="app-container list-tour">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('tour_manage_title') }}</h3>
      </el-col>
    </el-row>
    <el-row class="list-account__data">
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
          :label="$t('account')"
          align="center"
        />
        <el-table-column
          prop="email"
          :label="$t('mail')"
          align="center"
        />
        <el-table-column
          prop="phone"
          :label="$t('phone')"
          align="center"
        />
        <el-table-column
          prop="shop.name"
          :label="$t('manage_shop')"
          align="center"
        />
        <el-table-column
          prop="duyet"
          :label="$t('browser_account')"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('browse'): $t('not_browse') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="is_delete || is_edit" :label="$t('active')" align="center">
          <template slot-scope="scope">
            <el-button v-if="is_edit" type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button v-if="is_delete" type="danger" icon="el-icon-delete" circle @click="onDeleteAccount(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
<!--        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="onGetListAccount" />-->
      </el-row>
<!--      <dialog-form-account :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectAccount" :shops="shops" @onClickButtonDialog="handleClickButtonDialog" />-->
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'List'
}
</script>

<style scoped>

</style>
