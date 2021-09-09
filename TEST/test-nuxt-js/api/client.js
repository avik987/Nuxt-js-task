import axios from 'axios'
let store

if (process.browser) {
  window.onNuxtReady(({ $store }) => {
    store = $store
  })
}

const client = axios.create({
  baseURL: process.env.baseUrl
})

client.interceptors.request.use((config) => {
  if (!config.headers.authorization && localStorage.getItem('accessToken')) {
    config.headers['x-authorization'] = localStorage.getItem('accessToken')
  }
  return config
})

client.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout')
    }
    if (error.response && error.response.data && error.response.status !== 401) {
      store.commit('setError', error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default client
