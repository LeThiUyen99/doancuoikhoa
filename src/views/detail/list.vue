<template>
  <div class="detail-container">
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <div class="grid-content bg-purple">
          <div class="detail-item">
            <div class="content">
              <el-row>
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <h1 class="name">{{ detail.name }}</h1>
                    <div v-html="detail.description" />
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    <div class="thumb">
                      <el-image :src="url + detail.images" fit="contain" />
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div v-for="itinerary in detail.tour_itinerary" :key="itinerary.id" class="tour_itinerary">
                <div>{{ `${itinerary.day}: ${itinerary.name}` }}</div>
                <div v-html="itinerary.description" />
                <div class="thumb">
                  <el-image :src="url + itinerary.image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BASE_URL from '@/constant/domain'
import ListTourResource from '@/api/list-tour'
const listTourResource = new ListTourResource()
export default {
  name: 'List',

  data() {
    return {
      detail: [],
      url: BASE_URL
    }
  },
  created() {
    this.requestDetailList()
  },

  methods: {
    requestDetailList() {
      const id = this.$route.query.id
      listTourResource.detail(id).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.detail = data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
