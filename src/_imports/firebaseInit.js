// import store from '../store'
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from '../store'
import router from '../router'

const config = {
  apiKey: 'AIzaSyDEg6KepP-GTz7rtfDr4TmlGWTJJnPZk_I',
  authDomain: 'flashcards-5bcb1.firebaseapp.com',
  databaseURL: 'https://flashcards-5bcb1.firebaseio.com',
  projectId: 'flashcards-5bcb1',
  storageBucket: 'flashcards-5bcb1.appspot.com',
  messagingSenderId: '498617502369'
}

const firebase = Firebase.initializeApp(config)
const auth = firebase.auth()
const db = firebase.firestore()

export default {
  install: (Vue, options) => {
    // Persistance
    db.enablePersistence()
      .catch(err => {
        if (err.code === 'failed-precondition') console.log('The can only run in one tab at a time!')
        else if (err.code === 'unimplemented') console.log('Your browser does not support persistance')
      })

    // Install to prototype
    Vue.prototype.$auth = {
      login: async (username, password) => {
        try {
          const { user } = await auth.signInWithEmailAndPassword(username, password)
          const docRef = db.collection('user')
          const { uid, email } = user
          // If user data is stored in database
          if (docRef.doc(uid)) {
            store.dispatch('user/updateUser', user)
          } else {
            const user = docRef.doc(uid).set({ uid, email })
            store.dispatch('user/updateUser', user)
          }
        } catch (e) {
          console.log(e)
          throw e
        }
      },
      signUp: async (dName, email, password) => {
        try {
          const { user } = await auth.createUserWithEmailAndPassword(email, password)
          user.updateProfile({ displayName: dName }).then(() => {
            console.log('User updated')
          })
          const docRef = db.collection('user')
          docRef.doc(user.uid).set({ uid: user.uid, displayName: dName, email })
        } catch (e) {
          console.log(e)
          throw e
        }
      },
      loginWithGoogle: async () => {
        const provider = new Firebase.auth.GoogleAuthProvider()
        try {
          const { user } = await auth.signInWithPopup(provider)
          const docRef = db.collection('user')
          const { uid, email, displayName } = user
          // If user data is stored in database
          if (docRef.doc(uid)) {
            store.dispatch('user/updateUser', user)
          } else {
            const user = docRef.doc(uid).set({ uid, email, displayName })
            store.dispatch('user/updateUser', user)
          }
        } catch (e) {
          console.log(e)
        }
      },
      logout: async () => {
        try {
          await auth.signOut()
        } catch (e) {
          console.log(e)
        }
      }
    }

    Vue.prototype.$firestore = db

    // AUTH STATE CHECK
    auth.onAuthStateChanged(user => {
      if (!store.state.loadingSpinner) store.commit('LOADING_SPINNER', true)
      if (user) store.dispatch('user/updateUser', user)
      if (!user) router.push('/auth')
      store.commit('LOADING_SPINNER', false)
    })
  }
}

export { firebase, db, auth }
