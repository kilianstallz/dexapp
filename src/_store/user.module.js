import { db, auth } from '../_imports/firebaseInit'
import router from '../router'
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
    state.userDoc = null
  }
}
const actions = {
  updateUser: ({ commit }, user) => {
    commit('UPDATE_USER', { user })
    const docRef = db.collection('users').doc(user.uid)
    docRef.get().then(userDoc => {
      if (userDoc.exists) {
        commit('UPDATE_USER_DOC', userDoc.data())
      }
    })
  },
  logout: ({ commit }) => {
    router.push('/auth')
    auth.signOut()
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
