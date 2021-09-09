<template>
  <div class="user-container">
    <add-user />
    <div class="users-table-container">
      <users :table-data="items" @deleteUser="deleteUser" />
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageCount"
        :current-page="page"
        :page-size="pageSize"
        @current-change="paginationLogic"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import PaginationMixin from '@/core/mixins/pagination.mixin'

export default {
  mixins: [PaginationMixin],
  layout: 'default',
  computed: {
    ...mapState(['usersList'])
  },
  mounted () {
    this.paginationLogic(this.page)
  },
  methods: {
    ...mapActions(['loadUsers', 'removeUser']),
    async deleteUser (id) {
      try {
        await this.$confirm('', 'Do you really want to delete this user?', { confirmButtonText: 'OK', cancelButtonText: 'Cancel', center: true })
        this.removeUser({ id })
        this.paginationLogic(this.page)
        this.$message({ type: 'success', message: 'Delete completed' })
      } catch {
        this.$message({ type: 'info', message: 'Delete canceled' })
      }
    },
    async getListInPagination (page) {
      const { count } = await this.loadUsers({ page })
      this.pageChangeHandler({ page, pageCount: count, items: this.usersList })
    },
    paginationLogic (page) {
      this.getListInPagination(page)
    }
  }

}
</script>

<style scoped>
.users-table-container{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #999;
}
.user-container{
    margin: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    height: calc( 100vh - 51px );
}
.pagination-container{
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;
  margin-top: auto;
}
</style>
