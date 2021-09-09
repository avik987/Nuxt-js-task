<template>
  <div class="wrapper">
    <navbar />
    <nuxt />
  </div>
</template>
<script>
export default {
  middleware: ['auth'],
  computed: {
    error () {
      return this.$store.state.error
    }
  },
  watch: {
    error (error) {
      if (this.timeOut) { clearTimeout(this.timeOut) }
      if (error) {
        this.$message({
          message: error || 'Что-то пошло не так',
          type: 'error'
        })
      }
      this.timeOut = setTimeout(() => {
        this.$store.commit('setError', null)
      }, 1000)
    }
  }
}
</script>
