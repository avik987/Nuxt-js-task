<template>
  <div class="nav-container">
    <div>
      <router-link to="/">
        Home
      </router-link>
    </div>
    <div>
      <router-link to="/auth" @click.native="logout">
        Log Out
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      activeIndex: this.$route.query.activeTab || '0'
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
