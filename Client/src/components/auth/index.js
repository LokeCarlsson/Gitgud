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
    this.user.username = this.userInfo.displayName
  },
  checkAuth () {
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
