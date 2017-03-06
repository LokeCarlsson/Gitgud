const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'auth/github/'
const SIGNUP_URL = API_URL + 'register/'

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
  signup (context, creds) {
    context.axios.post(SIGNUP_URL, creds).then((payload) => {
      localStorage.setItem('token', payload.data.token)
      this.user.authenticated = true
      this.user.username = creds.username
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
