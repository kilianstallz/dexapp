import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/app',
      children: [
        {
          path: '/app',
          name: 'Landing',
          component: () => import(/* webpackChunkName: "landing" */ './views/Dashboard.vue')
        },
        {
          path: '/app/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    }
  ]
})
