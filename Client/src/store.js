import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: '',
    avatarUrl: '',
    bio: '',
    displayName: '',
    profileUrl: '',
    authenticated: false
  },
  getters: {
    token: state => state.token,
    username: state => state.username,
    avatarUrl: state => state.avatarUrl,
    bio: state => state.bio,
    displayName: state => state.displayName,
    profileUrl: state => state.profileUrl,
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
    },
    setUserInfo (state, userInfo) {
      state.avatarUrl = userInfo.avatarUrl
      state.bio = 'userInfo.bio'
      state.displayName = userInfo.displayName
      state.profileUrl = userInfo.profileUrl
    },
    removeUserInfo (state) {
      state.avatarUrl = ''
      state.bio = ''
      state.displayName = ''
      state.profileUrl = ''
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
    },
    setUserInfo ({ commit }, payload) {
      commit('setUserInfo', payload)
    },
    removeUserInfo ({ commit }) {
      commit('removeUserInfo')
    }
  },
  plugins: [
    createPersistedState()
  ]
})
