<template>
  <div>
    <el-form ref="signUpForm" :model="form" status-icon :rules="rules">
      <el-form-item prop="name" label="Name" :rules="rules.name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="email" label="Email" :rules="rules.email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.prevent="submitForm('signUpForm')"
        >
          Send
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'auth',
  data () {
    return {
      form: {
        password: '',
        confirmPassword: '',
        email: '',
        name: ''
      },
      rules: {
        password: [{ validator: this.passwordValidate, trigger: 'blur', required: true }],
        confirmPassword: [{ validator: this.confirmPasswordValidate, trigger: 'blur', required: true }],
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: 'Please input Name', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['registration']),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const { password, email, name } = this.form
            await this.registration({ password, email, name })
            this.$message({ type: 'success', message: 'User created successfully' })
            this.$router.push({ path: '/auth' })
          } catch {}
        } else {
          return false
        }
      })
    },
    passwordValidate  (_, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.confirmPassword !== '') {
          this.$refs.signUpForm.validateField('checkPass')
        }
        callback()
      }
    },
    confirmPasswordValidate  (_, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback()
      }
    }
  }
}
</script>
