<template>
  <div class="app-contain">
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
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
                  class="desktop"
                >
                  <slide v-for="hot in tour_hot" :key="hot.id" class="tour-list">
                    <!-- <el-card :body-style="{ padding: '0px', backgroundImage: `url('${url + hot.images}')`, width:'100%', height: '470px', backgroundSize: 'cover', backgroundPosition: 'bottom' }" class="card-tour"> -->
                    <div>
                      <div class="landing--tour-data-single landing--tour-data">
                        <div class="landing--tour-item">
                          <div class="overlay  available">
                            <el-image :src="url + hot.images" fit="cover" />
                          </div>
                          <div class="item-tour text landing--tour-item_content">
                            <h3 class="name-tour">{{ hot.name }}</h3>
                            <div class="time row">
                              <div class="col-md-7 col-sm-6 text-end">{{ $t('time') }}: </div>
                              <div class="col-md-5 col-sm-6 text-start text-lowercase">{{ hot.time }}</div>
                            </div>
                            <div class="departure-date row">
                              <div class="col-md-7 col-sm-6 text-end">Ngày khởi hành:
                              </div>
                              <div class="col-md-5 col-sm-6 text-start">{{ convertDate(hot.start_date) }}</div>
                            </div>
                            <div class="price row">
                              <div class="col-md-7 col-sm-6 text-end">Giá Tour:</div>
                              <div class="col-md-5 col-sm-6 text-start">{{ `${formatNumber(hot.price)} ${hot.currency}` }}</div>
                            </div>
                            <div class="detail text-center">
                              <router-link class="home-link" :to="`/detail?id=${hot.id}`">
                                <span class="detail-tour text-capitalize">{{ $t('detail') }}</span>
                              </router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </slide>
                </carousel>
                <carousel
                  :per-page="2"
                  :pagination-enabled="false"
                  :mouse-drag="false"
                  :autoplay="true"
                  :navigation-enabled="true"
                  class="mobile"
                >
                  <slide v-for="hot in tour_hot" :key="hot.id" class="tour-list">
                    <!-- <el-card :body-style="{ padding: '0px', backgroundImage: `url('${url + hot.images}')`, width:'100%', height: '470px', backgroundSize: 'cover', backgroundPosition: 'bottom' }" class="card-tour"> -->
                    <div>
                      <div class="landing--tour-data-single landing--tour-data">
                        <div class="landing--tour-item">
                          <div class="overlay  available">
                            <el-image :src="url + hot.images" fit="cover" />
                          </div>
                          <div class="item-tour text landing--tour-item_content">
                            <h3 class="name-tour">{{ hot.name }}</h3>
                            <div class="time row">
                              <div class="col-md-7 col-sm-6 text-end">{{ $t('time') }}: </div>
                              <div class="col-md-5 col-sm-6 text-start text-lowercase">{{ hot.time }}</div>
                            </div>
                            <div class="departure-date row">
                              <div class="col-md-7 col-sm-6 text-end">Ngày khởi hành:
                              </div>
                              <div class="col-md-5 col-sm-6 text-start">{{ convertDate(hot.start_date) }}</div>
                            </div>
                            <div class="price row">
                              <div class="col-md-7 col-sm-6 text-end">Giá Tour:</div>
                              <div class="col-md-5 col-sm-6 text-start">{{ `${formatNumber(hot.price)} ${hot.currency}` }}</div>
                            </div>
                            <div class="detail text-center">
                              <router-link class="home-link" :to="`/detail?id=${hot.id}`">
                                <span class="detail-tour text-capitalize">{{ $t('detail') }}</span>
                              </router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <!-- <el-card :body-style="{ padding: '0px', backgroundImage: `url('${url + tour.images}')`, width:'100%', height: '470px', backgroundSize: 'cover', backgroundPosition: 'bottom' }" class="card-tour">
                        <el-image :src="url + tour.images" fit="cover" />
                        <div class="item-tour">
                          <h3 class="name-tour">{{ tour.name }}</h3>
                        </div>
                      </el-card> -->
                      <div>
                        <div class="landing--tour-data-single landing--tour-data">
                          <div class="landing--tour-item">
                            <div class="overlay  available">
                              <el-image :src="url + tour.images" fit="cover" />
                            </div>
                            <div class="item-tour text landing--tour-item_content">
                              <h3 class="name-tour">{{ tour.name }}</h3>
                              <div class="time row">
                                <div class="col-md-7 col-sm-6 text-end">{{ $t('time') }}: </div>
                                <div class="col-md-5 col-sm-6 text-start text-lowercase">{{ tour.time }}</div>
                              </div>
                              <div class="departure-date row">
                                <div class="col-md-7 col-sm-6 text-end">{{ $t('departure_day') }}:
                                </div>
                                <div class="col-md-5 col-sm-6 text-start">{{ convertDate(tour.start_date) }}</div>
                              </div>
                              <div class="price row">
                                <div class="col-md-7 col-sm-6 text-end">{{ $t('price') }}:</div>
                                <div class="col-md-5 col-sm-6 text-start">{{ `${formatNumber(tour.price)} ${tour.currency}` }}</div>
                              </div>
                              <div class="detail text-center">
                                <router-link class="home-link" :to="`/detail?id=${tour.id}`">
                                  <span class="detail-tour text-capitalize">{{ $t('detail') }}</span>
                                </router-link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row class="chat-box">
            <div v-if="showChat" class="icon-chat-box">
              <div class="thumb" @click="clickChatBot">
                <el-image :src="chat" style="width: 50px;; height: 50px;" />
              </div>
            </div>
            <chat-bot :show-dialog="onShowDialog" :go-back="goBack" :object-data="objectChat" @onClickButtonDialog="handleClickButtonDialog" />
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

