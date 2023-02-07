<template>
  <div class="detail-container">
    <div class="thumbnail">
      <el-carousel indicator-position="outside" :interval="5000" arrow="always" height="500px">
        <el-carousel-item v-for="img in detail.tour_images" :key="img.id">
          <el-image :src="url + img.url" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <div class="grid-content bg-purple">
          <div class="detail-item">
            <div class="content">
              <el-row>
                <el-col :span="18" class="name-detail">
                  <div class="grid-content bg-purple">
                    <h1 class="name">{{ detail.name }}</h1>
                    <div v-html="detail.description" />
                  </div>
                </el-col>
                <el-col :span="6" class="thumb-detail">
                  <div class="grid-content bg-purple-light">
                    <div class="thumb">
                      <el-image :src="url + detail.images" fit="contain" />
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="itinerary-detail">
                <div class="schedule">
                  <p>{{ $t('schedule') }}</p>
                </div>
                <el-row style="display:flex;">
                  <el-col :span="3">
                    <div class="grid-content bg-purple-light">
                      <p class="departure_details">{{ $t('departure_details') }}</p>
                    </div>
                  </el-col>
                  <el-col :span="15" class="tour_itinerary_detail">
                    <div class="grid-content bg-purple">
                      <div v-for="itinerary in detail.tour_itinerary" :key="itinerary.id" class="tour_itinerary">
                        <div>{{ `${itinerary.day}: ${itinerary.name}` }}</div>
                        <div v-html="itinerary.description" />
                        <div class="thumb">
                          <el-image v-if="itinerary.image" :src="url + itinerary.image" />
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6" class="main_attractions">
                    <div class="grid-content bg-purple-light">
                      <h2>{{ $t('main_attractions') }}</h2>
                      <ul v-for="tour in detail.tour_itinerary" :key="tour.id">
                        <li>{{ tour.name }}</li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-row v-if="showComment" class="comment-tour">
                <el-col :span="13" class="list-comment">
                  <div class="grid-content bg-purple">
                    <div class="feedback">
                      <div class="thumb">
                        <el-image :src="default_user" style="width: 30px; height: 30px; border-radius: 50%;" />
                      </div>
                      <el-form :model="commentForm">
                        <el-rate
                          v-model="commentForm.rating"
                          :colors="colors"
                        />
                        <el-input v-model="commentForm.comment" type="textarea" :placeholder="$t('content')" />
                        <el-form-item class="btn-comment" size="large">
                          <el-button :loading="loadingSubmit" type="primary" @click="onSubmit">{{ $t('comment') }}</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div v-loading="loadingCommnet" v-for="comment in commets" :key="comment.id" class="comment-col">
                      <div class="thumb">
                        <el-image :src="default_user" style="width: 30px; height: 30px;" />
                      </div>
                      <div class="item-comment">
                        <el-rate v-model="comment.rating" disabled />
                        <p style="margin: 0;">
                          <span style="color: #0a58ca; font-weight: bold; padding-right: 10px">{{ comment.user? comment.user.name: '' }}</span>
                          <span>{{ comment.comment }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="11" class="form-comment">
                  <div class="grid-content bg-purple-light comment-des">
                    <h3 class="title-book-tour">{{ detail.name }}</h3>
                    <div class="info-tour">
                      <div class="info-tour-left">
                        <p class="time">{{ `${$t('time')}: ${detail.time}` }}</p>
                        <p class="price">{{ `${formatNumber(detail.price)} ${detail.currency}` }}</p>
                      </div>
                      <div class="info-tour-right">
                        <p class="active">{{ `${$t('active')}: ${(detail.active === 1) ? $t('dont_accept_guests') : $t('receiving_guests')}` }}</p>
                        <p class="start-date">{{ `${ $t('departure_day')}: ${convertDate(detail.start_date)}` }}</p>
                        <el-button type="" @click="onShowBookTour">{{ $t('book_tour') }}</el-button>
                        <p>
                          <span>HOTLINE : </span>
                          <span>0936.425.552</span>
                        </p>
                      </div>
                    </div>
                    <dialog-form-book-tour :show-dialog="onShowDialog" :object-data="objectData" @onClickButtonDialog="handleClickButtonDialog" />
                  </div>
                </el-col>
              </el-row>
              <el-row class="same-tour-list">
                <h3>{{ $t('related_news') }}</h3>
                <carousel
                  :per-page="5"
                  :pagination-enabled="false"
                  :mouse-drag="false"
                  :autoplay="true"
                  :navigation-enabled="true"
                  navigation-next-label
                  navigation-prev-label
                >
                  <slide v-for="same in tour_same" :key="same.id">
                    <el-card :body-style="{ padding: '0px' }" class="slide-product">
                      <div class="product-thumb">
                        <div class="thumb-wrapper">
                          <div>
                            <div class="home-link" @click="clickDetail(same.id)">
                              <el-image
                                class="el-image-related"
                                :src="url + same.images"
                                :product="same"
                                fit="cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-name">
                        <div class="home-link" @click="clickDetail(same.id)">
                          <p class="title-product">{{ same.name }}</p>
                        </div>
                      </div>
                      <div class="col-price">
                        <p class="start-date">{{ `${ $t('departure_day')}: ${convertDate(same.start_date)}` }}</p>
                        <p class="price" style="font-size:13px">
                          <span>{{ `${$t('price')}: ${$i18n.t('price_vnd').format(formatNumber(same.price))}` }}</span>
                        </p>
                      </div>
                    </el-card>
                  </slide>
                </carousel>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DialogFormBookTour from './compoments/DialogFormBookTour.vue'
import { formatNumber, convertDate } from '@/utils/convert'
import { Carousel, Slide } from 'vue-carousel'
import default_user from '@/assets/images/default_user.png'
import BASE_URL from '@/constant/domain'
import ListTourResource from '@/api/list-tour'
import { getAcountInfo } from '@/utils/auth'
const account = getAcountInfo()
const listTourResource = new ListTourResource()

export default {
  name: 'List',
  components: { Carousel, Slide, DialogFormBookTour },

  data() {
    return {
      detail: [],
      url: BASE_URL,
      commentForm: {
        name: account ? account.name : '',
        email: account ? account.email : '',
        user_id: account ? account.id : 0,
        rating: 0
      },
      default_user: default_user,
      loadingSubmit: false,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      loadingCommnet: false,
      commets: [],
      showComment: false,
      tour_same: [],
      onShowDialog: false,
      objectData: {}
    }
  },
  created() {
    this.requestDetailList()
    this.requestCommentList()
    this.requestShowComment()
  },

  methods: {
    clickDetail(id) {
      this.$router.push(`/detail?id=${id}`)
      this.requestDetailList().then(() => {
        this.requestTourSameList()
        this.requestCommentList()
      })
    },
    onShowBookTour() {
      this.objectData = Object.assign({}, this.detail)
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      const { dialog, reload } = object
      this.onShowDialog = dialog
      if (reload) {
        this.requestDetailList()
      }
    },
    requestShowComment() {
      if (account) {
        this.showComment = true
      } else {
        this.showComment = false
      }
    },
    requestTourSameList(tour_id) {
      listTourResource.tourSame(tour_id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.tour_same = data.list_same
          console.log(this.tour_same)
        }
      })
    },
    requestCommentList(tour_id) {
      this.loadingCommnet = true
      const listQuery = {
        tour_id: tour_id,
        user_id: account ? account.id : 0
      }
      console.log(tour_id, '----')
      listTourResource.commentList(listQuery).then(res => {
        this.loadingCommnet = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.commets = data.comment
        }
      })
    },
    onSubmit() {
      this.loadingSubmit = true
      this.commentForm.tour_id = this.detail.id
      listTourResource.postComment(this.commentForm).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(error_msg)
          this.requestDetailList().then(() => {
            this.requestCommentList()
          })
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    requestDetailList() {
      const id = this.$route.query.id
      listTourResource.detail(id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.detail = { ...data.data }
          const tour_id = data.data.id
          this.requestCommentList(tour_id)
          this.requestTourSameList(tour_id)
        }
      })
    },
    formatNumber,
    convertDate
  }
}
</script>

