<template>
  <div class="add-user-container">
    <el-button type="primary" icon="el-icon-plus" @click="addUser">
      Add User
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
    addUser () {
      this.$router.push({ path: '/create-user' })
    }
  }
}
</script>
<style scoped>
.add-user-container{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 50px 0;
}
</style>
