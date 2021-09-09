import auth from '@/api/auth'
import ApiCurrentUser from '@/api/current-user'
import usersAPI from '@/api/users'
export const state = () => ({
  currentUser: null,
  error: null,
  usersList: []
})

export const mutations = {
  login (_, { token }) {
    localStorage.setItem('accessToken', token)
    this.$router.push({ path: '/' })
  },

  logout () {
    localStorage.removeItem('accessToken')
    setTimeout(() => {
      this.$router.push({ path: '/auth' })
    })
  },

  setCurrentUser (state, payload) {
    state.currentUser = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setUsersList (state, payload) {
    state.usersList = payload
  }
}

export const actions = {
  async  login  ({ commit }, { email, password }) {
    const { token } = await auth.login(email, password)
    commit('login', { token })
  },
  async registration  ({ _ }, { email, name, password }) {
    const { data } = await auth.registration(email, name, password)
    return data
  },

  async logout  ({ commit }) {
    await commit('logout')
  },

  async currentUser  ({ commit }) {
    commit('setCurrentUser', await ApiCurrentUser.currentUser())
  },

  async loadUsers  ({ commit }, { page }) {
    const data = await usersAPI.all({ page })
    commit('setUsersList', data.users)
    return data
  },

  async loadUser  ({ _ }, { id }) {
    const data = await usersAPI.getUser({ id })
    return data
  },

  async updateUser  ({ _ }, { id, email, name, password }) {
    await usersAPI.updateUser({ id, email, name, password })
  },

  async addUser  ({ _ }, { id, username, name, password }) {
    await usersAPI.addUser({ id, username, name, password })
  },

  async removeUser  ({ _ }, { id }) {
    await usersAPI.removeUser({ id })
  }
}

export const getters = {
  getCurrentUser: state => state.currentUser
}
