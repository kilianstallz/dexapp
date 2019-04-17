import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Sidebar from './components/Sidebar'
import firebaseInit from './_imports/firebaseInit'
import './registerServiceWorker'
import './assets/tailwind.css'

Vue.config.productionTip = false

const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
const type = connection.effectiveType
function network () {
  if (type === '2g') {
    if (process.env.NODE_ENV === 'production') {
      console.log('Slow network')
      console.log(type)
    }
  }
}
connection.addEventListener('change', network())

Vue.use(Sidebar)
Vue.use(firebaseInit)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
