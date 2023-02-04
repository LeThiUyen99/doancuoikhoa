<template>
  <div class="app-contain">
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <div class="grid-content bg-purple">
          <span v-if="!tours.length">{{ title }}</span>
          <el-col v-loading="loadingTable" :span="24" class="list-products">
            <el-row :gutter="12">
              <el-col v-for="tour in tours" :key="tour.id" :span="8" class="tour-list">
                <el-card
                  class="card-tour"
                  shadow="hover"
                  :body-style="{ padding: '5px' }"
                >
                  <div class="tour-item">
                    <div class="thumb">
                      <router-link class="home-link" :to="`/detail?id=${tour.id}`">
                        <el-image :src="url + tour.images" fit="cover" />
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
                </el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-row class="list-shop__footer" style="float:left;">
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
import i18n from '@/lang/i18n'
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
      listQuery: Object.assign({}, defaultQuery),
      title: i18n.t('not_info'),
      loadingTable: false,
      cover: 'contain'
    }
  },
  created() {
    this.listQuery.category_id = this.$route.query.category_id
    this.listQuery.q = this.$route.query.q
    this.listQuery.start_date = this.$route.query.start_date
    this.listQuery.expire_date = this.$route.query.expire_date
    this.listQuery.country_id = this.$route.query.country_id
    this.listQuery.price = this.$route.query.price
    this.requestListTour()
  },
  methods: {
    requestListTour() {
      this.loadingTable = true
      listTourResource.tourList(this.listQuery).then(res => {
        this.loadingTable = false
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

<style>
.tour-list{
  width: 25%;
  height: 470px;
  margin-bottom: 10px;
}
.card-tour{
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
}
.tour-item{
  text-align: left;
  height: 450px;
}
.tour-item .thumb{
  position: relative;
  text-align: center;
}
.tour-item .thumb .el-image{
  height: 360px;
  width: 100%;
}
.tour-item .thumb .el-image img{
  min-height: 360px;
  min-width: 360px;
}
a, h3{
  margin: 0;
}
</style>
