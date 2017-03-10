// import auth from '../components/auth'

// export function routerConfig (router) {
//   router.beforeEach(function (transition) {
//     let token = null

//     if (!auth.isLoggedIn()) {
//       token = localStorage.getItem('jwt-token')
//     }

//     if (transition.to.auth && token !== null && !auth.isLoggedIn()) {
//       auth.setToken(token)
//       return auth.getUserProfile()
//         .then(function (res) {
//           auth.setUser(res.data.user)
//           transition.next()
//         })
//         .catch(function () {
//           auth.remove()
//           transition.redirect('/login')
//         })
//     }

//     if (transition.to.auth && !auth.isLoggedIn()) {
//       transition.push('/login')
//     }
//     else if (transition.to.guest && auth.isLoggedIn()) {
//       transition.redirect(transition.from.path)
//     }
//     else {
//       transition.next()
//     }
//   })

//   router.push({
//     '*': '/'
//   })
// }
