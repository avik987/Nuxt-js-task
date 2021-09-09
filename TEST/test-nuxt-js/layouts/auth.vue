<template>
  <div>
    <div class="auth-container">
      <div class="auth-content">
        <nuxt />
        <div class="auth-links-container">
          <router-link class="auth-link-item" to="/auth">
            Sign In
          </router-link>
          <router-link class="auth-link-item" to="/auth/sign-up">
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navItems: [
        {
          to: '/auth',
          title: 'Sign In'
        },
        {
          to: '/auth/sign-up',
          title: 'Sign Up'
        }
      ]
    }
  },
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
