import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Layout from './views/Layout.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue')
    },
    {
      path: '/app',
      name: 'home',
      component: Layout,
      meta: {
        requiresAuth: true,
        onlyLoggedOut: false
      },
      children: [
        {
          path: '/app/',
          name: 'Dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // TASK ADD Loading Spinner
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut)
  // TASK ADD Firebase user
  const user = store.state.user.user
  let version = 'full'
  const nextRoute = to.fullPath || '/app'
  if (window.innerWidth < 768) {
    version = 'mobile'
  }
  if (requiresAuth && !user) {
    return next({
      path: '/auth',
      query: { redirect: nextRoute, v: version }
    })
  }

  if (user && onlyLoggedOut) {
    return next({ path: '/', query: { v: version } })
  }

  next({ query: { v: version } })
})

export default router
