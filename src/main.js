import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Sidebar from './components/Sidebar'
import firebaseInit from './_imports/firebaseInit'
import './registerServiceWorker'
import './assets/tailwind.css'

Vue.config.productionTip = false

Vue.use(Sidebar)
Vue.use(firebaseInit)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
