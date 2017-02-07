import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFoundView from './components/error/404.vue'
import PaymentRequiredView from './components/error/402.vue'

import HomeView from './components/layout/Default.vue'
import Chuck from './components/test/Chuck.vue'
import Start from './components/info/Start.vue'
import AboutView from './components/info/About.vue'
import SecretQuote from './components/auth/SecretQuote.vue'
import Signup from './components/auth/Signup.vue'
import Login from './components/auth/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          component: Start,
          name: 'Start',
          description: 'Testing stuff'
        },
        {
          path: '/chuck',
          component: Chuck,
          name: 'Chuck',
          description: 'Chuck quotes'
        },
        {
          path: '/about',
          component: AboutView,
          name: 'About',
          description: 'About, info and stuff'
        },
        {
          path: '/secretquote',
          component: SecretQuote,
          name: 'SecretQuote',
          description: 'Secret Quote'
        },
        {
          path: '/login',
          component: Login,
          name: 'Login',
          description: 'Login'
        },
        {
          path: '/signup',
          component: Signup,
          name: 'Signup',
          description: 'Signup'
        }
      ]
    },
    {
      path: '/cash',
      component: PaymentRequiredView
    },
    {
      path: '*',
      component: NotFoundView
    }
  ]
})
