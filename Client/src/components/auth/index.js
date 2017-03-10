import store from '../../store'
export default {
  login (query) {
    store.dispatch('setToken', query.token)
    store.dispatch('setUsername', query.username)
    store.dispatch('setUserInfo', this.getAuthHeader())
    this.$router.push('/')
  },
  logout () {
    store.dispatch('removeToken')
    store.dispatch('removeUsername')
  },
  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('token')
    }
  }
}
