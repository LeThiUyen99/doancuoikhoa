<template>
  <div class="app-contain">
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <div class="grid-content bg-purple">
          <el-row class="hot-tour-list">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h1 class="title-tour">{{ $t('hot_tour') }}</h1>
                <carousel
                  :per-page="5"
                  :pagination-enabled="false"
                  :mouse-drag="false"
                  :autoplay="true"
                  :navigation-enabled="true"
                  :navigation-next-label="nextLabel"
                  :navigation-prev-label="prevLabel"
                >
                  <slide v-for="hot in tour_hot" :key="hot.id" class="tour-list">
                    <el-card :body-style="{ padding: '0px', backgroundImage: `url('${url + hot.images}')`, width:'100%', height: '470px', backgroundSize: 'cover', backgroundPosition: 'bottom' }" class="card-tour">
                      <!--                        <el-image :src="url + tour.images" fit="cover" />-->
                      <div class="item-tour">
                        <h3 class="name-tour">{{ hot.name }}</h3>
                      </div>
                    </el-card>
                  </slide>
                </carousel>
              </div>
            </el-col>
          </el-row>
          <el-row class="location-tour">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h1 class="title-tour">{{ $t('location') }}</h1>
                <el-col v-loading="loadingTable" :span="24" class="list-products">
                  <el-row :gutter="12">
                    <el-col v-for="tour in tours" :key="tour.id" :span="8" class="tour-list">
                      <el-card :body-style="{ padding: '0px', backgroundImage: `url('${url + tour.images}')`, width:'100%', height: '470px', backgroundSize: 'cover', backgroundPosition: 'bottom' }" class="card-tour">
                        <!--                        <el-image :src="url + tour.images" fit="cover" />-->
                        <div class="item-tour">
                          <h3 class="name-tour">{{ tour.name }}</h3>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatNumber } from '@/utils/convert'
import { Carousel, Slide } from 'vue-carousel'
import BASE_URL from '@/constant/domain'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()

export default {
  name: 'Index',
  components: { Carousel, Slide },
  data() {
    return {
      url: BASE_URL,
      tour_hot: [],
      tours: [],
      loadingTable: false,
      loadingHot: false
    }
  },
  created() {
    this.requestListTour()
    this.requestHotTour()
  },
  methods: {
    requestHotTour() {
      this.loadingHot = true
      listTourResource.hotTour().then(res => {
        this.loadingHot = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tour_hot = data.hot
        }
      })
    },
    requestListTour() {
      this.loadingTable = true
      listTourResource.tourList().then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tours = data.list
        }
      })
    },
    formatNumber
  }
}
</script>
<style>
.card-tour .el-card__body{
  -webkit-filter: brightness(80%);
  -moz-filter: brightness(80%);
  -o-filter: brightness(80%);
}
.VueCarousel-navigation-next{
  background-position: 0,0;
  background-size: 200% 100%;
  border-radius: 50%;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 10%);
  height: 40px;
  width: 40px;
  z-index: 1;
}
.VueCarousel-navigation-prev{
  background-color: #fff;
  background-position: 0,0;
  background-size: 200% 100%;
  border-radius: 50%;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 10%);
  height: 40px;
  width: 40px;
  z-index: 1;
}
{
  align-items: center;
  background-color: #fff;
  background-position: 0,0;
  background-size: 200% 100%;
  border-radius: 50%;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 10%);
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: absolute;
  right: -20px;
  top: 48%;
  transform: translateY(-50%);
  width: 40px;
  z-index: 1;
}
</style>
<style scoped>
.tour-list {
  width: 25%;
  height: 470px;
  margin-bottom: 20px;
}
.card-tour {
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
}
.card-tour .el-image{
  width:100%;
  height: 470px;
}
.name-tour{
  margin: 0;
  color: #fff;
  font-size: 1.714em
}
.item-tour{
  -webkit-box-pack: center;
  align-items: center;
  text-align: center;
  background: transparent;
  border: 0 solid #fff;
  display: flex;
  flex: initial;
  flex-flow: row wrap;
  left: 50%;
  line-height: 1.5;
  max-width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  position: relative;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  cursor: pointer;
  /*background: #000;*/
  /*opacity: .5;*/
}
.title-tour {
  text-align: center;
  color: #c3a30b;
  text-transform: uppercase;
}

</style>
