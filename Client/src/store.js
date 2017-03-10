import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: '',
    userInfo: {},
    authenticated: false
  },
  getters: {
    token: state => state.token,
    username: state => state.username,
    userInfo: state => state.userInfo,
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
      state.userInfo = userInfo
    },
    removeUserInfo (state) {
      state.userInfo = null
    }
  },
  actions: {
    setUsername ({ commit }, username) {
      commit('setUsername', username)
    },
    removeUsername ({ commit }) {
      commit('removeUsername')
    },
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    removeToken ({ commit }) {
      commit('removeToken')
    },
    setUserInfo ({ commit }, header) {
      Vue.axios.get('/account', { headers: header })
      .then((payload) => {
        commit('setUserInfo', payload.data)
      })
    },
    removeUserInfo ({ commit }) {
      commit('removeUserInfo')
    }
  },
  plugins: [
    createPersistedState()
  ]
})
