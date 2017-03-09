export default {
  user: {
    authenticated: localStorage.getItem('token') || false,
    username: ''
  },
  login (token) {
    localStorage.setItem('token', token)
    this.user.authenticated = true
  },
  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    this.user.authenticated = false
    this.user.username = this.userInfo.username
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
