<template>
  <el-dialog title="" :visible.sync="showDialog" :before-close="handleClose" class="dialog-menu" width="30%">
    <ul class="navbar-nav ml-auto" style="list-style:none; padding-left:0">
      <!-- <li class="nav-item">
        <el-dropdown>
          <span class="el-dropdown-link">Tour nước ngoài</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="cate in categories" :key="cate.id" :value="cate.id">
              <div class="nav-link" @click="clickTour(cate.id)">{{ cate.name }}</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li> -->
      <li v-for="cate in categories" :key="cate.id" :value="cate.id" class="nav-item"><div class="nav-link" @click="clickTour(cate.id)">{{ cate.name }}</div></li>
      <li class="nav-item"><div class="nav-link" @click="clickTour(cate_id)">Tour trong nước</div></li>
      <!-- <li class="nav-item"><router-link to="/book-tour" class="nav-link">Book tour</router-link></li> -->
      <li class="nav-item"><router-link to="/about" class="nav-link">About</router-link></li>
      <li class="nav-item"><router-link to="/blog" class="nav-link">Blog</router-link></li>
      <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
      <li class="nav-item"><router-link to="/history" class="nav-link">History</router-link></li>
      <li v-if="showUser" class="nav-item"><router-link to="/login" class="nav-link">login</router-link></li>
      <li v-if="!showUser" class="nav-item"><div class="nav-link" @click="onLogout">logout</div></li>
    </ul>
  </el-dialog>
</template>

<script>
import { getToken, getUID, removeAcountInfo, removeToken, removeUID } from '@/utils/auth'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()
export default {
  name: 'Navmenumb',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showUser: true,
      categories: [],
      cate_id: 0
    }
  },

  created() {
    this.showUserIcon()
    this.requestCategoryList()
    this.requestCategoryListVN()
  },

  methods: {
    clickTour(id) {
      if (this.$route.path === '/list-tour') {
        this.$router.push(
          `/list-tour?category_id=${id}`
        )
        window.location.reload()
      } else {
        this.$router.push(`/list-tour?category_id=${id}`)
      }
    },
    onLogout() {
      removeToken()
      removeUID()
      removeAcountInfo()
      location.reload()
    },
    showUserIcon() {
      if (getUID() || getToken()) {
        this.showUser = false
      } else {
        this.showUser = true
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCloseNav(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    },
    requestCategoryList() {
      const cate_id = 0
      listTourResource.categoryList(cate_id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.categories = data.cate
          console.log(this.categories)
        }
      })
    },
    requestCategoryListVN() {
      const cate_id = 1
      listTourResource.categoryList(cate_id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.cate_id = data.cate[0].id
        }
      })
    }
  }
}
</script>

<style>
.dialog-menu .el-dialog{
  margin-top: 0 !important;
    float: right;
    height: 100%;
}
.nav-item{
  padding-bottom: 10px;
}
</style>
