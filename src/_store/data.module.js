/**
 * Module for CRUD application on stack, deck and todo data
 */
import { db, auth } from '../_imports/firebaseInit'

const state = {
  stacks: null
}
const getters = {
  allStacks: state => state.stacks
}

const mutations = {
  UPDATE_STACKS (state, stacks) {
    state.stacks = stacks
  }
}
const actions = {
  async fetchStacks ({ commit }) {
    try {
      const colRef = await db.collection('stacks')
      let stacksSnapshot = await colRef.where('creator', '==', auth.currentUser.uid).get()
      let stacks = []
      stacksSnapshot.forEach(stack => {
        let one = { ...stack.data(), id: stack.id }
        stacks.push(one)
      })
      commit('UPDATE_STACKS', stacks)
    } catch (e) {
      console.log('Error fetching stacks', e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
