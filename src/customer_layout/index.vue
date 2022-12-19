<template>
  <div class="app-wrapper">
    <navbar ref="refNav" />
    <sidebar />
    <app-main />
    <footer-vue />
  </div>
</template>

<script>
import Navbar from '@/customer_layout/components/navbar'
import Sidebar from '@/customer_layout/components/sidebar'
import AppMain from './components/AppMain.vue'
import footerVue from '@/customer_layout/components/footer'

export default {
  name: 'LayoutCustomer',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    footerVue
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
