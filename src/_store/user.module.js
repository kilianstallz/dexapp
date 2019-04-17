import Vue from 'vue'
/**
 * Module for auth state management, user specific data store
 * and profile settings
 */
const state = {
  user: null
}
const getters = {
  user: state => state.user
}
const mutations = {
  'UPDATE_USER': (state, { user }) => {
    state.user = user
  },
  LOGOUT: state => {
    state.user = null
  }
}
const actions = {
  updateUser: ({ commit }, user) => {
    commit('UPDATE_USER', { user })
  },
  logout: ({ commit }) => {
    Vue.prototype.$auth.logout()
    commit('LOGOUT')
  }
}

export const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
