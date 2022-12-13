<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    console.log('......................check menu : ', query, path)
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
