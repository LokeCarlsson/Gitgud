import Vue from 'vue'
import VueRouter from 'vue-router'

// Errors
import NotFoundView from '../components/error/404.vue'
import PaymentRequiredView from '../components/error/402.vue'

// Routing files
import HomeView from '../components/layout/Default.vue'
import User from '../components/timelines/User.vue'
import Orgs from '../components/timelines/Orgs.vue'
import Start from '../components/info/Start.vue'
import Account from '../components/info/Account.vue'
import Settings from '../components/info/Settings.vue'
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'

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
          path: '/timeline/orgs',
          component: Orgs,
          name: 'Orgs',
          description: 'Timeline for organizations'
        },
        {
          path: '/account',
          component: Account,
          name: 'Account',
          description: 'Account, info and stuff'
        },
        {
          path: '/settings',
          component: Settings,
          name: 'Settings',
          description: 'Settings and stuff'
        },
        {
          path: '/timeline/user',
          component: User,
          name: 'User',
          description: 'Timeline for user'
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
