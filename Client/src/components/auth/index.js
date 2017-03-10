import store from '../../store'
export default {
  login (query) {
    store.dispatch('setToken', query.token)
    store.dispatch('setUsername', query.username)
    store.dispatch('setUserInfo', this.getAuthHeader())
    this.$router.push('/')
  },
  logout () {
    store.dispatch('removeToken')
    store.dispatch('removeUsername')
  },
  checkAuth () {
    // this.axios.get('/account', { headers: this.getAuthHeader() })
    //   .then((payload) => {
    //     this.user.username = payload.data.username
    //     this.user.authenticated = true
    //     return true
    //   })
    //   .catch((e) => {
    //     this.user.authenticated = false
    //     console.log(e)
    //     this.logout()
    //     return false
    //   })
  },
  checkToken () {
    console.log('logged in? ', store.getters.authenticated)
    // const jwt = localStorage.getItem('token')
    // if (jwt !== undefined && jwt !== null && jwt.length > 0) {
    //   this.user.authenticated = true
    //   return true
    // }
    // else {
    //   this.user.authenticated = false
    //   return false
    // }
  },
  isLoggedIn () {
    return store.getters.authenticated
  },
  getToken () {
    return store.getters.token
  },
  getUser () {
    return store.getters.user
  },
  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('token')
    }
  }
}
