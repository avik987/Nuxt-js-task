import client from './client'

export default {
  async all ({ page }) {
    const { data } = await client.get(`/users/?limit=10&page=${page || 1}`)
    return data
  },

  async updateUser ({ id, email, name, password }) {
    const { data } = await client.patch(`/users/${id}`, { email, name, password })
    return data
  },

  async removeUser ({ id }) {
    await client.delete(`/users/${id}`)
    return true
  },

  async getUser ({ id }) {
    const { data } = await client.get(`/users/${id}`)
    return data
  }
}
