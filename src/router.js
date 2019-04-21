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
      redirect: '/app/'
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue'),
      meta: {
        requiresAuth: false,
        onlyLoggedOut: true
      }
    },
    // Dashboard / App Home screen
    {
      path: '/app',
      name: 'App',
      component: Layout,
      meta: {
        requiresAuth: true,
        onlyLoggedOut: false
      },
      // Dashboard Pages (Navbar & Sidebar)
      children: [
        {
          path: '/app/',
          name: 'Dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
        },
        {
          path: '/app/stack/:id',
          name: 'Stack',
          component: () => import(/* webpackChunkName: "stack" */ './components/Stack/StackPage.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    },
    // Full Page Routes
    {
      path: '/app/create/space',
      name: 'createSpace',
      component: () => import(/* webpackChunkName: "create" */ `./components/Create/CreateSpacePage.vue`)
    },
    {
      path: '/app/create/todo',
      name: 'createTodo',
      component: () => import(/* webpackChunkName: "create" */ `./components/Create/CreateTodoPage.vue`)
    },
    {
      path: '/app/create/deck',
      name: 'createDeck',
      component: () => import(/* webpackChunkName: "create" */ `./components/Create/CreateDeckPage.vue`)
    }
  ]
})

router.beforeEach((to, from, next) => {
  // TASK ADD Loading Spinner
  if (!store.state.loadingSpinner) store.commit('LOADING_SPINNER', true)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut)
  // Get user from store
  const user = store.state.user.user
  // Get window size and do query string
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
