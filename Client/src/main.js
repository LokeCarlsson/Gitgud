// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import JWT from './drivers/JWT'

// Install Quasar Framework
Vue.use(Quasar)

// Axios setup
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token')
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.use(VueAxios, axios)

// Vue Auth setup
Vue.router = router
Vue.use(VueAuth, {
  auth: JWT,
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
