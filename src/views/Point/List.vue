<template>
  <el-row class="app-container list-point">
    <el-row class="list-point__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_point') }}</h3>
      </el-col>
      <el-col :sm="12" style="justify-content: flex-end">
        <div class="text-right">
          <!-- <el-button type="primary" @click="onExport">{{ $t('export') }}</el-button> -->
          <el-button :loading="loadingFresh" icon="el-icon-refresh" @click="onRefresh">{{ $t("refresh") }}</el-button>
          <el-button type="primary" @click="onCreatePoint">{{ $t('complete_points') }}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="list-point__header">
      <!-- <el-col style="display: flex">
        <el-col>
          <label class="poin-m">{{ $t('point_return_rate') }}:</label>
          <span>
            <el-col v-if="is_edit">
              <div class="poin-m">
                <template v-if="!seen">{{ percentPoint.percent_point }}%</template>
              </div>
              <el-button v-if="!seen" type="primary" icon="el-icon-edit" circle @click="seen = !seen" />
            </el-col>
          </span>
          <el-form v-if="seen">
            <el-form-item prop="percent_point">
              <el-input v-model="percentPoint.percent_point" autofocus="true" :placeholder="$t('point_return_rate')" />
            </el-form-item>
          </el-form>
          <div v-if="is_edit">
            <el-button v-if="seen" class="point" type="primary" icon="el-icon-check" :loading="loadingSubmit" @click="onSubmit()" />
            <el-button v-if="seen" class="point" icon="el-icon-close" @click="onBack()" />
          </div>
        </el-col>
      </el-col> -->
    </el-row>
    <el-row class="list-point__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column
          :label="$t('id')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column
          prop="delivery_id"
          :label="$t('order_code')"
          align="center"
        >
          <template slot-scope="scope">{{ `#DL${scope.row.delivery_id}` }}</template>
        </el-table-column>
        <el-table-column
          label="Golfer"
          align="center"
        >
          <template slot-scope="scope">{{ `VGA${scope.row.golfer ? scope.row.golfer.id: ''} - ${scope.row.golfer ? scope.row.golfer.name: ''}` }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('completed_points')"
          align="center"
        >
          <template slot-scope="scope">{{ `${formatNumber(scope.row.point)} VND` }}</template>
        </el-table-column>
        <el-table-column
          prop="name_promotion"
          :label="$t('program_name')"
          align="center"
        />
        <el-table-column :label="$t('point_payer')" align="center">
          <template slot-scope="scope">{{ `${scope.row.account ? scope.row.account.name: ''}` }}</template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          :label="$t('date_point')"
          align="center"
        />
        <el-table-column
          prop="noted"
          :label="$t('note')"
          align="center"
        />
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestPointList" />
      </el-row>
      <dialog-create-point :show-dialog="onShowDialog" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import PointResource from '@/api/point'
import Pagination from '@/components/Pagination'
import { getAcountInfo } from '@/utils/auth'
import { formatNumber } from '@/utils/convert'
import DialogCreatePoint from './components/DialogCreatePoint.vue'
const pointResource = new PointResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination, DialogCreatePoint },
  data() {
    const account = getAcountInfo()
    return {
      tableData: [],
      percentPoint: {},
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      is_edit: account.is_edit,
      percent_point: '',
      loadingSubmit: false,
      loadingTable: false,
      seen: false,
      reload: true,
      onShowDialog: false,
      loadingFresh: false
    }
  },
  created() {
    this.requestPointList()
    this.requestPointInfo()
  },
  methods: {
    onRefresh() {
      this.listQuery.page = 1
      this.requestPointList()
    },
    onCreatePoint() {
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      this.onShowDialog = object.dialog
      if (object.reload) {
        this.requestPointList()
      }
    },
    onExport() {},
    formatNumber,
    onBack() {
      this.seen = !this.seen
      this.requestPointInfo()
    },
    onSubmit() {
      if (this.percentPoint.percent_point < 0 || this.percentPoint.percent_point > 100) {
        this.$message.warning(`Tỉ lệ point phải lớn hơn 0 và nhỏ hơn 100`)
      } else {
        this.updatePoint()
      }
    },
    updatePoint() {
      this.$confirm(`Bạn có chắc chắn muốn thay đổi tỉ lệ point thành ${this.percentPoint.percent_point}%`).then(_ => {
        this.loadingSubmit = true
        pointResource.updatePoint(this.percentPoint.percent_point, this.percentPoint.id).then(response => {
          this.loadingSubmit = false
          if (response.error === 0) {
            this.$message.success(response.msg)
            this.seen = !this.seen
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(error => {
        this.loadingSubmit = false
        this.$message.error(` Có lỗi, ${error}`)
      })
    },
    requestPointList() {
      this.loadingTable = true
      pointResource.pointList(this.listQuery).then(response => {
        this.loadingTable = false
        const { error, data, total } = response
        if (error === 0) {
          this.tableData = [...data]
          this.total = this.listQuery.page === 1 ? total : this.total
        } else {
          this.tableData = []
        }
      }).catch(error => {
        this.loadingTable = false
        this.$message.error(` Có lỗi, ${error}`)
      })
    },
    requestPointInfo() {
      pointResource.pointInfo().then(response => {
        const { error, data } = response
        if (error === 0) {
          this.percentPoint = Object.assign({}, data)
          this.percent_point = this.percentPoint.percent_point
        } else {
          this.percentPoint = []
        }
      })
    }
  }
}
</script>

<style scoped>
.el-col-24{
  display: flex;
}
.el-form-item{
  margin-bottom: unset;
}
/*.el-button--medium.is-circle{*/
/*  padding: 5px;*/
/*}*/
.point {
  padding: 10px;
  font-size: 14px;
  border-radius: 50%;
  margin-left: 5px;
}
.poin-m{
  padding-top: 8px;
  padding-right: 5px;
}
</style>
