<template>
  <el-row v-if="!$route.meta.hideSidebar" class="sidebar">
    <div class="hero-wrap js-fullheight" :style="{'background-image': 'url(' + require('@/assets/images/bg_1.jpg') + ')', 'height':'566px', 'background-size': 'cover', 'background-position': 'center'}">
      <el-row :gutter="20" class="search-tour">
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple">
            <el-form class="form-search">
              <div class="search-top">
                <el-input v-model="q" :placeholder="$t('search')" />
                <el-date-picker v-model="start_date" type="date" :placeholder="$t('start_date')" style="width:100%; margin: 0 10px" />
                <el-date-picker v-model="expire_date" type="date" :placeholder="$t('date_finish')" style="width:100%" />
                <el-button type="primary" icon="el-icon-search" class="btn-search" @click="searchTour">Search</el-button>
              </div>
              <div v-if="seen" id="hide" class="search-bottom">
                <el-select
                  v-model="cateId"
                  style="width: 100%"
                  class="w-100"
                  filterable
                  remote
                  :multiple-limit="1"
                  :placeholder="$t('filter_cate')"
                >
                  <el-option
                    v-for="cate in categories"
                    :key="cate.id"
                    :label="cate.name"
                    :value="cate.id"
                  />
                </el-select>
                <el-select v-model="countryId" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('country')" style="margin: 0 10px">
                  <el-option v-for="country in countries" :key="country.id" :label="country.name" :value="country.id" />
                </el-select>
                <el-input v-model="price" type="number" :placeholder="$t('price')" class="price" />
                <el-input type="hidden" />
              </div>
              <div class="control" @click="seen = !seen">
                <p>{{ $t('advanced_search') }}</p>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>

<script>
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()
export default {
  name: 'Sidebar',
  data() {
    return {
      q: '',
      start_date: '',
      expire_date: '',
      price: '',
      categories: [],
      cateId: '',
      countryId: '',
      countries: [],
      seen: false
    }
  },
  created() {
    this.requestcategories()
    this.requestCountryList()
    if (this.$route.query.type === 'advance') this.seen = true
  },
  methods: {
    searchTour() {
      if (this.$route.path === '/list-tour') {
        let url = `/list-tour?q=${this.q.trim()}&category_id=${this.cateId}&start_date=${this.start_date}&expire_date=${this.expire_date}&country_id=${this.countryId}&price=${this.price}`
        if (this.seen) url += '&type=advance'
        this.$router.push(url)
        window.location.reload()
      } else {
        this.$router.push(`/list-tour?q=${this.q.trim()}&category_id=${this.cateId}&start_date=${this.start_date}&expire_date=${this.expire_date}&country_id=${this.countryId}&price=${this.price}`)
      }
    },
    requestCountryList() {
      listTourResource.getCountryList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.countries = [...data.data]
        }
      })
    },
    requestcategories() {
      listTourResource.cateList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.categories = [...data.list]
        }
      })
    }
  }
}
</script>

<style scoped>
  .search-tour {
    -webkit-box-pack: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    background: transparent;
    border: 0 solid #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: initial;
    -ms-flex: initial;
    flex: initial;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    left: 50%;
    line-height: 1.5;
    max-width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    position: relative;
    top: 65%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width: 100%;
    cursor: pointer;
  }
  .form-search{
    padding: 30px;
    background: #fff;
    border-radius: 5px;
  }
  .search-top, .search-bottom{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .control{
    text-align: left;
  }
  .control p{
    margin-bottom: 0;
  }
  .search-bottom .el-select{
    width: 93% !important;
  }
  .form-search .btn-search{
    margin-left: 10px;
    width:100%;
    background: #c3a30b;
    border: 1px solid #c3a30b;
  }
</style>
