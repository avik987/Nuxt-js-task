<template>
  <div>
    <user-details @submitForm="handleFormSubmit" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'default',
  methods: {
    ...mapActions([
      'registration'
    ]),
    async  handleFormSubmit (createUserData) {
      try {
        const { password, email, name } = createUserData
        await this.registration({ password, email, name })
        this.$message({ type: 'success', message: 'User created successfully' })
        this.$router.push({ path: '/' })
      } catch {}
    }

  }
}
</script>
