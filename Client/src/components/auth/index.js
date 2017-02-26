const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'sessions/create/'
const SIGNUP_URL = API_URL + 'users/'

export default {
  user: {
    authenticated: false
  },
  login (context, creds) {
    context.axios.post(LOGIN_URL, creds).then((payload) => {
      localStorage.setItem('id_token', payload.data.id_token)
      this.user.authenticated = true
    })
  },
  signup (context, creds) {
    context.axios.post(SIGNUP_URL, creds).then((payload) => {
      localStorage.setItem('id_token', payload.data.id_token)
      this.user.authenticated = true
    })
  },
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
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
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
