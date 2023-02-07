<template>
  <el-row v-loading="loadingTable" class="history-delivery-container">
    <el-col :span="24">
      <el-col v-for="list in tableData" :key="list.id" class="box-card">
        <div class="his-item">
          <div class="thumb">
            <el-image :src="url + (list.tour? list.tour.images: '')" fit="contain" />
          </div>
          <div class="col-history">
            <p class="name">{{list.tour? list.tour.name: ''}}</p>
            <p class="guest_number">
              <span>Số lượng: </span>
              <span>{{list.guest_number}} người</span>
            </p>
            <p class="start-date">
              <span>{{$t('departure_day')}}: </span>
              <span>{{convertDate(list.start_date)}}</span>
            </p>
            <p class="price">
              <span>{{$t('price')}}: </span>
              <span>{{formatNumber(list.price)}} VND</span>
            </p>
            <el-tag
              :type="setStateToStringDelivery(list.active).typeName"
              style="border: none; background: #FFFFFF; padding: 0;"
            >{{ setStateToStringDelivery(list.active).textName }}</el-tag>
          </div>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import BASE_URL from '@/constant/domain'
import { formatNumber, convertDate } from '@/utils/convert'
import { setStateToStringDelivery } from '@/utils/delivery/convertDelivery'
export default {
  name: 'HistoryTour',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    state: {
      type: Number,
      default() {
        return 0
      }
    },
    loadingTable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      url: BASE_URL
    }
  },
  methods: {
    setStateToStringDelivery,
    formatNumber,
    convertDate
  }
}
</script>

<style scoped>
.his-item{
  display: flex;
}
.his-item .el-image{
  width: 180px;
  margin-right: 10px;
}
.his-item p{
  margin: 0;
  padding-bottom: 10px;
}
</style>