<style>
.thumb-detail{
  border-radius: 20px;
}
.name-detail{
  padding-right: 50px;
}
.schedule{
  border-bottom: 1px solid #c3a30b;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
}
.schedule p{
  background-color: #c3a30b;
  border: unset;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-size: 1em;
  padding: 15px 24px;
  text-transform: capitalize;
  margin: 0;
}
.tour_itinerary_detail{
  border-left: 1px solid #c3a30b;
  padding: 10px;
  margin-top: 20px;
}
.main_attractions{
  background: #c3a30b;
  padding: 10px;
  color: #fff
}
.departure_details{
  float: right;
  text-align: right;
  padding: 10px;
  background: #eee;
  border-radius: unset;
  color: #c3a30b;
  margin-top: 20px;
}
.form-comment{
  padding: 30px 0px 30px 30px;
}
.form-comment .comment-des{
  border: 3px solid #c3a30b;
  padding: 50px;
  border-radius: 20px;
}
.el-image-related {
  height: 300px;
  width: 100%;
}
.same-tour-list .thumb-wrapper .el-image__error, .same-tour-list .el-image__placeholder, .same-tour-list .el-image__inner{
  min-height: 300px;
  min-width: 323px;
}
.slide-product {
  border: none;
  margin: 35px 10px;
  border-radius: 20px;
}
.product-thumb{
  text-align: center;
}
.title-product, .slide-product .price{
  display: -webkit-box;
  height: 21px;
  line-height: 1.3;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}
.comment-des .el-button--primary{
  background: #c3a30b;
  border: 1px solid #c3a30b;
  padding: 10px 190px;
}
.comment-col{
  display: flex;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.comment-col:last-child{
  border-bottom: none;
}
.comment-col .el-image__inner{
  border-radius: 50%
}
.detail-container{
  margin-top: 110px;
}
.thumbnail .el-image{
  width: 100%;
}
.info-tour{
  display: flex;
  justify-content: space-between;
}
.info-tour-left, .info-tour-right{
  width: 100%;
}
.info-tour-right .el-button{
  border: 1px solid #c3a30b;
  background: #c3a30b;
  width: 100%;
  color: #fff;
}
.feedback{
  display: flex;
}
.feedback .el-form{
  width: 100%;
  padding-left: 10px;
}
.feedback .btn-comment{
  text-align: right;
  padding: 10px 0;
}
.feedback .btn-comment .el-button{
  border: 1px solid #c3a30b;
  background: #c3a30b;
}
.item-comment{
  padding-left: 10px;
}
.slide-product:hover{
box-shadow: 0 7px 40px 0 rgb(0 0 0 / 15%);
margin-bottom: 24px;
position: relative;
}
.info-tour-left .price{
  font-size: 1.7em;
  font-weight: bold;
  color: #c3a30b;
}
.title-book-tour{
  font-size: 2em;
  margin: 0;
}
.same-tour-list .price{
  font-weight: bold;
  color: #c3a30b;
}
.start-date{
  padding: 5px 10px;
  font-size: 0.75em;
  font-style: italic;
  color: #9aaabf;
  margin: 0;
}
.same-tour-list p{
  margin: 0;
  cursor: pointer;
}
.col-price {
  padding-bottom: 30px;
}
.VueCarousel-inner{
  width: 20%;
}
.VueCarousel-slide{
  width: 100%;
}
</style>
