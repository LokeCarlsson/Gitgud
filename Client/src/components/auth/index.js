const API_URL = 'http://127.0.0.1:3000/'
const LOGIN_URL = API_URL + 'login/'

export default {
  user: {
    authenticated: localStorage.getItem('token') || false,
    username: 'Gitgud'
  },
  login (context) {
    context.axios.get(LOGIN_URL).then((payload) => {
      console.log(payload)
      localStorage.setItem('token', payload.data.token)
      this.user.authenticated = true
    })
  },
  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    this.user.authenticated = false
    this.user.username = 'Gitgud'
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
