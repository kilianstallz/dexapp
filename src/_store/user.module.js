import Vue from 'vue'
/**
 * Module for auth state management, user specific data store
 * and profile settings
 */
const state = {
  user: null,
  userDoc: null
}
const getters = {
  user: state => state.user
}
const mutations = {
  'UPDATE_USER': (state, { user }) => {
    state.user = user
  },
  'UPDATE_USER_DOC': (state, user) => {
    state.userDoc = user
  },
  LOGOUT: state => {
    state.user = null
  }
}
const actions = {
  updateUser: ({ commit }, user) => {
    commit('UPDATE_USER', { user })
    const db = Vue.prototype.$firestore
    const docRef = db.collection('user').doc(user.uid)
    docRef.get().then(userDoc => {
      if (userDoc.exists) {
        commit('UPDATE_USER_DOC', userDoc.data())
      }
    })
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
