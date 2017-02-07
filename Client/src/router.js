import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFoundView from './components/error/404.vue'
import PaymentRequiredView from './components/error/402.vue'

import HomeView from './components/layout/Default.vue'
import AboutView from './components/info/About.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/about',
          component: AboutView,
          name: 'About',
          description: 'About, info and stuff'
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
