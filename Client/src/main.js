// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router/router'
import axios from 'axios'
import VueSocketio from 'vue-socket.io'
import VueAxios from 'vue-axios'
// import { routerConfig } from './router/config'
import store from './store'

// Install Quasar Framework
Vue.use(Quasar)

// Axios setup
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token')
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.use(VueAxios, axios)
Vue.use(VueSocketio, 'http://127.0.0.1:3001')
// routerConfig(router)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    sockets: {
      connect: function() {
        console.log('socket.io connected')
      }
      // time: function(val) {
      //   console.log(val)
      // }
    },
    render: h => h(require('./App'))
  })
})
