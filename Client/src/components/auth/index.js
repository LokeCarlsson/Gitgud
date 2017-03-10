import store from '../../store'
export default {
  user: {
    authenticated: localStorage.getItem('token') || false,
    username: localStorage.getItem('username')
  },
  login (query) {
    localStorage.setItem('token', query.token)
    localStorage.setItem('username', query.username)
    store.dispatch('SET_TOKEN', query.token)
    store.dispatch('SET_USER', query.username)
  },
  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    store.dispatch('REMOVE_TOKEN')
    store.dispatch('REMOVE_USER')
  },
  checkAuth () {
    this.axios.get('/account', { headers: this.getAuthHeader() })
      .then((payload) => {
        this.user.username = payload.data.username
        this.user.authenticated = true
        return true
      })
      .catch((e) => {
        this.user.authenticated = false
        console.log(e)
        this.logout()
        return false
      })
  },
  checkToken () {
    const jwt = localStorage.getItem('token')
    if (jwt !== undefined && jwt !== null && jwt.length > 0) {
      this.user.authenticated = true
      return true
    }
    else {
      this.user.authenticated = false
      return false
    }
  },
  isLoggedIn () {
    return store.state.auth.authenticated
  },
  getToken () {
    return store.state.auth.token
  },
  getUser () {
    return store.state.auth.user
  },
  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('token')
    }
  }
}
