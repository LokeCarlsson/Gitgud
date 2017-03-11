import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: '',
    authenticated: false
  },
  getters: {
    token: state => state.token,
    username: state => state.username,
    authenticated: state => state.authenticated
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
      state.authenticated = true
      localStorage.setItem('username', username)
    },
    removeUsername (state) {
      state.username = ''
      state.authenticated = false
      localStorage.removeItem('username')
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    removeToken (state) {
      state.token = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('setUsername', payload.username)
      commit('setToken', payload.token)
    },
    logout ({ commit }) {
      commit('removeUsername')
      commit('removeToken')
    }
  },
  plugins: [
    createPersistedState()
  ]
})
