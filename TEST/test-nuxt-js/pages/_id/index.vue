<template>
  <user-details :edit-user="editInfo" @submitForm="handleFormSubmit" />
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'default',
  data () {
    return {
      userId: this.$route.params.id,
      editInfo: null
    }
  },
  mounted () {
    this.getUserData()
  },
  methods: {
    ...mapActions([
      'loadUser',
      'updateUser'
    ]),
    async handleFormSubmit (userData) {
      try {
        const { email, name, password } = userData
        await this.updateUser({ id: this.userId, email, name, password })
        this.$message({ type: 'success', message: 'User data updated successfully' })
        this.$router.push({ path: '/' })
      } catch {}
    },
    async getUserData () {
      try {
        const { user } = await this.loadUser({ id: this.userId })
        const { email, name } = user
        const data = { email, name }
        this.editInfo = data
      } catch {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>
