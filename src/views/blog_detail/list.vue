<template>
  <el-row class="app-container">
    <el-row :gutter="20">
      <el-col :span="23" :offset="1">
        <div class="grid-content bg-purple">
          <el-row>
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <div class="contain-blog">
                  <div class="item-blog">
                    <h1 class="title-blog">{{ detail.title }}</h1>
                    <p class="auth">
                      <span style="padding-right: 10px"><i class="el-icon-date" style="padding-right: 5px" />{{ convertDate(detail.create_at) }}</span>
                      <span><i class="el-icon-user-solid" style="padding-right: 5px" />{{ detail.accounts? detail.accounts.name: '' }}</span>
                    </p>
                    <p v-html="detail.content" />
                    <div class="thumb">
                      <el-image :src="url + detail.images" fit="cover" />
                    </div>
                    <p v-html="detail.description" />
                  </div>
                </div>
                <div class="related-news">
                  <h3>{{ $t('related_news') }}</h3>
                  <div v-for="same in blog_same" :key="same.id" class="item-related">
                    <div class="thumb">
                      <el-image :src="url + same.images" fit="cover" />
                    </div>
                    <div class="content-related">
                      <p class="title-same">{{ same.title }}</p>
                      <p class="content-same" v-html="same.content" />
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple-light">
                <div v-for="item in blogs" :key="item.id" v-loading="loadingTable" class="new-blog">
                  <div class="thumb">
                    <router-link class="home-link" :to="`/blog-detail?id=${item.id}`">
                      <el-image :src="url + item.images" fit="cover" />
                    </router-link>
                  </div>
                  <div class="item-blog">
                    <router-link class="home-link" :to="`/blog-detail?id=${item.id}`">
                      <p class="title-blog">{{ item.title }}</p>
                    </router-link>
                  </div>
                </div>
                <div class="banner-travel">
                  <el-image :src="place" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import place from '@/assets/images/thumbnail.png'
import BASE_URL from '@/constant/domain'
import { convertDate } from '@/utils/convert'
import BlogResource from '@/api/blog'
const blogResource = new BlogResource()
export default {
  name: 'List',

  data() {
    return {
      detail: [],
      blogs: [],
      url: BASE_URL,
      place: place,
      blog_same: []
    }
  },

  created() {
    this.requestDetailBlog()
    this.requestNewBlogList()
  },

  methods: {
    requestBlogSame(blog_id) {
      blogResource.blogSame(blog_id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.blog_same = data.list_same
          console.log(this.blog_same)
        }
      })
    },
    requestNewBlogList() {
      this.loadingTable = true
      blogResource.blogList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.blogs = data.data
        }
      })
    },
    requestDetailBlog() {
      const id = this.$route.query.id
      blogResource.detailBlog(id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.detail = { ...data.data }
          const blog_id = data.data.id
          this.requestBlogSame(blog_id)
        }
      })
    },
    convertDate
  }
}
</script>

<style>
  .new-blog .thumb .el-image img{
    width: 100px;
    height: 70px;
  }
  .item-related .el-image img{
    width: 250px;
    height: 180px;
  }
</style>
<style lang="scss" scoped>
@font-face {
  font-family: "RobotoCondensed";
  src: local('RobotoCondensed'), url("../../assets/fonts/RobotoCondensed-Regular.ttf") format("truetype");
}
* {
  font-family: RobotoCondensed;
}
  .el-col-9{
    padding: 20px 50px;
  }
  .new-blog{
    display: flex;
    border-bottom: 1px solid #aaa;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
  .new-blog .title-blog{
    margin: 0;
    font-weight: bold;
    padding-left: 10px;
  }
  .related-news{
    border: 1px solid #aaa;
    padding: 20px;
  }
  .related-news h3{
    color: #c3a30b;
    font-size: 1.75rem;
  }
  .item-related{
    display: flex;
  }
  .content-related .content-same{
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    height: 90px;
    line-height: 25px;
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    margin: 0;
  }
  .title-same{
    margin: 0;
    font-weight: bold;
    font-size: 20px;
  }
  .content-related{
    padding-left: 20px;
  }
</style>