require('@/assets/css/home.css')
import chat from '@/assets/images/chatbox.png'
import ChatBot from '@/views/customer-view/home/components/ChatBot'
import { formatNumber, convertDate } from '@/utils/convert'
import { Carousel, Slide } from 'vue-carousel'
import BASE_URL from '@/constant/domain'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()

export default {
  name: 'Index',
  components: { Carousel, Slide, ChatBot },
  data() {
    return {
      url: BASE_URL,
      tour_hot: [],
      tours: [],
      loadingTable: false,
      loadingHot: false,
      chat: chat,
      onShowDialog: false,
      objectChat: {},
      showChat: false
    }
  },
  created() {
    this.requestListTour()
    this.requestHotTour()
    this.showMessageer()
  },
  methods: {
    goBack() {
      this.onShowDialog = false
      this.requestListTour()
      this.requestHotTour()
    },
    showMessageer() {
      const token = getToken()
      if (token) {
        this.showChat = true
      } else {
        this.showChat = false
      }
    },
    clickChatBot() {
      this.onShowDialog = true
      this.objectChat = {}
    },
    handleClickButtonDialog(object) {
      const { dialog, reload } = object
      this.onShowDialog = dialog
      if (reload) {
        this.requestListTour()
      }
    },
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
    formatNumber,
    convertDate
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
.el-card{
  border: none;
}
.el-card.is-always-shadow {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.vac-col-messages{
  border: 1px solid #aaa;
}
.VueCarousel-inner{
  flex-basis: 332.4px !important
}
</style>
<style scoped>
.app-contain{
  margin-top: 50px;
}
.tour-list {
  width: 20%;
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
  font-size: 1.714em !important;
  text-align: center;
}
.title-tour {
  text-align: center;
  color: #c3a30b;
  text-transform: uppercase;
}

.el-image{
  display: block;
}
.icon-chat-box{
  overflow: hidden;
  position: fixed;
  right: 5px;
  text-align: center;
  top: calc(70% + 10px)!important;
  transform: translateY(-50%);
  width: 50px;
  z-index: 9999;
  cursor: pointer;
}
@media (max-width: 900px) {
  .tour-list{
    width: 33%;
    height: 321px;
  }
  .landing--tour-data .landing--tour-item {
    height: 321px;
  }
}
@media (max-width: 500px) {
  .tour-list{
    width: 50%;
  }
}
</style>
