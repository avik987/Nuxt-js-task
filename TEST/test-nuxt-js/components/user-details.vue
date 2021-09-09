<template>
  <div>
    <div class="edit-user-container">
      <el-form ref="editUser" :model="form" status-icon :rules="rules">
        <el-form-item prop="name" label="Name" :rules="rules.name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="email" label="Email" :rules="rules.email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="edit-button-container">
          <el-button type="info" @click.prevent="cancel">
            Cancel
          </el-button>

          <el-button type="primary" @click.prevent="submitForm('editUser')">
            <template v-if="editUser">
              Save
            </template>
            <template v-else>
              Add User
            </template>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    editUser: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      form: {
        password: '',
        confirmPassword: '',
        email: '',
        name: ''
      },
      rules: {
        password: [
          { validator: this.passwordValidate, trigger: 'blur', required: true }
        ],
        confirmPassword: [
          {
            validator: this.confirmPasswordValidate,
            trigger: 'blur',
            required: true
          }
        ],
        email: [
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change']
          }
        ],
        name: [
          { required: true, message: 'Please input Name', trigger: 'blur' }
        ]
      },
      userId: 1
    }
  },
  watch: {
    editUser (user) {
      if (user) {
        const { email, name } = user
        this.form = {
          password: '',
          confirmPassword: '',
          email,
          name
        }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { password, email, name } = this.form
          this.$emit('submitForm', { password, email, name })
        } else {
          return false
        }
      })
    },
    cancel () {
      this.$router.push({ path: '/' })
    },
    passwordValidate (_, value, callback) {
      if (value === '' && !this.editUser) {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.confirmPassword !== '') {
          this.$refs.editUser.validateField('checkPass')
        }
        callback()
      }
    },
    confirmPasswordValidate (_, value, callback) {
      if (value === '' && !this.editUser) {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
  }
}
</script>
<style scoped>
.edit-user-container {
  width: 300px;
  padding: 25px 35px;
}
.edit-button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
