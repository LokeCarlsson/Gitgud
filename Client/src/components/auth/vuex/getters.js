const token = function (state) {
  return state.auth.token
}

const user = function (state) {
  return state.auth.user
}

const authenticated = function (state) {
  return state.auth.authenticated
}

export default {
  token,
  user,
  authenticated
}
