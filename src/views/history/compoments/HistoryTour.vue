<template>
  <el-row v-loading="loadingTable" class="history-delivery-container">
    <el-card v-for="list in tableData" :key="list.id" shadow="hover" class="box-card">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark active-tour">
          <el-tag :type="setStateToStringDelivery(list.active).typeName" style="border: none; background: #FFFFFF; padding: 0;">{{ setStateToStringDelivery(list.active).textName }}</el-tag>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark content-tour">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <div class="thumb">
                  <el-image :src="url + (list.tour? list.tour.images: '')" fit="cover" style="width:180px; height:150px" />
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple-light">
                <div class="col-history">
                  <h3 class="name">{{ list.tour? list.tour.name: '' }}</h3>
                  <el-row>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <p class="start-date">
                          <span>{{ $t('departure_day') }}: </span>
                          <span>{{ convertDate(list.start_date) }}</span>
                        </p>
                        <p class="guest_number">
                          <span>{{ `${$t('quantily') }: ` }} </span>
                          <span>{{ `${list.guest_number} ${$t('people')}` }}</span>
                        </p>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple-light">
                        <p class="price">
                          <span>{{ formatNumber(list.tour? list.tour.price: 0) }} VND</span>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark vote-tour">
          <p class="into-money">
            <span>{{ `${$t('into_money')}: ` }}</span>
            <span>{{ list.price }} VND</span>
          </p>
          <el-button class="vote">{{ $t('vote') }}</el-button>
        </div>
      </el-col>
    </el-card>
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
.vote{
  background: #c3a30b;
  border: 1px solid #c3a30b;
  color: #fff;
}
.active-tour, .vote-tour{
  text-align: right;
}
.vote-tour, .el-card{
  margin-bottom: 20px;
}
.price{
  text-align: right;
  color: #c3a30b;
}
p, h3{
  margin: 0;
  margin-bottom: 15px;
}
</style>
