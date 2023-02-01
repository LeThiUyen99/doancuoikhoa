<template>
  <div class="detail-container">
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
                        <!--                        <div class="thumb">-->
                        <!--                          <el-image :src="url + itinerary.image" />-->
                        <!--                        </div>-->
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
                    <div v-for="comment in commets" :key="comment.id" class="comment-col">
                      <div class="thumb">
                        <el-image :src="default_user" style="width: 30px; height: 30px;" />
                      </div>
                      <div class="item-comment">
                        <el-rate v-model="comment.rating" disabled />
                        <p>{{ comment.user? comment.user.name: '' }}</p>
                        <p>{{ comment.comment }}</p>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="11" class="form-comment">
                  <div class="grid-content bg-purple-light comment-des">
                    <h3>{{ $t('comment') }}</h3>
                    <el-form :model="commentForm">
                      <el-rate
                        v-model="commentForm.rating"
                        :colors="colors"
                      />
                      <el-form-item :label="$t('content')">
                        <el-input v-model="commentForm.comment" type="textarea" :placeholder="$t('content')" />
                      </el-form-item>
                      <el-form-item :label="$t('name')">
                        <el-input v-model="commentForm.name" disabled :placeholder="$t('name')" />
                      </el-form-item>
                      <el-form-item :label="$t('email')">
                        <el-input v-model="commentForm.email" disabled :placeholder="$t('email')" />
                      </el-form-item>
                      <el-form-item size="large">
                        <el-button :loading="loadingSubmit" type="primary" @click="onSubmit">{{ $t('comment') }}</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
              </el-row>
              <el-row class="same-tour-list">
                <carousel
                  :per-page="5"
                  :pagination-enabled="false"
                  :mouse-drag="false"
                >
                  <slide v-for="same in tour_same" :key="same.id">
                    <div class="slide-product">
                      <div class="product-thumb">
                        <div class="thumb-wrapper">
                          <div>
                            <el-image
                              class="el-image-related"
                              :src="url + same.images"
                              :product="same"
                              fit="contain"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p class="title-product">{{ same.name }}</p>
                      </div>
                      <div>
                        <p class="price" style="font-size:13px">
                          <span>{{ $i18n.t('price_vnd').format(formatNumber(same.price)) }}</span>
                        </p>
                      </div>
                    </div>
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
import {formatNumber} from '@/utils/convert'
import { Carousel, Slide } from 'vue-carousel'
import default_user from '@/assets/images/default_user.png'
import BASE_URL from '@/constant/domain'
import ListTourResource from '@/api/list-tour'
import { getAcountInfo } from '@/utils/auth'
const account = getAcountInfo()
const listTourResource = new ListTourResource()

export default {
  name: 'List',
  components: { Carousel, Slide },

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
      tour_same: []
    }
  },
  created() {
    this.requestDetailList()
    this.requestCommentList()
    this.requestShowComment()
  },

  methods: {
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
    formatNumber
  }
}
</script>

<style lang="scss" scoped>
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
  background-color: #E5E5E5;
  padding: 50px;
  border-radius: 20px;
}
</style>
