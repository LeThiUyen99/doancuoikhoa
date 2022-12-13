<template>
  <el-row class="app-container list-document">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('document') }}</h3>
      </el-col>
    </el-row>
    <el-row class="list-document__data">
      <el-row>
        <el-link type="primary" href="https://docs.google.com/document/d/11GSWJrh8RXNI8SOTnzQfe9CwwGxuZzpuLSD2X8DKRcY/edit" target="_blank">1.Link docs</el-link>
      </el-row>
      <el-row>
        <el-link type="primary" href="https://www.figma.com/file/PyVTzD3vqDOjy2gx7Hm3CN/Update-SHOP?node-id=0%3A1" target="_blank">2.Link design</el-link>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'List'
}
</script>

<style scoped>

</style>
