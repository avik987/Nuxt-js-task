<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    width="700"
  >
    <el-table-column
      label="Name"
    >
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>

    <el-table-column
      label="Email"
    >
      <template slot-scope="scope">
        {{ scope.row.email }}
      </template>
    </el-table-column>

    <el-table-column
      align="right"
    >
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row._id)">
          Edit
        </el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleEdit (index) {
      this.$router.push({ path: `/${index}` })
    },
    handleDelete (id) {
      this.$emit('deleteUser', id)
    }
  }
}
</script>
