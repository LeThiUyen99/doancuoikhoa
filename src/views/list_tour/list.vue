<template>
  <div class="app-contain">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <div v-for="tour in tours" :key="tour.id">
            <div class="tour-item">
              <div class="thumb">
                <router-link class="home-link" :to="`/detail?id=${tour.id}`">
                  <el-image :src="url + tour.images" :fit="contain" />
                </router-link>
              </div>
              <div class="title-tour">
                <router-link class="home-link" :to="`/detail?id=${tour.id}`">
                  <h3>{{ tour.name }}</h3>
                </router-link>
              </div>
              <div class="price">
                <span>{{ formatNumber(tour.price) }} VND</span>
              </div>
            </div>
          </div>
          <el-row class="list-shop__footer">
            <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestListTour" />
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BASE_URL from '@/constant/domain'
import Pagination from '@/components/Pagination'
import { formatNumber } from '@/utils/convert'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()
const defaultQuery = {
  page: 1,
  limit: 20
}
export default {
  name: 'List',
  components: { Pagination },
  data() {
    return {
      url: BASE_URL,
      total: 0,
      tours: [],
      listQuery: Object.assign({}, defaultQuery)
    }
  },
  created() {
    this.requestListTour()
  },
  methods: {
    requestListTour() {
      listTourResource.tourList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.tours = data.list
          this.total = this.listQuery.page === 1 ? data.total : this.total
        }
      })
    },
    formatNumber
  }
}
</script>

<style lang="scss" scoped>

</style>
