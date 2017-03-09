export default {
  user: {
    authenticated: localStorage.getItem('token') || false,
    username: localStorage.getItem('username')
  },
  login (query) {
    localStorage.setItem('token', query.token)
    localStorage.setItem('username', query.username)
    this.user.authenticated = true
  },
  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.user.authenticated = false
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
  checkToken() {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
      return true
    }
    else {
      this.user.authenticated = false
      return false
    }
  },
  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('token')
    }
  }
}
