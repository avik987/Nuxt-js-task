export default {
  data () {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 10,
      pageCount: 50,
      items: []
    }
  },
  methods: {
    pageChangeHandler ({ page, pageCount, items }) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.pageCount = pageCount
      this.items = items
    }
  }
}
