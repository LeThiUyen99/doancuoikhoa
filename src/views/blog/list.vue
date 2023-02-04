<template>
  <el-row class="app-container">
    <el-row :gutter="20">
      <el-col :span="18" :offset="3">
        <div class="grid-content bg-purple">
          <h1 class="tt-blog">{{ $t('travel_experience') }}</h1>
          <el-row>
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <div v-for="blog in blogs" :key="blog.id" v-loading="loadingTable" class="contain-blog">
                  <div class="thumb">
                    <router-link class="home-link" :to="`/blog-detail?id=${blog.id}`">
                      <el-image :src="url + blog.images" fit="cover" />
                    </router-link>
                  </div>
                  <div class="item-blog">
                    <router-link class="home-link" :to="`/blog-detail?id=${blog.id}`">
                      <h1 class="title-blog">{{ blog.title }}</h1>
                    </router-link>
                    <p class="auth">
                      <span style="padding-right: 10px"><i class="el-icon-date" style="padding-right: 5px" />{{ convertDate(blog.create_at) }}</span>
                      <span><i class="el-icon-user-solid" style="padding-right: 5px" />{{ blog.accounts? blog.accounts.name: '' }}</span>
                    </p>
                    <p v-html="blog.content" />
                    <div class="btn-detail">
                      <router-link class="home-link" :to="`/blog-detail?id=${blog.id}`">
                        <el-button>{{ $t('detail') }}</el-button>
                      </router-link>
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
import { convertDate } from '@/utils/convert'
import BASE_URL from '@/constant/domain'
import BlogResource from '@/api/blog'
const blogResource = new BlogResource()

const defaultQuery = {
  limit: 20,
  page: 1
}

export default {
  name: 'List',

  data() {
    return {
      blogs: [],
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      url: BASE_URL,
      loadingTable: false,
      place: place
    }
  },

  created() {
    this.requestBlogList()
  },

  methods: {
    requestBlogList() {
      this.loadingTable = true
      blogResource.blogList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.blogs = data.data
          this.total = this.listQuery.page === 1 ? data.totalPage : this.total
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
</style>
<style lang="scss" scoped>
* {
  font-family: Open Sans,sans-serif;
  font-size: 18px;
  line-height: 1.5;
}
h1{
  font-size: 2em;
}
.app-container{
  color: #444;
  font-family: Roboto;
}
.title-blog{
  color: #444;
  cursor: pointer;
}
.title-blog:hover{
  color: #c3a30b;
}
.btn-detail{
  text-align: right;
}
.btn-detail .el-button{
  background: #c3a30b;
  border: 1px solid #c3a30b;
  color: #fff;
  padding: 10px 50px;
  border-radius: 10px;
}
.contain-blog{
  padding: 20px 0;
}
.el-col-9{
  padding: 20px 50px;
}
.tt-blog{
  color: #c3a30b;
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
</style>
