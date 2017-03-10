import store from '../../store'
import router from '../../router/router'

export default {
  login (query) {
    store.dispatch('login', {token: query.token, username: query.username})
    router.push('/')
  },
  logout () {
    router.push('/')
    store.dispatch('logout')
  },
  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('token')
    }
  }
}
