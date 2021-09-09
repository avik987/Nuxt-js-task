import client from './client'

export default {
  async login (email, password) {
    const { data } = await client.post('/users/sign-in', { email, password })
    return data
  },
  async registration (email, name, password) {
    const { data } = await client.post('/users/sign-up', { email, password, name })
    return data
  }
}
