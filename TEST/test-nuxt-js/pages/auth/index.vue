<template>
  <div>
    <el-form ref="signInForm" :model="form" status-icon :rules="rules">
      <el-form-item prop="email" label="Email" :rules="rules.email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.prevent="submitForm('signInForm')"
        >
          Login
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
        email: ''
      },
      rules: {
        password: [{ validator: this.passwordValidate, trigger: 'blur', required: true }],
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const { password, email } = this.form
            await this.login({ password, email })
          } catch {}
        } else {
          return false
        }
      })
    }
  }
}
</script>
