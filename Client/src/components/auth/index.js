const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'login/'
const SIGNUP_URL = API_URL + 'register/'

export default {
  user: {
    authenticated: false,
    username: 'Gitgud'
  },
  login (context, creds) {
    context.axios.post(LOGIN_URL, creds).then((payload) => {
      localStorage.setItem('id_token', payload.data.id_token)
      this.user.authenticated = true
      this.user.username = creds.username
    })
  },
  signup (context, creds) {
    context.axios.post(SIGNUP_URL, creds).then((payload) => {
      localStorage.setItem('id_token', payload.data.id_token)
      this.user.authenticated = true
      this.user.username = creds.username
    })
  },
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    this.user.username = 'Gitgud'
  },
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
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
      'Authorization': 'JWT ' + localStorage.getItem('id_token')
    }
  }
}
