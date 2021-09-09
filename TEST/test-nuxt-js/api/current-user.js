import client from './client'

export default {
  async currentUser () {
    const { data } = await client.get('/users/current')
    return data
  }
}
