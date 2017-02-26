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
<<<<<<< HEAD

      if (redirect) {
        router.go(redirect)
      }
=======
>>>>>>> ddcee89a9ba2c589e7ada68128962eeff7ab4cd7
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
