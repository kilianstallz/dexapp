import Vue from 'vue'
import Vuex from 'vuex'

// get Modules
import data from './_store/data.module'
import notify from './_store/notify.module'
import { user } from './_store/user.module'

Vue.use(Vuex)

/**
 * Only app wide settings and personalisations may be stored here
 */

export default new Vuex.Store({
  modules: {
    data,
    notify,
    user
  },
  state: {
    loadingSpinner: false
  },
  getters: {
    loadingSpinner: state => state.loadingSpinner
  },
  mutations: {
    LOADING_SPINNER (state, bool) {
      state.loadingSpinner = bool
    }
  },
  actions: {

  }
})
