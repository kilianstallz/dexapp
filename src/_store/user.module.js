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
const mutations = {}
const actions = {}

export const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
